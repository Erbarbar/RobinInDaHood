#pragma strict
import UnityEngine.UI;

public var paused: boolean=false;
public var shooting : boolean;
public var numberOfArrows : int;
public var shootSpeed : float;
public var reloadTime : float = 1.5;
public var damage : int = 1;

public var arrowPrefab : GameObject;
public var bow : GameObject;
public var text_numberOfArrows : Text;

//============================
private var reloadTimer: float = 0;
private var angle : float;
private var arrow : GameObject;
private var posOffset : Vector2;
private var mousePos : Vector2;
private var playerPos:Vector3;

public var audioSource : AudioSource;
public var drawSound : AudioClip;
public var shootSound : AudioClip;

function Start () {
	shooting = false;
	reloadTimer = 0;
}

function Update () {
	text_numberOfArrows.text = "x" + numberOfArrows;
	if (reloadTimer > 0){
		reloadTimer -= Time.deltaTime;
	}
	if( shooting == false){
		bow.SetActive(false);
	}else {
		bow.SetActive(true);
	}
	if (Input.GetMouseButton(0)&&!paused) {
		if (reloadTimer <= 0 && shooting == false && numberOfArrows > 0) {
			GetComponent.<AudioSource>().PlayOneShot(drawSound, 1);
			reloadTimer = reloadTime;
			arrow = Instantiate(arrowPrefab, transform.position + posOffset, Quaternion.identity) as GameObject;
			arrow.transform.rotation = Quaternion.identity;
			arrow.transform.Rotate(Vector3.forward, angle);
			shooting = true;
			numberOfArrows--;
		} else if (shooting == true) {
			getAngle();
			arrow.transform.position = transform.position + posOffset;
			arrow.transform.rotation = Quaternion.identity;
			arrow.transform.Rotate(Vector3.forward, angle);

			bow.transform.rotation = Quaternion.identity;
			bow.transform.Rotate(Vector3.forward, angle);
			bow.transform.position = transform.position + posOffset;
		}
	} else if (shooting == true) {
		var rb = arrow.GetComponent("Rigidbody2D") as Rigidbody2D;
		rb.AddForce(new Vector2(Mathf.Cos(angle*Mathf.PI/180),Mathf.Sin(angle*Mathf.PI/180)) * shootSpeed, ForceMode2D.Impulse);
		GetComponent.<AudioSource>().PlayOneShot(shootSound, 1);
		shooting = false;
	}

}

function getAngle(){
	mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
 
 	var mousePos_xy = new Vector2(mousePos.x, mousePos.y);
	var center_xy = new Vector2(arrow.transform.position.x, arrow.transform.position.y);
	 
	var vector1 = mousePos_xy - center_xy; // VectorToMoveTo
	
	var myangle = Vector2.Angle(vector1.normalized, Vector2.right);
	if(vector1.y < 0)
		myangle = 360 - myangle;
	angle = myangle;
	
}
