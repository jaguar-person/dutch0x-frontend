import React from 'react';

export default function Badge(){
    return (
        <div className="p-2 flex cursor-pointer items-center gap-2 rounded-[4px] bg-switch-light hover:scale-105 transition duration-300 ease-in-out">
            <div className="cursor-pointer w-3 h-3 rounded-full bg-switch-default" />
            <label className="cursor-pointer text-[12px] text-switch-default">STATUS</label>
        </div>
    )
}
