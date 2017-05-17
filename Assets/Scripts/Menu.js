#pragma strict
import UnityEngine.UI;

public var inPosition :boolean=false;
public var paused : boolean = false;
public var pauseMenu : GameObject;
public var endLevelMenu :GameObject;
public var gameManager : GameObject;
public var score : Text;
public var player : GameObject;

function Update(){
	if(inPosition&&Input.GetKeyDown ("e")&&!paused){
			PromptEndLevelMenu();			
	}
	if(Input.GetKeyDown(KeyCode.Escape)&&!paused){
			Pause();			
	}
}

function OnTriggerEnter2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inPosition=true;
	}
}

function OnTriggerExit2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inPosition=false;
	}
}

function Pause(){
	Time.timeScale=0.0;
	paused=true;
	pauseMenu.SetActive(true);
}

function Resume(){
	Time.timeScale=1.0;
	paused=false;
	pauseMenu.SetActive(false);
}

function PromptEndLevelMenu(){
	Time.timeScale=0.0;
	paused=true;
	endLevelMenu.SetActive(true);
	var managerScript = gameManager.GetComponent("GameManager") as GameManager;
	managerScript.onHomeEnter(player);
	var message : String = "Your score is "+managerScript.score;
	score.text=message;
}