int stepPin1 = 2; int dirPin1 = 5;
int stepPin2 = 3; int dirPin2 = 6;
int enable = 8; int magnetPin = 52;

const int boardRows = 17;
const int boardColumns = 19;
int blockSteps = 200;

char chess[boardRows][boardColumns];

String srcBlock = "a6",destBlock = "g6";
int count=1;

struct coords{
   int row;
   int col;
}pointer;

void setup() {
  pinMode(stepPin1,OUTPUT); 
  pinMode(dirPin1,OUTPUT);
  pinMode(stepPin2,OUTPUT); 
  pinMode(dirPin2,OUTPUT);
  pinMode(enable,OUTPUT);
  digitalWrite(enable,LOW);
  pinMode(magnetPin,OUTPUT);
  Serial.begin(9600);
  pointer.row=1;  
  pointer.col=0;
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

coords convertToCoords(String s){
  char c1 = s[0],c2=s[1];
  coords obj;
  obj.row = 2*(c2-'0')-1;
  obj.col = 2*((c1-'a')+1);
  return obj;
}

//void callibrateFrontLeft(){
//  rotate(2,50,2);
//}
//
//void callibrateFrontRight(){
//  rotate(1,50,1);
//}
//
//void callibrateBackLeft(){
//  
//}
//
//void callibrateBackRight(){
//  
//}

void moveFront(int steps){
  rotateBothMotors(steps,1,1);
}

void moveBack(int steps){
  rotateBothMotors(steps,2,2);
}

void moveLeft(int steps){
  rotateBothMotors(steps,1,2);
}

void moveRight(int steps){
  rotateBothMotors(steps,2,1);
}

void resetPointer(){
  coords resetCoods;
  resetCoods.row=1;
  resetCoods.col=0;
  moveChessPiece(pointer,resetCoods);
  pointer.row=resetCoods.row;
  pointer.col=resetCoods.col;
}

void movePointer(coords dest){
  moveChessPiece(pointer,dest);
  pointer.row=dest.row;
  pointer.col=dest.col;
}

void moveChessPiece(coords src,coords dest){
  int sr = src.row, sc = src.col;
  int dr = dest.row, dc = dest.col;
  if(dr>sr){
    if(dc>sc){
      moveRight(1*blockSteps);
      moveFront((dr-sr-1)*blockSteps);
//      callibrateFrontRight();
      moveRight((dc-sc-1)*blockSteps);
      moveFront(1*blockSteps);
    }
    else if(dc<sc){
      moveLeft(1*blockSteps);
      moveFront((dr-sr-1)*blockSteps);
//      callibrateFrontLeft();
      moveLeft((sc-dc-1)*blockSteps);
      moveFront(1*blockSteps);
    }
    else{
      moveRight(1*blockSteps);
      moveFront((dr-sr)*blockSteps);
      moveLeft(1*blockSteps);
    }
  }
  else if(dr<sr){
    if(dc>sc){
      moveRight(1*blockSteps);
      moveBack((sr-dr-1)*blockSteps);
//      callibrateBackRight();
      moveRight((dc-sc-1)*blockSteps);
      moveBack(1*blockSteps);
    }
    else if(dc<sc){
      moveLeft(1*blockSteps);
      moveBack((sr-dr-1)*blockSteps);
//      callibrateBackLeft();
      moveLeft((sc-dc-1)*blockSteps);
      moveBack(1*blockSteps);
    }
    else{
      moveRight(1*blockSteps);
      moveBack((sr-dr)*blockSteps);
      moveLeft(1*blockSteps);
    }
  }
  else{
    if(dc>sc){
      moveFront(1*blockSteps);
      moveRight((dc-sc)*blockSteps);
      moveBack(1*blockSteps);
    }
    else{
      moveFront(1*blockSteps);
      moveLeft((sc-dc)*blockSteps);
      moveBack(1*blockSteps);
    }
  }
  
  pointer.row=dr;
  pointer.col=dc;
}

void loop() {
  while(count>0){
//    if(count==4){
//      srcBlock = "a2";
//      destBlock =  "b5";
//    }
//    if(count==3){
//      srcBlock = "d2";
//      destBlock =  "g8";
//    }
//    if(count==2){
//      srcBlock = "c8";
//      destBlock =  "h2";
//    }
//    if(count==1){
//      srcBlock = "g2";
//      destBlock =  "a5";
//    }
    coords src = convertToCoords(srcBlock);
    coords dest = convertToCoords(destBlock);
    Serial.print(pointer.row);
    Serial.print(pointer.col);
    movePointer(src);
    Serial.print(pointer.row);
    Serial.print(pointer.col);
    moveChessPiece(src,dest);
    Serial.print(pointer.row);
    Serial.print(pointer.col);
//    resetPointer();
    Serial.print(pointer.row);
    Serial.print(pointer.col);
    
    count--;
  }
}
