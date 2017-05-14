#pragma strict

public var player : GameObject;

function Update () {
	this.transform.position = new Vector3(player.transform.position.x, this.transform.position.y,this.transform.position.z);
}
