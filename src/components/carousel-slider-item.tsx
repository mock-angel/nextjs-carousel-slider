import { StarFavIcon } from "@/svgs/star-fav"
import { ThreeDots } from "@/svgs/three-dots"

export const CarouselSliderItem = () => {
    return <>
        <div className="border flex-1 p-4 rounded-xl">
            <div className="h-[160px] bg-[#ffecec]  rounded-xl" />
            <div className="my-2">
                Title in two lines just in case it's too long and we don't have space
            </div>

            <div className="my-2 text-sm text-[#7b7b7b]">Document type</div>

            <div className="my-2 text-sm">Mth 00, 0000</div>
            <div className="flex items-center mt-5">
                <div className="flex-1 flex items-center gap-1">
                    <StarFavIcon style={{ width: "16px", height: "16px" }} />
                    <>4.3/5</>
                </div>
                <ThreeDots style={{ width: "16px", height: "16px" }} />
            </div>
        </div>
    </>
}