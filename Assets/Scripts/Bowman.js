#pragma strict

public var gameManager : GameManager;
public var bowPrefab : GameObject;
public var arrowPrefab : GameObject;
private var bow : GameObject;
private var arrow : GameObject;

public var health : int;
public var damage : int;
public var cooldown : float;
public var aimTime : float;
private var timer : float;
public var shootSpeed : float;

public var target : Vector2;
public var action : String;

public var audioSource : AudioSource;
public var drawSound : AudioClip;
public var shootSound : AudioClip;

function Start () {
    var manager = GameObject.Find("GameManager") as GameObject;
    gameManager = manager.GetComponent("GameManager") as GameManager;
	timer = 0;
    action = "chilling";
    bow = Instantiate(bowPrefab,this.transform.position, Quaternion.identity);
    bow.SetActive(false);
}

function Update(){
    if(health <= 0)
        die();
}

function FixedUpdate () {
    if (timer > 0)
        timer -= Time.deltaTime;
    if (timer < 0)
        timer = 0;
	switch(action){
        case "chilling":
            bow.SetActive(false);
        break;
        case "aiming":
            bow.SetActive(true);
            var angle : float = getAngle();
            bow.transform.position = this.transform.position;
            bow.transform.rotation = Quaternion.identity;
            bow.transform.Rotate(Vector3.forward, angle);
            arrow.transform.position = this.transform.position;
            arrow.transform.rotation = Quaternion.identity;
            arrow.transform.Rotate(Vector3.forward, angle);
            if(timer == 0){
                var rb = arrow.GetComponent("Rigidbody2D") as Rigidbody2D;
                rb.AddForce(new Vector2(Mathf.Cos(angle*Mathf.PI/180),Mathf.Sin(angle*Mathf.PI/180)) * shootSpeed, ForceMode2D.Impulse);
                GetComponent.<AudioSource>().PlayOneShot(shootSound, 1);
                timer = cooldown;
                action = "reloading";
            }
        break;
        case "reloading":
            bow.SetActive(true);
            if(timer == 0)
                action = "chilling";
        break;
        default: break;

    }
}

function OnTriggerStay2D(coll : Collider2D){
    if(coll.tag == "Player"){
        target = coll.transform.position;
        if(action == "chilling"){
            GetComponent.<AudioSource>().PlayOneShot(drawSound, 1);
            action = "aiming";
            timer = aimTime;
            arrow = Instantiate(arrowPrefab,this.transform.position,Quaternion.identity);
        }
    }
}

function getAngle(){
 
    var target_xy = new Vector2(target.x, target.y);
    var center_xy = new Vector2(arrow.transform.position.x, arrow.transform.position.y);
     
    var vector1 = target_xy - center_xy; 
    var myangle = Vector2.Angle(vector1.normalized, Vector2.right);

    if(vector1.y < 0)
        myangle = 360 - myangle;

    return myangle;
}

function takeDamage(damage : int){
    health -= damage;
}

function die(){
    gameManager.orphansCreated += Random.value * 4;
    if(bow)
        Destroy(bow);
    if(arrow)
        Destroy(arrow);
    Destroy(this.gameObject);
}
