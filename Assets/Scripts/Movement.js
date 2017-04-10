#pragma strict

public var maxMovementSpeed : float = 5;
public var moveForce : float = 1;
public var jumpForce : float = 10;
public var jumping : boolean = false;

public var rb : Rigidbody2D;
public var horizontalMovement : float = 0;

public var speedx : float;
public var speedy : float;

function Start () {
}

function Update () {
	horizontalMovement = Input.GetAxisRaw("Horizontal");
	rb.AddForce(new Vector2(horizontalMovement * moveForce, 0));
	if(Input.GetKeyDown("space") && !jumping){
		rb.AddForce(new Vector2(.0f, jumpForce),ForceMode2D.Impulse);
		jumping = true;
	}
	capSpeed();
	speedx = rb.velocity.x;
	speedy = rb.velocity.y;
}

function capSpeed(){
	if( rb.velocity.x > maxMovementSpeed){
		rb.velocity = new Vector2(maxMovementSpeed,rb.velocity.y);
	}else if( rb.velocity.x < -maxMovementSpeed){
		rb.velocity = new Vector2(-maxMovementSpeed,rb.velocity.y);
	}
}

function OnCollisionEnter2D(collision2D: Collision2D) {
	if(collision2D.gameObject.tag == "Floor")
		jumping = false;
}
