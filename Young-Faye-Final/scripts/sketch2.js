const sketch2 = (p) => {
  let eyemoveS, eyemoveB, headcolor, headsizeW, headsizeH;
  let mouthmove, handWaveH, noseBig;
  let leftPupilColor, rightPupilColor;

  p.setup = () => {
    let canvas = p.createCanvas(600, 600);
    canvas.parent('sketch2-container'); // Attach canvas to 'sketch2-container'
    p.noStroke();
    p.background(0);
  };

  p.draw = () => {
    eyemoveS = p.map(p.mouseX, 0, p.width, 200, 4.5);
    eyemoveB = p.map(p.mouseX, 0, p.width, 90, 140);
    headcolor = p.map(p.mouseX, 0, p.width, 0, 100);
    headsizeW = p.map(p.mouseX, 0, p.width, 2, 4.5);
    headsizeH = p.map(p.mouseY, 0, p.height, 2, 4.5);
    mouthmove = p.map(p.mouseX, 0, p.width, 0, 40);
    handWaveH = p.map(p.mouseY, 30, p.width, 10, 30);
    noseBig = p.map(p.mouseX, 0, p.width, 100, 200);

    p.background(255 + headcolor, 700 + headcolor, 200 - headcolor);

    // Torso and body
    p.push();
    p.strokeWeight(0);
    p.fill(255, 0, 100 - headcolor);
    p.stroke(100, 0, 50);
    p.rect(160 - handWaveH, 390 - handWaveH, 300, 300, 300, 500, 70); // shoulders
    p.pop();

    // Arm wave
    p.push();
    p.strokeWeight(0);
    p.fill(255, 0, 100 - headcolor);
    p.stroke(100, 0, 50);
    p.rect(30 + mouthmove, 350, 40 + mouthmove, 400, 500, 90);
    p.pop();

    // Face morphing
    p.push();
    p.fill(255, 0, 100);
    p.fill(255, 0, 100 - headcolor);
    p.ellipse(300, 250, 200 * headsizeW, 200 * headsizeH); // face
    p.pop();

    // Cute little mouth
    p.push();
    p.fill(0, 0, 0);
    p.strokeWeight(2);
    p.stroke(100, 0, 50);
    p.line(250, 130, 200, 120 + mouthmove); // mouth part 1
    p.line(300, 120 + mouthmove, 250, 130); // mouth part 2
    if (p.mouseIsPressed || p.mouseX !== p.pmouseX) {
      mouthmove = p.map(p.mouseX, 0, p.width, 0, 50);
      p.arc(250, 110, 200, 205, 0, p.PI);
    }
    p.pop();

    // Outer whites grow
    p.push();
    p.noStroke();
    p.fill(255, 255, 255);
    p.ellipse(350, 50, eyemoveB - eyemoveS, eyemoveB - eyemoveS, 200); // right eye
    p.ellipse(250, 50, eyemoveB - eyemoveS, eyemoveB - eyemoveS, 100); // left eye
    p.pop();

    // Pupils change many colors
    if (p.mouseIsPressed || p.mouseX !== p.pmouseX) {
      leftPupilColor = p.color(p.random(255), p.random(255), p.random(255));
      rightPupilColor = p.color(p.random(255), p.random(255), p.random(255));
    }

    p.push();
    p.fill(leftPupilColor || 0); // Left pupil
    p.ellipse(250, 50, 30, 30); // left pupil
    p.fill(rightPupilColor || 0); // Right pupil
    p.ellipse(350, 50, 30, 30); // right pupil
    p.pop();

    // Big nose
    p.push();
    p.noStroke();
    p.fill(255, 165, 0);
    p.ellipse(300, 80, 70, noseBig, 80); // nose
    p.pop();
  };
};

new p5(sketch2, 'sketch2-container'); // Attach sketch2 to its container
