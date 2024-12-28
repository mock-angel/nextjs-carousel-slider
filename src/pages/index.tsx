import { Geist, Geist_Mono } from "next/font/google";
import { CarouselSliderItem } from "@/components/carousel-slider-item";
import { Ref, RefObject, useEffect, useRef } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const ref: RefObject<HTMLDivElement | null> = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const carouselSliderWidth = ref?.current?.getBoundingClientRect().width;
    console.log("Width of slider is: ", carouselSliderWidth);

  }, [ref])



  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="flex flex-row gap-4 overflow-y-auto"
        ref={ref}
      >
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
        <div><CarouselSliderItem /></div>
      </div>
    </div>
  );
}
