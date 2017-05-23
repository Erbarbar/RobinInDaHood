#pragma strict
import UnityEngine.UI;

public var score : float;
public var timer : float = 0;
public var timeLimit : float = 120;
public var overTime : boolean = false;
public var minLoot : float = 100;
public var orphansCreated : float;
public var alarm : boolean;
public var lastSeenPos : float;
public var gateClosed : boolean;
public var text_time: Text;
public var cursorTexture: Texture2D;

/**
*Called upon loading the Scene
*/
function Start () {
	var cursorMode: CursorMode = CursorMode.Auto;			
	var hotSpot: Vector2 = Vector2.zero;					
	Cursor.SetCursor(cursorTexture, hotSpot, cursorMode);	
	Time.timeScale=1.0;										
	timer = timeLimit;										
	score = 0;												
	gateClosed = false;										
}

/**
*Called each frame
*/
function Update () {
    getTime();
    showTime(timer);
}

/**
*Calculate the time
*/
function getTime(){
	if(!overTime){											//If not overtime, count down,
		timer -= Time.deltaTime;							
		if(timer <=0){									
			overTime = true;
		}
	}else{													//else count up
		timer += Time.deltaTime;
 }
}

/**
*Display the Time in a Min:Sec format
*@param{float} time current time in seconds
*/
function showTime(time : float){
	var minutes : int = 0;
	while(time >= 60){
		time -= 60;
		minutes++;
	}
	var seconds : int = Mathf.Floor(time);
	if(minutes < 10)
		text_time.text = " ";
	text_time.text = minutes.ToString() + ":";
	if(seconds < 10)
		text_time.text = text_time.text + "0";
	text_time.text = text_time.text + seconds.ToString();
	text_time.color = (overTime)? new Color(255,0,0,1):new Color(0,255,0,1); //change colour from green to red if overtime
}

/**
*Calculate a score and display it if the player has enough loot
*@param{GameObject} player The player Object to calculate a score for
*@return{String} message The Detailed score overview to be displayed in the menu
*/
function onHomeEnter(player : GameObject){
	var lootScript = player.GetComponent("LootBag") as LootBag;
	var loot = lootScript.loot;
	var message : String;
	if(loot < minLoot)
		return;
	var healthScript = player.GetComponent("Health") as Health;
	var health = healthScript.currentHealth;
	score = (health*100) + (loot*10) - Mathf.Round(orphansCreated)*100 + ((overTime)? -timer*10 : timer*10)+((gateClosed)? 0 : 300);
	message="Your adventure gets a score of "+score+"!\n"+
			"Remaining Health: 100x "+ health+" = "+(health*100)+"\n"+
			"Loot: 10x "+ loot+" = "+(loot*10)+"\n"+
			"Orphans any dead guards left behind: -100x "+ Mathf.Round(orphansCreated)+" = "+(- Mathf.Round(orphansCreated)*100)+"\n"+
			"Time bonus: "+ ((overTime)? -timer*10 : timer*10)+"\n"+
			"Never Alarmed: "+ ((gateClosed)? 0 : 300)+"\n";
	return message; 
}

/**
*Changes the scene to the main menu scene
*/
function MainMenu(){
	Application.LoadLevel ("MainMenu");
}

/**
*Reloads the entire level
*/
function Reload(){
	Application.LoadLevel ("Level 1");
} 

/**
*Sets a flag to signalise to the appropriate scrips that movement and shooting should be prohibited, as a menu is open
*/
function inMenu(){
	var player :GameObject = GameObject.Find("Player");
	var playerShoot = player.GetComponent("PlayerShoot") as PlayerShoot;
	var playerMove = player.GetComponent("Movement") as Movement;
	playerShoot.paused=true;
	playerMove.paused = true;
}

/**
*Sets a flag to signalise to the appropriate scrips that movement and shooting should be resumed, as the menu was closed
*/
function notInMenu(){
	var player :GameObject = GameObject.Find("Player");
	var playerShoot = player.GetComponent("PlayerShoot") as PlayerShoot;
	var playerMove = player.GetComponent("Movement") as Movement;
	playerShoot.paused=false;
	playerMove.paused = false;
}
