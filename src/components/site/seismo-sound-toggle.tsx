"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX, MapPin } from "lucide-react";

/**
 * SeismoSoundToggle — кнопка + переключатель регионов.
 *
 * Звук синтезируется через Web Audio API в реальном времени.
 * В зависимости от региона меняется характер звука:
 *   - Москва (тихо): очень тихий гул 0.03, редкие мелкие пики раз в 8-15 сек
 *   - Камчатка: средний гул 0.06, частые средние пики раз в 2-4 сек
 *   - Сахалин: гул 0.05, пики раз в 3-5 сек
 *   - Алтай-Саяны: гул 0.04, пики раз в 5-8 сек
 *   - Кавказ: гул 0.05, пики раз в 3-5 сек
 *   - Байкал: гул 0.045, пики раз в 4-6 сек
 *
 * Звук циклический — играет пока включён.
 */

type RegionKey = "moscow" | "kamchatka" | "sakhalin" | "altai" | "caucasus" | "baikal";

const REGIONS: Record<
  RegionKey,
  {
    label: string;
    gain: number;
    spikeMinMs: number;
    spikeMaxMs: number;
    spikeGain: number;
    lowpass: number;
    rumble: number;
    description: string;
  }
> = {
  moscow: {
    label: "Москва (тихо)",
    gain: 0.03,
    spikeMinMs: 8000,
    spikeMaxMs: 15000,
    spikeGain: 0.08,
    lowpass: 400,
    rumble: 50,
    description: "Сейсмически пассивный регион",
  },
  kamchatka: {
    label: "Камчатка",
    gain: 0.06,
    spikeMinMs: 2000,
    spikeMaxMs: 4000,
    spikeGain: 0.22,
    lowpass: 600,
    rumble: 45,
    description: "Один из самых сейсмоактивных регионов РФ",
  },
  sakhalin: {
    label: "Сахалин",
    gain: 0.05,
    spikeMinMs: 3000,
    spikeMaxMs: 5000,
    spikeGain: 0.18,
    lowpass: 550,
    rumble: 48,
    description: "Высокая сейсмическая активность",
  },
  altai: {
    label: "Алтай-Саяны",
    gain: 0.04,
    spikeMinMs: 5000,
    spikeMaxMs: 8000,
    spikeGain: 0.14,
    lowpass: 480,
    rumble: 52,
    description: "Умеренная сейсмичность",
  },
  caucasus: {
    label: "Кавказ",
    gain: 0.05,
    spikeMinMs: 3000,
    spikeMaxMs: 5000,
    spikeGain: 0.16,
    lowpass: 520,
    rumble: 50,
    description: "Землетрясения до M6-7",
  },
  baikal: {
    label: "Байкал",
    gain: 0.045,
    spikeMinMs: 4000,
    spikeMaxMs: 6000,
    spikeGain: 0.15,
    lowpass: 500,
    rumble: 51,
    description: "Рифтовая сейсмичность",
  },
};

