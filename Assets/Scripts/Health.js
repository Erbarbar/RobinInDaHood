#pragma strict
import UnityEngine.UI;

public var maxHealth : int = 3;
public var currentHealth: int;
public var heart1: Image;
public var heart2: Image;
public var heart3: Image;
public var gameOver: GameObject; // initialized in editor, as it is inactive on Start()

/**
*Called upon loading the Scene
*/
function Start () {
	currentHealth = maxHealth;
}

/**
*Called each frame
*/
function Update () {
	updateHearts();
}

/**
*Reduce health by a certain amount, and check if dead
*@param{int} dammage dammage to be taken
*/
function takeDamage(damage: int){
	currentHealth--;
	capHealth();
}

/**
*Update UI to reflect current health;
*/
function updateHearts(){
	switch(currentHealth){
		case 0:
			heart1.enabled = false;
			heart2.enabled = false;
			heart3.enabled = false;
			break;
		case 1:
			heart1.enabled = true;
			heart2.enabled = false;
			heart3.enabled = false;
			break;
		case 2:
			heart1.enabled = true;
			heart2.enabled = true;
			heart3.enabled = false;
			break;
		case 3:
			heart1.enabled = true;
			heart2.enabled = true;
			heart3.enabled = true;
		default:
			break;
	}
}

/**
*Cap health at top margin and kill player at bottom margin
*/
function capHealth(){
	if(currentHealth > maxHealth){
		currentHealth = maxHealth;
	}
	if(currentHealth <= 0){
		die();
	}
}

/**
*Pause game and prompt death screen
*/
function die(){
	var gameManagerObj : GameObject = GameObject.Find("GameManager");
	var gameManager = gameManagerObj.GetComponent("GameManager") as GameManager;
	Time.timeScale=0;
	gameManager.SendMessage("inMenu");
	gameOver.SetActive(true);
}
