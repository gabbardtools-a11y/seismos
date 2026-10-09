"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * SeismoSoundToggle — кнопка включения тихого сейсмического звука.
 *
 * Звук синтезируется через Web Audio API в реальном времени:
 *  - Белый шум → lowpass ~400 Гц → тихий гул (как фон сейсмостанции)
 *  - Раз в 6–12 сек — короткий мелкий «щелчок» (имитация пика на сейсмограмме)
 *  - Очень низкая громкость (gain 0.04) — соответствие статусу «0 событий»
 *
 * Звук не зависит от внешних файлов, работает циклически пока включён.
 * Tooltip при наведении: «Послушать сейсмозвуки».
 */
export function SeismoSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Web Audio refs
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const lowpassRef = useRef<BiquadFilterNode | null>(null);
  const spikeTimeoutRef = useRef<number | null>(null);
  const rumbleOscRef = useRef<OscillatorNode | null>(null);

  const stopAudio = useCallback(() => {
    // Останавливаем таймаут пиков
    if (spikeTimeoutRef.current !== null) {
      clearTimeout(spikeTimeoutRef.current);
      spikeTimeoutRef.current = null;
    }
    // Останавливаем rumble-осциллятор
    if (rumbleOscRef.current) {
      try {
        rumbleOscRef.current.stop();
        rumbleOscRef.current.disconnect();
      } catch {}
      rumbleOscRef.current = null;
    }
    // Останавливаем источник шума
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
      } catch {}
      noiseSourceRef.current = null;
    }
    // Закрываем контекст
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
    // Создаём AudioContext (должен быть создан после user gesture)
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    // Если контекст приостановлен (autoplay policy) — резюмируем fire-and-forget
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    // ─── Master gain — очень тихо (0.04) ────────────────────────────
    const master = ctx.createGain();
    master.gain.value = 0.04;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // ─── Lowpass filter ~400 Гц — гул сейсмостанции ─────────────────
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 400;
    lowpass.Q.value = 0.7;
    lowpass.connect(master);
    lowpassRef.current = lowpass;

    // ─── Белый шум (зацикленный buffer 2 сек) ───────────────────────
    const bufferSize = ctx.sampleRate * 2; // 2 секунды
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // белый шум
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    noise.connect(lowpass);
    noise.start();
    noiseSourceRef.current = noise;

    // ─── Rumble-осциллятор (низкий гул 50 Гц) ───────────────────────
    const rumble = ctx.createOscillator();
    rumble.type = "sine";
    rumble.frequency.value = 50;
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.value = 0.3;
    rumble.connect(rumbleGain);
    rumbleGain.connect(lowpass);
    rumble.start();
    rumbleOscRef.current = rumble;

    // ─── Периодические мелкие пики ──────────────────────────────────
    // Раз в 6–12 сек — короткий bump gain (имитация щелчка/пика)
    const scheduleSpike = () => {
      if (!ctxRef.current || !masterGainRef.current) return;
      const now = ctxRef.current.currentTime;
      const peakGain = 0.12; // кратковременное усиление
      const peakDur = 0.15; // 150 мс
      // Резкий подъём → спад
      masterGainRef.current.gain.setValueAtTime(0.04, now);
      masterGainRef.current.gain.linearRampToValueAtTime(peakGain, now + 0.01);
      masterGainRef.current.gain.exponentialRampToValueAtTime(
        0.04,
        now + peakDur
      );
      // Следующий пик через случайный интервал
      const nextDelay = 6000 + Math.random() * 6000; // 6–12 сек
      spikeIntervalRef.current = window.setTimeout(scheduleSpike, nextDelay) as unknown as ReturnType<typeof setInterval>;
    };
    // Первый пик через 3 сек
    spikeIntervalRef.current = window.setTimeout(scheduleSpike, 3000) as unknown as ReturnType<typeof setInterval>;
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

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return (
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
      className={`
        group relative inline-flex items-center justify-center
        w-8 h-8 rounded-full
        border transition-all duration-300
        ${
          isPlaying
            ? "bg-[#22C55E] border-[#22C55E] text-white shadow-[0_0_12px_rgba(34,197,94,0.5)]"
            : "bg-white/80 border-[#2D5F3F]/30 text-[#2D5F3F] hover:border-[#2D5F3F] hover:bg-[#E7F6EE]"
        }
        ${isLoading ? "opacity-60 cursor-wait" : "cursor-pointer"}
        backdrop-blur-sm
      `}
    >
      {/* Пульсирующее кольцо когда играет */}
      {isPlaying && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-[#22C55E] animate-ping opacity-50"
        />
      )}

      {/* Иконка */}
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {isPlaying ? (
          <Volume2 className="h-4 w-4" strokeWidth={2.2} />
        ) : (
          <VolumeX className="h-4 w-4" strokeWidth={2.2} />
        )}
      </span>

      {/* Tooltip при наведении */}
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
  );
}
