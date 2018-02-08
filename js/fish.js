var KHOI = KHOI || {};

KHOI.Fish = function(idNumber, radius, resolution) {
  this.idNumber = idNumber;
  this.path = new Path();
  this.pathRadius = radius;
  this.pathSides = resolution;
  this.pathPoints = [this.pathSides];
  this.pathPointsNormals = [this.pathSides];
  this.fins = [2];
  this.tails = [2];
  this.group = new Group();
  this.headGroup = []; // 21
  this.midTailGroup = []; // 2
  this.midTail2Group = []; // 2
  this.midTail3Group = []; // 2
  this.bottomTailGroup = []; // 3
  this.fishPoints = [
    new Point(0, 0),
    new Point(0, 1),
    new Point(4, -9),
    new Point(11, -18),
    new Point(22, -28),
    new Point(38, -36),
    new Point(63, -46),
    new Point(83, -51),
    new Point(101, -53),
    new Point(128, -54), // fin1 - 9
    new Point(188, -52), // fin2 - 10
    new Point(242, -45),
    new Point(320, -31),
    new Point(394, -17),
    new Point(431, -12), // tail1 - 14
    new Point(498, 0) // tail2 - 15
  ];

  this.colors = [{s:"#49ACBB", f:"#49ACBB"}];

  this.pathStyle = {
    strokeWidth: 2,
    strokeColor: this.colors[idNumber].s,
    fillColor: this.colors[idNumber].f
  };

  this.location = new Point(200, 200);
  this.velocity = new Point(0, 0);
  this.acceleration = new Point(0, 0);

  this.maxSpeed = Math.random() * 0.1 + 0.15;
  this.maxTravelSpeed = this.maxSpeed * 3.5;
  this.maxForce = 0.2;
  this.wanderTheta = 0;
  this.orientation = 0;
  this.lastOrientation = 0;
  this.lastLocation;

  // this.tentacles;
	// this.numTentacles = 0;
}

KHOI.Fish.prototype.init = function() {
  for(var i = 0; i < this.fishPoints.length; i++){
    var point = this.fishPoints[i].clone();
    point.x /= 3;
    point.y /= 3;
    point.x += 20;
    point.y += 100;

    this.path.add(point);
    this.pathPoints[i] = point.clone();
    this.pathPointsNormals[i] = point.normalize().clone();
  }
  for(var i = this.fishPoints.length - 2; i > 0; i--){
    var point = this.fishPoints[i].clone();
    point.y *= -1;
    point.x /= 3;
    point.y /= 3;
    point.x += 20;
    point.y += 100;


    this.path.add(point);
    this.pathPoints[this.fishPoints.length - 2 + (this.fishPoints.length - i)] = point.clone();
    this.pathPointsNormals[this.fishPoints.length - 2 + (this.fishPoints.length - i)] = point.normalize().clone();
  }
  console.log(this.pathPoints);
  console.log(this.path.segments);
  for(var i = 0; i < this.path.segments.length; i++){
    if(i <= 10 || i >= 20){
      console.log(i);
      this.headGroup.push(this.path.segments[i].point);
    }
    else if(i == 11 || i == 19) {
      this.midTailGroup.push(this.path.segments[i].point);
    }
    else if(i == 12 || i == 18) {
      this.midTail2Group.push(this.path.segments[i].point);
    }
    else if(i == 13 || i == 17){
      this.midTail3Group.push(this.path.segments[i].point);
    }
    else if(i == 14 || i == 15 || i == 16){
      this.bottomTailGroup.push(this.path.segments[i].point);
    }
  }

  this.path.closed = true;
  this.path.smooth();
  this.path.style = this.pathStyle;
  this.group.addChild(this.path);
  this.path.selected = true;

  var anchor1 = this.fishPoints[9].clone();
  anchor1.x /= 3;
  anchor1.y /= 3;
  anchor1.x += 20;
  anchor1.y += 100;
  var anchor2 = this.fishPoints[10].clone();
  //anchor2.y *= -1;
  anchor2.x /= 3;
  anchor2.y /= 3;
  anchor2.x += 20;
  anchor2.y += 100;
  var anchor3 = this.fishPoints[9].clone();
  anchor3.y *= -1;
  anchor3.x /= 3;
  anchor3.y /= 3;
  anchor3.x += 20;
  anchor3.y += 100;
  var anchor4 = this.fishPoints[10].clone();
  anchor4.y *= -1;
  anchor4.x /= 3;
  anchor4.y /= 3;
  anchor4.x += 20;
  anchor4.y += 100;
  this.fins[0] = new KHOI.Fin(anchor1, anchor2, 20, true);
  this.fins[1] = new KHOI.Fin(anchor3, anchor4, 20, false);
  this.fins[0].init();
  this.fins[1].init();
  this.fins[0].path.strokeColor = this.path.strokeColor;
  this.fins[0].path.strokeWidth = this.path.strokeWidth;
  this.fins[1].path.strokeColor = this.path.strokeColor;
  this.fins[1].path.strokeWidth = this.path.strokeWidth;
  this.group.addChild(this.fins[0].path);
  this.group.addChild(this.fins[1].path);
  //this.headGroup.addChild(this.fins[0].path);
  //this.headGroup.addChild(this.fins[1].path);


  var tailAnchor1 = this.fishPoints[14].clone();
  tailAnchor1.x /= 3;
  tailAnchor1.y /= 3;
  tailAnchor1.x += 20;
  tailAnchor1.y += 100;
  var tailAnchor2 = this.fishPoints[15].clone();
  tailAnchor2.x /= 3;
  tailAnchor2.y /= 3;
  tailAnchor2.x += 20;
  tailAnchor2.y += 100;
  var tailAnchor3 = this.fishPoints[14].clone();
  tailAnchor3.y *= -1;
  tailAnchor3.x /= 3;
  tailAnchor3.y /= 3;
  tailAnchor3.x += 20;
  tailAnchor3.y += 100;
  this.tails[0] = new KHOI.Tail(tailAnchor1, tailAnchor2, 25, true);
  this.tails[1] = new KHOI.Tail(tailAnchor3, tailAnchor2, 25, false);
  this.tails[0].init();
  this.tails[1].init();
  this.tails[0].path.strokeColor = this.path.strokeColor;
  this.tails[0].path.strokeWidth = this.path.strokeWidth;
  this.tails[0].path.selected = true;
  this.tails[1].path.strokeColor = this.path.strokeColor;
  this.tails[1].path.strokeWidth = this.path.strokeWidth;
  this.tails[1].path.selected = true;


  //this.group.addChild(this.tails[0].path);
  //this.group.addChild(this.tails[1].path);

  // Create tentacles
	// this.tentacles = [this.numTentacles];
	// for (var t = 0; t < this.numTentacles; t++) {
	// 	this.tentacles[t] = new NARDOVE.Tentacle(12, 3);
	// 	this.tentacles[t].init();
	// 	this.tentacles[t].path.strokeColor = this.path.strokeColor;
	// 	this.tentacles[t].path.strokeWidth = this.path.strokeWidth;
	// }
}

