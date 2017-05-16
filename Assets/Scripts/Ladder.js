#pragma strict

public var script : Movement;

function OnTriggerEnter2D(coll: Collider2D){
	script = coll.gameObject.GetComponent("Movement") as Movement;
	script.OnLadderEnter();
}

function OnTriggerExit2D(coll: Collider2D){
	script = coll.gameObject.GetComponent("Movement") as Movement;
	script.OnLadderExit();
}
