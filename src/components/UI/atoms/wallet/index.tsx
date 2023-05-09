import Image from 'next/image';
import { FiChevronDown } from "react-icons/fi" 

export default function UserWallet () {
    return (
        <div className="border-[1px] border-light flex gap-2 py-2 px-2 items-center rounded-[8px]">
            <Image src="/assets/images/avatar.svg" alt="Avatar" width={25} height={25} />
            <label className='text-white text-[16px] font-semibold'>0x31...cOb8</label>
            <FiChevronDown color='white' />
        </div>
    )
}