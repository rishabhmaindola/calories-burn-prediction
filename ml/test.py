import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("../health_fitness_dataset.csv")

# 1. Clean & Encode Categorical Data
# Intensity: Map to numbers so 'High' is mathematically more than 'Low'
intensity_map = {'Low': 1, 'Moderate': 2, 'High': 3}
df['intensity'] = df['intensity'].map(intensity_map)

# Gender & Activity Type: Use Label Encoding for text
le = LabelEncoder()
df['gender'] = le.fit_transform(df['gender'])
df['activity_type'] = le.fit_transform(df['activity_type'])

# 2. Select the "High Impact" Features
features = [
    'duration_minutes', 'intensity', 'avg_heart_rate', 
    'weight_kg', 'age', 'gender', 'fitness_level', 'activity_type'
]

X = df[features]
y = df['calories_burned']

# 3. Train the Model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=5)
model.fit(X_train, y_train)

print(f"Model Score (R²): {model.score(X_test, y_test):.4f}")
