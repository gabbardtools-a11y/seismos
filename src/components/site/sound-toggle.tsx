"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getAmbientEngine } from "@/lib/ambient-audio";

/**
 * Кнопка включения/выключения медитативного эмбиента в hero-секции.
 *
 * Поведение:
 *  - По умолчанию звук выключен (иконка перечёркнутого динамика)
 *  - При клике — запускает Web Audio API синтез, плавный fade-in 2 сек
 *  - Повторный клик — плавный fade-out 1.5 сек
 *  - Иконка плавно меняется между Volume2 ↔ VolumeX
 *  - Кнопка не зависит от внешних аудиофайлов — звук синтезируется в реальном времени
 */
export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(async () => {
    setIsLoading(true);
    try {
      const engine = getAmbientEngine();
      if (isPlaying) {
        engine.pause();
        setIsPlaying(false);
      } else {
        await engine.play();
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Ambient audio error:", e);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      try {
        const engine = getAmbientEngine();
        engine.pause();
      } catch {}
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isLoading}
      aria-label={isPlaying ? "Выключить эмбиент" : "Включить эмбиент"}
      aria-pressed={isPlaying}
      title={isPlaying ? "Выключить эмбиент" : "Включить эмбиент"}
      className={`
        group relative inline-flex items-center justify-center
        w-11 h-11 rounded-full
        border-2 transition-all duration-500
        ${isPlaying
          ? "bg-[#00549F] border-[#00549F] text-white shadow-[0_0_20px_rgba(0,84,159,0.4)]"
          : "bg-white/70 border-[#00549F]/40 text-[#00549F] hover:border-[#00549F] hover:bg-[#E7EEF6]"}
        ${isLoading ? "opacity-60 cursor-wait" : "cursor-pointer"}
        backdrop-blur-sm
      `}
    >
      {/* Пульсирующее кольцо вокруг кнопки, когда играет */}
      {isPlaying && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-[#00549F] animate-[sound-ping_2.5s_ease-out_infinite]"
        />
      )}

      {/* Иконка — плавная смена */}
      <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
        {isPlaying ? (
          <Volume2 className="h-5 w-5" strokeWidth={2} />
        ) : (
          <VolumeX className="h-5 w-5" strokeWidth={2} />
        )}
      </span>

      {/* Подсказка-tooltip при наведении */}
      {isHovered && !isLoading && (
        <span
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap
                     bg-[#003366] text-white text-[10px] tracking-[0.12em] uppercase font-semibold
                     px-3 py-1.5 pointer-events-none"
        >
          {isPlaying ? "Звук играет · click to mute" : "Включить эмбиент"}
        </span>
      )}
    </button>
  );
}
