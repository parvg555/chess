const int chess_rows = 8;
const int chess_cols = 8;
const int board_rows = 17;
const int board_columns = 19;


char chess[8][8];

/*
       0   1   2   3   4   5   6   7     (columns)
0    {'r','n','b','q','k','b','n','r'}
1    {'p','p','p','p','p','p','p','p'}
2    {'o','o','o','o','o','o','o','o'}
3    {'o','o','o','o','o','o','o','o'}
4    {'o','o','o','o','o','o','o','o'}
5    {'o','o','o','o','o','o','o','o'}
6    {'P','P','P','P','P','P','P','P'}
7    {'R','N','B','Q','K','B','N','R'}

(rows)
*/


void reset(){
    for(int i=0;i<8;i++){
        for(int j=0;j<8;j++){
            if(i==0){
                if(j==0||j==7){
                    chess[i][j] = 'r';
                }else if(j==1||j==6){
                    chess[i][j] = 'n';
                }else if(j==2||j==5){
                    chess[i][j] = 'b';
                }else if(j==3){
                    chess[i][j] = 'q';
                }else{
                    chess[i][j] = 'k';
                }
            }else if(i==1){
                chess[i][j] = 'p';
            }else if(i==6){
                chess[i][j] = 'P';
            }else if(i==7){
                if(j==0||j==7){
                    chess[i][j] = 'R';
                }else if(j==1||j==6){
                    chess[i][j] = 'N';
                }else if(j==2||j==5){
                    chess[i][j] = 'B';
                }else if(j==3){
                    chess[i][j] = 'Q';
                }else{
                    chess[i][j] = 'K';
                }
            }else{
                chess[i][j] = 'o';
            }
        }
    }
}

void printstatus(){
    for(int i=0;i<8;i++){
        for(int j=0;j<8;j++){
            Serial.print(chess[7-i][j]);
            Serial.print(' ');
        }
        Serial.print('\n');
    }
    Serial.print('\n');
}

int PositionParser(char ch){
    int c = (int)ch;
    if(c>47 && c<58){
        return c-49;
    }
    return c-97;
}


//sample command pb2b4 Pb2b4
void RegisterMove(String command){
    int start_x = PositionParser(command[2]);
    int start_y = PositionParser(command[1]);
    int end_x = PositionParser(command[4]);
    int end_y = PositionParser(command[3]);
    //move(start_x,start_y,end_x,end_y);
    if(chess[start_x][start_y] == command[0]){
      chess[end_x][end_y] = chess[start_x][start_y];
      chess[start_x][start_y] = 'o';
    }
}

void move(int start_x, int start_y,  int end_x, int end_y){

    if(start_x == end_x && start_y == end_y){
        delay(100);
    }
    // if one has to move up (same line)
    else if(start_x != end_x && end_x>start_x && start_y == end_y){}
    // if one has to move down (same line)
    else if(start_x != end_x && end_x<start_x && start_y == end_y){}
    // if one has to move right (same line)
    else if(start_y != end_y && end_y>start_y && start_x == end_x){}
    // if one has to move left (same line)
    else if(start_y != end_y && end_y<start_y && start_x == end_x){}
    // first quadrant 
    else if(start_x < end_x && start_y < end_y){}
    // second quadrant
    else if()
    // third quadrant
    // fourth quadrant


}

void setup(){
    reset();
    Serial.begin(115200); 
}

void loop(){
    printstatus();
    if(Serial.available() > 0){
        RegisterMove(Serial.readString());
    }
    delay(3000);
}
