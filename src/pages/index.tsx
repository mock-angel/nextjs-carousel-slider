import { Geist, Geist_Mono } from "next/font/google";
import { CarouselSliderItem } from "@/components/carousel-slider-item";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { LeftArrowIcon } from "@/svgs/left-arrow";
import { RightArrowIcon } from "@/svgs/right-arrow";

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


  const noOfItems = 10;
  const itemsToShow = 4;
  const gapWidth = 16;

  const gaps = itemsToShow - 1;
  const carouselSliderItemWidth = (sliderWidth - (gaps * gapWidth)) / itemsToShow;

  const [itemAt, setItemAt] = useState(0);
  const onScroll = (direction: "left" | "right") => {
    let scrollMultiplier = 0;
    if (direction == "left") scrollMultiplier = -1;
    if (direction == "right") scrollMultiplier = 1;

    if (itemAt + scrollMultiplier < 0 || itemAt + scrollMultiplier > itemAt + noOfItems) return;
    else {
      setItemAt(value => (value + scrollMultiplier));
    }
    let _itemAt = itemAt + scrollMultiplier;
    const scrollAmount = (carouselSliderItemWidth + gapWidth);
    ref.current?.scrollTo({ left: scrollAmount * _itemAt });
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="relative ">
        <div className="flex flex-row gap-4  scroll-smooth overflow-y-hidden"
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
        <div className="absolute left-0 top-0 h-[100%] flex items-center px-3 bg-gradient-to-l from-transparent to-white"
          style={{
            display: (itemAt <= 0) ? "none" : "flex"
          }}
        >
          <div className="w-[25px] h-[25px]  flex items-center border rounded justify-items-center bg-[white] place-items-center cursor-pointer"
            onClick={() => onScroll("left")}
          >
            <LeftArrowIcon style={{ width: "20px", height: "12px", flex: 1 }} />
          </div>
        </div>


        <div className="absolute right-0 top-0 h-[100%] flex items-center px-3 bg-gradient-to-r from-transparent to-white"
          style={{
            display: (itemAt >= noOfItems - itemsToShow) ? "none" : "flex"
          }}
        >
          <div className="w-[25px] h-[25px]  flex items-center border rounded justify-items-center bg-[white] place-items-center cursor-pointer"
            onClick={() => onScroll("right")}
          >
            <RightArrowIcon style={{ width: "20px", height: "12px", flex: 1 }} />
          </div>
        </div>

      </div>
      {/* <div className="fixed"><RightArrowIcon style={{ width: "20px", height: "20px" }} /></div> */}
    </div>
  );
}
