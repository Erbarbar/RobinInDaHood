#pragma strict

public var mass : float;
public var value : float;
public var lootBag : LootBag;

/**
*Called when a collider enters a trigger zone.
*Used to pick up Items.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. GameObject should be Player.
*/
function OnTriggerEnter2D(coll : Collider2D){
    if(coll.gameObject.tag == "Player"){
        lootBag = coll.gameObject.GetComponent("LootBag") as LootBag;
        lootBag.addLoot(mass, value);
        Destroy(this.gameObject); 
    }
}
