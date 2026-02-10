import z from 'zod';

export const SalesRecordSchema = z.object({
    name: z.string().min(1, "Name is required"),
    amount: z.number().positive("Amount must be a positive number"),
    saleCount: z.number().int().nonnegative("Sale count must be a non-negative integer"),
});

export const SalesData = z.array(SalesRecordSchema);
export type SalesRecord = z.infer<typeof SalesRecordSchema>;