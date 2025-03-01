import { CarouselItem } from "@/components/carousel-item";
import { RefObject, useEffect, useRef, useState } from "react";

import { LeftArrowIcon } from "@/svgs/left-arrow"; // From here: https://github.com/mock-angel/nextjs-carousel-slider/blob/main/src/svgs/left-arrow.tsx
import { RightArrowIcon } from "@/svgs/right-arrow"; // From here: https://github.com/mock-angel/nextjs-carousel-slider/blob/main/src/svgs/right-arrow.tsx

interface CarouselProps {
    itemsCount?: number;
    itemsToShow?: number;
    gapWidth?: number;
}

export default function CarouselSlider({
    itemsCount = 10,
    itemsToShow = 4,
    gapWidth = 16,
}: CarouselProps) {

    const [sliderWidth, setSliderWidth] = useState(0);

    const ref: RefObject<HTMLDivElement | null> = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(([entry]) => {
            setSliderWidth(entry.contentRect.width);
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [])


    const gaps = itemsToShow - 1; // for 4 items we have 3 gaps
    const carouselItemWidth = (sliderWidth - (gaps * gapWidth)) / itemsToShow;

    const [scrollIndex, setScrollIndex] = useState(0);
    const onScroll = (direction: "left" | "right") => {
        const scrollMultiplier = direction === "left" ? -1 : 1;
        const newIndex = scrollIndex + scrollMultiplier;

        if (newIndex < 0 || newIndex > itemsCount - itemsToShow) return;

        setScrollIndex(newIndex);
        ref.current?.scrollTo({ left: (carouselItemWidth + gapWidth) * newIndex, behavior: "smooth" });
    };

    return (
        <div className="relative w-full">

            {/* Carousel Flex container*/}
            <div className="flex flex-row overflow-hidden scroll-smooth"
                style={{ gap: `${gapWidth}px` }}
                ref={ref}
            >
                {/* Carousel List Items */}
                {Array.from({ length: itemsCount }).map((_, __) => ( // default 10 items are rendered, pass in your own items instead of specifying item count
                    <CarouselItem style={{ width: carouselItemWidth }} />
                ))}
            </div>

            {/* Left Button */}
            {scrollIndex > 0 && <div className="absolute left-0 top-0 h-[100%] flex items-center px-3 bg-gradient-to-l from-transparent to-white">
                <div className="w-[25px] h-[25px]  flex items-center border rounded justify-items-center bg-[white] place-items-center cursor-pointer"
                    onClick={() => onScroll("left")}
                >
                    <LeftArrowIcon style={{ width: "20px", height: "12px", flex: 1 }} />
                </div>
            </div>}

            {/* Right Button */}
            {(scrollIndex < itemsCount - itemsToShow) && <div className="absolute right-0 top-0 h-[100%] flex items-center px-3 bg-gradient-to-r from-transparent to-white">
                <div className="w-[25px] h-[25px]  flex items-center border rounded justify-items-center bg-[white] place-items-center cursor-pointer"
                    onClick={() => onScroll("right")}
                >
                    <RightArrowIcon style={{ width: "20px", height: "12px", flex: 1 }} />
                </div>
            </div>}

        </div>
    );
}
