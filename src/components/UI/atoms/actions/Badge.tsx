import { Action } from "@/types/frontend/ui";
import Image from "next/image";

interface Props {
    name: string;
    status: Action
}
export default function ActionBadge({ name, status }: Props) {
    const iconName = status.name === "Completed" ? "completed-icon" :
                     status.name === "Running" ? "running-icon" : "danger-icon"
    return (
        <div className={`${status.name === "Interrupted" ? "bg-danger-default" :
            (status.name === "Completed") ? "bg-success-default" : "bg-info-default"
            } py-[5px] px-2`}
            style={{
                borderRadius: '0px 8px 8px 0px',
            }}>
            <div className="ml-2 flex gap-2 items-center">
                <Image src={`/assets/icons/${iconName}.svg`} alt="Action" width={15} height={15} />
                <label className="text-white font-light text-[12px]">{name}</label>
            </div>
        </div>
    )
}