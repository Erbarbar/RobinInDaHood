#pragma strict
var inShadow : boolean = false;
private var player : GameObject;
player = GameObject.Find("Player");



function Update(){
	if(inShadow && Input.GetKeyDown ("e")){
		player.transform.position = Vector3(player.transform.position.x, player.transform.position.y, 5);
		player.layer = 10;
	}	
}

function OnTriggerEnter2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inShadow = true;
	}
}

function OnTriggerExit2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		inShadow = false;
		player.transform.position = Vector3(player.transform.position.x, player.transform.position.y, 0);
		player.layer = 0;
	}
}