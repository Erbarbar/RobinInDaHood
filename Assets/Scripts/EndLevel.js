#pragma strict

function OnTriggerEnter2D(coll: Collider2D){
	if((coll.gameObject.name == "Player")&&Input.GetKeyDown ("e")){
		endLevel();
	}
}

function endLevel(){

}