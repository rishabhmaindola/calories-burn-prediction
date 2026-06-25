import request from "supertest";
import { describe, expect, it } from "@jest/globals";
import app from "../../src/app";
import { validPredictionInput } from "../fixtures/prediction.fixture";

describe("POST /api/predict", () => {
    it("should return status 200 with calories prediction", async () => {
        const response = await request(app)
            .post("/api/predict")
            .send(validPredictionInput);

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(
            typeof response.body.caloriesBurned
        ).toBe("number");

        expect(
            response.body.caloriesBurned
        ).toBeGreaterThan(0);
    });

    it("should reject invalid request", async () => {
        const response = await request(app)
            .post("/api/predict")
            .send({
                age: -10,
            });

        expect(response.status).toBe(400);

        expect(response.body.success).toBe(false);
    });
});