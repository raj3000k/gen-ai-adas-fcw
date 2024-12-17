// src/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API client with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log("Gemini API Key:", process.env.REACT_APP_GEMINI_API_KEY);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const fetchGeneratedCode = async (requirement) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "hey do you know about Gazebo software for simulation, i got to know that it can run python scripts, I am working on a code which can simulate ADAS features like forward collision warning in cars, in gazebo can you generated a python code for the same, (using YOLO for object detection and triggering alerts when an object within a certain distance provided weight of a suv car and use parameters including speed of car also).\nGive only code no comments, no extra text just the code, ",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "```python\nimport rospy\nimport cv2\nimport numpy as np\nfrom sensor_msgs.msg import Image\nfrom std_msgs.msg import String\nfrom darknet_ros_msgs.msg import BoundingBoxes\n\nclass FCW:\n    def __init__(self):\n        rospy.init_node('fcw_node')\n        rospy.Subscriber('/darknet_ros/bounding_boxes', BoundingBoxes, self.yolo_callback)\n        rospy.Subscriber('/car_speed', Float32, self.speed_callback)\n        self.warning_pub = rospy.Publisher('/fcw_warning', String, queue_size=10)\n        self.car_speed = 0.0\n        self.min_distance_threshold = 5.0\n        self.suv_weight = 2000.0 #kg - example weight\n\n    def speed_callback(self, speed_msg):\n        self.car_speed = speed_msg.data\n\n    def yolo_callback(self, yolo_data):\n        for box in yolo_data.bounding_boxes:\n            if box.Class == 'car':\n                # Assuming image width and height are available from the image topic\n                # Replace with your actual image dimensions\n                img_width = 640\n                img_height = 480\n                center_x = (box.xmin + box.xmax) / 2.0\n                distance = self.estimate_distance(center_x, img_width)\n                if distance <= self.min_distance_threshold:\n                    warning_level = self.calculate_warning_level(distance, self.car_speed, self.suv_weight)\n                    warning_msg = f\"COLLISION WARNING! Distance: {distance:.2f}m, Speed: {self.car_speed:.2f}m/s, Level: {warning_level}\"\n                    self.warning_pub.publish(warning_msg)\n                    break  # only trigger one warning at a time\n\n    def estimate_distance(self, center_x, img_width):\n        # Simple distance estimation (replace with a more accurate method)\n        # Adjust parameters as needed\n        return (img_width / 2 - center_x) * 0.1 + 2.0\n\n    def calculate_warning_level(self, distance, speed, weight):\n        # Example warning level calculation (customize as needed)\n        level = int((1.0 / distance) * speed * weight /1000) # scale the warning based on distance speed and weight \n        return min(level, 3)  # Cap at level 3\n\n\nif __name__ == '__main__':\n    try:\n        fcw = FCW()\n        rospy.spin()\n    except rospy.ROSInterruptException:\n        pass\n\n```\n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(requirement);
  return result.response.text()
  console.log(result.response.text());
};
