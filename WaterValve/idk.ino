#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "weewoo";
const char* password = "woowee11";
const char* mqttServer = "192.168.179.134";  // IP of Computer 1
const int mqttPort = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }

    Serial.println("Connected to WiFi");
    client.setServer(mqttServer, mqttPort);

    if (client.connect("ArduinoClient")) {
        Serial.println("Connected to MQTT Broker");
    }
}

void loop() {
    int waterLevel = random(50, 100);
    char msg[50];
    sprintf(msg, "Water Level: %d%%", waterLevel);
    client.publish("water/sensor", msg);
    Serial.println(msg);
    delay(5000);
}