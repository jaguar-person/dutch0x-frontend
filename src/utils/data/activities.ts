import { ActivityType } from "@/types/frontend/data/activity";

const  ACTIVITIES: ActivityType[]  = [
    {
        name: "Beep",
        titles: [
            "Beep 057",
            "Beep 058",
            "Beep 060"
        ],
        status: {name: "Interrupted"},
        statusName: "CREATE",
        amount: {
            eth: "0",
            usd: "0"
        },
        progress: 0,
        history: {
            minting: "0/7",
            success: 0,
            failed: 1
        },
        createdAt: "2022-09-13 08:57:15 PST"
    },
    {
        name: "Beep",
        titles: [
            "Beep 057",
            "Beep 058",
            "Beep 060"
        ],
        status: {name: "Completed"},
        statusName: "CREATE",
        amount: {
            eth: "0.000033",
            usd: "3.22"
        },
        progress: 40,
        history: {
            minting: "7/7",
            success: 6,
            failed: 1
        },
        createdAt: "2022-09-13 08:57:15 PST"
    },
    {
        name: "Beep",
        titles: [
            "Beep 057",
            "Beep 058",
            "Beep 060"
        ],
        status: {name: "Running"},
        statusName: "CREATE",
        amount: {
            eth: "0.000035",
            usd: "3.05"
        },
        progress: 100,
        history: {
            minting: "7/7",
            success: 6,
            failed: 1
        },
        createdAt: "2022-09-13 08:57:15 PST"
    },
    {
        name: "Using Card",
        titles: [
            "Beep.loopring.eth",
        ],
        status: {name: "Running"},
        statusName: "ADD FUNDS",
        amount: {
            eth: "1.5",
            usd: "3.05"
        },
        createdAt: "2022-09-13 08:57:15 PST"
    }
]

export default ACTIVITIES;