export function SeismoSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [region, setRegion] = useState<RegionKey>("moscow");
  const [regionOpen, setRegionOpen] = useState(false);

  // Web Audio refs
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const lowpassRef = useRef<BiquadFilterNode | null>(null);
  const spikeTimeoutRef = useRef<number | null>(null);
  const rumbleOscRef = useRef<OscillatorNode | null>(null);
  const regionRef = useRef<RegionKey>("moscow");

  // Синхронизируем ref с state для использования в колбэках
  useEffect(() => {
    regionRef.current = region;
    // Если играет — обновляем параметры на лету
    if (isPlaying && ctxRef.current && masterGainRef.current && lowpassRef.current) {
      const cfg = REGIONS[region];
      masterGainRef.current.gain.setTargetAtTime(cfg.gain, ctxRef.current.currentTime, 0.3);
      lowpassRef.current.frequency.setTargetAtTime(cfg.lowpass, ctxRef.current.currentTime, 0.3);
    }
  }, [region, isPlaying]);

  const stopAudio = useCallback(() => {
    if (spikeTimeoutRef.current !== null) {
      clearTimeout(spikeTimeoutRef.current);
      spikeTimeoutRef.current = null;
    }
    if (rumbleOscRef.current) {
      try {
        rumbleOscRef.current.stop();
        rumbleOscRef.current.disconnect();
      } catch {}
      rumbleOscRef.current = null;
    }
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
      } catch {}
      noiseSourceRef.current = null;
    }
    if (ctxRef.current) {
      try {
        ctxRef.current.close();
      } catch {}
      ctxRef.current = null;
    }
    masterGainRef.current = null;
    lowpassRef.current = null;
  }, []);

  const startAudio = useCallback(async () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const cfg = REGIONS[regionRef.current];

    // Master gain
    const master = ctx.createGain();
    master.gain.value = cfg.gain;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // Lowpass filter
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = cfg.lowpass;
    lowpass.Q.value = 0.7;
    lowpass.connect(master);
    lowpassRef.current = lowpass;

    // Белый шум (зацикленный buffer 2 сек)
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    noise.connect(lowpass);
    noise.start();
    noiseSourceRef.current = noise;

    // Rumble-осциллятор (низкий гул)
    const rumble = ctx.createOscillator();
    rumble.type = "sine";
    rumble.frequency.value = cfg.rumble;
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.value = 0.3;
    rumble.connect(rumbleGain);
    rumbleGain.connect(lowpass);
    rumble.start();
    rumbleOscRef.current = rumble;

    // Периодические пики
    const scheduleSpike = () => {
      if (!ctxRef.current || !masterGainRef.current) return;
      const currentCfg = REGIONS[regionRef.current];
      const now = ctxRef.current.currentTime;
      const peakGain = currentCfg.spikeGain;
      const peakDur = 0.18;
      masterGainRef.current.gain.setValueAtTime(currentCfg.gain, now);
      masterGainRef.current.gain.linearRampToValueAtTime(peakGain, now + 0.01);
      masterGainRef.current.gain.exponentialRampToValueAtTime(
        currentCfg.gain,
        now + peakDur
      );
      const nextDelay =
        currentCfg.spikeMinMs +
        Math.random() * (currentCfg.spikeMaxMs - currentCfg.spikeMinMs);
      spikeTimeoutRef.current = window.setTimeout(scheduleSpike, nextDelay);
    };
    spikeTimeoutRef.current = window.setTimeout(scheduleSpike, 2500);
  }, []);

  const handleToggle = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isPlaying) {
        stopAudio();
        setIsPlaying(false);
      } else {
        await startAudio();
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Seismo audio error:", e);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, startAudio, stopAudio]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return (
    <div className="relative flex items-center gap-1.5">
      {/* Кнопка Play/Mute */}
      <button
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isLoading}
        aria-label={
          isPlaying ? "Выключить сейсмозвук" : "Послушать сейсмозвуки"
        }
        aria-pressed={isPlaying}
        title={isPlaying ? "Выключить сейсмозвук" : "Послушать сейсмозвуки"}
        className={`group relative inline-flex items-center justify-center
          w-8 h-8 rounded-full border transition-all duration-300
          ${
            isPlaying
              ? "bg-[#22C55E] border-[#22C55E] text-white shadow-[0_0_12px_rgba(34,197,94,0.5)]"
              : "bg-white/80 border-[#2D5F3F]/30 text-[#2D5F3F] hover:border-[#2D5F3F] hover:bg-[#E7F6EE]"
          }
          ${isLoading ? "opacity-60 cursor-wait" : "cursor-pointer"}
          backdrop-blur-sm`}
      >
        {isPlaying && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-[#22C55E] animate-ping opacity-50"
          />
        )}
        <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {isPlaying ? (
            <Volume2 className="h-4 w-4" strokeWidth={2.2} />
          ) : (
            <VolumeX className="h-4 w-4" strokeWidth={2.2} />
          )}
        </span>

        {isHovered && !isLoading && (
          <span
            className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap
                       bg-[#003366] text-white text-[10px] tracking-[0.12em] uppercase font-semibold
                       px-3 py-1.5 pointer-events-none rounded-sm shadow-lg z-50"
          >
            {isPlaying ? "Звук играет · выкл" : "Послушать сейсмозвуки"}
          </span>
        )}
      </button>

      {/* Переключатель региона */}
      <button
        type="button"
        onClick={() => setRegionOpen((v) => !v)}
        disabled={isLoading}
        aria-label="Выбрать регион"
        title={REGIONS[region].label}
        className={`group relative inline-flex items-center gap-1 px-2 h-8 rounded-full border
          transition-all duration-300 text-[10px] tracking-[0.1em] uppercase font-semibold
          ${
            isPlaying
              ? "bg-[#22C55E]/15 border-[#22C55E]/50 text-[#2D5F3F] hover:bg-[#22C55E]/25"
              : "bg-white/80 border-[#2D5F3F]/30 text-[#2D5F3F] hover:border-[#2D5F3F] hover:bg-[#E7F6EE]"
          }
          cursor-pointer backdrop-blur-sm`}
      >
        <MapPin className="h-3 w-3" />
        <span className="hidden sm:inline">{REGIONS[region].label.split(" ")[0]}</span>
      </button>

      {/* Dropdown регионов */}
      {regionOpen && (
        <>
          {/* Клик-защина */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setRegionOpen(false)}
          />
          <div
            className="absolute top-full left-0 mt-1 z-50 min-w-[240px] bg-white border border-[#D6DCE3] rounded-lg shadow-xl overflow-hidden"
          >
            <div className="px-3 py-2 bg-[#F8FBF9] border-b border-[#D6DCE3]">
              <div className="text-[10px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
                Регион прослушивания
              </div>
            </div>
            {(Object.keys(REGIONS) as RegionKey[]).map((key) => {
              const r = REGIONS[key];
              const isActive = region === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setRegion(key);
                    setRegionOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 border-b border-[#D6DCE3] last:border-b-0 transition-colors
                    ${isActive ? "bg-[#22C55E]/10" : "hover:bg-[#E7F6EE]"}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[12px] font-semibold text-[#003366]">
                      {r.label}
                    </div>
                    {isActive && (
                      <span className="text-[#22C55E] text-[10px]">●</span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#4A6378] mt-0.5">
                    {r.description}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[9px] text-[#4A6378]/70">
                    <span>громкость: {Math.round(r.gain * 100)}%</span>
                    <span>
                      пики: {r.spikeMinMs / 1000}-{r.spikeMaxMs / 1000}с
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
