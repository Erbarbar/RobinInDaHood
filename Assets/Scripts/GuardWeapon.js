#pragma strict

public var damage : int;
public var knockBackForce : float;
public var cooldown : float;
public var cooldownTimer : float;
public var anim : Animator;

/**
*Called upon loading the Scene
*/
function Start(){
    cooldownTimer = 0;
}

/**
*Called every fixed framerate frame.
*Handles NPC attack intervals
*/
function FixedUpdate(){
    if (cooldownTimer > 0)
        cooldownTimer -= Time.deltaTime;
    if (cooldownTimer < 0)
        cooldownTimer = 0;
}

/**
*Called when a collider stays in a trigger zone.
*Attack and dammages player if cooldown allows it, and knocks player back.
*@param{Collider2D} coll The collider on the Gamobject that enters the trigger. GameObject should be Player.
*/
function OnTriggerStay2D(coll : Collider2D){
    if(coll.tag == "Player"){
        if(cooldownTimer == 0){
            anim.SetTrigger("Attacking");
            cooldownTimer = cooldown;
            coll.SendMessage("takeDamage", damage);
            var player = coll.gameObject.GetComponent("Rigidbody2D") as Rigidbody2D;
            player.AddForce((player.transform.position - this.transform.position)*knockBackForce , ForceMode2D.Impulse);
        }
    }
}
