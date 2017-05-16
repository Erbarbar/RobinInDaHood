#pragma strict

public var mass : float;
public var lootBag : LootBag;

function OnTriggerEnter2D(coll : Collider2D){
    if(coll.gameObject.tag == "Player"){
        lootBag = coll.gameObject.GetComponent("LootBag") as LootBag;
       lootBag.addMass(mass);
        Destroy(this.gameObject); 
    }
}
