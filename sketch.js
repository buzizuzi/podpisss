let isDrawing = false;
let points = [];
let clearButton;
let headImage;
let buttonWidth = 90;
let buttonHeight = 50;
let buttonY;
let margin = 20;
let button1X;
let button2X;

function preload(){
  headImage= loadImage('PASEK4.png');
}

function setup() {
  createCanvas(1920, 1080);  
  textSize(20);
  
  buttonY = height / 2 - buttonHeight / 2;
  button1X = width - 210;
  button2X = width - 110;

  let rectX = width / 2 - 602 / 2;
  let rectY = height / 2 - 102 / 2;

  clearButton = createButton('Wyczyść');
  clearButton.position(rectX + 300 - clearButton.width / 2, rectY + 120);
  clearButton.mousePressed(clearDrawing);
}

function draw() {
  background(255);
  image(headImage, 0,0, 1920,220);

  strokeWeight(2);

  let rectX = width / 2 - 602 / 2;
  let rectY = height / 2 - 102 / 2;

  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
 
  noStroke();
  textStyle (NORMAL);
  text("Prosimy nie wychodzić poza pole", width / 2, rectY - 20);

  fill(0);
  textStyle (BOLDITALIC);
  text("Miejsce na czytelny podpis", width / 2, rectY - 50);

  fill(245);
  stroke(0, 0, 0); // Czerwona ramka
  strokeWeight(3);
  rect(rectX, rectY, 600, 100); // Ramka pola do podpisania

  stroke(0);
  
  noFill();
  beginShape();
  for (let point of points) {
    vertex(point.x, point.y);
  }
  endShape();
  
  drawButton(button1X, buttonY, buttonWidth, buttonHeight, "Cofnij", '#FFB3B3');
  drawButton(button2X, buttonY, buttonWidth, buttonHeight, "Dalej", '#E30613');
}

function mousePressed() {
  let rectX = width / 2 - 600 / 2;
  let rectY = height / 2 - 100 / 2;
  if (mouseX > rectX && mouseX < rectX + 600 && mouseY > rectY && mouseY < rectY + 100) {
    isDrawing = true;
    points.push({ x: mouseX, y: mouseY });
  }
  
   if (isMouseOver(button2X, buttonY, buttonWidth, buttonHeight)) {
    window.open('https://www.wp.pl', '_self');
  }
  
}

function mouseDragged() {
  if (isDrawing) {
    let invertedY = height - mouseY;
    points.push({ x: mouseX, y: invertedY });
  }
}

function drawButton(x, y, w, h, label, baseColor) {
  let hoverColor = lerpColor(color(baseColor), color(0), 0.2);
  if (isMouseOver(x, y, w, h)) {
    fill(hoverColor);
  } else {
    fill(baseColor);
  }
  noStroke();
  rect(x, y, w, h);
  fill(255);
  textSize(20);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function isMouseOver(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function mouseReleased() {
  isDrawing = false;
}

function clearDrawing() {
  points = [];
}
