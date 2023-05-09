interface Props {
    name: string;
    titles: string[];
}
export default function TransactionLogger({ name, titles }: Props) {
    return (
        <div className="mt-2">
            <label className="text-[16px] font-light text-white">{name}</label>

            {titles.length > 1 &&
                <>
                    <div className="flex gap-4">
                        <div className="flex gap-4 items-center">
                            <div className="flex gap-1 font-bold text-white">
                                <label className="text-[1.5rem]">{titles[0]} <sub className="text-[0.7rem]">( 1 )</sub></label>
                            </div>
                            <div>
                                <label className="text-text-inactive">/</label>
                            </div>

                            <div className="flex gap-1 font-bold text-white">
                                <label className="text-[1.5rem]">{titles[1]} <sub className="text-[0.7rem]">( 1 )</sub></label>
                            </div>
                            <div>
                                <label className="text-text-inactive">/</label>
                            </div>

                            <div className="flex gap-1 font-bold text-white">
                                <label className="text-[1.5rem]">{titles[2]} <sub className="text-[0.7rem]">( 1 )</sub></label>
                            </div>
                            <div>
                                <label className="text-text-inactive">/</label>
                            </div>
                        </div>
                        <div>
                            <label className="text-white font-bold">+4</label>
                        </div>
                    </div>
                </>
            }
            {titles.length === 1 && 
               <div className="flex gap-1 font-bold text-white">
               <label className="text-[1.5rem]">{titles[0]} <span className="text-[0.7rem]">0x35...2234</span></label>
           </div>
            }
        </div>
    )
}