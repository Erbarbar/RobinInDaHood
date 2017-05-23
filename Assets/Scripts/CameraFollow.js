#pragma strict

public var player : GameObject;

/**
*Called each frame
*Makes camera follow player on the x axis
*/
function Update () {
	this.transform.position = new Vector3(player.transform.position.x, this.transform.position.y,this.transform.position.z);
}
