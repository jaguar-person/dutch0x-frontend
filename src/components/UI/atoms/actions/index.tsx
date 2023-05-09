import { Action } from "@/types/frontend/ui"
import ActionItem from "./Action"

export default function EventActions (){
    const actions: Action[] = [
        {
            name: "Running"
        },
        {
            name: "Interrupted"
        },
        {
            name: "Completed"
        }
    ]
    return (
        <div className="flex gap-4 items-center">
           {
            actions.map(({name}, index: number) => (
                <ActionItem name={name} key={index} />
            ))
           }
        </div>
    )
}