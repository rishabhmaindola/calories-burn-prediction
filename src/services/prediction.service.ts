
import * as ort from "onnxruntime-node";
import { PredictionInput } from "../schema.js";
import { ACTIVITY_MAP, GENDER_MAP, INTENSITY_MAP } from "../model.js";

let session: ort.InferenceSession | null = null;

export async function initializePredictionService(
    modelPath: string
): Promise<void> {
    if (!session) {
        session = await ort.InferenceSession.create(modelPath);
    }
}

export async function predict(
    input: PredictionInput
): Promise<number> {
    if (!session) {
        throw new Error("Model not initialized");
    }

    const features = new Float32Array([
        input.durationMinutes,
        INTENSITY_MAP[input.intensity],
        input.avgHeartRate,
        input.weightKg,
        input.age,
        GENDER_MAP[input.gender],
        input.fitnessLevel,
        ACTIVITY_MAP[input.activityType],
    ]);

    const tensor = new ort.Tensor(
        "float32",
        features,
        [1, 8]
    );

    const inputName = session.inputNames[0];
    const outputName = session.outputNames[0];

    const result = await session.run({
        [inputName]: tensor,
    });

    return Number(result[outputName].data[0]);
}