#pragma strict

/**
*Load level 1.
*/
public function newGame(){
    Application.LoadLevel ("Level 1");
}

/**
*Clear HighScore
*/
public function clearHighScore(){
    PlayerPrefs.SetFloat("HighScore",0.0);
}

/**
*Quit Game.
*/
public function Quit(){
    PlayerPrefs.Save();
    Application.Quit();
}
