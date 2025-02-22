// Arduino MQTT Client for Smart Water Supply System

#include <WiFi.h>
#include <PubSubClient.h>

// WiFi Credentials
const char* ssid = "X";
const char* password = "meowmeow";

// MQTT Broker Information
const char* mqttServer = "127.0.0.1";  // Replace with your MQTT broker's IP
const int mqttPort = 1884;
const char* mqttTopic = "water/sensor";
const char* controlTopic = "water/control";

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message received on topic: ");
    Serial.println(topic);
    String message = "";
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    Serial.println("Command: " + message);
    if (message == "open") {
        Serial.println("Water valve OPEN");
        // Code to open the water valve
    } else if (message == "close") {
        Serial.println("Water valve CLOSED");
        // Code to close the water valve
    }
}

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
    
    client.setServer(mqttServer, mqttPort);
    client.setCallback(callback);
    
    while (!client.connected()) {
        Serial.println("Connecting to MQTT Broker...");
        if (client.connect("ArduinoClient")) {
            Serial.println("Connected to MQTT Broker");
            client.subscribe(controlTopic);
        } else {
            Serial.print("Failed with state ");
            Serial.println(client.state());
            delay(2000);
        }
    }
}

void loop() {
    if (!client.connected()) {
        client.connect("ArduinoClient");
    }
    client.loop();
    
    // Simulate sensor readings
    int waterLevel = random(50, 100);
    float flowRate = random(1, 5) + random(0, 10) / 10.0;
    
    char payload[100];
    snprintf(payload, sizeof(payload), "{\"level\": \"%d%%\", \"flow\": \"%.1fL/min\", \"status\": \"Normal\"}", waterLevel, flowRate);
    
    client.publish(mqttTopic, payload);
    Serial.println("Published sensor data: " + String(payload));
    
    delay(5000);
}
