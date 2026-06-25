import path from "path";
import { Request, Response } from "express";
import app from "./app.js";
import { predictionSchema } from "./schema.js";
import { initializePredictionService, predict } from "./services/prediction.service.js";


app.get("/health", (_, res) => {
    res.json({ status: "ok" });
});

app.post(
    "/api/predict",
    async (req: Request, res: Response) => {
        try {
            const result = predictionSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    errors: result.error.flatten().fieldErrors,
                });
            }

            const calories = await predict(result.data);

            return res.status(200).json({
                success: true,
                caloriesBurned: calories,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                error: "Internal Server Error!",
            });
        }
    }
);

const PORT = process.env.PORT || 5000;

async function start() {
    await initializePredictionService(
        path.join(
            process.cwd(),
            "ml",
            "calorie_model.onnx"
        )
    );

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});