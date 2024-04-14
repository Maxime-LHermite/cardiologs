import { z, ZodSchema } from 'zod';

export const ApiErrors = ['UNHANDLED_ERROR', 'FETCH_ERROR'] as const;
export type ApiErrors = (typeof ApiErrors)[number];

export type ApiErrorResponse = {
    statusCode: number;
    error: ApiErrors;
    message?: string;
};

export const apiErrorResponseSchema: ZodSchema<ApiErrorResponse> = z.object({
    statusCode: z.number().min(100).max(599),
    error: z.enum(ApiErrors),
    message: z.string().optional(),
});
