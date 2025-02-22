const express = require("express");
const mqtt = require("mqtt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MQTT Broker
const mqttClient = mqtt.connect("mqtt://localhost");

mqttClient.on("connect", () => {
    console.log("Connected to MQTT Broker");
});

// API Endpoint to Get Water Level Data from Arduino via MQTT
app.get("/water-level", (req, res) => {
    mqttClient.subscribe("water/sensor", (err) => {
        if (!err) {
            mqttClient.once("message", (topic, message) => {
                const data = JSON.parse(message.toString());
                res.json({ level: data.level, flow: data.flow, status: data.status });
            });
        } else {
            res.status(500).json({ error: "Failed to subscribe to MQTT topic" });
        }
    });
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
