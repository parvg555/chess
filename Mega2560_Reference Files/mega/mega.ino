#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>

#define OLED_ADDR   0x3C

Adafruit_SSD1306 display(-1);

#if (SSD1306_LCDHEIGHT != 32)
#error("Height incorrect, please fix Adafruit_SSD1306.h!");
#endif



void setup() {
  Serial.begin(115200);
  Serial3.begin(115200);
  display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR);
}


String current_status = "offline";

void loop() {
  String new_string = Serial3.readString();
  Serial.print(new_string);
  if(new_string !="" && new_string != current_status){
      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(WHITE);
      display.setCursor(0,0);
      display.print(new_string);
      display.display();
      current_status = new_string;
  }
  delay(500);
}
