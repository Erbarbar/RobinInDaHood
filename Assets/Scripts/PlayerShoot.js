#pragma strict

public var shooting : boolean;
public var shootSpeed : float;
public var arrowPrefab : GameObject;
public var reloadTime : float = 1.5;
public var reloadTimer: float = 0;
public var angle : float;
public var damage : int = 1;

//============================
public var arrow : GameObject;
public var posOffset : Vector2;
public var mousePos : Vector2;
public var playerPos:Vector3;


function Start () {
	shooting = false;
	reloadTimer = 0;
}

function Update () {
	if (reloadTimer > 0){
		reloadTimer -= Time.deltaTime;
	}
	if (Input.GetMouseButton(0)) {
		if (reloadTimer <= 0 && shooting == false) {
			reloadTimer = reloadTime;
			arrow = Instantiate(arrowPrefab, transform.position + posOffset, Quaternion.identity) as GameObject;
			arrow.transform.rotation = Quaternion.identity;
			arrow.transform.Rotate(Vector3.forward, angle);
			shooting = true;
		} else if (shooting == true) {
			getAngle();
			arrow.transform.position = transform.position + posOffset;
			arrow.transform.rotation = Quaternion.identity;
			arrow.transform.Rotate(Vector3.forward, angle);
		}
	} else if (shooting == true) {
		var rb = arrow.GetComponent("Rigidbody2D") as Rigidbody2D;
		rb.AddForce(new Vector2(Mathf.Cos(angle*Mathf.PI/180),Mathf.Sin(angle*Mathf.PI/180)) * shootSpeed, ForceMode2D.Impulse);
		shooting = false;
	}

}

function getAngle(){
	/*
	var playerPos2D = gameObject.transform.position;
	var playerPos3D = new Vector3(playerPos2D.x, playerPos2D.y,0); 
	playerPos = playerPos3D;
	mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);

	angle = Vector3.Angle(playerPos3D,mousePos);
	*/
	mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
 
 	var mousePos_xy = new Vector2(mousePos.x, mousePos.y);
	var center_xy = new Vector2(arrow.transform.position.x, arrow.transform.position.y);
	 
	var vector1 = mousePos_xy - center_xy; // VectorToMoveTo
	
	var myangle = Vector2.Angle(vector1.normalized, Vector2.right);
	if(vector1.y < 0)
		myangle = 360 - myangle;
	angle = myangle;
	
}
