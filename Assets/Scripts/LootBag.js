#pragma strict
import UnityEngine.UI;

public var loot : int;
public var extraMassPercent : float; 
public var text_mass : Text;
public var baseMass : float;
public var playerRB : Rigidbody2D;

/**
*Called upon loading the Scene
*/
function Start () {
    extraMassPercent = 0;
    baseMass = playerRB.mass;
}

/**
*Called each frame
*/
function Update () {
    text_mass.text = extraMassPercent + "";
    if(extraMassPercent < 0)
        extraMassPercent = 0;
}

/**
*Called each fixed framerate frame
*/
function FixedUpdate(){
    playerRB.mass = baseMass + extraMassPercent*baseMass/100;
}

/**
*Add the value and weight to the lootbag
*@param{float} mass the weight to be added
*@param{float} value the value to be added
*/
function addLoot(mass : float, value : float){
    extraMassPercent += mass;
    loot += value;
}

/**
*remove the value and weight from the lootbag
*@param{float} mass the weight to be removed
*@param{float} value the value to be removed
*/
function removeLoot(mass : float, value : float){
    extraMassPercent -= mass;
    loot += value;
}
