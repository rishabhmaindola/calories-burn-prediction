export const GENDERS = [
    "F",
    "M",
    "Other",
] as const;

export const ACTIVITIES = [
    "Basketball",
    "Cycling",
    "Dancing",
    "HIIT",
    "Running",
    "Swimming",
    "Tennis",
    "Walking",
    "Weight Training",
    "Yoga",
] as const;

export const INTENSITIES = [
    "Low",
    "Medium",
    "High",
] as const;


export type Gender = (typeof GENDERS)[number];
export type Activity = (typeof ACTIVITIES)[number];
export type Intensity = (typeof INTENSITIES)[number];;
