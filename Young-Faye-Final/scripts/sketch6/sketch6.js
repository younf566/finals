const sketch6 = (p) => {
  let scene = -1; 
  let player;
  let hearts = [];
  let diningroom, gardenImage, kitchen;
  let ingredients = [];
  let inventory = [];
  let girlFront, girlBack, girlIdle;
  let tomato, cabbage, onion, leek;
  let startButtonImg, nextButtonImg, panImg, dishImg, mealImg, starGif;
  let mealActivated = false;
  const grabDistance = -40;
  let panActive = false; 
  let dishCompleted = false;
  let selectedIngredient = null; 
  let fade = 0; // For fade effect
  let fadeIn = false;
  let fadeOut = false;
  let nextSceneTriggered = false;

  p.preload = () => {
    gardenImage = p.loadImage('garden.jpg');
    kitchen = p.loadImage('kitchen.jpg');
    diningroom = p.loadImage('diningroom.png');
  
    girlFront = p.loadImage('girlfront.gif');
    girlBack = p.loadImage('girlback.gif');
    girlIdle = p.loadImage('girlidle.gif');

    tomato = p.loadImage('tomato.png');
    cabbage = p.loadImage('cabbage.png');
    onion = p.loadImage('onion.png');
    leek = p.loadImage('leek.png');
  
    startButtonImg = p.loadImage('startbutton.png');
    nextButtonImg = p.loadImage('nextbutton.png');
    panImg = p.loadImage('panImg.png'); 
    dishImg = p.loadImage('dishImg.png'); 
    mealImg = p.loadImage('mealImg.jpeg'); 
    starGif = p.loadImage('star.gif');
  };

  p.setup = () => {
    console.log("Setup function is running");
    p.createCanvas(600, 400);
    player = new Player();

    if (scene === 0) {
      initializeIngredients();
    }
  };

  p.draw = () => {
    if (fadeIn) {
      fadeScreen(true);
    } else if (fadeOut) {
      fadeScreen(false);
    } else {
      p.background(220);

      if (scene === -1) {
        showStartScreen();
      } else {
        switch (scene) {
          case 0:
            scene0();
            break;
          case 1:
            scene1();
            break;
          case 2:
            scene2();
            break;
        }
        player.display(p);
        player.move(p);
      }
      displayDialogue();
      autoSceneTransition();
    }
  };

  function showStartScreen() {
    p.image(gardenImage, 0, 0, p.width, p.height);
    p.filter(p.BLUR, 5);
    p.image(startButtonImg, p.width / 2 - 100, p.height / 2 - 75, 200, 200);
    p.textSize(40);
    p.stroke(0);
    p.strokeWeight(10);
    p.fill(250, 203, 22);
    p.text('LETS COOK TOGETHER', 80, 150);
  }

  function scene0() {
    if (gardenImage) {
      p.image(gardenImage, 0, 0, p.width, p.height);
    }
    p.textSize(20);
    p.fill(225);
    p.fill(0, 0, 0, 200);
    p.rect(10, 10, p.width - 20, 60, 10);
    p.textSize(18);
    p.fill(255);
    p.noStroke();
    p.text("I can't wait to cook for my family!", 300, 40);
    p.textAlign(p.CENTER, p.CENTER);

    for (let i = ingredients.length - 1; i >= 0; i--) {
      ingredients[i].display(p);
      if (player.collidesWith(ingredients[i])) {
        inventory.push(ingredients[i]);
        ingredients.splice(i, 1);
      }

      for (let ingredient of ingredients) {
        ingredient.displayBubble(p); // Display ingredient in a bubble style
      }
    }

    p.image(nextButtonImg, p.width - 100, p.height - 90, 100, 100);
  }

  function scene1() {
    if (kitchen) {
      p.image(kitchen, 0, 0, p.width, p.height);
    }
    if (!player.resetPosition) {
      player.x = 50;
      player.y = p.height - player.size - 50;
      player.resetPosition = true;
    }

    p.textSize(20);
    p.fill(0);
    p.fill(0, 0, 0, 200);
    p.rect(10, 10, p.width - 20, 60, 10);
    p.textSize(18);
    p.fill(255);
    p.noStroke();
    p.text("Boom done!", 100, 40);
    p.textAlign(p.CENTER, p.CENTER);

    if (dishCompleted) {
      p.image(dishImg, p.width / 2 - 100, p.height / 2 - 100, 200, 200);
      p.textSize(40);
      p.fill(255);
      p.text("Dish Completed!", p.width / 2 , p.height / 2 + 80);
    } else {
      p.image(panImg, p.width / 2 - 150, p.height / 2 - 190, 350, 400);

      for (let i = 0; i < inventory.length; i++) {
        let xOffset = (i % 2) * 50 - 25;
        let yOffset = Math.floor(i / 2) * 50 - 25;
        p.image(
          inventory[i].type,
          p.width / 2 - 100 + xOffset,
          p.height / 2 - 100 + yOffset,
          100,
          100
        );
      }
    }

    p.image(nextButtonImg, p.width - 100, p.height - 90, 100, 100);
  }

  function scene2() {
    if (diningroom) {
      p.image(diningroom, 0, 0, p.width, p.height);
    }
    if (!player.resetPosition) {
      player.x = 50;
      player.y = p.height - player.size - 50;
      player.resetPosition = true;
    }

    p.textSize(20);
    p.fill(0);
    p.fill(0, 0, 0, 200);
    p.rect(10, 10, p.width - 20, 60, 10);
    p.textSize(18);
    p.fill(255);
    p.noStroke();
    p.text("Do you guys like the meal?", 300, 40);
    p.textAlign(p.CENTER, p.CENTER);

    if (player.x > p.width / 2 - 180 && player.x < p.width / 2 + 20) {
      mealActivated = true;
    } else if (mealActivated) {
      mealActivated = false;
    }
  }

  function initializeIngredients() {
    inventory = [];
    let ingredientTypes = [tomato, cabbage, onion, leek];
    ingredients = [];
    
    for (let i = 0; i < 5; i++) {
      let x = p.random(100, p.width - 100);
      let y = p.random(100, p.height - 100);
      let type = p.random(ingredientTypes);
      ingredients.push(new Ingredient(x, y, type));
    }
  }

  function fadeScreen(fadingIn) {
    if (fadingIn) {
      fade += 10;
      if (fade >= 255) {
        fade = 0;
        fadeIn = false;
        fadeOut = true;
      }
    } else {
      fade -= 10;
      if (fade <= 0) {
        fade = 0;
        fadeOut = false;
      }
    }
    p.fill(0, fade);
    p.rect(0, 0, p.width, p.height);
  }

  function displayInventory() {
    if (scene === 0) {
      p.fill(240);
      p.stroke(180);
      p.strokeWeight(2);
      p.rect(10, p.height - 50, 300, 50, 10);

      for (let i = 0; i < inventory.length; i++) {
        let x = 20 + i * 50;
        let y = p.height - 40;
        p.fill(255);
        p.stroke(180);
        p.rect(x, y, 40, 40, 8);
        p.image(inventory[i].type, x + 5, y + 5, 30, 30);
      }
    }
  }

  function mousePressed() {
    if (!fadeOut) {
      if (
        scene === -1 &&
        p.mouseX > p.width / 2 - 100 &&
        p.mouseX < p.width / 2 + 100 &&
        p.mouseY > p.height / 2 - 50 &&
        p.mouseY < p.height / 2 + 50
      ) {
        scene = 0;
        initializeIngredients();
        fadeIn = true;
        return;
      }

      if (
        scene >= 0 &&
        p.mouseX > p.width - 100 &&
        p.mouseX < p.width - 10 &&
        p.mouseY > p.height - 70 &&
        p.mouseY < p.height - 20
      ) {
        scene = (scene + 1) % 3;
        fadeIn = true;
        if (scene === 0) {
          initializeIngredients();
        }
        return;
      }

      if (
        scene === 1 &&
        !dishCompleted &&
        p.mouseX > p.width / 2 - 150 &&
        p.mouseX < p.width / 2 + 200 &&
        p.mouseY > p.height / 2 - 190 &&
        p.mouseY < p.height / 2 + 210
      ) {
        dishCompleted = true;
        fadeIn = true;
        return;
      }

      if (
        scene === 2 &&
        p.mouseX > p.width / 2 - 50 &&
        p.mouseX < p.width / 2 + 50 &&
        p.mouseY > p.height / 2 - 50 &&
        p.mouseY < p.height / 2 + 50
      ) {
        scene = -1; 
      }
    }
  }

  class Player {
    constructor() {
      this.x = p.width - 600;
      this.y = p.height - 600;
      this.defaultSize = 130;
      this.enlargedSize = 280;
      this.size = this.defaultSize;
      this.state = "idle";
      this.resetPosition = false;
    }

    display() {
      this.size = scene === 1 || scene === 2 ? this.enlargedSize : this.defaultSize;
      let imageToDisplay = this.state === "front" ? girlFront : this.state === "back" ? girlBack : girlIdle;
      p.image(imageToDisplay, this.x, this.y, this.size, this.size);
    }

    move() {
      let moved = false;
      if (scene === 1 || scene === 2) {
        this.y = p.height - this.size;
        if (p.keyIsDown(p.LEFT_ARROW)) {
          this.x -= 3;
          this.state = "back";
          moved = true;
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
          this.x += 4;
          this.state = "front";
          moved = true;
        }
      } else {
        if (p.keyIsDown(p.LEFT_ARROW)) {
          this.x -= 4;
          this.state = "back";
          moved = true;
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
          this.x += 4;
          this.state = "front";
          moved = true;
        }
        if (p.keyIsDown(p.UP_ARROW)) {
          this.y -= 4;
          this.state = "back";
          moved = true;
        }
        if (p.keyIsDown(p.DOWN_ARROW)) {
          this.y += 4;
          this.state = "front";
          moved = true;
        }
      }

      if (!moved) this.state = "idle";
      this.x = p.constrain(this.x, 0, p.width - this.size);
      this.y = p.constrain(this.y, 0, p.height - this.size);
    }

    collidesWith(ingredient) {
      let d = p.dist(this.x, this.y, ingredient.x, ingredient.y);
      return d < 100; 
    }
  }

  class Ingredient {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.size = 40;
    }

    display() {
      p.image(this.type, this.x, this.y, this.size, this.size);
    }

    displayBubble() {
      p.fill(255, 255, 255, 180);
      p.stroke(200);
      p.ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size * 1.5);
      this.display();
    }
  }

  function resetGame() {
    inventory = [];
    ingredients = [];
    dishCompleted = false;
    panActive = false;
    mealActivated = false;
    player.resetPosition = false;
  }
};

new p5(sketch6, 'sketch6-container');  // Attach sketch to container in HTML
