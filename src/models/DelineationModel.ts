import { Schema, z } from 'zod';

export type DelineationRequest = {
    startDate?: string;
    file: File;
};

export type AnalyzedDelineation = {
    startDate: string;
    endDate: string;
    duration: number;
    measures: {
        valid: number;
        invalid: number;
        total: number;
        p: number;
        qrs: number;
        t: number;
    };
    meanHeartRate: number;
    highestHeartRate: {
        value: number;
        startDate: string;
        endDate: string;
        tag?: string;
    };
    lowestHeartRate: {
        value: number;
        startDate: string;
        endDate: string;
        tag?: string;
    };
};

export const analyzedDelineationSchema: Schema<AnalyzedDelineation> = z.object({
    startDate: z.string(),
    endDate: z.string(),
    duration: z.number(),
    measures: z.object({
        valid: z.number(),
        invalid: z.number(),
        total: z.number(),
        p: z.number(),
        qrs: z.number(),
        t: z.number(),
    }),
    meanHeartRate: z.number(),
    highestHeartRate: z.object({
        value: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        tag: z.string().optional(),
    }),
    lowestHeartRate: z.object({
        value: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        tag: z.string().optional(),
    }),
});
