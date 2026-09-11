"use client";

import { Slider } from "@/components/ui/slider";

interface PriceSliderProps {
  type: string;
  value: number[];
  min: number;
  max: number;
  onChange: (value: number[]) => void;
}

export default function PriceSlider({
  type,
  value,
  min,
  max,
  onChange,
}: PriceSliderProps) {
  const handleMinChange = (newMin: number) => {
    onChange([Math.min(newMin, value[1]), value[1]]);
  };

  const handleMaxChange = (newMax: number) => {
    onChange([value[0], Math.max(newMax, value[0])]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-texto2/60 font-medium">Preço {type}</span>

        <span className="text-texto2/60 text-sm">
          R$ {value[0]} - R$ {value[1]}
        </span>
      </div>

      <Slider
        value={value}
        min={min}
        max={max}
        step={5}
        onValueChange={onChange}
        className="[&_[role=slider]]:border-cor1 [&_[role=slider]]:bg-cor1 [&_[data-slot='slider-range']]:bg-cor1"
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-texto2/60 mb-1 block text-xs">
            Mínimo - {type}
          </label>

          <div className="relative">
            <span className="text-texto2/60 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              R$
            </span>

            <input
              type="number"
              value={value[0]}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="text-texto2/80 bg-card w-full rounded-lg border p-1 pr-5 pl-10 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-texto2/60 mb-1 block text-xs">
            Máximo - {type}
          </label>

          <div className="relative">
            <span className="text-texto2/60 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              R$
            </span>

            <input
              type="number"
              value={value[1]}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="text-texto2/80 bg-card w-full rounded-lg border p-1 pr-5 pl-10 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// import { Slider } from "@/components/ui/slider";
// import { useState } from "react";

// interface PriceSliderProps {
//   type: string;
//   min: number;
//   max: number;
//   onChange?: (price: number[]) => void;
// }

// export default function PriceSlider({
//   type,
//   min,
//   max,
//   onChange,
// }: PriceSliderProps) {
//   const [price, setPrice] = useState([min, max]);

//   const updatePrice = (value: number[]) => {
//     setPrice(value);
//     onChange?.(value);
//   };

//   const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const minValue = Number(e.target.value);

//     const newPrice = [Math.min(minValue, price[1]), price[1]];

//     setPrice(newPrice);
//     onChange?.(newPrice);
//   };

//   const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const maxValue = Number(e.target.value);

//     const newPrice = [price[0], Math.max(maxValue, price[0])];

//     setPrice(newPrice);
//     onChange?.(newPrice);
//   };

//   return (
//     <div className="flex w-full flex-col gap-4">
//       <div className="flex items-center justify-between">
//         <span className="text-texto2/60 font-medium">Preço {type}</span>
//         <span className="text-texto2/60 text-sm">
//           R$ {price[0]} - R$ {price[1]}
//         </span>
//       </div>

//       <Slider
//         value={price}
//         onValueChange={updatePrice}
//         min={min}
//         max={max}
//         step={50}
//         className="[&_[role=slider]]:border-cor1 [&_[role=slider]]:bg-cor1 [&_[data-slot='slider-range']]:bg-cor1"
//       />

//       <div className="grid grid-cols-2 gap-3">
//         <div>
//           <label className="text-texto2/60 mb-1 block text-xs">
//             Mínimo - {type}
//           </label>

//           <div className="relative">
//             <span className="text-texto2/60 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
//               R$
//             </span>

//             <input
//               type="number"
//               value={price[0]}
//               onChange={handleMinChange}
//               min={min}
//               className="text-texto2/80 placeholder:text-texto2/50 bg-card focus-within:ring-cor1 w-full rounded-lg border p-1 pr-5 pl-10 transition-all duration-300 outline-none focus-within:ring-1"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="text-texto2/60 mb-1 block text-xs">
//             Máximo - {type}
//           </label>

//           <div className="relative">
//             <span className="text-texto2/60 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
//               R$
//             </span>

//             <input
//               type="number"
//               value={price[1]}
//               onChange={handleMaxChange}
//               min={price[0]}
//               max={max}
//               className="text-texto2/80 placeholder:text-texto2/50 bg-card focus-within:ring-cor1 w-full rounded-lg border p-1 pr-5 pl-10 transition-all duration-300 outline-none focus-within:ring-1"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
