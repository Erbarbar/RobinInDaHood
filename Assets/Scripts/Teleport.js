#pragma strict
public var target : Vector3;
public var player : GameObject;
public var onDoor  : boolean = false;

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

function Update(){
	//teleport on interaction
	if(onDoor&&Input.GetKeyDown ("e")){
		player.transform.position = target;
	}
}

	
function OnTriggerEnter2D(coll : Collider2D){
	if (coll.gameObject.tag == "Player"){
		onDoor=true;
	}
}

function OnTriggerExit2D(coll : Collider2D){
	if (coll.gameObject.tag == "Player"){
		onDoor=false;
	}
}
