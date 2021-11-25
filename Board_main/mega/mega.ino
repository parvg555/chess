#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>

#define OLED_ADDR   0x3C

Adafruit_SSD1306 display(-1);

#if (SSD1306_LCDHEIGHT != 32)
#error("Height incorrect, please fix Adafruit_SSD1306.h!");
#endif

String Current_Status = "";
String Last_Move = "";
String Game_Status = "";
int Game_S;

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
      	display.println(String(" "+Line2+" "));
	
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
    Game_S = 0;
}

void move(){
	delay(5000);
}

void loop() {

	String Input = Serial3.readString();
	if(Input.substring(0,6) == "Status"){
		DisplayManager(Input.substring(8));
	}else if(Input.substring(0,14) == "Game_Status: 1"){
		Game_S = 1;
	}else if(Input.substring(0,14) == "Game_Status: 0"){
		Game_S = 0;
    DisplayManager(Current_Status,"Waiting for Game","to Start");
	}else if(Game_S == 1 && Input.substring(0,11) == "Move_Status"){
		if(Input.substring(13,20) == "player1"){
			DisplayManager(Current_Status,"Waiting for Player1"," ");
		}else if(Input.substring(13,20) == "player2"){
			DisplayManager(Current_Status,"Waiting for Player2"," ");
		}
	}else if(Game_S == 1 && Input.substring(0,5) == "Move:"){
		DisplayManager(Current_Status,Last_Move,Input.substring(6));
		move();
		if(Last_Move == "Waiting for Player1"){
			DisplayManager(Current_Status,"Waiting for Player2","");
		}else{
			DisplayManager(Current_Status,"Waiting for Player1","");
		}
    for(;;){
      if(Serial3.readString().substring(0,6) == "Status") break;
		  Serial3.write("Move Complete");
    }
	}
	delay(50);
}
