import ai.onnxruntime.*;

import java.nio.FloatBuffer;
import java.util.Collections;
import java.util.Map;

public class SleepPredictor {
    public static void main(String[] args) throws OrtException {
        try (OrtEnvironment env = OrtEnvironment.getEnvironment();
             OrtSession session = env.createSession("sleep_model.onnx")) {

            float[] inputData = {7.0f, 2.0f, 3.5f, 2.0f, 1.0f, 23.0f, 1.0f, 7.0f, 8.0f};
            FloatBuffer inputBuffer = FloatBuffer.wrap(inputData);

            OnnxTensor inputTensor = OnnxTensor.createTensor(env, inputBuffer, new long[]{1, inputData.length});
            Map<String, OnnxTensor> inputs = Collections.singletonMap("float_input", inputTensor);

            OrtSession.Result result = session.run(inputs);
            float[] output = (float[]) result.get(0).getValue();
            System.out.println("Predicted Sleep Score: " + output[0]);
        }
    }
}
