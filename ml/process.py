# scripts/analyze_dataset.py

import pandas as pd

df = pd.read_csv("health_fitness_dataset.csv")

categorical_columns = [
    "gender",
    "activity_type",
    "intensity",
    "health_condition",
    "smoking_status",
]

for column in categorical_columns:
    values = sorted(df[column].dropna().unique())
    print(f"\n=== {column.upper()} ===")
    print(values)
    print(f"Count: {len(values)}")