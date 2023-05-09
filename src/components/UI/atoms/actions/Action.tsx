import { Action } from "@/types/frontend/ui";

export default function ActionItem ({name}: Action){
    return (
        <div className="flex gap-2 items-center">
            <div className={`w-3 h-3 rounded-full
              ${(name === "Running") ? "bg-success-default" : (name === "Interrupted") ? "bg-danger-default" : "bg-info-default"}
            `}  />
            <label className="text-white text-[14px]">{name}</label>
        </div>
    )
}