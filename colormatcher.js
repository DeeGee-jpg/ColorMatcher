
hexval = new Array( 

		"00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F",
		"10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1A", "1B", "1C", "1D", "1E", "1F",
		"20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B", "2C", "2D", "2E", "2F",
		"30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3A", "3B", "3C", "3D", "3E", "3F",
		"40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4A", "4B", "4C", "4D", "4E", "4F",
		"50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5A", "5B", "5C", "5D", "5E", "5F",
		"60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6A", "6B", "6C", "6D", "6E", "6F",
		"70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7A", "7B", "7C", "7D", "7E", "7F",
		"80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8A", "8B", "8C", "8D", "8E", "8F",
		"90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9A", "9B", "9C", "9D", "9E", "9F",
		"A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AA", "AB", "AC", "AD", "AE", "AF",
		"B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "BA", "BB", "BC", "BD", "BE", "BF",
		"C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "CA", "CB", "CC", "CD", "CE", "CF",
		"D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "DA", "DB", "DC", "DD", "DE", "DF",
		"E0", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "EA", "EB", "EC", "ED", "EE", "EF",
		"F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "FA", "FB", "FC", "FD", "FE", "FF" 

		) ;

/* Values in "range" represent "count" for each color for each Option. Initial value = 2 */
range = new Array(2, 2, 2, 2, 2, 2, 2, 2, 2);

/*
   In Catcolor:
   Last 3 values of each color for each Option. Initial value is 0.
   First 3 colors are (red values) for the 3 Options. Next 3 are (green values) for the 
   3 Categories and last 3 are (blue values) for the 3 Options.
   So, positions 1,4 and 7 would contain the rgb values for Background.
 */
Catcolor = new Array("00", "00", "00", "00", "00", "00", "00", "00", "00");

/* firstColor is just used as a flag. Has each Option used a color yet? */
firstColor = new Array (0, 0, 0);

/* What was the last color used by each Option? Values would be 1-3 for the color.
   Initial value = 0
*/
LastUsed = new Array(0,0,0);

/* first, last: 1st/last element of the Selection Bar. Initialized in ShowElems(). */
var rb = Cat = 0;
var count = 2;
var ptr, strt ;

var sub = new Array(3, 4, 5);

var MyAry = document.getElementById("MyTabl");
var MyColumns = MyAry.getElementsByTagName("TD");
var MyBoxTitle = document.getElementById("p01");
var MyBkgrndVals = document.getElementsByClassName("score");
var MyHdrVals = document.getElementsByClassName("score2");
var MyTxtVals = document.getElementsByClassName("score3");
var MyImages = document.getElementsByTagName("IMG");

var first = 1;
var last = MyColumns.length - 2;

function DoInit() {
	count = 2;
	Cat = rb = 0;
	strt = 64;
	stop = strt + 63;
	red = green = blue = "00";
	mycolor = "";
	FillTab(0);
	return(0);
}

/*
   Called from HTML when user selects an Option. 
   This function sets the values of Cat.
   form2 is for selecting Background, Text or Heading.
*/

function SetCat() {
	if(form2.cat[0].checked) { /* Background was selected */
		Cat = 1; form2.cat[1].checked = false; form2.cat[2].checked = false;
	}
	else if(form2.cat[1].checked) { /* Text was selected */
		Cat = 2; form2.cat[0].checked = false; form2.cat[2].checked = false;
	}
	else { /* Heading was selected */
		Cat = 3; form2.cat[0].checked = false; form2.cat[1].checked = false;
	}

	ptr = sub[Cat-1];
	
	if(firstColor[Cat-1] == 0) {
		alert("Please select a color and click the Change button");
		FillTab(0);
		return(1);
	} else {
		GetLstUsed(Cat); setcount(); Getcolors(); setstart(count); FillTab(rb);
	}
	return(0);
}

function SetRBVal() {	
	if(Cat == 0) {
		alert("Please Select from: Background, Heading or Text");
		form1.clrchoice[0].checked = false ; form1.clrchoice[1].checked = false;
		form1.clrchoice[2].checked = false ;
		return(1);
	}
	
	/* Note: form1 is for color */
	if(form1.clrchoice[0].checked) { /* Red was selected */
		rb = 1 ;
		form1.clrchoice[1].checked = false ; form1.clrchoice[2].checked = false ;
	}
   	else if(form1.clrchoice[1].checked) { /* Green was selected */
		rb = 2 ;
		form1.clrchoice[0].checked = false ; form1.clrchoice[2].checked = false ;
	}
   	else if(form1.clrchoice[2].checked) { /* Blue was selected */
		rb = 3 ;
		form1.clrchoice[0].checked = false ; form1.clrchoice[1].checked = false ;
	}

	/* Set firstcolor[] flag and LastUsed[] */
	if( Cat == 1) { firstColor[0] = 1; LastUsed[0] = rb; }
	else if(Cat == 2) { firstColor[1] = 1; LastUsed[1] = rb; }
	else { firstColor[2] = 1; LastUsed[2] = rb; }

	setcount(); setstart(count); Getcolors(); FillTab(rb);
	return(0);
}

