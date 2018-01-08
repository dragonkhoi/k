var KHOI = KHOI || {};

KHOI.Tail = function(anchor1, anchor2, finSize, right){
  this.right = right;
  this.finSize = finSize;
  this.anchor1 = anchor1;
  this.anchor2 = anchor2;
  this.path = new Path();
  this.anchor = new Segment();
  this.anchorBot = new Segment();
}

KHOI.Tail.prototype.init = function() {
  console.log(this.anchor1);
  console.log(this.anchor2);

  // this.path.add(new Point(0,0));
  // this.path.add(new Point(200, 200));
  // return;
  this.path.add(this.anchor1);
  var midpoint = this.midway(this.anchor1, this.anchor2, this.finSize, this.right);
  var midpoint2 = this.midway(this.anchor1, midpoint, this.finSize / 4, this.right);
  var midpoint3 = this.midway(this.anchor1, midpoint2, -1*this.finSize / 4, this.right);
  console.log(midpoint);
  this.path.add(midpoint3);
  this.path.add(midpoint2);
  this.path.add(midpoint);
  this.path.add(this.anchor2);

  this.anchor = this.path.segments[0];
  this.anchorBot = this.path.segments[4];
  this.path.strokeCap = 'round';
  //this.path.closed = true;
  this.path.smooth();
}

KHOI.Tail.prototype.midway = function(point1, point2, offset, right) {
  var midpoint = new Point( (point1.x + point2.x) / 2, (point1.y + point2.y) / 2 );
  midpoint.x -= offset * 1.3;
  if(right){
    midpoint.y -= offset / 2;
  }
  else {
    midpoint.y += offset / 2;
  }
  return midpoint;
}

KHOI.Tail.prototype.update = function(sinVal){
  this.path.segments[1].point = this.midway(this.anchorBot.point, this.anchor.point,  this.finSize, this.right);
  this.path.segments[2].point = this.midway(this.anchorBot.point, this.path.segments[1].point, this.finSize / 4, this.right);
  this.path.segments[3].point = this.midway(this.anchorBot.point, this.path.segments[2].point, this.finSize / 8, this.right);

  var tailsegs = this.path.segments.length;
  for(var i = 1; i < 4; i++){
    //if(i > 0 && i < tailsegs - 1){
      //this.tails[0].path.segments[i].point.y += Math.sin(sineSeed) * 0.5;
      //this.tails[1].path.segments[i].point.y += Math.sin(sineSeed) * 0.5;
      //this.path.segments[i].point.x += sinVal * (i) / 5; /// 25;
      if(i != 1){
        //this.path.segments[i].point.y += sinVal * 2;
      }
      else {
        //this.path.segments[i].point.y += sinVal * 2;
      }
    }
  //}
}
