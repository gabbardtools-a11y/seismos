/**
 * Поиск ближайшего города по координатам из локальной базы GeoNames.
 *
 * База public/data/cities.json содержит ~149 000 городов с населением
 * от 1000 человек. Загружается один раз, кэшируется в памяти.
 *
 * Формат базы:
 *   cities: [lat_int, lon_int, name_id, country_id, admin1_id][]  (lat/lon × 1000)
 *   names: string[]
 *   countries: string[]
 *   admin1: string[]  (регионы)
 *
 * Поиск — линейный haversine по всем городам, ~5-10мс на 149к городов.
 */

export type NearestCity = {
  name: string;
  region: string;
  country: string;
  distanceKm: number;
};

type CitiesDB = {
  cities: number[][];
  names: string[];
  countries: string[];
  admin1: string[];
};

let dbPromise: Promise<CitiesDB> | null = null;

async function loadDB(): Promise<CitiesDB> {
  if (!dbPromise) {
    dbPromise = fetch('/data/cities.json').then((r) => r.json());
  }
  return dbPromise;
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dphi = ((lat2 - lat1) * Math.PI) / 180;
  const dlam = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dphi / 2) ** 2 +
    Math.cos(p1) * Math.cos(p2) * Math.sin(dlam / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function findNearestCity(
  lat: number,
  lon: number
): Promise<NearestCity | null> {
  try {
    const db = await loadDB();
    if (!db.cities || db.cities.length === 0) return null;

    let bestDist = Infinity;
    let bestIdx = -1;

    for (let i = 0; i < db.cities.length; i++) {
      const c = db.cities[i];
      const clat = c[0] / 1000;
      const clon = c[1] / 1000;
      const d = haversine(lat, lon, clat, clon);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }

    if (bestIdx < 0) return null;

    const c = db.cities[bestIdx];
    return {
      name: db.names[c[2]] ?? '—',
      region: c[4] >= 0 ? (db.admin1[c[4]] ?? '') : '',
      country: db.countries[c[3]] ?? '—',
      distanceKm: Math.round(bestDist),
    };
  } catch (e) {
    console.warn('findNearestCity failed:', e);
    return null;
  }
}

/**
 * Человекочитаемое описание местоположения для тултипа.
 */
export function formatLocation(city: NearestCity | null): {
  primary: string;
  secondary: string;
} {
  if (!city) {
    return { primary: 'Местоположение', secondary: 'определяется...' };
  }

  const { name, region, country, distanceKm } = city;

  if (distanceKm <= 30) {
    const parts = [name];
    if (region && region !== name) parts.push(region);
    if (country) parts.push(country);
    return {
      primary: parts.join(', '),
      secondary: distanceKm > 0 ? `${distanceKm} км от эпицентра` : 'в эпицентре',
    };
  }

  if (distanceKm <= 200) {
    return {
      primary: `В ${distanceKm} км от ${name}`,
      secondary: [region, country].filter(Boolean).join(', '),
    };
  }

  if (distanceKm <= 1000) {
    return {
      primary: `В ${distanceKm} км от ${name}`,
      secondary: country || '',
    };
  }

  return {
    primary: 'В открытом океане',
    secondary: `Ближайший берег — ${name}, ${country} (${distanceKm} км)`,
  };
}
