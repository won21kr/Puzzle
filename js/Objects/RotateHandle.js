
function RotateHandle(options) {
	this.initialize(options);
}
	
var r = RotateHandle.prototype = new createjs.Bitmap();

r.Bitmap_initialize = r.initialize;
	
r.initialize = function(options) {

	var handleImg = new Image();
	handleImg.src = "assets/rotate.png";

	// create image bitmap constructor
  this.Bitmap_initialize(handleImg);
  
  // set parameters
  this.name = "rotate-handle"+this.id;
  this.x = 0;
  this.y = 0;
  
  var rotateImage = this.image;
  var _this = this;
  handleImg.onload = function() {
	  _this.regX = rotateImage.width/2|0;
	  _this.regY = rotateImage.height/2|0;
  }
  this.scaleX = this.scaleY = this.scale = 0.25;
  this.type = "rotate-handle";
  this.visible = false;
  
  this.addEventListener("mousedown", function(evt) {
  	var o = evt.target;
  	var offset = {x:evt.stageX, y:evt.stageY};
  	var start = o.parent.rotation;
  	
  	o.parent.regX = o.x;
  	o.parent.regY = o.y;
  	
  	// add a listener to the event object's mouseMove event
  	// this will be active until the user releases the mouse button:
  	evt.addEventListener("mousemove", function(ev) {
  		o.parent.rotation = start + ((ev.stageX-offset.x)+(ev.stageY-offset.y));
  		//o.y = ev.stageY+offset.y;
  		// indicate that the stage should be updated on the next tick:
  		update = true;
  	});
  });
	
	debug.log(this, 'Created rotate handle');
}

r.updatePosition = function() {

}

r.toString = function() {
	var pieceString = "<h4>Rotate Handle</h4>"
		+ "<ul class='properties'>" 
		+ "<li><span>Position: </span>" + this.x + "," + this.y + "</li>"
		+ "<li><span>Centre: </span>" + this.regX + "," + this.regY + "</li>"
		+ "</ul>";
		
	return pieceString;
}