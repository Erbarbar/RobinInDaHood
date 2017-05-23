#pragma strict
import UnityEngine.UI;

public var loot : int;
public var extraMassPercent : float; 
public var text_mass : Text;
public var baseMass : float;
public var playerRB : Rigidbody2D;


function Start () {
    extraMassPercent = 0;
    baseMass = playerRB.mass;
}

function Update () {
    text_mass.text = extraMassPercent + "";
    if(extraMassPercent < 0)
        extraMassPercent = 0;
}
function FixedUpdate(){
    playerRB.mass = baseMass + extraMassPercent*baseMass/100;
}

function addLoot(mass : float, value : float){
    extraMassPercent += mass;
    loot += value;
}

function removeLoot(mass : float, value : float){
    extraMassPercent -= mass;
    loot += value;
}
