function createTile()
{
	//initiate a tile object for the array of tiles
	var tile = 
		{live:false,
		status:false,
		tagged:false,
		position:'',
		minesAdjacent:0,
		check:false};
	return tile;
}

/*function calculateRows(numTiles)
{
	//calculate the number of rows given the number of tiles
	//this function should be rewritten to handle any number of tiles
	var rows;
	switch (numTiles)
	{
		case 300:
			rows = 15;
			break;
		case 100:
			rows = 10;
			break;
		case 49:
			rows = 7;
			break;
		case 25:
			rows = 5;
			break;
		case 16:
			rows = 4;
			break;
	}
	return rows;
}

function calculateMines(numTiles)
{
	//calculate the number of mines given the number of tiles
	//this function should be rewritten to handle any number of tiles
	var mines;
	switch (numTiles)
	{
		case 300:
			mines = 40;
			break;
		case 100:
			mines = 20;
			break;
		case 49:
			mines = 10;
			break;
		case 25:
			mines = 5;
			break;
		case 16:
			mines = 3;
			break;
	}
	return mines;
}*/

function calculatePosition(index)
{
	//the position needs to be found so that the number of mines adjacent to the tile can be calculated.
	var position = " ";
	if(index==1){ //Index one, so the tile is in the top left position
		position = "top-left";}
	for(k=2;k<cols;k++)
	{
		if(index==k){ //the index is less than the number of columns, so the tile is in the top row
			position = "top";}
	}
	if(index==cols){ //the index is equal to the number of columns, so the tile is in the top right position
		position = "top-right";}
	for(k=1+cols;k<cols*(rows-1)+2;k=k+cols)
	{
		if(index==k){ //the index is equal to a multiple of the number of columns plus one, so the tile is in the left most row
			position= "left";}
	}
	for(k=cols*2;k<cols*rows;k=k+cols)
	{
		if(index==k){ //the index is equal to a multiple of the number of columns, so the tile is in the right most row
			position = "right";}
	}
	if(index==cols*(rows-1)+1){ //the index is in the bottom-left position
		position = "bottom-left";}
	for(k=cols*(rows-1)+2;k<cols*rows;k++)
	{
		if(index==k){ //the index is to the right of the bottom left tile, so the tile is in the bottom row.
			position = "bottom";}
	}
	if(index==cols*rows){ //the index is equal to the number or rows times the number of columns, so the tile is in the bottom right position
		position = "bottom-right";}
	if(position==" "){ //the position is none of the above, so it must be somewhere in the center.
		position = "center";}
	return position;
}

function randomNumbers(numTiles, numMines)
{
	//generate an array of unique random numbers with length equal to the number of mines needed.
	var list = new Array();
	var ok = true;
	var randNum;
	for(i=0; i<numMines; i++)
	{
		ok = true;
		randNum = Math.floor((Math.random() * numTiles) + 1); //generate a random number between 1 and the number of tiles
		//loop through the list array comparing randNum to the values already generated.
		for(h=0; h<list.length; h++)
		{
			if(randNum == list[h]) //this number is already in the list.
			{
				ok = false;
			}
		}
		if(ok)
		{
			list.push(randNum); //add this number to the list
		}
		else
		{
			i--; //add another loop to for loop to try again.
		}
	}
	return list;
}

function adjacent(current)
{
	var aList = new Array();
	switch (tileArray[current].position) {
		case "top-left":
			aList.push(right(current));
			aList.push(below(current));
			aList.push(belowRight(current));
			break;
		case "top-right":
			aList.push(left(current));
			aList.push(below(current));
			aList.push(belowLeft(current));
			break;
		case "bottom-left":
			aList.push(right(current));
			aList.push(above(current));
			aList.push(aboveRight(current));
			break;
		case "bottom-right":
			aList.push(left(current));
			aList.push(above(current));
			aList.push(aboveLeft(current));
			break;
		case "top":
			aList.push(right(current));
			aList.push(left(current));
			aList.push(belowLeft(current));
			aList.push(below(current));
			aList.push(belowRight(current));
			break;
		case "bottom":
			aList.push(aboveLeft(current));
			aList.push(above(current));
			aList.push(aboveRight(current));
			aList.push(right(current));
			aList.push(left(current));
			break;
		case "left":
			aList.push(above(current));
			aList.push(aboveRight(current));
			aList.push(right(current));
			aList.push(below(current));
			aList.push(belowRight(current));
			break;
		case "right":
			aList.push(aboveLeft(current));
			aList.push(above(current));
			aList.push(left(current));
			aList.push(belowLeft(current));
			aList.push(below(current));
			break;
		case "center":
			aList.push(aboveLeft(current));
			aList.push(above(current));
			aList.push(aboveRight(current));
			aList.push(right(current));
			aList.push(left(current));
			aList.push(belowLeft(current));
			aList.push(below(current));
			aList.push(belowRight(current));
			break;
	}
	return aList;
}

