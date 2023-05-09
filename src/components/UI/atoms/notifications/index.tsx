import React from 'react';
import Image from "next/image";

export default function Notifications() {
    return (
        <div className="hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
            <Image src="/assets/icons/notifications-icon.svg" alt="Notifications" width={20} height={20} />
        </div>
    )
}
