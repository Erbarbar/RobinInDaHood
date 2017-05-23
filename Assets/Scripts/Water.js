#pragma strict
public var health : Health;

/**
*Called upon loading the Scene
*/
function Start () {
	var player = GameObject.Find("Player") as GameObject;
	health=player.GetComponent("Health") as Health;				//initialize variables
}

/**
*Called when a collider enters a trigger zone.
*This sets player health to 0, to make them drown.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. Should be Player.
*/
function OnTriggerEnter2D(coll: Collider2D){
	if(coll.gameObject.name == "Player"){
		while(health.currentHealth>0){
			health.takeDamage(1);
		}
	}
}