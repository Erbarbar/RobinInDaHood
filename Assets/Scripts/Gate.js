#pragma strict

public var gate : GameObject;
public var atGate : boolean = true;
private var player : GameObject;
public var gateType : float;
public var closedCorner : Sprite;
public var closedTop : Sprite;
public var closedSide : Sprite;
public var closedMiddle: Sprite;
private var usedSprite : SpriteRenderer;
usedSprite = gate.GetComponent.<SpriteRenderer>();
player = GameObject.Find("Player");


public var gateClosing : boolean;


function Update() {
	if(atGate && Input.GetKeyDown ("e")){
		player.transform.position = Vector3(player.transform.position.x, player.transform.position.y, 5);
		player.layer = 10;
	}

	if (gateClosing){
		closeGate();
	}
}

function OnTriggerEnter2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		atGate = true;
	}
}

function OnTriggerExit2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		atGate = false;
		player.transform.position = Vector3(player.transform.position.x, player.transform.position.y, -1);
		player.layer = 0;
	}
}

function closeGate (){
	gameObject.layer =11;
	switch(gateType){
		case 0:
			usedSprite.sprite = closedCorner;
			break;
		case 1:
			usedSprite.sprite = closedTop;
			break;
		case 2:
			usedSprite.sprite = closedSide;
			break;
		case 3:
			usedSprite.sprite = closedMiddle;
		default:
			break;

	}
}
