import { ActivityType, Gender, Intensity } from "./types.js";

  
  export const GENDER_MAP: Record<Gender, number> = {
    F: 0,
    M: 1,
    Other: 2,
  };
  
  export const INTENSITY_MAP: Record<
    Intensity,
    number
  > = {
    Low: 1,
    Medium: 2,
    High: 3,
  };
  
  export const ACTIVITY_MAP: Record<
    ActivityType,
    number
  > = {
    Basketball: 0,
    Cycling: 1,
    Dancing: 2,
    HIIT: 3,
    Running: 4,
    Swimming: 5,
    Tennis: 6,
    Walking: 7,
    "Weight Training": 8,
    Yoga: 9,
  };