#pragma strict

public var damage : int;
public var knockBackForce : float;
public var cooldown : float;
public var cooldownTimer : float;
public var anim : Animator;

function Start(){
    cooldownTimer = 0;
}

function FixedUpdate(){
    if (cooldownTimer > 0)
        cooldownTimer -= Time.deltaTime;
    if (cooldownTimer < 0)
        cooldownTimer = 0;
}

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
