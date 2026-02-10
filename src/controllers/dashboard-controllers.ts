import { SalesData, SalesRecordSchema } from "../middleware/validate";
import { generateLeaderboard } from "../services/leaderboard-service";
import { prisma } from "../config/db";

const getSalesRecord = async (req: any, res: any) => {
    try{
        const allSales = await prisma.sales.findMany();
        console.log("Fetched sales record:", allSales);
        const leaderboard = generateLeaderboard(allSales);

        const formattedLeaderboard = leaderboard.map(entry => 
            `${entry.rank}. ${entry.name} – Total Sales: ${entry.totalAmount.toLocaleString()} – Total Deals: ${entry.totalSales}`
        );

        return res.status(200).json({ 
            status: "success",
            data: formattedLeaderboard
        });
    }catch (error) {
        console.error("Error fetching sales record:", error);
        return res.status(500).json({ 
            error: "An error occurred while fetching the sales record" 
        });
    }
};

const addSalesRecord = async (req: any, res: any) => {
    try{
        const data = SalesRecordSchema.safeParse(req.body);
        if (!data.success) {
            return res.status(400).json({ 
                error: "Invalid sales data",
                details: data.error 
            });
        }

        const newSale = await prisma.sales.create({
            data: data.data
        });

        return res.status(201).json({
            status: "success",
            data: newSale
        });
    }catch (error) {
        console.error("Error adding sales record:", error);
        return res.status(500).json({ 
            error: "An error occurred while adding the sales record" 
        });
    }
}

export { getSalesRecord, addSalesRecord };