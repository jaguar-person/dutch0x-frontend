import Image from "next/image";

interface Props {
    history?: {
        minting: string;
        success: number;
        failed: number
    },
    amount: {
        eth: string;
        usd: string
    }
}
export default function ActionHistory({ history, amount }: Props) {
    return (
        <div className="flex gap-6 items-center">
            {history &&
                <div className="flex px-4">
                    <div className="border-[0.5px] border-light px-6 py-1 flex items-center"
                        style={{
                            borderRadius: '8px 0px 0px 8px'
                        }}
                    >
                        <label className="text-white text-[0.7rem] font-semibold">{history.minting} <span className="font-light text-text-inactive">Minting</span></label>
                    </div>
                    <div className="border-y-[0.5px] border-y-light px-6 py-1 items-center">
                        <label className="text-white text-[0.7rem] font-semibold">{history.success} <span className="font-light text-text-inactive">Success</span></label>
                    </div>
                    <div className="border-[0.5px] border-light px-6 py-1 items-center relative"
                        style={{
                            borderRadius: '0px 8px 8px 0px'
                        }}
                    >
                        <label className="text-white text-[0.7rem] font-semibold">{history.failed} <span className="font-light text-text-inactive">Failed</span></label>
                        <div className="absolute -top-1 -right-1">
                            <Image src="/assets/icons/failed-icon.svg" width={18} height={18} alt="Failed" />
                        </div>
                    </div>
                </div>
            }
            {!history &&
                <div className="ml-4 px-4 border-[0.5px] border-light rounded-[8px] py-2 flex gap-2 items-center">
                    <Image src="/assets/logos/eth-logo.svg" width={15} height={15} alt="Eth" />
                    <label className="text-white font-light text-sm">{amount.eth} Eth</label>
                </div>
            }
            {history &&
                <div>
                    <div className="flex gap-2 items-center">
                        <Image src="/assets/icons/opacity-amount-icon.svg" alt="Timer" width={18} height={18} />
                        <label className="text-text-inactive font-light text-[14px]">{amount.eth} ETH   {amount.usd} USD</label>
                    </div>
                </div>
            }
        </div>

    )
}
