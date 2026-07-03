"use client";

/**
 * Минимальный дышащий овал — максимально похожий на видео-референс.
 * 
 * Что на видео:
 * - Статичный белый круг в центре (не движется)
 * - Одно кольцо вокруг, которое расширяется и затухает
 * - Мягкое размытие (blur)
 * - Бледный цвет (на видео — зелёный, у нас — серебряно-синий)
 * - Очень просто, ничего лишнего
 * 
 * Несколько колец с задержкой создают непрерывный эффект.
 */

export function MinimalOrb() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: "100%", height: "320px" }}>
      {/* Статичный центральный круг */}
      <div
        className="absolute rounded-full"
        style={{
          width: "80px",
          height: "80px",
          background: "radial-gradient(circle, #FFFFFF 0%, #F0F4F8 70%, #E0E8F0 100%)",
          boxShadow: "0 0 40px rgba(91, 168, 219, 0.3)",
          zIndex: 10,
        }}
      />

      {/* Кольцо 1 */}
      <div
        className="absolute rounded-full minimal-ring-1"
        style={{
          width: "80px",
          height: "80px",
          border: "2px solid #5BA8DB",
          filter: "blur(4px)",
        }}
      />

      {/* Кольцо 2 */}
      <div
        className="absolute rounded-full minimal-ring-2"
        style={{
          width: "80px",
          height: "80px",
          border: "2px solid #8BB4D8",
          filter: "blur(6px)",
        }}
      />

      {/* Кольцо 3 */}
      <div
        className="absolute rounded-full minimal-ring-3"
        style={{
          width: "80px",
          height: "80px",
          border: "2px solid #D4E4F0",
          filter: "blur(8px)",
        }}
      />

      {/* Кольцо 4 — самое бледное */}
      <div
        className="absolute rounded-full minimal-ring-4"
        style={{
          width: "80px",
          height: "80px",
          border: "1px solid #C8D8E8",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}
