#pragma strict

public var damage : int;

function Start(){
	damage = 1;
}

function OnCollisionEnter2D(coll : Collision2D) {
    Debug.Log("HIT");
    var rb = gameObject.GetComponent("Rigidbody2D") as Rigidbody2D;
    rb.isKinematic = true;
    rb.velocity = Vector2.zero;
    rb.angularVelocity = 0;
}

function OnTriggerEnter2D(coll : Collider2D){
	if(coll.gameObject.tag == "Guard"){
		coll.SendMessage("takeDamage", damage);
	}
}
