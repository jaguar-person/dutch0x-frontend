import { Tab } from "@/types/frontend/ui"
import TabItem from "./Tab";

export default function Tabs () {
    const tabs: Tab[] = [
    {
        label: "Dashboard",
        isActive: true,
    } ,
    {
        label: "Create",
        isActive: false
    },
    {
        label: "Marketplace",
        isActive: false,
        status: 'Coming soon'
    },
    {
        label: "Roadmap",
        isActive: false
    }
    ];


    return (
        <div className="flex gap-6 mt-4">
           {tabs.map(({label, isActive, status}, index: number) => (
            <TabItem key={index} label={label} isActive={isActive} status={status} />
           ))}
        </div>
    )
}