import * as z from "zod";
import { ACTIVITIES, GENDERS, INTENSITIES } from "./types.js";

export const predictionSchema = z.object({
  age: z.number().int().min(1).max(120),

  gender: z.enum(GENDERS),

  heightCm: z.number().min(100).max(250),

  weightKg: z.number().min(20).max(300),

  activityType: z.enum(ACTIVITIES),

  durationMinutes: z.number().int().positive(),

  intensity: z.enum(INTENSITIES),

  avgHeartRate: z.number().min(30).max(250),

  fitnessLevel: z.number(),
});

export type PredictionInput =
  z.infer<typeof predictionSchema>;