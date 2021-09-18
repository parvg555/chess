int stepPin1 = 2; int dirPin1 = 5;
int stepPin2 = 3; int dirPin2 = 6;
int enable = 8;

int motorx = 1; // This is the motor number for x-axis movement
int motory = 2; // This is the motor number for y-axis movement

void setup() {
  pinMode(stepPin1,OUTPUT); 
  pinMode(dirPin1,OUTPUT);
  pinMode(stepPin2,OUTPUT); 
  pinMode(dirPin2,OUTPUT);
  pinMode(enable,OUTPUT);
  digitalWrite(enable,LOW);
 }

void rotate(int motor,int steps,int dxn){
  int dirPin,stepPin;
  if(motor==1){
    dirPin=dirPin1;
    stepPin=stepPin1;
  }
  if(motor==2){
    dirPin=dirPin2;
    stepPin=stepPin2;
  }
  if(dxn==1){
    digitalWrite(dirPin,HIGH);
  }
  if(dxn==2){
    digitalWrite(dirPin,LOW);
  } 
  for(int x = 0; x < steps; x++){
    digitalWrite(stepPin,HIGH);
    delayMicroseconds(10);
    digitalWrite(stepPin,LOW);
    delayMicroseconds(1290);
  }
  delay(1000);
}

void up() {

}

void loop() {
    rotate(1,200,1);
    rotate(2,200,1);
    rotate(1,200,2);
    rotate(2,200,2);
}
