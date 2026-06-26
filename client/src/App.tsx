import { useState } from "react";
import { ACTIVITIES, GENDERS, INTENSITIES, type PredictionInput } from "./schemas";

const initialForm: PredictionInput = {
  age: 25,
  gender: "M",
  heightCm: 175,
  weightKg: 70,
  activityType: "Running",
  durationMinutes: 45,
  intensity: "Medium",
  avgHeartRate: 145,
  // restingHeartRate: 65,
  fitnessLevel: 0.7,
};

export default function CalorieForm() {
  const [form, setForm] = useState<PredictionInput>(initialForm);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  const updateField = <K extends keyof PredictionInput>(
    key: K,
    value: PredictionInput[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.status === 429) {
        const error = await res.json().catch(() => null);

        throw new Error(
          error?.message ??
          "Too many requests. Please wait a minute before trying again."
        );
      }

      if (!res.ok) {
        const error = await res.json().catch(() => null);

        throw new Error(error?.message ?? "Prediction failed.");
      }

      const data = await res.json();

      setPrediction(data.caloriesBurned);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      alert(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 space-y-8 bg-linear-to-br from-card/50 to-background rounded-2xl border border-border shadow-xl"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="p-2 rounded-full flex items-center bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-2xl">bolt</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground">
            Calories Prediction
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your details to get an accurate calorie burn estimate
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Input
          label="Age"
          type="number"
          value={form.age}
          icon="calendar_today"
          onChange={(v) => updateField("age", Number(v))}
        />

        <Select
          label="Gender"
          value={form.gender}
          options={GENDERS}
          icon="person"
          onChange={(v) => updateField("gender", v as PredictionInput["gender"])}
        />

        <Input
          label="Height"
          type="number"
          value={form.heightCm}
          icon="straighten"
          unit="cm"
          onChange={(v) => updateField("heightCm", Number(v))}
        />

        <Input
          label="Weight"
          type="number"
          value={form.weightKg}
          icon="monitor_weight"
          unit="kg"
          onChange={(v) => updateField("weightKg", Number(v))}
        />

        <Select
          label="Activity"
          value={form.activityType}
          options={ACTIVITIES}
          icon="directions_run"
          onChange={(v) =>
            updateField("activityType", v as PredictionInput["activityType"])
          }
        />

        <Input
          label="Duration"
          type="number"
          value={form.durationMinutes}
          icon="timer"
          unit="min"
          onChange={(v) => updateField("durationMinutes", Number(v))}
        />

        <Select
          label="Intensity"
          value={form.intensity}
          options={INTENSITIES}
          icon="signal_cellular_alt"
          onChange={(v) =>
            updateField("intensity", v as PredictionInput["intensity"])
          }
        />

        <Input
          label="Heart Rate"
          type="number"
          value={form.avgHeartRate}
          icon="favorite"
          unit="BPM"
          onChange={(v) => updateField("avgHeartRate", Number(v))}
        />

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="material-symbols-outlined text-lg text-primary">trending_up</span>
              Fitness Level
            </label>
            <span className="text-sm font-mono font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {Math.round(form.fitnessLevel * 100)}%
            </span>
          </div>

          <div className="relative">
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={form.fitnessLevel}
              onChange={(e) =>
                updateField("fitnessLevel", Number(e.target.value))
              }
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground"
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-muted-foreground font-mono">Beginner</span>
              <span className="text-xs text-muted-foreground font-mono">Intermediate</span>
              <span className="text-xs text-muted-foreground font-mono">Advanced</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="relative w-full rounded-xl bg-primary px-4 py-3.5 text-primary-foreground font-semibold font-heading text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
      >
        {loading ? (
          <>
            <span className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground"></span>
            Calculating...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">calculate</span>
            Predict Calories
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </>
        )}
      </button>

      {prediction !== null && (
        <div className="rounded-xl border-2 border-primary/20 bg-linear-to-br from-primary/5 to-secondary/5 p-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">whatshot</span>
                Predicted Calories Burned
              </h3>
              <p className="text-5xl font-extrabold font-heading text-foreground mt-1.5">
                {Math.round(prediction)}{" "}
                <span className="text-2xl font-medium text-muted-foreground">kcal</span>
              </p>
            </div>

          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="material-symbols-outlined text-base">info</span>
            Based on your age, weight, and activity level
          </div>
        </div>
      )}
    </form>
  );
}

type InputProps = {
  label: string;
  type: string;
  value: number;
  icon?: string;
  unit?: string;
  onChange: (value: string) => void;
};

function Input({
  label,
  type,
  value,
  icon,
  unit,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 mb-1.5 text-sm font-medium text-foreground">
        {icon ? (
          <span className="material-symbols-outlined text-base text-muted-foreground">
            {icon}
          </span>
        ) : (
          label
        )}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
          placeholder={label}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

type SelectProps = {
  label: string;
  value: string;
  options: readonly string[];
  icon?: string;
  onChange: (value: string) => void;
};

function Select({
  label,
  value,
  options,
  icon,
  onChange,
}: SelectProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 mb-1.5 text-sm font-medium text-foreground">
        {icon ? (
          <span className="material-symbols-outlined text-base text-muted-foreground">
            {icon}
          </span>
        ) : (
          label
        )}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.75rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "2.5rem",
        }}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}