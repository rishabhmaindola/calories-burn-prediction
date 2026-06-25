import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error
import pickle

df = pd.read_csv("./health_fitness_dataset.csv")
df['calories_burned'] = df['calories_burned'] * 100

initial_count = len(df)
df = df.dropna(subset=['calories_burned', 'duration_minutes', 'intensity', 'avg_heart_rate', 'weight_kg'])
print(f"Dropped {initial_count - len(df)} rows containing missing values.")

intensity_map = {'Low': 1, 'Moderate': 2, 'High': 3}
df['intensity'] = df['intensity'].map(intensity_map)

df = df.dropna(subset=['intensity'])

le_gender = LabelEncoder()
df['gender'] = le_gender.fit_transform(df['gender'])

le_activity = LabelEncoder()
df['activity_type'] = le_activity.fit_transform(df['activity_type'])

features = [
    'duration_minutes', 'intensity', 'avg_heart_rate', 
    'weight_kg', 'age', 'gender', 'fitness_level', 'activity_type'
]

X = df[features]
y = df['calories_burned']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=5)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"Model Score (R²): {model.score(X_test, y_test):.4f}")
print(f"Mean Absolute Error (MAE): {mean_absolute_error(y_test, y_pred):.2f} calories")

model_data = {
    "model": model,
    "le_gender": le_gender,
    "le_activity": le_activity,
    "intensity_map": intensity_map,
    "features": features
}

with open("calorie_model.pkl", "wb") as f:
    pickle.dump(model_data, f)

print("\n✅ Model and encoders saved to 'calorie_model.pkl'")
