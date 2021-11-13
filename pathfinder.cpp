#include<bits/stdc++.h>
using namespace std;

//////////////////////////////////////////////////////////////////////////////////////

/* 
	THESE ARE THE RULES DEFINING THE NOMENCLATURE OF EACH PIECE 
	
	1.	Unit places of the number defines the color of the piece
		1  -----> White
		2  -----> Black 
	2. Tenth places of the number defines the type of the piece
		1  -----> Pawn
		2  -----> Knight
		3  -----> Bishop
		4  -----> Rook
		5  -----> Queen
		6  -----> King
*/
const int BoardRows = 17;
const int BoardCols = 19;

                            //      0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18   				
int board[BoardRows][BoardCols] = {{0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},     // 0
					 			   {0 ,0 ,41,0 ,21,0 ,31,0 ,61,0 ,51,0 ,31,0 ,21,0 ,41,0 ,0},     // 1
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},     // 2
					               {0 ,0 ,11,0 ,11,0 ,11,0 ,11,0 ,11,0 ,11,0 ,11,0 ,11,0 ,0},	  // 3
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 4
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 5
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 6
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 7
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 8
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 9
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 10
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 11
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 12
					               {0 ,0 ,12,0 ,12,0 ,12,0 ,12,0 ,12,0 ,12,0 ,12,0 ,12,0 ,0},	  // 13
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0},	  // 14
					               {0 ,0 ,42,0 ,22,0 ,32,0 ,52,0 ,62,0 ,32,0 ,22,0 ,42,0 ,0},	  // 15
					               {0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0}};    // 16


//////////////////////////////////////////////////////////////////////////////////////

bool PointValidator(point p){
	if(p.x >=0 && p.x <BoardCols && p.y >=0 && p.x < BoardRows && board[]){
		return true;
	}
	return false;
}


struct point {
	int x;
	int y;
};

vector <int> pathfin(point start, point end){
	vector <int> ans;
	
	point u,ur,r,dr,d,dl,l,ul;
	
	u.y = start.y + 1;
	u.x = start.x;

	ur.y = start.y + 1;
	ur.x = start.x + 1;

	r.y = start.y;
	r.x = start.x + 1;

	dr.y = start.y - 1;
	dr.x = start.x + 1;

	d.y = start.y - 1;
	d.x = start.x;

	dl.y = start.y - 1;
	dl.x = start.x - 1;

	l.y = start.y;
	l.x = start.x - 1;

	ul.y = start.y + 1;
	ul.x = start.x - 1;





	
	return ans;
}


int main(void){

}