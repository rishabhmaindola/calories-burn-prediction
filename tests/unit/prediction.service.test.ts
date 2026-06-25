import {
    beforeAll,
    describe,
    expect,
    it,
} from "@jest/globals";

import {
    initializePredictionService,
    predict,
} from "../../src/services/prediction.service";

import { validPredictionInput } from "../fixtures/prediction.fixture";

describe("PredictionService", () => {
    beforeAll(async () => {
        await initializePredictionService(
            "ml/calorie_model.onnx"
        );
    });

    it("should return a numeric prediction", async () => {
        const result = await predict(
            validPredictionInput
        );

        expect(typeof result).toBe("number");
        expect(Number.isFinite(result)).toBe(true);
    });

    it("should return positive calories", async () => {
        const result = await predict(
            validPredictionInput
        );

        expect(result).toBeGreaterThan(0);
    });
});