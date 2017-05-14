#pragma strict

public var maxMovementSpeed : float;
public var moveForce : float;
public var climbForce : float; 
public var gravity : float = 9.8;

public var jumpForce : float;
public var grounded : boolean;
public var canClimb: boolean;

public var rb : Rigidbody2D;
public var horizontalMovement : float = 0;
public var verticalMovement : float = 0;

public var speedx : float;
public var speedy : float;

public var anim : Animator;

function Update(){
	anim.SetFloat("Speedx", Mathf.Abs(speedx));
	anim.SetFloat("Speedy", Mathf.Abs(speedy));
	var spriteRend = gameObject.GetComponent("SpriteRenderer") as SpriteRenderer;
	if(speedx > 0.1){
		spriteRend.flipX = false;
	} else if (speedx < -0.1) {
		spriteRend.flipX = true;
	}
	if(canClimb){
		anim.SetBool("Climbing",true);
	} else {
		anim.SetBool("Climbing",false);
	}
}

function FixedUpdate () {
	horizontalMovement = Input.GetAxisRaw("Horizontal");
	rb.AddForce(new Vector2(horizontalMovement * moveForce, 0));

	verticalMovement = Input.GetAxisRaw("Vertical");
	if(canClimb){
		rb.AddForce(new Vector2(0, verticalMovement * climbForce));
	}

	if(Input.GetKeyDown("space") && grounded){
		rb.AddForce(new Vector2(.0f, jumpForce),ForceMode2D.Impulse);
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

function OnCollisionStay2D(coll: Collision2D) {
	if(coll.gameObject.tag == "Floor"){
		grounded = true;
	}
}
function OnCollisionExit2D(coll: Collision2D){
	if (coll.gameObject.tag == "Floor"){
		grounded = false;
	}
}

function OnLadderEnter(){
	rb.gravityScale = 0;
	rb.drag = 10;
	rb.velocity = new Vector2(rb.velocity.x, 0);
	canClimb = true;
}

function OnLadderExit(){
	rb.gravityScale = gravity;
	rb.drag = 3;
	canClimb = false;
}
