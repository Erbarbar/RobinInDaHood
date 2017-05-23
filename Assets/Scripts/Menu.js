#pragma strict
import UnityEngine.UI;

public var inPosition :boolean=false;
public var paused : boolean = false;
public var pauseMenu : GameObject;// initialized in editor, as it is inactive on Start()
public var endLevelMenu :GameObject;// initialized in editor, as it is inactive on Start()
public var gameManager : GameObject;
public var managerScript : GameManager;
public var score : Text;
public var highScoreText : Text;
public var player : GameObject;
public var minLoot : float;
public var lootBag : LootBag;
public var hint:GameObject;
public var hint2:GameObject;

public var highScoreUI : GameObject;

public var audioSrc : AudioSource;
private var highScore : float;

/**
*Called upon loading the Scene
*/
function Start(){
	highScore = PlayerPrefs.GetFloat("HighScore");
	player = GameObject.Find("Player");
	lootBag = player.GetComponent("LootBag");
	managerScript = gameManager.GetComponent("GameManager") as GameManager;
	minLoot=managerScript.minLoot;
	hint2= GameObject.Find("Hint2");
	hint2.SetActive(false);
	PromptHint1();
}

/**
*Called each frame
*Checks if Pause or End level menu should be prompted
*/
function Update(){
	if(inPosition&&Input.GetKeyDown ("e")&&!paused){
		if (lootBag.loot>=minLoot){
			PromptEndLevelMenu();
		} else {
			PromptHint2();
		}
	}
	if(Input.GetKeyDown(KeyCode.Escape)&&!paused){
			Pause();			
	}
}

/**
*Called when a collider enters a trigger zone.
*Sets Flag to true, so user input can come at a later time.
*Also calculates score, and formats it to be displayed.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. GameObject should be Player.
*/
function OnTriggerEnter2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inPosition=true;
        score.text = managerScript.onHomeEnter(player);
	}
}

/**
*Called when a collider leaves a trigger zone.
*Sets Flag to false.
*@param{Collider2D} coll The collider on the Gamobject that leaves the trigger. GameObject should be Player.
*/
function OnTriggerExit2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inPosition=false;
	}
}

/**
*Prompts Pause menu
*/
function Pause(){
	Time.timeScale=0.0;
	paused=true;
	pauseMenu.SetActive(true);
	gameManager.SendMessage("inMenu");
}

/**
*Resumes game from pause menu
*/
function Resume(){
	Time.timeScale=1.0;
	paused=false;
	pauseMenu.SetActive(false);
	gameManager.SendMessage("notInMenu");
}

/**
*Prompts End level menu, with score and highscore
*/
function PromptEndLevelMenu(){
	audioSrc.Pause();
	gameManager.SendMessage("inMenu");
	paused=true;
	endLevelMenu.SetActive(true);
	var thisScore = managerScript.score;
	if(thisScore > highScore){
		highScore = thisScore;
		PlayerPrefs.SetFloat("HighScore", highScore);
		highScoreUI.SetActive(true);
	}
	highScoreText.text = "HighScore: " + highScore;
}

/**
*Prompts first set of text that can be read without time advancing
*/
function PromptHint1(){
	var count: int;
	var hidden:boolean;
	Time.timeScale=0;
	gameManager.SendMessage("inMenu");
	for(count = 0; count < 5; count++){
		hint= GameObject.Find("Hint1 ("+count+")");
		hidden=false;
		while (!hidden){
			while (!Input.GetKeyDown("e")){
				yield;
			}
			hint.SetActive(false);
			hidden = true;
			yield;
		}
	}
	hint= GameObject.Find("Ok");
	hint.SetActive(false);
	gameManager.SendMessage("notInMenu");
	Time.timeScale=1;
}

/**
*Promps hint to rimind tha the player doesn't have enough loot
*/
function PromptHint2(){
	var hidden:boolean=false;
	hint2.SetActive(true);
	while (!hidden){
		while (inPosition){
				yield;
		}
		hint2.SetActive(false);
		hidden = true;
		yield;
	}
}
