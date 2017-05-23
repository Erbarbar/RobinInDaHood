#pragma strict

public var script : Movement;

/**
*Called when a collider enters a trigger zone.
*Used to determine if player entered a ladder.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. SGameObject should be Player.
*/
function OnTriggerEnter2D(coll: Collider2D){
    if ( coll.gameObject.tag == "Player"){
        script = coll.gameObject.GetComponent("Movement") as Movement;
        script.OnLadderEnter();
    }
}

/**
*Called when a collider left a trigger zone.
*Used to determine if player left a ladder.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. GameObject should be Player.
*/
function OnTriggerExit2D(coll: Collider2D){
    if ( coll.gameObject.tag == "Player"){
        script = coll.gameObject.GetComponent("Movement") as Movement;
        script.OnLadderExit();
    }
}
