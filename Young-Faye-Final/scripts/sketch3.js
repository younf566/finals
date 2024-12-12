const sketch3 = (p) => {
  let secondsRadius;
  let minutesRadius;
  let hoursRadius;
  let clockDiameter;
  let angl; // planet's angle(0,360)
  let modifiedAngl;
  let col; 
  let colS; // B&W
  let colM = { // Colorful
    h: 220,
    s: 100,
    b: 91
  }
  let R, r, d; // Rotate-Radius, planet-radius, planet-diameter
  let tickMarkers = [];
  let clockColor; // Variable for clock's color 

  p.setup = () => {
    let canvas = p.createCanvas(600, 600);
    canvas.parent('sketch3-container'); // Attach canvas to 'sketch3-container'
    p.angleMode(p.DEGREES);
    p.colorMode(p.HSB, 100);
    let radius = p.min(p.width, p.height) / 2;
    secondsRadius = radius * 0.8; 
    minutesRadius = radius * 0.4;
    hoursRadius = radius * 0.3;
    clockDiameter = radius * 1; 
    
    // tick markers or stars at random positions around the clock's perimeter
    for (let i = 0; i < 60; i++) {
      let angle = p.random(360); // Random angle for each tick
      let distance = p.random(secondsRadius * 0.9, secondsRadius * 1.1); // Slight variation in distance
      tickMarkers.push({ angle: angle, distance: distance });
    }
    
    clockColor = p.color(237, 0, 73); // Initial color of the clock's inner ellipse
  };

  p.time = (time1, num) => {
    angl = p.map(time1, 0, num, 0, 360);
  };

  p.draw = () => {
    p.blendMode(p.BLEND);
    p.translate(p.width / 2, p.height / 2);
    
    //TIME SYSTEM here! (e.g. second(),59; minute(),59; hour(),23;)
    p.time(p.second(), 59); 
    
    // Background-color gradient
    if (angl >= 0 && angl <= 45) { 
      colS = p.map(angl, 0, 45, 20, 100);
    } else if (angl > 45 && angl <= 360) {
      colS = p.map(angl, 45, 360, 100, 20);
    }
    p.background(colS);
    p.blendMode(p.BLEND);

    // Clock components
    p.texthere(angl);
    p.rotate(angl + 45);
    
    let planetRadius = 50; // Planet Radius here!
    p.planet(angl, planetRadius);
  };

  p.texthere = (angle) => {
    p.push();
    col = p.map(angle, 0, 360, 0, 100);
    p.noStroke();
    
    p.fill(244, 0, 158);
    p.ellipse(0, 0, clockDiameter + 25, clockDiameter + 25);
    
    // the color of the inner ellipse based on mouse press
    p.fill(clockColor);
    p.ellipse(0, 0, clockDiameter, clockDiameter);

    let secondAngle = p.map(p.second(), 0, 60, 0, 360);
    let minuteAngle = p.map(p.minute(), 0, 60, 0, 360);
    let hourAngle = p.map(p.hour(), 0, 12, 0, 360);
    p.stroke(255);

    // Minute hand
    p.push();
    p.strokeWeight(2);
    p.rotate(minuteAngle);
    p.line(0, 0, 0, -minutesRadius);
    p.pop();

    // Hour hand
    p.push();
    p.strokeWeight(4);
    p.rotate(hourAngle);
    p.line(0, 0, 0, -hoursRadius);
    p.pop();

    // Scattered tick markers around the perimeter
    p.push();
    p.strokeWeight(1);
    for (let i = 0; i < tickMarkers.length; i++) {
      let tick = tickMarkers[i];
      let x = tick.distance * p.cos(tick.angle);
      let y = tick.distance * p.sin(tick.angle);
      p.point(x, y);
      
      let mouseAngle = p.atan2(p.mouseY - p.height / 2, p.mouseX - p.width / 2);
      p.rotate(mouseAngle); // Rotate based on mouse angle
      p.strokeWeight(4);

      p.rotate(2);
    }
    p.pop();
    p.pop();
  };

  p.planet = (angle, r) => {
    let c = p.color(colM.h, colM.s, colM.b);
    p.fill(c);
    p.noStroke();

    let margin = 50; 
    R = -p.width / 2 + margin; 
    d = 2 * r;

    if (angle <= 180 || angle == 360) { // Upper half of the circle
      colM.h = p.map(angle, 0, 180, 0, 10);
      p.ellipse(R, 0, r); // Sun
    } else if (angle > 180 && angle < 360) { // Lower half of the circle
      p.ellipse(R, 0, r); // Moon

      // Moonshade
      p.fill(colS); // Color of shade
      let rMS = R + d; // X-axis of moon shade
      let rDelta1, rDelta2;
      
      if (angle > 180 && angle <= 270) {
        colM.h = p.map(angle, 180, 270, 10, 15); // Moon color
        rDelta1 = p.map(angle, 180, 270, r, d - 1); // Moon-shade animation
        p.ellipse(rMS - rDelta1, 0, r); // Moon shade
      } else if (angle > 270 && angle < 360) {
        colM.h = p.map(angle, 270, 360, 15, 10); // Moon color
        rDelta2 = p.map(angle, 270, 360, d, r); // Moon-shade animation
        p.ellipse(rMS - rDelta2, 0, r); // Moon shade
      }
    }
  };

  // Change clock color when mouse is pressed
  p.mousePressed = () => {
    clockColor = p.color(p.random(255), p.random(255), p.random(255)); // Random color
  };

  p.mouseReleased = () => {
    clockColor = p.color(237, 0, 73); // Original color
  };
};

new p5(sketch3, 'sketch3-container'); // Attach sketch3 to its container
