#pragma strict
public var target : Vector3;
public var player : GameObject;
public var onDoor  : boolean = false;

/**
*Called upon loading the Scene
*/
function Start () {
	// Get coordinates of other Door
	player = GameObject.Find("Player");
	var otherDoor:GameObject;
	if (this.gameObject.name=="DoorCastle"){
		otherDoor = GameObject.Find("DoorTower") as GameObject;
	} else {
		otherDoor = GameObject.Find("DoorCastle") as GameObject;
	}
	target.x=otherDoor.transform.position.x;
	target.y=otherDoor.transform.position.y;
	target.z=0;
}

/**
*Called each frame
*/
function Update(){
	//teleport on interaction
	if(onDoor&&Input.GetKeyDown ("e")){
		player.transform.position = target;
	}
}

/**
*Called when a collider enters a trigger zone.
*Sets flag. Otherwise player input would have to be in same frame as the function call. 
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. Should be Player.
*/	
function OnTriggerEnter2D(coll : Collider2D){
	if (coll.gameObject.tag == "Player"){
		onDoor=true;
	}
}

/**
*Called when a collider leaves a trigger zone.
*Sets flag. Otherwise player input would have to be in same frame as the function call. 
*@param{Collider2D} coll The collider on the Gamobject that leaves the trigger. Should be Player.
*/
function OnTriggerExit2D(coll : Collider2D){
	if (coll.gameObject.tag == "Player"){
		onDoor=false;
	}
}
