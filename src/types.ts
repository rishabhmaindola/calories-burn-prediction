export const GENDERS = [
    "F",
    "M",
    "Other",
] as const;

export type Gender = typeof GENDERS[number];

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

export type ActivityType = typeof ACTIVITIES[number];

export const INTENSITIES = [
    "Low",
    "Medium",
    "High",
] as const;

export type Intensity = typeof INTENSITIES[number];