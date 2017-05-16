#pragma strict

//Texture_0 already assinged
public var randomNumber : float;
public var texture_1 : Sprite;
public var texture_2 : Sprite;
public var texture_3 : Sprite;
private var usedSprite : SpriteRenderer;
usedSprite = gameObject.GetComponent.<SpriteRenderer>();

public var weight_0 : float = 0.25;
public var weight_1 : float = 0.25;
public var weight_2 : float = 0.25;
public var weight_3 : float = 0.25;


function Start(){
	randomNumber = Random.Range(0,1024);
	setSprite(randomNumber);
}

function setSprite(number : float){

	if(number<(1024*weight_0)){
	} else {
		if(number<(1024*(weight_0+weight_1))){
			usedSprite.sprite = texture_1;
		} else {
			if(number<(1024*(weight_0+weight_1+weight_2))){
				usedSprite.sprite = texture_2;
			} else {
				usedSprite.sprite = texture_3;
			}
		}
	}
}