function aboveLeft(current)
{
	return current-cols-1;
}

function above(current)
{
	return current-cols;
}

function aboveRight(current)
{
	return current-cols+1;
}

function left(current)
{
	return current-1;
}

function right(current)
{
	return current+1;
}

function belowLeft(current)
{
	return current+cols-1;
}

function below(current)
{
	return current+cols;
}

function belowRight(current)
{
	return current+cols+1;
}


function calculateNumber(current)
{
	var number = 0;
	var tiles = adjacent(current);
	for(g=0; g<tiles.length; g++)
	{
		var index = tiles[g];
		if(tileArray[index].live == true)
		{
			number++;
		}
	}
	return number;
}

//function buildGrid(tileArray, rows, cols, minesLeft)
function buildGrid()
{
	//build the html code to print out the grid
	var n=1;
	var output = "";
	output = output.concat('<table id = "tileGrid">');
	for(i=1; i<=rows; i++)
	{
		output = output.concat('<tr>');
		for(j=1; j<=cols; j++)
		{
			if(tileArray[n].status == false)
			{
				//if tile status is false, tile is hidden.
				if(tileArray[n].tagged == false)
				{
					//the tile has not been tagged
					if(gameOver) {
						//disable mousedown events
						output = output.concat('<td class="buried" ></td>'); }
					else {
						output = output.concat('<td class="buried" onmousedown="mouseDown1(event,' + n + ');"></td>'); }
				}
				else
				{
					//the tile has been tagged
					if(gameOver) {
						//disable mousedown events
						output = output.concat('<td class="tagged" ></td>'); }
					else {
						output = output.concat('<td class="tagged" onmousedown="mouseDown2(event,' + n + ');"></td>'); }
				}
				/*if(tileArray[n].tagged == false)
				{
					//the tile has not been tagged
					output = output.concat('<td class="buried" onmousedown="mouseDown1(event,' + n + ');"></td>');
				}
				else
				{
					//the tile has been tagged
					output = output.concat('<td class="tagged" onmousedown="mouseDown2(event,' + n + ');"></td>'); 
				}*/
			}
			else if(tileArray[n].live == false)
			{
				//if the tile status is true, and the tile is not live, the tile is not a mine.
				if(tileArray[n].minesAdjacent == 0)
				{
					//0 will not be displayed
					output = output.concat('<td class="blank"></td>');
				}
				else
				{
					//display the number of mines the tile is touching
					output = output.concat('<td class="blank">');
					output = output.concat(tileArray[n].minesAdjacent);
					output = output.concat('</td>');
				}
			}
			else
			{
				//if the tile status is true, and the tile is live, the tile is a mine.
				output = output.concat('<td class="mine"></td>');
			}
			n++;
		}
		output = output.concat('</tr>');
	}
	//create final row of data and end the table
	output = output.concat('<tr><td class="info" colspan="');
	output = output.concat(cols);
	output = output.concat('">Mines Left:');
	output = output.concat(minesLeft);
	output = output.concat('</td></tr>');
	output = output.concat('</table>');
	return output;
}

function mouseDown1(e, tile) {
  e = e || window.event;
  switch (e.which) {
    case 1: //left click
		//start timer
		if(gameOn == false) {
			startTimer();}
		tileArray[tile].status = true; //uncover the tile
		if(tileArray[tile].live == true) { //the tile is live, you lose
			endGame(false);
		}		
		else if(tileArray[tile].minesAdjacent == 0) {
			blankTileClick(tile);
		}
		break;
    case 3: //right click
		tileArray[tile].tagged = true; //tag the tile
		minesLeft--;
		break; 
  }
  //count how many uncovered tiles you have, if it is equal to the number of non-mined spaces, you win.
  var k = 0;
  for(i=1; i<tileArray.length; i++)
  {
	if(tileArray[i].status == true && tileArray[i].live == false) {
		k++; } 
  }
  if(k == (numTiles - numMines)) { //you win
	endGame(true); }
  document.getElementById("grid").innerHTML = buildGrid();
}

