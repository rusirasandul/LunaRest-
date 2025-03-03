from flask import Flask, request, jsonify
import pandas as pd
import SleepScore

app = Flask(__name__)


# Endpoint to process sleep score
@app.route('/predict-sleep-score', methods=['POST'])
def process_sleep_score():
    try:
        data = request.get_json()  # Expecting JSON input
        df = pd.DataFrame(data)  # Convert JSON to DataFrame

        # Example: Fill missing values with the median of numeric columns
        df.fillna(df.median(numeric_only=True), inplace=True)

        return jsonify({"message": "Processing complete", "processed_data": df.to_dict()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)
