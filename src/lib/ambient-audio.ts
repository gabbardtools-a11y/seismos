"use client";

/**
 * Медитативный эмбиент-генератор на Web Audio API.
 *
 * Концепция звука — глубокий тонирующий drone (как тибетские поющие чаши):
 *  - Основной тон 110 Гц (A2) — низкий, «заземляющий»
 *  - Квинта 165 Гц (E3) — открытая, «расширяющая» гармоника
 *  - Октава 220 Гц (A3) — добавляет воздушность
 *  - Суб-бас 55 Гц (A1) — глубокий гул «из подвала»
 *
 * Все осцилляторы — sine (чистый тон, без резких гармоник).
 * Поверх — очень медленная LFO-модуляция громности (0.07 Гц, период ~14 сек),
 * создаёт эффект «дыхания» звука, синхронный с пульсацией эмблемы.
 *
 * Лёгкая реверберация через ConvolverNode.
 */

export class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private reverb: ConvolverNode | null = null;
  private reverbGain: GainNode | null = null;
  private dryGain: GainNode | null = null;
  private isPlaying = false;
  private currentVolume = 0.45;

  /** Создать импульсный отклик для реверберации */
  private createReverbImpulse(ctx: AudioContext, duration = 3.5, decay = 2.5): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = Math.max(1, Math.floor(sampleRate * duration));
    const impulse = ctx.createBuffer(2, length, sampleRate);

    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / length;
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
      }
    }
    return impulse;
  }

  /** Инициализация аудио-графа. Вызывается один раз при первом запуске. */
  private init(): void {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
    }

    if (this.masterGain) return;

    const ctx = this.ctx;

    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(ctx.destination);

    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this.createReverbImpulse(ctx);

    this.reverbGain = ctx.createGain();
    this.reverbGain.gain.value = 0.55;

    this.dryGain = ctx.createGain();
    this.dryGain.gain.value = 0.7;

    this.dryGain.connect(this.masterGain);
    this.reverb.connect(this.reverbGain);
    this.reverbGain.connect(this.masterGain);

    // 4 осциллятора
    const voices = [
      { freq: 55,  type: "sine" as OscillatorType, gain: 0.22 },
      { freq: 110, type: "sine" as OscillatorType, gain: 0.35 },
      { freq: 165, type: "sine" as OscillatorType, gain: 0.18 },
      { freq: 220, type: "sine" as OscillatorType, gain: 0.12 },
    ];

    for (const v of voices) {
      const osc = ctx.createOscillator();
      osc.type = v.type;
      osc.frequency.value = v.freq;
      osc.detune.value = (Math.random() - 0.5) * 6;

      const voiceGain = ctx.createGain();
      voiceGain.gain.value = v.gain;

      osc.connect(voiceGain);
      voiceGain.connect(this.dryGain);
      voiceGain.connect(this.reverb);

      osc.start();
      this.oscillators.push(osc);
    }

    // LFO — медленная модуляция громности
    this.lfo = ctx.createOscillator();
    this.lfo.type = "sine";
    this.lfo.frequency.value = 0.07;

    this.lfoGain = ctx.createGain();
    this.lfoGain.gain.value = 0.15;

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.masterGain.gain);
    this.lfo.start();
  }

  /** Плавно включить звук (fade-in за 2 сек) */
  async play(): Promise<void> {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const target = this.currentVolume;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(target, now + 2.0);

    this.isPlaying = true;
  }

  /** Плавно выключить звук (fade-out за 1.5 сек) */
  pause(): void {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.5);

    this.isPlaying = false;
  }

  /** Установить общую громкость (0..1) */
  setVolume(v: number): void {
    this.currentVolume = Math.max(0, Math.min(1, v));
    if (this.isPlaying && this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.currentVolume, now + 0.3);
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

/**
 * Singleton — один движок на всю страницу.
 */
let _engine: AmbientAudioEngine | null = null;

export function getAmbientEngine(): AmbientAudioEngine {
  if (!_engine) {
    _engine = new AmbientAudioEngine();
  }
  return _engine;
}
