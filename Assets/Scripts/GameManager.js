#pragma strict
import UnityEngine.UI;

public var timer : float = 0;
public var timeLimit : float = 10;
public var overTime : boolean = false;

public 

public var text_time: Text;

function Start () {
	timer = timeLimit;
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