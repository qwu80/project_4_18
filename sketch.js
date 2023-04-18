// sketch.js
let slider;
let canvasWidth = 800;
let canvasHeight = 600;
let maxRadius = 800;
let waveList = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  slider = createSlider(50, 250, 100);
  slider.position(10, 10);
  slider.style("width", "80px");
}

function draw() {
  background(0);
  let slitDistance = slider.value();
  drawDoubleSlit(slitDistance);
  updateWaves(slitDistance);
  drawWaves();
}

function drawDoubleSlit(distance) {
  fill(255);
  rect(0, canvasHeight - 100, (canvasWidth - distance) / 2-10, 20);
  rect((canvasWidth + distance) / 2+10, canvasHeight - 100, (canvasWidth - distance) / 2, 20);

  rect((canvasWidth - distance) / 2+10, canvasHeight - 100, distance-20 , 20);
 
}




function updateWaves(slitDistance) {
  if (frameCount % 20 === 0) { // Increase interval between new waves
    let slit1 = (canvasWidth - slitDistance) / 2;
    let slit2 = (canvasWidth + slitDistance) / 2;
    waveList.push({ x: slit1, y: canvasHeight - 90, radius: 0 });
    waveList.push({ x: slit2, y: canvasHeight - 90, radius: 0 });
  }

  for (let i = waveList.length - 1; i >= 0; i--) {
    let wave = waveList[i];
    wave.radius += 1; // Decrease the speed at which the radii expand

    if (wave.radius > maxRadius) {
      waveList.splice(i, 1);
    }
  }
}

function drawWaves() {
  for (let wave of waveList) {
    let phaseOffset = wave.radius * 1.5;
    let phase = map(cos(radians(frameCount - phaseOffset)), -1, 1, 0, 255);
    let waveColor = color(0, 255 - phase, phase); // Green to blue
    drawCircleWave(wave.x, wave.y, wave.radius, waveColor);
  }
}


function drawCircleWave(x, y, radius, col) {
  stroke(col);
  noFill();
  ellipse(x, y, radius * 2, radius * 2);
}
