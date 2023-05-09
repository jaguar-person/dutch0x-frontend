import React from 'react';
import { Tab } from "@/types/frontend/ui";

export default function TabItem({label, isActive, status}: Tab){
    return (
        <div className="w-[max-content] flex flex-col">
           <label className={`text-${isActive ? 'white' : 'text-inactive'} text-[14px] hover:text-white cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`}
             style={{
                fontWeight: isActive ? 'bold' : 'lighter'
             }}
           >{label}</label>
           {isActive && 
           <div className="w-full  flex justify-around cursor-pointer">
             <div className="w-[5px] h-[5px] rounded-full bg-primary" />
           </div>
            }
           {status && 
            <label className="text-primary text-[12px] cursor-pointer">{status}</label>
           }
        </div>
    )
}
