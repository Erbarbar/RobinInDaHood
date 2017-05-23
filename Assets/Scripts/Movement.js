#pragma strict

public var paused: boolean=false;

public var maxMovementSpeed : float;
public var moveForce : float;
public var climbForce : float; 
public var gravity : float = 9.8;

public var jumpForce : float;
public var grounded : int;
public var canClimb: int;

public var rb : Rigidbody2D;
public var horizontalMovement : float = 0;
public var verticalMovement : float = 0;

public var speedx : float;
public var speedy : float;

public var anim : Animator;

/**
*Called each frame.
*Adjusts animaton and sprite to movement
*/
function Update(){
	anim.SetFloat("Speedx", Mathf.Abs(speedx));
	anim.SetFloat("Speedy", Mathf.Abs(speedy));
	var spriteRend = gameObject.GetComponent("SpriteRenderer") as SpriteRenderer;
	if(speedx > 0.1){
		spriteRend.flipX = false;
	} else if (speedx < -0.1) {
		spriteRend.flipX = true;
	}
	if(canClimb > 0){
		anim.SetBool("Climbing",true);
	} else {
		anim.SetBool("Climbing",false);
	}
	if(grounded < 0)
		grounded = 0;
}

/**
*Called every fixed framerate frame.
*Gets User input and moves player
*/
function FixedUpdate () {
	if(!paused){
		horizontalMovement = Input.GetAxisRaw("Horizontal");
		rb.AddForce(new Vector2(horizontalMovement * moveForce, 0));

		verticalMovement = Input.GetAxisRaw("Vertical");
		if(canClimb){
			rb.AddForce(new Vector2(0, verticalMovement * climbForce));
		}

		if(Input.GetKeyDown("space") && grounded > 0){
			rb.AddForce(new Vector2(.0f, jumpForce),ForceMode2D.Impulse);
			grounded = 0;
		}
	}
	capSpeed();
	speedx = rb.velocity.x;
	speedy = rb.velocity.y;
}

/**
* Sets Maximum Movement speed
*/
function capSpeed(){
	if( rb.velocity.x > maxMovementSpeed){
		rb.velocity = new Vector2(maxMovementSpeed,rb.velocity.y);
	}else if( rb.velocity.x < -maxMovementSpeed){
		rb.velocity = new Vector2(-maxMovementSpeed,rb.velocity.y);
	}
}

/**
*Called when a collider enters a trigger zone.
*Increase counter to count the amount of GamObjects in the trigger.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. GameObject should be Floor.
*/
function OnTriggerEnter2D(coll: Collider2D){
	if (coll.gameObject.tag == "Floor"){
		grounded++;
	}
}

/**
*Called when a collider enters a trigger zone.
*decrease counter to count the amount of GamObjects that left the trigger. 
*@param{Collider2D} coll The collider on the Gamobject that leaves the trigger. GameObject should be Floor.
*/
function OnTriggerExit2D(coll: Collider2D){
	if (coll.gameObject.tag == "Floor"){
		grounded--;
	}
}

/**
*Counts how many ladder tiles are in use. If more than 0, gives the option to go vertical.
*/
function OnLadderEnter(){
	if(++canClimb > 0){
		rb.gravityScale = 0;
		rb.drag = 10;
		rb.velocity = new Vector2(rb.velocity.x, 0);
	}
}

/**
*Counts how many ladder tiles are in use. If 0, removes the option to go vertical.
*/
function OnLadderExit(){
	if (--canClimb == 0){
		rb.gravityScale = gravity;
		rb.drag = 3;
	}
}
