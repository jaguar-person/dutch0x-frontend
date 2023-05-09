import Image from "next/image";

export default function ActionTimer ({createdAt}: {createdAt: string}) {
    return (
        <div className="flex gap-2 items-center">
            <Image src="/assets/icons/timer-icon.svg" alt="Timer" width={15} height={15} />
            <label className="text-text-inactive font-light text-[14px]">{createdAt}</label>
        </div>
    )
} 