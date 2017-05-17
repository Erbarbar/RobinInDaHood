#pragma strict

public var gameManager : GameManager;
public var health : int = 2;
public var speed : float = 1;
private var rb : Rigidbody2D;

function Start () {
    rb = gameObject.GetComponent("Rigidbody2D") as Rigidbody2D;
	var gameManagerObject = GameObject.Find("GameManager");
    gameManager = gameManagerObject.GetComponent("GameManager") as GameManager;
}

function Update () {
	if (health <= 0)
        die();
}

function FixedUpdate(){

}


function die(){
    gameManager.orphansCreated += Random.value * 4;
    Destroy(this.gameObject);
}

function takeDamage(damage:float){
    health--;
}

function OnTriggerStay2D(coll : Collider2D){
    if(coll.gameObject.tag == "Arrow")
        return;
    if (coll.gameObject.tag == "Player"){
        moveTorwards(coll.transform.position);
    }
}

function moveTorwards(end : Vector2){
    var start : Vector2 = this.transform.position;
    this.transform.localScale = new Vector2((start.x > end.x ? 1 : -1), 1);
    rb.AddForce(((start.x > end.x)? Vector2.left : Vector2.right) * speed, ForceMode2D.Impulse );
}