KHOI.Fish.prototype.update = function(event){
  this.lastLocation = this.location.clone();
  this.lastOrientation = this.orientation;

  this.velocity.x += this.acceleration.x;
  this.velocity.y += this.acceleration.y;
  this.velocity.length = Math.min(this.maxTravelSpeed, this.velocity.length);

  var sineSeed = (event.count * 0.2) + 100;
  this.location.x = sineSeed * 10;
  this.location.y = Math.sin(sineSeed / 10) / 2 + 200;
  //this.location.x += this.velocity.x;
  //this.location.y += this.velocity.y;

  this.acceleration.length = 0;

  this.group.position = this.location.clone();

  var locVector = new Point(this.location.x - this.lastLocation.x, this.location.y - this.lastLocation.y);
  this.orientation = locVector.angle + 180; // +90

  this.group.rotate(this.orientation - this.lastOrientation);

  var sineSeed = (event.count * 0.2);
  var sinVal = Math.sin(sineSeed);
  var sinDir = Math.sin(toRad(this.orientation));
  console.log(sinDir);
  var cosDir = Math.cos(toRad(this.orientation));
  console.log(cosDir);

  if(sineSeed > Math.PI){
    sinVal *= 2; //Math.random() + 1;
  }

  this.midTailGroup[0].y -= sinVal * 0.1 * cosDir;
  this.midTailGroup[1].y -= sinVal * 0.1 * cosDir;
  this.midTailGroup[0].x -= sinVal * 0.1 * sinDir;
  this.midTailGroup[1].x -= sinVal * 0.1 * sinDir;
  // this.midTailGroup[0].x -= Math.sin(sineSeed) * 0.5;
  // this.midTailGroup[1].x += Math.sin(sineSeed) * 0.5;

  this.midTail2Group[0].y -= sinVal * 0.4 * cosDir;
  this.midTail2Group[1].y -= sinVal * 0.4 * cosDir;
  this.midTail2Group[0].x -= sinVal * 0.4 * sinDir;
  this.midTail2Group[1].x -= sinVal * 0.4 * sinDir;
  // this.midTail2Group[0].x -= Math.sin(sineSeed) * 1;
  // this.midTail2Group[1].x += Math.sin(sineSeed) * 1;

  this.midTail3Group[0].y -= sinVal * 0.8 * cosDir;
  this.midTail3Group[1].y -= sinVal * 0.8 * cosDir;
  this.midTail3Group[0].x -= sinVal * 0.8 * sinDir;
  this.midTail3Group[1].x -= sinVal * 0.8 * sinDir;
  // this.midTail3Group[0].x -= Math.sin(sineSeed) * 1.5;
  // this.midTail3Group[1].x += Math.sin(sineSeed) * 1.5;

  for(var i = 0; i < this.bottomTailGroup.length; i++){
    if(i != 1){
      this.bottomTailGroup[i].y -= sinVal * 1.2 * cosDir;
      this.bottomTailGroup[i].x -= sinVal * 1.2 * sinDir;

    }
    else {
      this.bottomTailGroup[i].y -= sinVal * 2 * cosDir;
      this.bottomTailGroup[i].x -= sinVal * 2 * sinDir;
    }

  }
  this.tails[0].anchor.point = this.path.segments[16].point;
  this.tails[1].anchor.point = this.path.segments[14].point;

  this.tails[0].anchorBot.point = this.path.segments[15].point;
  this.tails[1].anchorBot.point = this.path.segments[15].point;
  this.tails[0].update(sinVal);
  this.tails[1].update(sinVal);
  // for(var i = 0; i < this.fins[0].path.segments.length; i++){
  //   this.fins[0].path.segments[i].point.y += Math.sin(sineSeed) * 4;
  //   this.fins[1].path.segments[i].point.y += Math.sin(sineSeed) * 4;
  // }
  // expand contract
  // for(var i = 0; i < this.pathSides; i++){
  //   var segmentPoint = this.path.segments[i].point;
  //   var sineSeed = -((event.count * this.maxSpeed) + (this.pathPoints[i].y * 0.0375));
  //   var normalRotatedPoint = this.pathPointsNormals[i].rotate(this.orientation);
  //
  //   // contract or expand outward
  //   segmentPoint.x += normalRotatedPoint.x * Math.sin(sineSeed);
  //   segmentPoint.y += normalRotatedPoint.y * Math.sin(sineSeed);
  // }
  // for (var t = 0; t < this.numTentacles; t++) {
	// 	this.tentacles[t].anchor.point = this.path.segments[t+((t%this.numTentacles)+1)].point;
	// 	this.tentacles[t].update(this.orientation);
	// }
    //this.fins[0].update(this.orientation);
    //this.fins[1].update(this.orientation);
    this.path.smooth();
    this.wander();
    this.checkBounds();
}

