import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score


data = pd.read_csv("student_sleep_patterns.csv")


data["Avg_Sleep_Duration"] = (data["Weekday_Sleep_End"] - data["Weekday_Sleep_Start"] +
                              data["Weekend_Sleep_End"] - data["Weekend_Sleep_Start"]) / 2
data["Sleep_Start_Difference"] = abs(data["Weekday_Sleep_Start"] - data["Weekend_Sleep_Start"])
data["Screen_Study_Ratio"] = data["Screen_Time"] / (data["Study_Hours"] + 1e-5)  # Avoid division by zero


X = data.drop(columns=["Student_ID", "Sleep_Quality", "Weekday_Sleep_Start",
                       "Weekend_Sleep_Start", "Weekday_Sleep_End", "Weekend_Sleep_End"])
y = data["Sleep_Quality"]


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


numerical_columns = X.select_dtypes(include=["int64", "float64"]).columns.tolist()
categorical_columns = X.select_dtypes(include=["object"]).columns.tolist()


preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numerical_columns),
        ("cat", OneHotEncoder(), categorical_columns)
    ]
)


print("Training Linear Regression Model...")
lr_pipeline = Pipeline(steps=[("preprocessor", preprocessor), ("regressor", LinearRegression())])
lr_pipeline.fit(X_train, y_train)


y_pred_lr = lr_pipeline.predict(X_test)
print("\nLinear Regression Results:")
print("MSE:", mean_squared_error(y_test, y_pred_lr))
print("MAE:", mean_absolute_error(y_test, y_pred_lr))
print("R2 Score:", r2_score(y_test, y_pred_lr))


print("\nTraining Random Forest Model...")
rf_pipeline = Pipeline(steps=[("preprocessor", preprocessor), ("regressor", RandomForestRegressor(random_state=42))])
rf_pipeline.fit(X_train, y_train)


y_pred_rf = rf_pipeline.predict(X_test)
print("\nRandom Forest Results:")
print("MSE:", mean_squared_error(y_test, y_pred_rf))
print("MAE:", mean_absolute_error(y_test, y_pred_rf))
print("R2 Score:", r2_score(y_test, y_pred_rf))


from sklearn.model_selection import GridSearchCV

print("\nPerforming Hyperparameter Tuning for Random Forest...")
param_grid = {
    "regressor__n_estimators": [50, 100, 200],
    "regressor__max_depth": [10, 20, None],
    "regressor__min_samples_split": [2, 5, 10]
}

grid_search = GridSearchCV(rf_pipeline, param_grid, cv=3, scoring="r2", n_jobs=-1)
grid_search.fit(X_train, y_train)


print("\nBest Parameters for Random Forest:", grid_search.best_params_)
best_model = grid_search.best_estimator_


y_pred_best = best_model.predict(X_test)
print("\nBest Random Forest Model Results:")
print("MSE:", mean_squared_error(y_test, y_pred_best))
print("MAE:", mean_absolute_error(y_test, y_pred_best))
print("R2 Score:", r2_score(y_test, y_pred_best))
