import { Feature } from "@/types/frontend/ui";
import Image from "next/image";

export default function FeatureItem ({label, iconName, bgColor}: Feature) {
    return (
        <div className="w-full">
            <div className="w-full h-[9rem] rounded-md flex justify-around h-50" style={{backgroundColor: bgColor}}>
                <Image src={`/assets/icons/${iconName}.svg`} alt={label} width={60} height={60} />
            </div>
            <div className="flex justify-around mt-2">
                <label className="text-white font-bold text-[16px]">{label}</label>
            </div>
        </div>
    )
}