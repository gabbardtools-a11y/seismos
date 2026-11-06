/**
 * EquipmentCatalog — клиентский компонент каталога оборудования.
 * Табы по категориям, карточки с характеристиками и брендами.
 */
"use client";

import { useState } from "react";
import { Activity, Boxes, Layers, Gauge, Code2, ChevronDown, Check } from "lucide-react";
import {
  equipmentCatalog,
  type EquipmentCategory,
} from "@/content/equipment/catalog";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  Boxes,
  Layers,
  Gauge,
  Code2,
};

export function EquipmentCatalog() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const cat: EquipmentCategory = equipmentCatalog[activeCategory];

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const expandAll = () => {
    if (openItems.size === cat.items.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(cat.items.map((_, i) => i)));
    }
  };

  return (
    <div>
      {/* Табы категорий */}
      <div className="flex flex-wrap gap-2 mb-8">
        {equipmentCatalog.map((c, idx) => {
          const Icon = ICONS[c.icon] ?? Activity;
          const active = idx === activeCategory;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(idx);
                setOpenItems(new Set());
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors ${
                active
                  ? "bg-[#00549F] text-white"
                  : "bg-white border border-[#00549F]/30 text-[#00549F] hover:border-[#00549F] hover:bg-[#E7EEF6]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {c.title}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-[#00549F]/10"}`}>
                {c.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Intro категории */}
      <div
        className="mb-6 text-[15px] text-[#4A6378] leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-[#003366] [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: cat.intro }}
      />

      {/* Развернуть всё */}
      <div className="mb-3 flex items-center justify-between text-[11px] tracking-[0.14em] uppercase text-[#4A6378]">
        <span>{cat.items.length} единиц оборудования</span>
        <button
          onClick={expandAll}
          className="text-[#00549F] hover:text-[#003366] font-semibold"
        >
          {openItems.size === cat.items.length && cat.items.length > 0
            ? "Свернуть всё"
            : "Развернуть всё"}
        </button>
      </div>

      {/* Карточки оборудования */}
      <div className="space-y-3">
        {cat.items.map((item, idx) => {
          const isOpen = openItems.has(idx);
          return (
            <div
              key={idx}
              className="bg-white border border-[#D6DCE3] rounded-xl overflow-hidden"
            >
              {/* Заголовок карточки */}
              <button
                onClick={() => toggleItem(idx)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-[#F8FBF9] transition-colors"
              >
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-[#003366] mb-0.5">
                    {item.name}
                  </h3>
                  {item.brands && item.brands.length > 0 && (
                    <p className="text-[11px] text-[#4A6378]/60">
                      {item.brands.join(" · ")}
                    </p>
                  )}
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-[#00549F] flex-shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Развернутое содержимое */}
              {isOpen && (
                <div className="px-5 pb-4">
                  {/* Описание */}
                  <div
                    className="text-[14px] text-[#4A6378] leading-relaxed mb-4 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-[#003366] [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  {/* Характеристики */}
                  {item.specs && item.specs.length > 0 && (
                    <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-lg overflow-hidden">
                      <table className="w-full text-[13px]">
                        <tbody>
                          {item.specs.map((spec, si) => (
                            <tr
                              key={si}
                              className={si % 2 === 0 ? "bg-white/50" : ""}
                            >
                              <td className="px-4 py-2 text-[#4A6378] font-medium w-1/2 border-b border-[#E7EEF6] last:border-b-0">
                                {spec.label}
                              </td>
                              <td className="px-4 py-2 text-[#003366] font-semibold border-b border-[#E7EEF6] last:border-b-0">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Бренды */}
                  {item.brands && item.brands.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.brands.map((brand) => (
                        <span
                          key={brand}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7EEF6] rounded-full text-[11px] font-medium text-[#00549F]"
                        >
                          <Check className="h-3 w-3" />
                          {brand}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
