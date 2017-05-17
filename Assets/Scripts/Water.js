#pragma strict
public var health : Health;


function Start () {
	var player = GameObject.Find("Player") as GameObject;
	health=player.GetComponent("Health") as Health;
}

function OnTriggerEnter2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		while(health.currentHealth>0){
			health.takeDamage(1);
		}
	}
}