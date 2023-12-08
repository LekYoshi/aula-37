const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var isSad = false
var mute
var soundEating
var soundSad
var bgSound
var soundBalloon, balloon
var ground
var rope, ropeSound
var fruit, fruitImg
var fruitradius
var link
var bgImg
var bunnyImg, bunny
var button
var eat
var blink
var sad

function preload() {
  //images
  fruitImg = loadImage("./assets/assets/melon.png")
  bgImg = loadImage("./assets/assets/background.png")
  bunnyImg = loadImage("./assets/assets/Rabbit-01.png")
  //animation
  eat = loadAnimation("./assets/assets/eat_0.png", "./assets/assets/eat_1.png", "./assets/assets/eat_2.png", "./assets/assets/eat_3.png", "./assets/assets/eat_4.png")
  blink = loadAnimation("./assets/assets/blink_1.png", "./assets/assets/blink_2.png", "./assets/assets/blink_3.png")
  sad = loadAnimation("./assets/assets/sad_1.png", "./assets/assets/sad_2.png", "./assets/assets/sad_3.png")
  //setups
  blink.playing = true
  blink.looping = true
  eat.playing = true
  eat.looping = false
  sad.playing = true
  sad.looping = false
  //som
  soundBalloon = loadSound("./assets/assets/sounds/air.wav")
  ropeSound = loadSound("./assets/assets/sounds/rope_cut.mp3")
  soundEating = loadSound("./assets/assets/sounds/eating_sound.mp3")
  soundSad = loadSound("./assets/assets/sounds/sad.wav")
  bgSound = loadSound("./assets/assets/sounds/sound1.mp3")

}


function setup() {
  createCanvas(500, windowHeight);
  engine = Engine.create();
  world = engine.world;
  var fruitoptions = {
    density: 0.001
  }
  fruitradius = 20
  //bgSound.play()
  bgSound.setVolume(0.25)
  //criando o solo
  ground = new Ground(200, height - 10, 600, 20)
  rope = new Rope(6, { x: 245, y: 30 })
  fruit = Bodies.circle(300, 300, fruitradius, fruitoptions)
  Composite.add(rope.body, fruit)
  link = new Link(rope, fruit)
  //bunny
  bunny = createSprite(width -50, height - 80)
  blink.frameDelay = 12
  eat.frameDelay = 20
  sad.frameDelay = 20
  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eat)
  bunny.addAnimation("crying", sad)
  bunny.changeAnimation("blinking")
  bunny.scale = 0.2
  //botão
  button = createImg("./assets/assets/cut_button.png")
  button.size(50, 50)
  button.position(230, 30)
  button.mouseClicked(drop)
  //mute
  mute = createImg("./assets/assets/mute.png")
  mute.size(50, 50)
  mute.position(430, 30)
  mute.mouseClicked(silence)
  //balloon
  balloon = createImg("./assets/assets/balloon.png")
  balloon.size(150, 100)
  balloon.position(75, 230)
  balloon.mouseClicked(airBlow)
  //settings
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
}

function draw() {
  background(51);

  image(bgImg, width / 2, height / 2, width, height)
  Engine.update(engine)
  ground.display()
  rope.show()

  if (fruit != null)
    image(fruitImg, fruit.position.x, fruit.position.y, fruitradius + 45, fruitradius + 45)

  if (collide(fruit, bunny)) {
    bunny.changeAnimation("eating")
    World.remove(world, fruit)
    fruit = null
    soundEating.play()
  }
  if (fruit != null && fruit.position.y > bunny.position.y) {
    bunny.changeAnimation("crying")
    if (!isSad ){
      soundSad.play()
       isSad =true
    }
  }

  drawSprites()


  //mouse position
  textSize(20)
  text("X: " + mouseX + " | Y: " + mouseY, mouseX, mouseY)

}
function drop() {
  rope.break()
  link.detach()
  link = null
  ropeSound.play()
}
function collide(body, sprite) {
  if (body != null) {
    var D = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (D <= 80) {
      return true
    }
    else {
      return false
    }
  }
}

function airBlow() {
  Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 })
  soundBalloon.play()
}

function silence() {
  if (bgSound.isPlaying()) {
    bgSound.stop()
  }
  else {
    bgSound.play()
  }
}



