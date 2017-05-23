#pragma strict

/**
*Load level 1.
*/
public function newGame(){
    Application.LoadLevel ("Level 1");
}

/**
*Quit Game.
*/
public function Quit(){
    PlayerPrefs.Save();
    Application.Quit();
}