function mouseDown2(e, tile) {
  e = e || window.event;
  switch (e.which) {
    case 1: //left click
		//do nothing
		break;
    case 3: //right click
		tileArray[tile].tagged = false; //untag the tile
		minesLeft++;
		break; 
  }
  document.getElementById("grid").innerHTML = buildGrid();
}

function blankTileClick(c)
{
	var tiles = adjacent(c);
	tileArray[c].check = true;
	tileArray[c].status = true;
	for(var i=0; i<tiles.length; i++)
	{
		tileArray[tiles[i]].status = true;
		if(tileArray[tiles[i]].minesAdjacent == 0 && tileArray[tiles[i]].check == false)
		{
			blankTileClick(tiles[i]);
		}
	}
}

/*function blankTileClick(current)
{
	var tiles = new Array();
	var list = new Array();
	list.push(current);
	var n = 0;
	while (n < 5000 && list.length > 0)
	{
		tiles = adjacent(list.shift());
		for(i=0; i<tiles.length; i++)
		{
			tileArray[tiles[i]].status = true;
			if(tileArray[tiles[i]].minesAdjacent == 0 && tileArray[tiles[i]].check == false)
			{
				list.push(tiles[i]);
			}
			tileArray[tiles[i]].check = true;
		}
		n++;
	}
}*/

function endGame(gameWon)
{
	gameOver = true;
	stopTimer();
	minesLeft = 0;
	if(gameWon)
	{
		document.getElementById("finalMessage").innerHTML = "Congrats you won!";
		for(i=1; i<tileArray.length; i++)
		{	
			if(tileArray[i].tagged == false && tileArray[i].live == true)
			{
				tileArray[i].tagged = true;
			}
		}
	}
	else
	{
		document.getElementById("finalMessage").innerHTML = "Sorry, you lost";
		for(i=1; i<tileArray.length; i++)
		{	
			if(tileArray[i].live == true && tileArray[i].tagged == false)
			{
				tileArray[i].status = true;
			}
		}
	}
}

function newGame()
{
	//document.getElementById("debug").innerHTML = "new game";
	//stopTimer();
	gameOn = false;
	timer = 0;
	gameOver = false;
	document.getElementById("finalMessage").innerHTML = "";
	buildGame();
}

function options()
{
	var dialog = "";
	dialog = '<form><table><tr><td></td><td></td><td>Rows</td><td>Columns</td><td>Mines</td></tr>' +
		'<tr><td><input type="radio" name="vers" value="beg" onclick="if(this.checked){resetGrid(9, 9, 10);}"></td>' +
			'<td>Beginner</td><td>9</td><td>9</td><td>10</td></tr>' +
		'<tr><td><input type="radio" name="vers" value="int" onclick="if(this.checked){resetGrid(16, 16, 40);}"></td>' +
			'<td>Intermediate</td><td>16</td><td>16</td><td>40</td></tr>' +
		'<tr><td><input type="radio" name="vers" value="exp" onclick="if(this.checked){resetGrid(16, 30, 99);}"></td>' +
			'<td>Expert</td><td>16</td><td>30</td><td>99</td></tr>' +
		'</table></form>'; //<tr><td colspan="5"><input type="submit" value="Submit"></td></tr>
	document.getElementById("options").innerHTML = dialog;
}

function resetGrid(r, c, m)
{
	rows = r;
	cols = c;
	numMines = m;
	document.getElementById("options").innerHTML = "";
	newGame();
}

function startTimer()
{
	t = setInterval(function () {timeCounter()}, 1000);
	gameOn = true; //boolean to indicate that a timer is started
	//document.getElementById("debug").innerHTML = "start timer:" + t;
}

function timeCounter()
{
	timer++;
}

function stopTimer()
{
	//document.getElementById("debug").innerHTML = "stop timer: " + t + " " + timer;
	//if(!gameOn) {//if no timer has been started, don't try to stop one.
	clearInterval(t); 
	//}
}