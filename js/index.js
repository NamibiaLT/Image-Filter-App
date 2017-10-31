window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;

var image = null;
var canvas = null;
var greyimage = null;
var rgbimage = null;
var blurimage = null;
var rainbowimage = null;


function upload(){
  canvas = document.getElementById("c1");
  var fileinput = document.getElementById("finput");
  image = new SimpleImage(fileinput);
  
  image.drawTo(canvas);
  alert("Image has been uploaded");
}

function imageLoaded(image) {
  console.log(image);
  if ((image !== null) || image.complete()) {
    return true;
  
  } else {
    return false;
    
  }
}
function greyFilter(){
  console.log(image);
  greyimage = new SimpleImage (image.getWidth(),image.getHeight());
   for(var pixel of image.values()){
 var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
   var x = pixel.getX();
   var y = pixel.getY();
     
    greyimage.setRed(x, y, avg);
    greyimage.setGreen(x, y, avg);
    greyimage.setBlue(x, y, avg); 
}
}

function makeGrey(){
 
  if (imageLoaded(image)){
    greyFilter();
    greyimage.drawTo(canvas);
  }
  }

function rgbFilter(){
  console.log(image);
  rgbimage = new SimpleImage(image.getWidth(), image.getHeight());
  var w = image.getWidth();
  for(var pixel of image.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    
    if (x < w/3)
    {rgbimage.setRed(x,y,pixel.getRed());
    }
    if (x >= w/3 && x < 2*w/3)
    {rgbimage.setGreen(x,y,pixel.getGreen());
    }
    if (x >= 2*w/3  && x <= w)
    {rgbimage.setBlue(x,y,pixel.getBlue());
    } 
  }
}
  
function rgb(){
  if (imageLoaded(image)){
    rgbFilter();
    rgbimage.drawTo(canvas);
  }
}


function rainbowFilter(){
    rainbowimage = new SimpleImage(image.getWidth(),image.getHeight());
    var w = rainbowimage.getWidth();
    var h = rainbowimage.getHeight();
    for(var pixel of image.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var avg = (pixel.getRed()+ pixel.getGreen() +pixel.getBlue())/3;
      if (y <= h/7){
        if (avg < 128){
          rainbowimage.setRed(x , y, 2*avg);
          rainbowimage.setGreen(x, y, 0);
          rainbowimage.setBlue(x, y, 0);
        } 
        else {
          rainbowimage.setRed(x, y, 255);
          rainbowimage.setGreen(x, y, 2*avg - 255);
          rainbowimage.setBlue(x, y, 2*avg - 255);
        }
      }
      else if (y > h/7 && y <= 2*h/7){
        if (avg < 128){
          rainbowimage.setRed(x, y, 2*avg);
          rainbowimage.setGreen(x, y, 0.8*avg);
          rainbowimage.setBlue(x, y, 0);
        }
        else{
          rainbowimage.setRed(x, y, 255);
          rainbowimage.setGreen(x, y, 1.2*avg-51);
          rainbowimage.setBlue(x, y, 2*avg-255);
        } 
      }
      else if(y > h * 2/7 && y <= h * 3/7){
        if(avg < 128){
          rainbowimage.setRed(x, y, 2*avg);
          rainbowimage.setGreen(x, y, 2*avg);
          rainbowimage.setBlue(x, y, 0);
        } 
        else{
          rainbowimage.setRed(x, y, 255);
          rainbowimage.setGreen(x, y, 255);
          rainbowimage.setBlue(x, y, 2*avg-255);
        }
      }
      else if (y > 3*h/7 && y <= 4*h/7){
        if (avg < 128){
          rainbowimage.setRed(x, y, 0);
          rainbowimage.setGreen(x, y, 2*avg);
          rainbowimage.setBlue(x, y, 0)
        }
        else{
          rainbowimage.setRed(x, y, 2*avg - 255);
          rainbowimage.setGreen(x, y, 255);
          rainbowimage.setBlue(x, y, 2*avg - 255);
        }
      }
      else if(y > 4 * h/7 && y <= 5 *h/7){
        if(avg <128){
          rainbowimage.setRed(x, y, 0);
          rainbowimage.setGreen(x, y, 0);
          rainbowimage.setBlue(x, y, 2*avg);
        } 
        else {
          rainbowimage.setRed(x, y, 2*avg - 255);
          rainbowimage.setGreen( x, y, 2*avg - 255);
          rainbowimage.setBlue(x, y, 255);
        }
      }
      else if (y > 5 * h / 7 && y <= 6 * h / 7) {
        if (avg < 128) {
        rainbowimage.setRed(x, y, 0.8 * avg);
        rainbowimage.setGreen(x, y, 0);
        rainbowimage.setBlue(x, y, 2 * avg);
        } 
        else {
        rainbowimage.setRed(x, y, 1.2 * avg - 51);
        rainbowimage.setGreen(x, y, 2 * avg - 255);
        rainbowimage.setBlue(x, y, 255);
        }
      }
      else if (y > h * 6 / 7 && y <= h) {
        if (avg < 128) {
        rainbowimage.setRed(x, y, 1.6 * avg);
        rainbowimage.setGreen(x, y, 0);
        rainbowimage.setBlue(x, y, 1.6 * avg);
        } 
        else {
        rainbowimage.setRed(x, y, 0.4 * avg + 153);
        rainbowimage.setGreen(x, y, 2 * avg - 255);
        rainbowimage.setBlue(x, y, 0.4 * avg + 153);
        }
      }
    }
  }
  
function rainbow(){
  if(imageLoaded(image)){
      rainbowFilter();
      rainbowimage.drawTo(canvas);
  }
 }
  

function blurFilter() {
  console.log(image);
  blurimage = new SimpleImage(image.getWidth(), image.getHeight());
  
  for (var pixel of image.values()) {
    var rando = Math.random();
    var x= pixel.getX();
    var y = pixel.getY();
    
    if (rando < 0.5) {
    blurimage.setPixel(x,y,pixel);
    }
    else {
      // randX and randY give a random # btw. 1 and 10
      var randX = Math.floor((Math.random()*100)+1); 
      var randY = Math.floor((Math.random()*100)+1);
      var newX = x + randX;
      var newY = y + randY;
      if ( newX > image.getWidth()-1) {
        newX = image.getWidth()-1;
      } 
        if (newX <0) {
          newX = 0;
        }
       if(newY > image.getHeight()-1) {
         newY = image.getHeight()-1;
       }
       if (newY <0) {
          newY = 0;
       }
      
      var newPixel = image.getPixel(newX,newY);
      blurimage.setPixel(x,y,newPixel);
    }
  }
}

function blurPic(){
  if (imageLoaded(image)){
    blurFilter();
    blurimage.drawTo(canvas);
  }
}

function reset() {
  if (imageLoaded(image)) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    upload();
   
  }
}

function doDownload(){
  if (imageLoaded(image)){
    var context = canvas.getContext("2d");
    imageLoaded(image);
    
  }
}
