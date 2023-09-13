"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SlideProps {
  value?: number;
  handleChange?: (value: number) => void;
}

const Slider = ({ value = 0.5, handleChange }: SlideProps) => {
  const onValueChange = (newValue: number[]) => {
    handleChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="
        relative 
        flex 
        items-center 
        select-none 
        touch-none 
        w-full 
        h-10
      "
      //  defaultValue={[0.5]}
      value={[value]}
      onValueChange={onValueChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track
        className="
          bg-BGCOLOR-HIGHLIGHT 
          relative 
          grow 
          rounded-full 
          h-[3px]
        "
      >
        <RadixSlider.Range
          className="
            absolute 
            bg-white 
            rounded-full 
            h-full
          "
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
