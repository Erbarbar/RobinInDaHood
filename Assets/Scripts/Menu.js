#pragma strict
import UnityEngine.UI;

public var inPosition :boolean=false;
public var paused : boolean = false;
public var pauseMenu : GameObject;// initialized in editor, as it is inactive on Start()
public var endLevelMenu :GameObject;// initialized in editor, as it is inactive on Start()
public var gameManager : GameObject;
public var managerScript : GameManager;
public var score : Text;
public var player : GameObject;
public var minLoot : float;
public var lootBag : LootBag;
public var hint:GameObject;
public var hint2:GameObject;

function Start(){
	player = GameObject.Find("Player");
	lootBag = player.GetComponent("LootBag");
	managerScript = gameManager.GetComponent("GameManager") as GameManager;
	minLoot=managerScript.minLoot;
	hint2= GameObject.Find("Hint2");
	hint2.SetActive(false);
	PromptHint1();
}

function Update(){
	if(inPosition&&Input.GetKeyDown ("e")&&!paused){
		if (lootBag.loot>minLoot){
			PromptEndLevelMenu();
		} else {
			PromptHint2();
		}
	}
	if(Input.GetKeyDown(KeyCode.Escape)&&!paused){
			Pause();			
	}
}

function OnTriggerEnter2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inPosition=true;
        score.text = managerScript.onHomeEnter(player);
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
	gameManager.SendMessage("inMenu");
}

function Resume(){
	Time.timeScale=1.0;
	paused=false;
	pauseMenu.SetActive(false);
	gameManager.SendMessage("notInMenu");
}

function PromptEndLevelMenu(){
	Time.timeScale=0.0;
	gameManager.SendMessage("inMenu");
	paused=true;
	endLevelMenu.SetActive(true);
}

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
