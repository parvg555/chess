#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
     
const char* ssid = "GNXS-2.4G-0C0220";
const char* password = "par@gup1234";
const char* host = "chessthapar.000webhostapp.com";


void setup(){
    Serial.begin(115200);
    delay(100);
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.print(ssid);

    WiFi.begin(ssid,password);

    while(WiFi.status()!=WL_CONNECTED){
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");  
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.print("Netmask: ");
    Serial.println(WiFi.subnetMask());
    Serial.print("Gateway: ");
    Serial.println(WiFi.gatewayIP());
}


void loop(){
    Serial.print("Connecting to server ");
    Serial.print(host);

    WiFiClient client;

    const int httpPort = 80;

    if(!client.connect(host,httpPort)){
        Serial.println("connection to server failed.. \nretrying..");
        return;
    }

    int led_id = 2;
    String status = "on";

    String url = "/led.php?id=" + String(led_id) + "&status=" + status;

    client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");

    delay(500);

    while(client.available()){
        String line = client.readStringUntil('\r');
        Serial.print(line);
    }

    Serial.println();
    Serial.println("closing connection");
    delay(3000);
}