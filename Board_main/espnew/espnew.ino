#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>     

const char* ssid = "GNXS-2.4G-0C0220";
const char* password = "par@gup1234";
const char* host = "chessthapar.000webhostapp.com";
int Board_ID = 1;
int httpPort = 80;

void setup(){
    Serial.begin(115200);
    delay(100);

    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.print(ssid);
    Serial.print("\n");
    WiFi.begin(ssid,password);

    while(WiFi.status()!=WL_CONNECTED){
        delay(250);
    }
}


int CheckConnection(){
    WiFiClient client;
    if(!client.connect(host,httpPort)) return 0;
        String url = "/online.php?ID=" + String(Board_ID);
        client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
        delay(500);
        String section="header";
        while(client.available()){
            String line = client.readStringUntil('\r');
            //Serial.println(line);
            if (section=="header") { 
                if (line=="\n") section="json1";
            }else if(section=="json1"){
                if(line=="\n") section="json";
            }else if (section=="json") {
                section="ignore";
                String result = line.substring(1);
                int size = result.length() + 1;
                char input[size];
                result.toCharArray(input, size);
                DynamicJsonDocument doc(1024);
                DeserializationError error = deserializeJson(doc, input);
                if (error) {
                    Serial.print(F("deserializeJson() failed with code "));
                    Serial.println(error.c_str());
                    return 0;
                }
                int board_status = doc["Status"];
                if(board_status == 1){
                    return 1;
                }else{
                    return 0;
                }
            }
        }
        return 0;
        yield();
}


int setprocessing(){
    WiFiClient client;
    if(!client.connect(host,httpPort)) return 0;
        String url = "/setprocessing.php?ID=" + String(Board_ID);
        client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
        delay(500);
        String section="header";
        while(client.available()){
            String line = client.readStringUntil('\r');
            //Serial.println(line);
            if (section=="header") { 
                if (line=="\n") section="json1";
            }else if(section=="json1"){
                if(line=="\n") section="json";
            }else if (section=="json") {
                section="ignore";
                String result = line.substring(1);
                int size = result.length() + 1;
                char input[size];
                result.toCharArray(input, size);
                DynamicJsonDocument doc(1024);
                DeserializationError error = deserializeJson(doc, input);
                if (error) {
                    Serial.print(F("deserializeJson() failed with code "));
                    Serial.println(error.c_str());
                    return 0;
                }
                int board_status = doc["Status"];
                if(board_status == 1){
                    return 1;
                }else{
                    return 0;
                }
            }
        }
        return 0;
        yield();
}

int setcomplete(){
    WiFiClient client;
    if(!client.connect(host,httpPort)) return 0;
        String url = "/completemove.php?ID=" + String(Board_ID);
        client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
        delay(500);
        String section="header";
        while(client.available()){
            String line = client.readStringUntil('\r');
            //Serial.println(line);
            if (section=="header") { 
                if (line=="\n") section="json1";
            }else if(section=="json1"){
                if(line=="\n") section="json";
            }else if (section=="json") {
                section="ignore";
                String result = line.substring(1);
                int size = result.length() + 1;
                char input[size];
                result.toCharArray(input, size);
                DynamicJsonDocument doc(1024);
                DeserializationError error = deserializeJson(doc, input);
                if (error) {
                    Serial.print(F("deserializeJson() failed with code "));
                    Serial.println(error.c_str());
                    return 0;
                }
                int board_status = doc["Status"];
                if(board_status == 1){
                    return 1;
                }else{
                    return 0;
                }
            }
        }
        return 0;
        yield();
}

void printgamestatustrue(){
  Serial.println("Game_Status: 1");
}
void loop(){
    bool online  = 0;
    if(CheckConnection() == 1){
        Serial.println(String("Status: Online"));
        online = 1;
    }else{
        Serial.println(String("Status: Offline")); 
        online = 0;
    }

    if(online){
        /////////////////////////////////////////////
        WiFiClient client;
        if(!client.connect(host,httpPort)) {
            Serial.println(String("Status: Offline")); 
            online = 0;
        }else{
            String url = "/board.php?ID=" + String(Board_ID);
            client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
            delay(500);
            String section="header";
            while(client.available()){
                String line = client.readStringUntil('\r');
                //Serial.println(line);
                if (section=="header") { 
                    if (line=="\n") section="json1";
                }else if(section=="json1"){
                    if(line=="\n") section="json";
                }else if (section=="json") {
                    section="ignore";
                    String result = line.substring(1);
                    int size = result.length() + 1;
                    char input[size];
                    result.toCharArray(input, size);
                    DynamicJsonDocument doc(1024);
                    DeserializationError error = deserializeJson(doc, input);
                    if (error) {
                        Serial.println("Error 503");
                    }
                    int success_status = doc["Success"];
                    String Game_Status = doc["Game_Status"];
                    String Move_Status = doc["Move_Status"];
                    String Move = doc["Move"];
                    String Board_Status = doc["Board_Status"];
                    if(success_status == 1){
                        if(Game_Status == "1"){
                            printgamestatustrue();
                            
                            if(Move == NULL || Move == "null"){
                                delay(2000);
                                Serial.println(String("Move_Status: " + Move_Status));
                            }else{
                                for(;setprocessing() != 1;);
                                Serial.println(String("Move: " + Move));
                                for(;;){
                                    String temp = Serial.readString();
                                    if(temp != "") break;
                                }
                                for(;setcomplete() != 1;);
                            }
                        }else{
                          Serial.println("Game_Status: 0");
                        }

                    }else{
                        Serial.println("Error BoardID");
                    }
                }
            }
        }
        /////////////////////////////////////////////
    }
    delay(70);
}
