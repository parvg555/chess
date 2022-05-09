int stepPin1 = 2; int dirPin1 = 5;
int stepPin2 = 3; int dirPin2 = 6;
int enable = 8;
int magnetPin = 1;

void setup() {
  pinMode(stepPin1,OUTPUT); 
  pinMode(dirPin1,OUTPUT);
  pinMode(stepPin2,OUTPUT); 
  pinMode(dirPin2,OUTPUT);
  pinMode(enable,OUTPUT);
  digitalWrite(enable,LOW);
  pinMode(magnetPin,OUTPUT);
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
    delayMicroseconds(2000);
  }
  delay(1000);
}

void rotateBothMotors(int steps, int dir1, int dir2){
    if(dir1 == 1){
      digitalWrite(dirPin1,HIGH);
    }else{
      digitalWrite(dirPin1,LOW);
    }
    if(dir2 == 1){
      digitalWrite(dirPin2,HIGH);
    }else{
      digitalWrite(dirPin2,LOW);
    }
    for(int i=0;i<steps;i++){
      digitalWrite(stepPin1,HIGH);
      digitalWrite(stepPin2,HIGH);
      delayMicroseconds(10);
      digitalWrite(stepPin1,LOW);
      digitalWrite(stepPin2,LOW);
      delayMicroseconds(2000);
    }
    delay(1000);
}

void loop() {
//    rotateBothMotors(3553,1,2);
//    rotateBothMotors(3008,1,1);
//    rotateBothMotors(3553,2,1);
//    rotateBothMotors(3008,2,2);
    rotateBothMotors(3572,1,2);
    rotateBothMotors(3008,1,1);
    rotateBothMotors(3572,2,1);
    rotateBothMotors(3008,2,2);
    delay(2000);
}
