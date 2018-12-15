var song;
var fft;
var button;

$(document).ready(function() {
	$( "#playMusic" ).on( "click", function() {
  		if (song.isPlaying()) {
    		song.pause();
  		} else {
    		song.play();
  		}
	});
});

function preload() {
  song = loadSound('assets/discodisco.mp3');
}

/*
var osc, fft;

function setup() {
  createCanvas(720, 256);

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(.5);

  fft = new p5.FFT();
  osc.start();
}

function draw() {
  background(255);

  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  strokeWeight(5);
  var amp;

   var spectrum = fft.analyze();
   for (var i = 0; i < spectrum.length; i++) {
   	 amp = spectrum[i];
     var x = map(i, 0, spectrum.length, 0, width);
     var y = map(spectrum[i], -1, 1, height, 0);
     vertex(x, y);

     //var amp = map(mouseY, 0, height, 1, .01);
  }

  endShape();

     //freq = 255;
     //osc.freq(freq);

     //osc.amp(amp);

  // change oscillator frequency based on mouseX
  //var freq = map(mouseX, 0, width, 40, 880);

}
*/

var xspacing = 8;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var period = 500.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave

function setup() {
  createCanvas(710, 400);

  $( ".main-container" ).append( $( ".p5Canvas" ) );
  w = width+16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));
  fft = new p5.FFT(0.7, 256);
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for 
  // 'angular velocity' here)
  theta += 0.02;
  var amp;
  var x = theta;

   var spectrum = fft.analyze();
   for (var i = 0; i < spectrum.length; i++) {
    //var x = map(i, 0, spectrum.length, 0, 360);
    amp = spectrum[i];
    yvalues[i] = sin(x)*(amp/2);
    x+=dx;
  }
}

function renderWave() {
  noStroke();
  fill(255, 228, 225);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
  		console.log(x);
  	  	translate(x*xspacing, height/2+yvalues[x]);
  		rotate(yvalues[x] / x);
  		star(0, 0, 5, 70, 3); 
    	//ellipse(x*xspacing, height/2+yvalues[x], 5, 5);
  }
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