/* sets the value of count from the range array */
function setcount() {
	if(rb == 1) count = range[ptr-3];
	else if(rb == 2) count = range[ptr];
	else if(rb == 3) count = range[ptr+3];
	else {
		alert("setcount failed: rb = " + rb);
		return(1);
	}
	return(0);
}

/* Determines which range of a color will be shown. cnt is count. */
function setstart(cnt) {
var cnt;
strt = (cnt - 1) * 64;
stop = strt + 63;

/* 	First and Last values of the range being displayed */
	MyColumns[0].innerHTML = strt ;
	MyColumns[65].innerHTML = stop ;
	
	return(0);
}

/* Sets the value of the last color used for the Option */
function LstUsed(rb) {
	LastUsed[Cat-1] = rb;
	return(0);
}

/* Get the Last Color Used by this Option */
function GetLstUsed(Cat) {
	rb = LastUsed[Cat-1];

	form1.reset();
	form1.clrchoice[0].checked = false ;
	form1.clrchoice[1].checked = false ;
	form1.clrchoice[2].checked = false ;
	form1.clrchoice[rb-1].checked = true ;
	alert("GetLstUsed(): rb = "+rb);
	
	return(0);
}

/* Saves the value of count into the range array */
function Savecount() {
	if(rb == 1) range[ptr-3] = count;
	else if(rb == 2) range[ptr] = count;
	else if(rb == 3) range[ptr+3] = count;
	else {
		alert("Savecount failed: rb = " + rb);
		return(1);
	}
	return(0);
}

function Savecolors() { /* Uses old value of sub ? */
	Catcolor[ptr-3] = red; Catcolor[ptr] = green; Catcolor[ptr+3] = blue;
	return(0);
}

function Getcolors() {
	red = Catcolor[ptr-3]; green = Catcolor[ptr]; blue = Catcolor[ptr+3];
	return(0);
}


/*      **********
	count: Tracks the Range of colors being displayed. There are 4 ranges.
	The Initial Range is set to 2.
	1. 0 - 63    2. 64 - 127    3. 128 - 191    4. 192 - 255
	********** */
function NxtRng() { /* Shows the next range of 64 colors when user touches the Right Arrow */
	if(Cat == 0 || firstColor[Cat - 1] == 0) return(1);
	count++ ;

	if( count > 4 ) { count = 4; MyImages[1].style.background = "#cca"; return(0); }

	if(Cat == 0) {
		for( i = 0; i < 9; i++)
			range[i] = count ;
		strt = (count - 1) * 64;
		stop = strt + 63;
		MyColumns[0].innerHTML = strt ;
		MyColumns[65].innerHTML = stop ;
		return(0);
	}

	strt = (count - 1) * 64;
	stop = strt + 63;

	if(rb == 1) range[ptr-3] = count;
	else if(rb == 2) range[ptr] = count;
	else if(rb == 3) range[ptr+3] = count;

	setcount(); setstart(count); FillTab(rb);
	return(0);
}

function PrevRng() { /* Shows the previous range of 64 colors  when user touches the Left Arrow */
	if(Cat == 0 || firstColor[Cat - 1] == 0) return(1);

	count-- ;

	if( count < 1 ) { count = 1 ;  MyImages[0].style.background = "#cca"; return(0); }

	if(Cat == 0) {
		for( i = 0; i < 9; i++)
			range[i] = count ;
		strt = (count - 1) * 64;
		stop = strt + 63;
		MyColumns[0].innerHTML = strt ;
		MyColumns[65].innerHTML = stop ;
		return(0);
	}

	strt = (count - 1) * 64;
	stop = strt + 63;

	if(rb == 1) range[ptr-3] = count;
	else if(rb == 2) range[ptr] = count;
	else if(rb == 3) range[ptr+3] = count;

	setcount(); setstart(count); FillTab(rb);
	return(0);
}

