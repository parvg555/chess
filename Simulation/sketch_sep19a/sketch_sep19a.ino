int stepPin1 = 2; int dirPin1 = 5;
int stepPin2 = 3; int dirPin2 = 6;
int enable = 8;

///////////////////////////////////////////////////////////////////////////////////////

int motorx = 1;                 // This is the motor number for x-axis movement
int motory = 2;                 // This is the motor number for y-axis movement

int directionx_multiplier = 1;  //set this -1 for counter rotation
int directiony_multiplier = 1;	// set this -1 for counter rotation 

//////////////////////////////////////////////////////////////////////////////////////

void setup() {
	pinMode(stepPin1,OUTPUT); 
	pinMode(dirPin1,OUTPUT);
  	pinMode(stepPin2,OUTPUT); 
  	pinMode(dirPin2,OUTPUT);
  	pinMode(enable,OUTPUT);
  	digitalWrite(enable,LOW);
}

// This function rotates motor - motor steps steps in dxn direction
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

void RotateBothMotors(int motor1, int motor2, int steps, int dir1, int dir2){
	int direction_pin1, direction_pin2;
	int stepper_pin1, stepper_pin2;
	
	if(motor1 == 1){
		direction_pin1 = dirPin1;
		stepper_pin1 = stepPin1;
		direction_pin2 = dirPin2;
		stepper_pin2 = stepPin2; 
	}else{
		direction_pin1 = dirPin2;
		stepper_pin1 = stepPin2;
		direction_pin2 = dirPin1;
		stepper_pin2 = stepPin1;
	}

	if(dir1 == 1){
		digitalWrite(direction_pin1,HIGH);
	}else{
		digitalWrite(direction_pin1,low);
	}
	if(dir2 == 1){
		digitalWrite(direction_pin2,HIGH);
	}else{
		digitalWrite(direction_pin2,LOW);
	}
	for(int i=0;i<steps;i++){
		digitalWrite(stepper_pin1,HIGH);
		digitalWrite(stepper_pin2,HIGH);
		delayMicroseconds(10);
		digitalWrite(stepper_pin1,LOW);
		digitalWrite(stepper_pin2,LOW);
		delayMicroseconds(1290);
	}
	delay(1000);
}

// New rotate function to make motors move together 

// this function is to move foward/up
void u(){

}
 
// this function is to move backward/down
void d(){

}

// this function is to move in right direction
void r(){

}

// this function is to move in left direction
void l(){

}

// this function is to move in upper right direction
void ur(){

}

// this function is to move in down right direction
void dr(){

}

// this function is to move in down left direction
void dl(){

}

// this function is to move in upper left direction
void ul(){

}

void loop(){
    rotate(1,200,1); // motor - 1  steps - 200 direction - clockwise
    rotate(2,200,1);
    rotate(1,200,2);
    rotate(2,200,2);
}
