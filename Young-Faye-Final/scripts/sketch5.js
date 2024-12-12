const sketch5 = (p) => {
  let nutrients = ["Sugar", "Fiber", "Trans Fats", "Carbs", "Cholesterol", "Protein", "Sodium"];
  let amounts = ["10g", "5g", "15g", "200mg", "1g", "25mg", "3g"];
  let percentages = ["25%", "20%", "30%", "10%", "5%", "8%", "6%"];
  let x = [];
  let y = [];
  let ySpeed = [];
  let size = [];
  let angle = [];
  let angleSpeed = [];
  let r = [];
  let g = [];
  let b = [];
  let totalChips = 60;
  let chipsStacked = [];
  let bottomPadding = 20; 
  let chipsReleased = false; 

  p.setup = () => {
    p.createCanvas(600, 600);

    for (let i = 0; i < totalChips; i++) {
      x[i] = p.random(20, p.width - 20);   
      y[i] = p.random(-100, 0);          
      ySpeed[i] = p.random(4, 5);       
      size[i] = p.random(20, 55);         
      angle[i] = p.random(p.TWO_PI); 
      angleSpeed[i] = p.random(0.01, 0.05);  
      r[i] = p.random(230, 255);         
      g[i] = p.random(180, 210);
      b[i] = p.random(20, 40);
      chipsStacked[i] = false;
    }
  }

  p.draw = () => {
    p.background(255); 

    p.fill(255);
    p.rect(0, p.height - bottomPadding, p.width, bottomPadding);

    for (let i = 0; i < totalChips; i++) {
      p.push();
      p.translate(x[i], y[i]);
      p.rotate(angle[i]); 
      p.fill(r[i], g[i], b[i]);
      p.noStroke();

      p.beginShape();
      p.vertex(-size[i] / 2, size[i] / 2);    
      p.vertex(size[i] / 2, size[i] / 2);    
      p.vertex(0, -size[i] / 2);              
      p.endShape(p.CLOSE);
      p.pop();

      if (!chipsStacked[i]) {
        y[i] += ySpeed[i];
        angle[i] += angleSpeed[i];  
      }

      if (y[i] + size[i] / 2 >= p.height - bottomPadding) {
        y[i] = p.height - bottomPadding - size[i] / 2; 
        chipsStacked[i] = true; 
        angleSpeed[i] = 0; 
      } else {
        for (let j = 0; j < totalChips; j++) {
          if (i != j && !chipsStacked[i] && chipsStacked[j]) {
            if (p.dist(x[i], y[i], x[j], y[j]) < size[i]) {
              y[i] = y[j] - size[i] / 2; 
              chipsStacked[i] = true;   
              angleSpeed[i] = 0;       
            }
          }
        }
      }
    }

    drawNutritionFacts(p);
  }

  function drawNutritionFacts(p) {
    p.fill(0);
    p.textAlign(p.LEFT);

    p.push();
    p.textSize(44);
    p.stroke(110);
    p.text("NUTRITION FACTS", 100, 50);
    p.pop();

    p.push();
    p.textSize(20);
    p.text("7 servings per Container", 20, 80);
    p.pop();

    p.push();
    p.stroke(100);
    p.textSize(18);
    p.text("Serving size", 20, 100);
    p.text("1 Day", 500, 100);
    p.pop();

    p.push();
    p.textSize(40);
    p.text("Snacks", 20, 160);
    p.text("60", 500, 160);
    p.pop();

    p.push();
    p.textSize(12);
    p.stroke(20);
    p.text("% Snack Breakdown*", 450, 190);
    p.pop();

    p.push();
    p.stroke(0);
    p.line(15, 60, 575, 60); 
    p.rect(15, 105, 560, 15); 
    p.rect(15, 165, 560, 10); 
    p.line(15, 200, 575, 200); 
    p.rect(15, 435, 560, 5); 
    p.pop();

    for (let i = 0; i < nutrients.length; i++) {
      let yPos = 250 + i * 30;

      if (nutrients[i] === "Trans Fats" || nutrients[i] === "Cholesterol") {
        p.push();
        p.strokeWeight(1);
        p.textSize(16);
        p.text(nutrients[i] + ": " + amounts[i], 20, yPos);
        p.text(nutrients[i] + ": " + amounts[i] + " (" + percentages[i] + ")", 400, yPos);
        p.pop();
      } else {
        p.push();
        p.noStroke();  
        p.textSize(16);
        p.text(nutrients[i] + ": " + amounts[i], 20, yPos);
        p.text(nutrients[i] + ": " + amounts[i] + " (" + percentages[i] + ")", 400, yPos);
        p.pop();
      }

      if (i < nutrients.length - 1) {
        p.stroke(0);
        p.line(14, yPos + 3, 575, yPos + 3);
      }
    }

    p.push();
    p.noStroke();
    p.textSize(10);
    p.text("* Snack Value (SV) are based on daily consumption", 20, 455);
    p.text("  One Serving is Data collected over one week", 20, 475);
    p.pop();

    p.push();
    p.noFill();
    p.rect(10, 4, 570, 560);  
    p.pop();
  }

  // Trigger the chip release
  p.mousePressed = () => {
    chipsReleased = true; 

    for (let i = 0; i < totalChips; i++) {
      chipsStacked[i] = false; 
      y[i] = p.random(-100, 0); 
      ySpeed[i] = p.random(4, 4); 
      angleSpeed[i] = p.random(0.01, 0.05); 
    }
  }
};

new p5(sketch5, 'sketch5-container'); // Attach the sketch3 to the 'sketch3-container' in HTML