/* Colors for the First and Last values of the range being displayed. */
function FillTab(Code) { /* Code is rb */
var i, st, stop ;

if(Code == 0) {
	form1.reset();
	MyBoxTitle.style.color = "#cca";
	MyImages[0].style.background = '#cca';
	MyImages[1].style.background = '#cca';
	MyColumns[0].style.color = '#cca';
	MyColumns[65].style.color = '#cca';
	MyColumns[0].innerHTML = 64 ;
	MyColumns[65].innerHTML = 127 ;
	for( i = first; i <= last; i++ ) 
		MyColumns[i].style.background = "#cca";
	return(0);
}

st = strt ;
stop = st + 63;

if(Code == 1)	
	{ MyColumns[65].style.color = MyColumns[0].style.color = MyBoxTitle.style.color =
		MyImages[0].style.background = MyImages[1].style.background = '#f00'; }
else if(Code == 2) 		
	{ MyColumns[65].style.color = MyColumns[0].style.color = MyBoxTitle.style.color =
		MyImages[0].style.background = MyImages[1].style.background = '#0f0'; }
else if(Code == 3)	
	{ MyColumns[65].style.color = MyColumns[0].style.color = MyBoxTitle.style.color =
		MyImages[0].style.background = MyImages[1].style.background = '#00f'; }


for( i = first; i <= last; i++, st++ )
/*	Code is for the color to be filled in */
	if(Code == 1) 
		MyColumns[i].style.background = "#" + hexval[st] + "0000";
	else if(Code == 2)
		MyColumns[i].style.background = "#00" + hexval[st] + "00";
	else if(Code == 3)
		MyColumns[i].style.background = "#0000" + hexval[st];

return(0);
}

function x(i) {

	if(firstColor[Cat-1] == 0) return(1);

	switch(rb) {

		case 1:
			red = hexval[strt + i];
			mycolor = "#" + red + green + blue ;
			if(Cat == 1) { /* Background color is being changed */
				MyBkgrndVals[0].getElementsByClassName("rgb")[0].innerHTML = strt + i;
				MyBkgrndVals[0].getElementsByClassName("rgb")[1].innerHTML = hexval[strt + i];
				sec1.style.background = mycolor;
				Catcolor[ptr-3] = red;
			}
			else if(Cat == 2) { /* Heading color is being changed */
				MyHdrVals[0].getElementsByClassName("rgb")[0].innerHTML = strt + i;
				MyHdrVals[0].getElementsByClassName("rgb")[1].innerHTML = hexval[strt + i];
				h01.style.color = mycolor;
				Catcolor[ptr-3] = red;
			}
			else { /* Text color is being changed */
				MyTxtVals[0].getElementsByClassName("rgb")[0].innerHTML = strt + i;
				MyTxtVals[0].getElementsByClassName("rgb")[1].innerHTML = hexval[strt + i];
				ol01.style.color = mycolor;
				Catcolor[ptr-3] = red;
			}
			break;

		case 2:
			green = hexval[strt + i];
			mycolor = "#" + red + green + blue ;
/*			alert("mycolor: "+ mycolor);	*/
			if(Cat == 1) { /* Background color is being changed */
				MyBkgrndVals[0].getElementsByClassName("grb")[0].innerHTML = strt + i;
				MyBkgrndVals[0].getElementsByClassName("grb")[1].innerHTML = hexval[strt + i];
				sec1.style.background = mycolor;
				Catcolor[ptr] = green;
			}
			else if(Cat == 2) { /* Heading color is being changed */
				MyHdrVals[0].getElementsByClassName("grb")[0].innerHTML = strt + i;
				MyHdrVals[0].getElementsByClassName("grb")[1].innerHTML = hexval[strt + i];
				h01.style.color = mycolor;
				Catcolor[ptr] = green;
			}
			else { /* Text color is being changed */
				MyTxtVals[0].getElementsByClassName("grb")[0].innerHTML = strt + i;
				MyTxtVals[0].getElementsByClassName("grb")[1].innerHTML = hexval[strt + i];
				ol01.style.color = mycolor;
				Catcolor[ptr] = green;
			}
			break;

		case 3:
			blue = hexval[strt + i];
			mycolor = "#" + red + green + blue ;

			if(Cat == 1) { /* Background color is being changed */
				MyBkgrndVals[0].getElementsByClassName("brg")[0].innerHTML = strt + i;
				MyBkgrndVals[0].getElementsByClassName("brg")[1].innerHTML = hexval[strt + i];
				sec1.style.background = mycolor;
				Catcolor[ptr+3] = blue;
			}
			else if(Cat == 2) { /* Heading color is being changed */
				MyHdrVals[0].getElementsByClassName("brg")[0].innerHTML = strt + i;
				MyHdrVals[0].getElementsByClassName("brg")[1].innerHTML = hexval[strt + i];
				h01.style.color = mycolor;
				Catcolor[ptr+3] = blue;
			}
			else { /* Text color is being changed */
				MyTxtVals[0].getElementsByClassName("brg")[0].innerHTML = strt + i;
				MyTxtVals[0].getElementsByClassName("brg")[1].innerHTML = hexval[strt + i];
				ol01.style.color = mycolor;
				Catcolor[ptr+3] = blue;
			}
	} /* End Switch */
}
