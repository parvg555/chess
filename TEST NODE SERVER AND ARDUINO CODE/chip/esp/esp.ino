#include <ESP8266WiFi.h>
#include<WiFiClient.h>
#include <ArduinoJson.h>     

const char* ssid = "GNXS-2.4G-0C0220";
const char* password = "par@gup1234";
const char* host = "192.168.1.12";
String ConnectionString = "parvg555";
int httpPort = 8001;
WiFiClient client;
const String url = "/ping/" + ConnectionString;
const String PingString = "GET "+url+" HTTP/1.1\r\n"+"Host:"+host+"\r\n"+"Connection: close\r\n\r\n";

void setup(){
    Serial.begin(115200);
    delay(250);
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.print(ssid);
    Serial.print("\n");
    WiFi.begin(ssid,password);

    while(WiFi.status()!=WL_CONNECTED){
        delay(250);
        Serial.print(".");
    }
    Serial.print("\n");
}


bool SetComplete(){
    WiFiClient client;
    if(client.connect(host,httpPort)){
        String url = "/setComplete/" + ConnectionString;
        client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
        unsigned long timeout = millis();
        while(client.available() == 0){
          if(millis() - timeout > 500){
            Serial.println("OFFLINE");
            client.stop();
            return false;
          }
        }
        return true;
    }
    return false;  
}

void loop() {
  // put your main code here, to run repeatedly:
  if(client.connect(host,httpPort)){
      client.print(PingString);
      unsigned long timeout = millis();
      while(client.available() == 0){
        if(millis() - timeout > 500){
          Serial.println("OFFLINE");
          client.stop();
          return;
        }
      }
      int temp = 1;
      while(client.available()){
          String line = client.readStringUntil('\r');
          if(temp == 1){
              if (line=="\n") temp=2;       
          }else if(temp==2){
              line.trim();
              if(line[0]!='n'){
                  Serial.println(line);
                  delay(5000);
                  while(!SetComplete());
              }
          }else{
            break;
          }
      }
  }else{
      Serial.println("OFFLINE");
  }
}
