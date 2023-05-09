import { Action } from "../ui";

export type ActivityType = {
    name: string;
    titles: string[],
    status: Action,
    statusName: 'CREATE' | 'ADD FUNDS';
    amount: {
        eth: string;
        usd: string;
    },
    progress?: number,
    history?: {
        minting: string,
        success: number,
        failed: number
    },
    createdAt: string;
}