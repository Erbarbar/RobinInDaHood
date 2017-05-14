#pragma strict

private var angle : float;
public var speed : float;
private var startingPos : Vector2;

function Start () {
	angle = Random.value * 2 * Mathf.PI;
    startingPos = this.gameObject.transform.position;
}

function Update () {
	this.gameObject.transform.position = new Vector2(startingPos.x, startingPos.y - 0.1 * Mathf.Sin(angle));
    angle += speed * Time.deltaTime;
}
