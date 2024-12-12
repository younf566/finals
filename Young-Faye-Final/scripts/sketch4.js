const sketch = (p) => {
  let lineDist = 20;

  p.setup = () => {
    let canvas = p.createCanvas(600, 600);
    canvas.parent('sketch4-container'); // Attach canvas to the specific container
    p.noStroke();
    p.background(0);
  };

  p.draw = () => {
    p.background(0, 0, 0);

    p.push();
    p.noStroke();
    p.circle(415, -40, 150);
    p.circle(200, -40, 150);
    p.triangle(130, 0, 470, 0, 315, 200);
    p.pop();

    p.push();
    p.fill(255);
    p.noStroke();
    
    p.push();
    p.translate(250, 160);
    p.triangle(5, 24, 58, 100, 112, 23);
    lewittSquare(p);
    p.pop();
    
    p.push();
    p.translate(250, 90);
    p.triangle(20, 80, 58, 20, 96);
    lewittSquare(p);
    p.pop();
    p.pop();

    p.push();
    p.noStroke();
    
    p.ellipse(310, 295, 110, 50);
    p.push();
    p.fill(255);
    p.ellipse(310, 290, 100, 17);
    lewittSquare(p);
    p.pop();

    p.ellipse(310, 370, 100, 20);
    p.ellipse(450, -10, 300, 100);
    p.ellipse(150, -10, 300, 100);
    p.pop();

    p.push();
    p.noStroke();
    p.fill(0, 0, 0);
    
    p.ellipse(447, 110, 230, 170);
    p.ellipse(170, 110, 230, 170);
    p.pop();

    p.push();
    p.noStroke();
    p.triangle(310, 400, 260, 300, 360, 300);
    p.triangle(200, 598, 400, 620, 315, 400); 
    p.pop();

    p.push();
    p.fill(255);
    p.noStroke();
    p.triangle(310, 335, 150, 700, 450, 700); 
    lewittSquare(p);
    p.pop();

    p.push();
    p.noStroke();
    p.ellipse(307, 430, 90, 45);
    lewittSquare(p);
    
    p.ellipse(400, 620, 300, 200);
    p.ellipse(200, 620, 300, 200);
    
    p.ellipse(308, 170, 120, 55);

    p.push();
    p.noStroke();
    p.fill(0, 0, 0);
    
    p.ellipse(417, 465, 150, 120); 
    p.ellipse(200, 465, 150, 120);
    lewittSquare(p);
    p.pop();
    
    p.pop();

    if (p.mouseIsPressed) {
      p.push();
      p.fill(255, 0, 0);
      p.noStroke();
      
      p.ellipse(320, 290, 20, 20);
      p.ellipse(300, 290, 20, 20);
      p.triangle(290, 290, 330, 290, 310, 350);
      
      p.pop();
    }
  };

  const lewittSquare = (p) => {
    p.stroke(255);
    p.strokeWeight(0.2);

    let shiftX = p.mouseX / 10;
    let shiftY = p.mouseY / 10;

    for (let i = 0; i < p.width; i += lineDist) {
      for (let j = 0; j < p.height; j += lineDist) {
        p.line(i + shiftX, 0, i + shiftX, p.height);  
        if (i >= p.width / 2 && j >= p.height / 2) {        
          p.line(0, j + shiftY, p.width, j + shiftY);
        } else if (i >= p.width / 2 && j <= p.height / 2) {
          p.line(p.width / 2, j + shiftY, p.width, j + shiftY);
        } 
        if (i >= 0 && j >= p.height / 2) {
          p.line(i + shiftX, j + shiftY, i - lineDist + shiftX, j + lineDist + shiftY);
        }
        if (i >= p.width / 2 && j >= p.height / 2) {
          p.line(i + shiftX, j + shiftY, i + lineDist + shiftX, j + lineDist + shiftY);
        }
      }
    }
  };
};

new p5(sketch, 'sketch4-container'); // Attach sketch2 to its container
