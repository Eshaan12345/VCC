x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
draw_apple = "";
speak_data = "";
var SpeechRecognition = window.webkitSpeechRecognition;
to_number = "";
var recognition = new SpeechRecognition();

function preload() 
{
  draw_apple = loadImage('apple.png');  
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
    to_number = Number(content);
    
    if (Number.isInteger(to_number))
    {
      document.getElementById("status").innerHTML = "The speech has been recognized ";
      draw_apple = "set";
    } else 
    {
      document.getElementById("status").innerHTML = "The speech has not been recognized as a number ";
    }

}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;

  canvas = createCanvas(screen_width, screen_height - 150);
  canvas.position(0, 150);
}

function draw() {
  if(draw_apple == "set")
  {
    for (let index = 1; index < to_number; index++) {
      x = Math.floor(Math.random * 700);
      y = Math.floor(Math.random * 400);
      image("apples.png", x, y, 200, 200);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "Apples Drawn" + to_number;
}
