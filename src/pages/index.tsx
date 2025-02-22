import { Geist, Geist_Mono } from "next/font/google";
import CarouselSlider from "@/components/carousel-slider";
import { useState } from "react";
import { Card, Slider, TextField, ThemeProvider, Typography } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function CarouselPage() {
  const [itemsToShow, setItemsToShow] = useState(4);
  const [gapWidth, setGapWidth] = useState(16);
  const [itemsCount, setItemsCount] = useState(10);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:px-5 font-[family-name:var(--font-geist-sans)]`}
    >


      {/* CarouselSlider  */}
      <CarouselSlider itemsCount={itemsCount} itemsToShow={itemsToShow} gapWidth={gapWidth} />

      {/* Slider Controls */}
      <div className="flex flex-col gap-4 items-end py-10">
        <Card className="p-4 gap-4 flex flex-col items-center">
          <Typography className="flex-none" variant="h6">Carousel Slider Controls</Typography>
          <div className="flex gap-4 items-center w-[400px]"  >
            <Typography className="flex-none" >itemsToShow</Typography>
            <Slider size="small" value={itemsToShow} onChange={(e, value) => setItemsToShow(Number(value)!)} min={1} max={6} />
            <Typography className="flex-none">{itemsToShow} items</Typography>
          </div>
          <div className="flex gap-4 items-center w-[400px]">
            <Typography className="flex-none " >{"gapWidth (px)"}</Typography>
            <Slider size="small" value={gapWidth} onChange={(e, value) => setGapWidth(Number(value)!)} min={1} max={50} />
            <Typography className="flex-none">{gapWidth} px</Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}
