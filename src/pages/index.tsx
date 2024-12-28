import { Geist, Geist_Mono } from "next/font/google";
import { CarouselSliderItem } from "@/components/carousel-slider-item";
import { Ref, RefObject, useEffect, useRef, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [sliderWidth, setSliderWidth] = useState(0);

  const ref: RefObject<HTMLDivElement | null> = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const _carouselSliderWidth = ref?.current?.getBoundingClientRect().width!;
    console.log("Width of slider is: ", _carouselSliderWidth);
    setSliderWidth(_carouselSliderWidth);
  }, [ref])


  const itemsToShow = 4;
  const gapWidth = 16;

  const gaps = itemsToShow - 1;
  const carouselSliderItemWidth = (sliderWidth - (gaps * gapWidth)) / itemsToShow;
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="flex flex-row gap-4 overflow-y-auto"
        style={{ gap: `${gapWidth}px` }}
        ref={ref}
      >
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
        <div><CarouselSliderItem style={{ width: carouselSliderItemWidth }} /></div>
      </div>
    </div>
  );
}
