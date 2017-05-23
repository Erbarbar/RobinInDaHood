#pragma strict
var inShadow : boolean = false;
private var player : GameObject;
player = GameObject.Find("Player");
var sprite : SpriteRenderer;
sprite = player.gameObject.GetComponent.<SpriteRenderer>();


/**
*Called each  frame
*Checks for ineraction with shadow
*/
function Update(){
	if(inShadow && Input.GetKeyDown ("e")){
		sprite.sortingLayerName = "Hidden";
		sprite.sortingOrder = 0;	
		player.layer = 14;
	}	
}

/**
*Called when a collider enters a trigger zone.
*Sets Flag to true, so user input can come at a later time.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. GameObject should be Player.
*/
function OnTriggerEnter2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inShadow = true;
	}
}

/**
*Called when a collider leaves a trigger zone.
*Sets Flag to false.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. GameObject should be Player.
*/
function OnTriggerExit2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inShadow = false;
		sprite.sortingLayerName = "Players";
		sprite.sortingOrder = 0;	
		player.layer = 0;
	}
}
