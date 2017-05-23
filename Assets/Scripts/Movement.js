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

function FixedUpdate () {
	if(!paused){
		horizontalMovement = Input.GetAxisRaw("Horizontal");
		//if(grounded > 0 || canClimb > 0)
			rb.AddForce(new Vector2(horizontalMovement * moveForce, 0));

		verticalMovement = Input.GetAxisRaw("Vertical");
		if(canClimb){
			rb.AddForce(new Vector2(0, verticalMovement * climbForce));
		}

		if(Input.GetKeyDown("space") && grounded > 0){
			Debug.Log("Jump");
			rb.AddForce(new Vector2(.0f, jumpForce),ForceMode2D.Impulse);
			grounded = 0;
		}
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


function OnTriggerEnter2D(coll: Collider2D){
	if (coll.gameObject.tag == "Floor"){
		grounded++;
	}
}

function OnTriggerExit2D(coll: Collider2D){
	if (coll.gameObject.tag == "Floor"){
		grounded--;
	}
}

function OnLadderEnter(){
	if(++canClimb > 0){
		rb.gravityScale = 0;
		rb.drag = 10;
		rb.velocity = new Vector2(rb.velocity.x, 0);
	}
}

function OnLadderExit(){
	if (--canClimb == 0){
		rb.gravityScale = gravity;
		rb.drag = 3;
	}
}
