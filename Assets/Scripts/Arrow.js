#pragma strict

public var damage : int;

function Start(){
	damage = 1;
}

function OnCollisionEnter2D(coll : Collision2D) {
    var rb = gameObject.GetComponent("Rigidbody2D") as Rigidbody2D;
    rb.isKinematic = true;
    rb.velocity = Vector2.zero;
    rb.angularVelocity = 0;
    setLayer("arrowBody", "Objects", 1);
    setLayer("arrowHead", "Level", -2);


    if(coll.gameObject.tag == "Guard"){
        coll.gameObject.SendMessage("takeDamage", damage);
        Destroy(this.gameObject);
    }
}

function setLayer(name : String, layer : String, order : int){
    var component = transform.Find(name);
    var sprite = component.gameObject.GetComponent("SpriteRenderer") as SpriteRenderer;
    sprite.sortingLayerName = layer;
    sprite.sortingOrder = order;
}
