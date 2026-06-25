import numpy as np
import onnxruntime as ort

# 1. Initialize the local ONNX inference engine session
session = ort.InferenceSession("calorie_model.onnx")

# 2. Replicate your exact LabelEncoder & Map configurations
gender_map = {'F': 0, 'M': 1}
intensity_map = {'Low': 1, 'Moderate': 2, 'High': 3}
activity_map = {'Dancing': 0, 'HIIT': 1, 'Running': 2, 'Walking': 3} 

# 3. Define the raw input parameters you want to predict
duration = 30
intensity = 'Medium'  
hr = 150
weight = 70
age = 25
gender = 'M'
fitness = 5.85
activity = 'HIIT'

# 4. Safely map text values to their matching numeric values
gender_encoded = gender_map.get(gender, 1)
intensity_encoded = intensity_map.get(intensity, 2)  
activity_encoded = activity_map.get(activity, 1)

# 5. Arrange data in the exact order of your 8 features array:
input_features = np.array([
    [
        float(duration),
        float(intensity_encoded),
        float(hr),
        float(weight),
        float(age),
        float(gender_encoded),
        float(fitness),
        float(activity_encoded)
    ]
], dtype=np.float32)

# 6. Extract input and output layer tracking names from the ONNX graph metadata
input_name = session.get_inputs()[0].name     
output_name = session.get_outputs()[0].name   

# 7. Run the actual model evaluation
outputs = session.run([output_name], {input_name: input_features})

# 8. Extract the true float scalar value out of the numpy tensor
predicted_calories = outputs[0].item()

print("--- 🔮 Python ONNX Inference Results ---")
print(f"Inputs sent to Tensor: {input_features.tolist()}")
print(f"Estimated Burn Result: {predicted_calories:.2f} kcal")
