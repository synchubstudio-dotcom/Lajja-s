import React from "react";
import { NutritionInfo } from "@/types/product";

interface NutritionTableProps {
  nutrition: NutritionInfo;
}

export function NutritionTable({ nutrition }: NutritionTableProps) {
  return (
    <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
      <div className="flex items-center justify-between pb-3 border-b border-stone-300">
        <div>
          <h4 className="font-bold text-stone-900 font-serif text-base">Nutrition Facts</h4>
          <p className="text-xs text-stone-500">Per Serving: {nutrition.servingSize}</p>
        </div>
        <span className="text-xs font-bold bg-kesari-100 text-kesari-800 px-2.5 py-1 rounded-full">
          100% Wholesome
        </span>
      </div>

      <div className="divide-y divide-stone-200 text-xs mt-3">
        <div className="py-2 flex justify-between font-bold text-stone-900 text-sm">
          <span>Energy / Calories</span>
          <span>{nutrition.calories} kcal</span>
        </div>
        <div className="py-2 flex justify-between text-stone-700">
          <span>Protein</span>
          <span className="font-semibold">{nutrition.protein}</span>
        </div>
        <div className="py-2 flex justify-between text-stone-700">
          <span>Total Carbohydrates</span>
          <span className="font-semibold">{nutrition.carbohydrates}</span>
        </div>
        {nutrition.fiber && (
          <div className="py-2 flex justify-between text-stone-600 pl-3">
            <span>Dietary Fiber</span>
            <span>{nutrition.fiber}</span>
          </div>
        )}
        <div className="py-2 flex justify-between text-stone-700">
          <span>Total Fat</span>
          <span className="font-semibold">{nutrition.fat}</span>
        </div>
        {nutrition.sodium && (
          <div className="py-2 flex justify-between text-stone-700">
            <span>Sodium</span>
            <span className="font-semibold">{nutrition.sodium}</span>
          </div>
        )}
      </div>

      <p className="text-[10px] text-stone-400 mt-4 italic">
        *Values are calculated based on traditional whole ingredient laboratory averages.
      </p>
    </div>
  );
}