KHOI.Fish.prototype.steer = function(target, slowdown) {
  var steer;
  var desired = new Point(target.x - this.location.x, target.y - this.location.y);
  var dist = desired.length;

  if(dist > 0){
    if(slowdown && dist < 100){
      desired.length = (this.maxTravelSpeed) * (dist / 100);
    }
    else {
      desired.length = this.maxTravelSpeed;
    }

    steer = new Point(desired.x - this.velocity.x, desired.y - this.velocity.y);
    steer.length = Math.min(this.maxForce, steer.length);
  }
  else {
    steer = new Point(0, 0);
  }
  return steer;
}

KHOI.Fish.prototype.seek = function(target) {
  var steer = this.steer(target, false);
  this.acceleration.x += steer.x;
  this.acceleration.y += steer.y;
}

KHOI.Fish.prototype.wander = function() {
	var wanderR = 5;
	var wanderD	= 100;
	var change = 0.05;

	this.wanderTheta +=  Math.random() * (change * 2) - change;

	var circleLocation = this.velocity.clone();
	circleLocation = circleLocation.normalize();
	circleLocation.x *= wanderD;
	circleLocation.y *= wanderD;
	circleLocation.x += this.location.x;
	circleLocation.y += this.location.y;

	var circleOffset = new Point(wanderR * Math.cos(this.wanderTheta), wanderR * Math.sin(this.wanderTheta));

	var target = new Point(circleLocation.x + circleOffset.x, circleLocation.y + circleOffset.y);

	this.seek(target);
}

KHOI.Fish.prototype.checkBounds = function() {
	var offset = 60;
	if (this.location.x < -offset) {
		this.location.x = view.size.width + offset;
		// for (var t = 0; t < this.numTentacles; t++) {
		// 	this.tentacles[t].path.position = this.location.clone();
		// }
	}
	if (this.location.x > view.size.width + offset) {
		this.location.x = -offset;
		// for (var t = 0; t < this.numTentacles; t++) {
		// 	this.tentacles[t].path.position = this.location.clone();
		// }
	}
	if (this.location.y < -offset) {
		this.location.y = view.size.height + offset;
		// for (var t = 0; t < this.numTentacles; t++) {
		// 	this.tentacles[t].path.position = this.location.clone();
		// }
	}
	if (this.location.y > view.size.height + offset) {
		this.location.y = -offset;
		// for (var t = 0; t < this.numTentacles; t++) {
		// 	this.tentacles[t].path.position = this.location.clone();
		// }
	}
}
