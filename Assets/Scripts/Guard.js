#pragma strict

public var gameManager : GameManager;
public var health : int = 2;
public var speed : float = 1;
public var maxSpeed : float = 10;


public var alarmed : boolean;
public var alarmPos : float;
public var lastSeenPos : float;
public var postPos : float;
public var patrollingDistance : float;
public var goingLeft : boolean;

public var action : String;

public var anim : Animator;
private var rb : Rigidbody2D;

function Start () {
    rb = gameObject.GetComponent("Rigidbody2D") as Rigidbody2D;
	var gameManagerObject = GameObject.Find("GameManager");
    gameManager = gameManagerObject.GetComponent("GameManager") as GameManager;
    action = "patrolling";
    goingLeft = true;
}

function FixedUpdate () {
	if (health <= 0)
        die();

    switch(action){
        case "patrolling":
            anim.SetBool("Chasing", false);
            if(alarmed && !gameManager.gateClosed){
                action = "alarming";
            }
            else if(gameManager.alarm){
                alarmed = true;
            }
            else if(alarmed){
                action = "chasing";
            }
            else{
                var edge = postPos + patrollingDistance*((goingLeft)? -1 : 1);
                moveTorwards(edge, speed/4);
                if(compareFloats(this.transform.position.x, edge, 0.1)){
                    goingLeft = !goingLeft;
                }
            }
        break;
        case "alarming":
            anim.SetBool("Chasing", true);
            moveTorwards(alarmPos, speed);
            if(compareFloats(this.transform.position.x, alarmPos, 0.1)){
                gameManager.alarm = true;
                gameManager.gateClosed = true;
                action = "chasing";
            }
        break;
        case "chasing":
            anim.SetBool("Chasing", true);
            lastSeenPos = gameManager.lastSeenPos;
            moveTorwards(lastSeenPos, speed);
            if(compareFloats(this.transform.position.x, lastSeenPos, 0.1)){
                alarmed = false;
                gameManager.alarm = false;
                action = "toPost";
            }
        break;
        case "toPost":
            anim.SetBool("Chasing", false);
            if(alarmed){
                action = "chasing";
                break;
            }
            moveTorwards(postPos, speed/4);
            if(compareFloats(this.transform.position.x,postPos,0.1)){
                action = "patrolling";
            }
        break;
        default : break;
    }
    if (Mathf.Abs(rb.velocity.x) > maxSpeed)
        rb.velocity = new Vector2(((rb.velocity.x > 0)? maxSpeed : -maxSpeed), 0);
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
        lastSeenPos = coll.transform.position.x;
        gameManager.lastSeenPos = lastSeenPos;
        alarmed = true;
        //moveTorwards(coll.transform.position);
    }
}

function moveTorwards(end : float, speed : float){
    var start : float = this.transform.position.x;
    this.transform.localScale = new Vector2((start > end ? 1 : -1), 1);
    rb.AddForce(((start > end)? Vector2.left : Vector2.right) * speed, ForceMode2D.Impulse );
}

function compareFloats(a : float, b : float, margin : float){
    if(Mathf.Abs(a - b) < margin)
        return true;
    return false;
}
