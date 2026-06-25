import { z } from "zod";
import { ACTIVITIES, GENDERS, INTENSITIES } from "./types.js";

export const predictionSchema = z.object({
    age: z.number().int().min(1).max(120),
    gender: z.enum(GENDERS),
    heightCm: z.number().positive().min(100).max(250),
    weightKg: z.number().positive().min(20).max(300),
    activityType: z.enum(ACTIVITIES),
    durationMinutes: z.number().int().positive().max(1440),
    intensity: z.enum(INTENSITIES),
    avgHeartRate: z.number().positive().min(30).max(250),
    restingHeartRate: z.number().positive().min(30).max(120),
    fitnessLevel: z.number().min(0).max(1),
});

export type PredictionInput = z.infer<
    typeof predictionSchema
>;