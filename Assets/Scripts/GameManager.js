#pragma strict
import UnityEngine.UI;

public var score : float;
public var timer : float = 0;
public var timeLimit : float = 10;
public var overTime : boolean = false;
public var minLoot : float = 100;
public var orphansCreated : float;
public var alarm : boolean;
public var lastSeenPos : float;
public var gateClosed : boolean;
public var text_time: Text;

function Start () {
 timer = timeLimit;
 score = 0;
 gateClosed = false;
}

function Update () {
    getTime();
    showTime(timer);
}

function getTime(){
 if(!overTime){
  timer -= Time.deltaTime;
  if(timer <=0){
   overTime = true;
  }
 }else{
  timer += Time.deltaTime;
 }
}

function showTime(time : float){
 var minutes : int = 0;

 while(time >= 60){
  time -= 60;
  minutes++;
 }
 var seconds : int = Mathf.Floor(time);
 if(minutes < 10)
  text_time.text = " ";
 text_time.text = minutes.ToString() + ":";
 if(seconds < 10)
  text_time.text = text_time.text + "0";
 text_time.text = text_time.text + seconds.ToString();

 text_time.color = (overTime)? new Color(255,0,0,1):new Color(0,255,0,1);
}


function onHomeEnter(player : GameObject){
 var lootScript = player.GetComponent("LootBag") as LootBag;
 var loot = lootScript.loot;
 if(loot < minLoot)
  return;
 var healthScript = player.GetComponent("Health") as Health;
 var health = healthScript.currentHealth;
 calcScore(health, loot, timer, overTime);
}

function calcScore(health : int, loot : float, time : float, overTime : boolean){
 score = (health*100) + (loot*100) + ((overTime)? -time : time*10);
}