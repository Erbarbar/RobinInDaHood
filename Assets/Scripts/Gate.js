#pragma strict

public var atGate : boolean = true;
private var player : GameObject;
public var gateType : float;
public var closedCorner : Sprite;
public var closedTop : Sprite;
public var closedSide : Sprite;
public var closedMiddle: Sprite;
private var usedSprite : SpriteRenderer;
public var coll : BoxCollider2D;
public var gameManager : GameManager;

/**
*Called upon loading the Scene
*/
function Start(){
	var manager = GameObject.Find("GameManager") as GameObject;
	gameManager=manager.GetComponent("GameManager") as GameManager;
	usedSprite =gameObject.GetComponent.<SpriteRenderer>();
	player = GameObject.Find("Player");
}

/**
*Called at each frame
*Checks if gate should be closed
*/
function Update() {
	if (gameManager.gateClosed){
		closeGate();
	}
}

/**
*Changes GameObjects layer and order to the targets.
*@param{layer} layer target layer
*@param{order} order target order
*/
function setLayer(layer : String, order : int){
    var sprite = this.gameObject.GetComponent("SpriteRenderer") as SpriteRenderer;
    sprite.sortingLayerName = layer;
    sprite.sortingOrder = order;
}

/**
*Closes the gate by making certain parts impassable and changing textures
*/
function closeGate (){
	gameObject.layer =11;
	switch(gateType){
		case 0: //Texture Change
			usedSprite.sprite = closedCorner;
			break;
		case 1: //Texture Change
			usedSprite.sprite = closedTop;
			break;
		case 2: //Texture Change
			usedSprite.sprite = closedSide;
			break;
		case 3: //Texture Change
			usedSprite.sprite = closedMiddle;
			break;
		case 4: //Make it impossible to go past the Gate
			coll = this.gameObject.GetComponent("BoxCollider2D");
			coll.enabled = true;
			break;
		case 5: //Make Player pass in front
			setLayer("Level",0);
			break;
		case 6: //Texture Change and make Player pass in front
			setLayer("Level",0);
			usedSprite.sprite = closedSide;
			break;
		case 7: //Texture Change and make Player pass in front
			usedSprite.sprite = closedCorner;
			setLayer("Level",0);
			break;
		default:
			break;
	}
}
