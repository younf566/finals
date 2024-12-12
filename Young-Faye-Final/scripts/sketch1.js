const sketch1 = (p) => {
  let angle = 0;

  p.setup = () => {
    let canvas = p.createCanvas(600, 600);
    canvas.parent('sketch1-container'); // Attach canvas to 'sketch1-container'
  };

  p.draw = () => {
    p.background(255);
    
    p.push();
    p.fill(200, 200, 200);
    p.translate(170, 140);
    p.circle(50, 50, 80);
    p.pop();
    
    p.push();
    p.translate(170, 140);
    p.circle(50, 50, 60);
    p.pop();
    
    p.push();
    p.noStroke();
    p.translate(200, 200);
    p.rotate(22);
    p.fill(177, 153, 232);
    p.triangle(-20, 25, 8, -30, 36, 25);
    p.pop();
    
    p.push();
    p.noStroke();
    p.translate(129, 123);
    p.fill(177, 153, 232);
    p.circle(50, 50, 27);
    p.pop();
    
    p.push();
    p.noStroke();
    p.fill(177, 153, 232);
    p.translate(155, 123);
    p.circle(50, 50, 27);
    p.pop();
    
    p.push();
    p.noStroke();
    p.fill(200, 200, 200);
    p.translate(134, 120);
    p.rect(30, 20, 55, 20);
    p.pop();
    
    p.push();
    p.noStroke();
    p.fill(200, 200, 200);
    p.translate(173, 125);
    p.triangle(-10, 25, 2, -20, 10, 25);
    p.pop();
    
    p.push();
    p.noStroke();
    p.fill(200, 200, 200);
    p.translate(190, 125);
    p.triangle(-10, 25, 2, -20, 10, 25);
    p.pop();
    
    p.push();
    p.noStroke();
    p.fill(200, 200, 200);
    p.translate(210, 125);
    p.triangle(-10, 25, 2, -20, 10, 25);
    p.pop();
    
    p.push();
    p.translate(210, 230);
    p.rotate(3.5);
    p.stroke('white');
    p.strokeWeight(5);
    p.line(20, 10, 20, 40);
    p.pop();
    
    p.push();
    p.noStroke();
    p.translate(155, 123);
    p.circle(50, 50, 6);
    p.pop();
  };
};

new p5(sketch1, 'sketch1-container'); // Attach sketch1 to its container
