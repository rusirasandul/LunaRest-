# Libraries Import
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Load dataset
df = pd.read_csv("student_sleep_patterns.csv")

# Handle missing values
df.fillna(df.select_dtypes(include=['number']).median(), inplace=True)
#df.fillna(df.median(), inplace=True)

# Select features and target
features = ['Sleep_Duration', 'Study_Hours', 'Screen_Time', 'Caffeine_Intake', 'Physical_Activity',
            'Weekday_Sleep_Start', 'Weekend_Sleep_Start', 'Weekday_Sleep_End', 'Weekend_Sleep_End']
target = 'Sleep_Quality'

X = df[features]
y = df[target]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


# Function to provide feedback based on thresholds
def provide_feedback(data):
    feedback = []
    if data['Caffeine_Intake'] > 3:
        feedback.append("⚠️ High caffeine intake. Try reducing it for better sleep quality.")
    if data['Screen_Time'] > 3:
        feedback.append("📱 High screen time. Reduce screen usage before bedtime.")
    if data['Sleep_Duration'] < 6:
        feedback.append("⏳ Insufficient sleep. Aim for at least 7 hours.")
    if data['Physical_Activity'] < 30:
        feedback.append("🏃 Increase physical activity to improve sleep quality.")
    return feedback if feedback else ["✅ Your sleep habits seem good!"]


# Function to take user input with validation
def get_valid_input(prompt, min_value, max_value):
    while True:
        try:
            value = float(input(f"{prompt} ({min_value}-{max_value}): "))
            if min_value <= value <= max_value:
                return value
            else:
                print(f"❌ Please enter a value between {min_value} and {max_value}.")
        except ValueError:
            print("❌ Invalid input! Please enter a numerical value.")


# Function to predict sleep score and provide feedback
def predict_sleep_score():
    print("\n🔹 Enter your sleep pattern details 🔹")

    input_data = {
        'Sleep_Duration': get_valid_input("Enter Sleep Duration (hours)", 0, 12),
        'Study_Hours': get_valid_input("Enter Study Hours", 0, 12),
        'Screen_Time': get_valid_input("Enter Screen Time (hours)", 0, 10),
        'Caffeine_Intake': get_valid_input("Enter Caffeine Intake (cups per day)", 0, 10),
        'Physical_Activity': get_valid_input("Enter Physical Activity (minutes per day)", 0, 180),
        'Weekday_Sleep_Start': get_valid_input("Enter Weekday Sleep Start (24-hour format)", 0, 23),
        'Weekend_Sleep_Start': get_valid_input("Enter Weekend Sleep Start (24-hour format)", 0, 23),
        'Weekday_Sleep_End': get_valid_input("Enter Weekday Sleep End (24-hour format)", 0, 23),
        'Weekend_Sleep_End': get_valid_input("Enter Weekend Sleep End (24-hour format)", 0, 23),
    }

    input_df = pd.DataFrame([input_data])
    sleep_score = model.predict(input_df)[0]
    feedback = provide_feedback(input_data)

    print("\n📊 ---- Results ---- 📊")
    print(f"🛏️ Predicted Sleep Score: {sleep_score:.2f}")
    print("💡 Feedback:")
    for tip in feedback:
        print(f"   - {tip}")


# Run prediction function
predict_sleep_score()
