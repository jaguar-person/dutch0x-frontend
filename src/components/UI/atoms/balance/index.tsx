import React from 'react';
import Image from "next/image";

export default function Balance () {
    return (
        <div className="flex gap-2 p-2 items-center hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
            <Image src="/assets/icons/amount-icon.svg" alt="Balance" width={15} height={15} className='cursor-pointer' />
            <label className="cursor-pointer text-white text-sm" style={{fontWeight: 'lighter'}}>$14.04</label>
        </div>
    )
}
