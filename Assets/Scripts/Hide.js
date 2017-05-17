#pragma strict
var inShadow : boolean = false;
private var player : GameObject;
player = GameObject.Find("Player");
var sprite : SpriteRenderer;
sprite = player.gameObject.GetComponent.<SpriteRenderer>();



function Update(){
	if(inShadow && Input.GetKeyDown ("e")){
		sprite.sortingLayerName = "Hidden";
		sprite.sortingOrder = 0;	
		player.layer = 14;
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
		sprite.sortingLayerName = "Players";
		sprite.sortingOrder = 0;	
		player.layer = 0;
	}
}
