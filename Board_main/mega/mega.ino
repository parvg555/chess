#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include <Wire.h>

#define OLED_ADDR   0x3C

Adafruit_SSD1306 display(-1);

#if (SSD1306_LCDHEIGHT != 32)
#error("Height incorrect, please fix Adafruit_SSD1306.h!");
#endif

String Current_Status = "";
String Last_Move = "";
String Game_Status = "";

void DisplayManager(String Line1 = Current_Status, String Line2 = Last_Move, String Line3 = Game_Status){
    if(Line1 != Current_Status || Line2 != Last_Move || Line3 != Game_Status){
		display.clearDisplay();
      	display.setTextSize(1);             // Normal 1:1 pixel scale
      	display.setTextColor(SSD1306_WHITE);        // Draw white text
      	display.setCursor(0,0);             // Start at top-left corner
      	if(Line1[Line1.length()-1] == '\n') Line1[Line1.length()-1] = 0;
      	display.println(Line1);
	
      	display.setTextColor(SSD1306_BLACK, SSD1306_WHITE); // Draw 'inverse' text
      	if(Line1[Line2.length()-1] == '\n') Line2[Line2.length()-1] = 0;
      	display.println(Line2);
	
      	display.setTextSize(2);             // Draw 2X-scale text
      	display.setTextColor(SSD1306_WHITE);
      	if(Line1[Line3.length()-1] == '\n') Line3[Line3.length()-1] = 0;
      	display.println(Line3); 
    	display.display();
    	Current_Status = Line1;
    	Last_Move = Line2;
    	Game_Status = Line3;
    }
}



void setup() {
  	Serial.begin(115200);
  	Serial3.begin(115200);
  	display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR);
  	DisplayManager("Connecting to Wi-Fi","Waiting for Game","to Start");
}





void loop() {
  	String Input = Serial3.readString();
	if(Input.substring(0,6) == "Status"){
		DisplayManager(Input.substring(8));
	}
 	delay(500);
}
