#pragma strict
public var gameManager : GameObject;


function Start () {
	gameManager = GameObject.Find("GameManager") as GameObject;
}

function OnTriggerEnter2D(coll : Collider2D){
    if(coll.gameObject.tag == "Player"){
        gameManager.SendMessage("onHomeEnter",coll.gameObject);
    }
}
