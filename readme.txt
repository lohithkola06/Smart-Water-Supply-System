Smart Water Supply System - README
Introduction
The Smart Water Supply System is an IoT-based solution for monitoring water levels, detecting leaks, and remotely controlling the water valve. It uses MQTT for real-time communication and a REST API for management.
System Requirements
Software Requirements:
* Node.js (Latest LTS Version)
* Mosquitto MQTT Broker
* Arduino IDE (for device simulation)
* Postman or cURL (for API testing)
Hardware Requirements (if using real devices):
* Arduino board (ESP32 recommended)
* Water level and flow sensors
* Solenoid valve (for controlling water supply)
Project Setup
Step 1: Install Dependencies
1. Install Node.js & Required Packages
npm install express mqtt body-parser cors dotenv


2. Install Mosquitto MQTT Broker
MacOS:
brew install mosquitto
brew services start mosquitto


Linux (Ubuntu/Debian):
sudo apt update
sudo apt install mosquitto mosquitto-clients
sudo systemctl start mosquitto


Windows:
* Download and install Mosquitto from Mosquitto Official Website.
* Run Mosquitto from the command prompt.
Step 2: Start the MQTT Broker
mosquitto -v


Verify that the broker is running.
Step 3: Run the Node.js Server
node server.js


You should see:
Server running on port 3000
Connected to MQTT Broker


Step 4: Test the API
Get Water Level Data:
curl http://localhost:3000/water-level


Response:
{ "level": "75%", "flow": "2.3L/min", "status": "Normal" }


Control Water Valve:
curl -X POST http://localhost:3000/control-valve -H "Content-Type: application/json" -d '{"action": "open"}'


Response:
{ "message": "Water valve open" }


Step 5: Setup Arduino (Optional for Device Simulation)
1. Install Arduino IDE
2. Install PubSubClient Library for MQTT
3. Upload the provided Arduino script to simulate sensor data
Troubleshooting
* If the MQTT broker doesn’t connect, check if Mosquitto is running.
* Use mosquitto_sub -h localhost -t "water/sensor" to verify MQTT messages.
* Ensure that Node.js and dependencies are installed correctly.
Future Enhancements
* Add a web dashboard for real-time monitoring.
* Implement authentication for API security.
* Integrate real sensors for live data collection.
Contributors
* Project Owner: [Lohith Kola]
* Developers: [Lohith Kola, Durga Nebhrajani, Rushil Grover, Joshua Koilpillai]
* Instructor: [Suresh Purini]