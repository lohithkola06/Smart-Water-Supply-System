// server.js - Express-based REST API for Smart Water Supply System

const express = require("express");
const mqtt = require("mqtt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MQTT Broker
const mqttClient = mqtt.connect("mqtt://127.0.0.1");

mqttClient.on("connect", () => {
    console.log("Connected to MQTT Broker");
    mqttClient.subscribe("water/sensor", (err) => {
        if (err) {
            console.error("Failed to subscribe to MQTT topic", err);
        }
    });
});

mqttClient.on("message", (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
});

// API Endpoint to Get Water Level Data from Arduino via MQTT
app.get("/water-level", (req, res) => {
    mqttClient.once("message", (topic, message) => {
        if (topic === "water/sensor") {
            try {
                const data = JSON.parse(message.toString());
                res.json({ level: data.level, flow: data.flow, status: data.status });
            } catch (error) {
                res.status(500).json({ error: "Invalid JSON received from sensor" });
            }
        } else {
            res.status(500).json({ error: "No data received from sensor" });
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
