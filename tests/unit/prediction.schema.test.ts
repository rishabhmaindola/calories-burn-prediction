
import { predictionSchema } from "../../src/schemas/schema";
import { validPredictionInput } from "../fixtures/prediction.fixture";
import { describe, expect, it } from "@jest/globals";


describe("predictionSchema", () => {
    it("should validate valid input", () => {
        const result = predictionSchema.safeParse(
            validPredictionInput
        );

        expect(result.success).toBe(true);
    });

    it("should reject invalid age", () => {
        const result = predictionSchema.safeParse({
            ...validPredictionInput,
            age: -1,
        });

        expect(result.success).toBe(false);
    });

    it("should reject invalid activity", () => {
        const result = predictionSchema.safeParse({
            ...validPredictionInput,
            activityType: "Cricket",
        });

        expect(result.success).toBe(false);
    });
});