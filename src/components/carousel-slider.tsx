import { CarouselItem } from "@/components/carousel-slider-item";
import { RefObject, useEffect, useRef, useState } from "react";

import { LeftArrowIcon } from "@/svgs/left-arrow"; // From here: https://github.com/mock-angel/nextjs-carousel-slider/blob/main/src/svgs/left-arrow.tsx
import { RightArrowIcon } from "@/svgs/right-arrow"; // From here: https://github.com/mock-angel/nextjs-carousel-slider/blob/main/src/svgs/right-arrow.tsx

export default function CarouselSlider() {
    const [sliderWidth, setSliderWidth] = useState(0);

    const ref: RefObject<HTMLDivElement | null> = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        const refCurrent = ref.current;
        const observer = new ResizeObserver(entries => {
            setSliderWidth(entries[0].contentRect.width)
        })
        observer.observe(refCurrent!)
        return () => {
            if (refCurrent) {
                observer.unobserve(refCurrent);
            }
        }
    }, [])

    const noOfItems = 10;
    const itemsToShow = 4;
    const gapWidth = 16;

    const gaps = itemsToShow - 1; // for 4 items we have 3 gaps
    const carouselItemWidth = (sliderWidth - (gaps * gapWidth)) / itemsToShow;

    const [itemAt, setItemAt] = useState(0);
    const onScroll = (direction: "left" | "right" | "none") => {
        let scrollMultiplier = 0;
        if (direction == "left") scrollMultiplier = -1;
        if (direction == "right") scrollMultiplier = 1;

        if (itemAt + scrollMultiplier < 0 || itemAt + scrollMultiplier > itemAt + noOfItems) return;
        else {
            setItemAt(value => (value + scrollMultiplier));
        }
        const _itemAt = itemAt + scrollMultiplier;
        const scrollAmount = (carouselItemWidth + gapWidth);
        ref.current?.scrollTo({ left: scrollAmount * _itemAt });
    }

    return (
        <div className="relative">

            {/* Carousel Flex container*/}
            <div className="flex flex-row overflow-hidden scroll-smooth "
                style={{ gap: `${gapWidth}px` }}
                ref={ref}
            >
                {/* Carousel List Items */}
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
                <CarouselItem style={{ width: carouselItemWidth }} />
            </div>

            {/* Left Button */}
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

            {/* Right Button */}
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
    );
}
