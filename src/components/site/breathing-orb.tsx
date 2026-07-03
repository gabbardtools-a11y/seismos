"use client";

/**
 * Дышащий овал — по видео-референсу.
 * Статичный белый центр + расходящиеся размытые кольца.
 * Отдельный блок под эмблемой с фиксированной высотой.
 */

export function BreathingOrb() {
  return (
    <div className="relative w-full h-[200px] flex items-center justify-center overflow-visible">
      {/* Центральный статичный круг */}
      <div
        className="absolute w-[60px] h-[60px] rounded-full bg-white shadow-[0_0_30px_rgba(91,168,219,0.4)]"
        style={{ zIndex: 10 }}
      />

      {/* Расходящиеся кольца через div + CSS */}
      <div className="absolute w-[60px] h-[60px] rounded-full border-2 border-[#5BA8DB] orb-ring-1" />
      <div className="absolute w-[60px] h-[60px] rounded-full border-2 border-[#D4E4F0] orb-ring-2" />
      <div className="absolute w-[60px] h-[60px] rounded-full border-2 border-[#5BA8DB] orb-ring-3" />
    </div>
  );
}
