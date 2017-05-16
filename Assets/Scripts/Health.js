#pragma strict
import UnityEngine.UI;

public var maxHealth : int = 3;
public var currentHealth: int;
public var heart1: Image;
public var heart2: Image;
public var heart3: Image;

function Start () {
	currentHealth = maxHealth;
}

function Update () {
	updateHearts();
}

function takeDamage(damage: int){
	currentHealth--;
	capHealth();
}

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

function capHealth(){
	if(currentHealth > maxHealth){
		currentHealth = maxHealth;
	}
	if(currentHealth <= 0){
		//send message to game master
	}
}
