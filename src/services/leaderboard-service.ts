import { SalesRecord } from "../middleware/validate";
export interface LeaderboardEntry {
    rank?: number;
    name: string;
    totalAmount: number;
    totalSales: number;
}

const generateLeaderboard = (salesData: SalesRecord[]): LeaderboardEntry[] => {
    const leaderboardMap = new Map<string, { totalAmount: number; totalSales: number }>();
    salesData.forEach(record => {
        const existing = leaderboardMap.get(record.name) || { totalAmount: 0, totalSales: 0 };
        leaderboardMap.set(record.name, {
            totalAmount: existing.totalAmount + record.amount,
            totalSales: existing.totalSales + record.saleCount
        });
    });

    const leaderboardEntries: LeaderboardEntry[] = [];
    leaderboardMap.forEach((value, key) => {
        leaderboardEntries.push({
            name: key,
            totalAmount: value.totalAmount,
            totalSales: value.totalSales
        });
    });

    leaderboardEntries
        .sort((a, b) => {
            if (b.totalAmount !== a.totalAmount) {
                return b.totalAmount - a.totalAmount;
            }
            //in case of a tie in totalAmount, sort by totalSales
            if (b.totalSales !== a.totalSales) {
                return b.totalSales - a.totalSales;
            }
            return a.name.localeCompare(b.name);
        });

    leaderboardEntries.forEach((entry, index) => {
        entry.rank = index + 1;
    });

    return leaderboardEntries;
};

export { generateLeaderboard };