const express = require("express");
const mqtt = require("mqtt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MQTT Broker
const mqttClient = mqtt.connect("mqtt://192.168.179.134");

mqttClient.on("connect", () => {
    console.log("Connected to MQTT Broker");
});

// API Endpoint to Get Sensor Data
app.get("/water-level", (req, res) => {
    // Simulated response for now
    res.json({ level: "75%", flow: "2.3L/min", status: "Normal" });
});

// API Endpoint to Control Water Valve
app.post("/control-valve", (req, res) => {
    const { action } = req.body;
    mqttClient.publish("water/control", action);
    res.json({ message: `Water valve ${action}` });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
