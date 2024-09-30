import { z } from "zod";

export const modalSchema = z.object({
    productId: z.string().uuid(),
    name: z.string().min(1, "Product name is required"),
    price: z.number().min(0.01, "Price must be at least 0.01"),
    stockQuantity: z.number().min(0, "Stock quantity must be a positive number"),
    rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating can't exceed 5"),
});

export type ModalSchemaType = z.infer<typeof modalSchema>;