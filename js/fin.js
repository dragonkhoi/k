var KHOI = KHOI || {};

KHOI.Fin = function(anchor1, anchor2, finSize, right){
  this.right = right;
  this.finSize = finSize;
  this.anchor1 = anchor1;
  this.anchor2 = anchor2;
  this.path = new Path();
  this.anchor = new Segment();
  this.segmentLength = 10;
}

KHOI.Fin.prototype.init = function() {
  console.log(this.anchor1);
  console.log(this.anchor2);

  // this.path.add(new Point(0,0));
  // this.path.add(new Point(200, 200));
  // return;
  this.path.add(this.anchor1);
  var midpoint = this.midway(this.anchor1, this.anchor2, this.finSize, this.right);
  var midpoint2 = this.midway(this.anchor1, midpoint, this.finSize / 4, this.right);
  console.log(midpoint);
  this.path.add(midpoint2);
  this.path.add(midpoint);
  this.path.add(this.anchor2);

  this.anchor = this.path.segments[0];
  this.path.strokeCap = 'round';
  this.path.closed = true;
  this.path.smooth();
}

KHOI.Fin.prototype.midway = function(point1, point2, offset, right) {
  var midpoint = new Point( (point1.x + point2.x) / 2, (point1.y + point2.y) / 2 );
  midpoint.x += offset;
  if(right){
    midpoint.y -= offset;
  }
  else {
    midpoint.y += offset;
  }
  return midpoint;
}

KHOI.Fin.prototype.update = function(orientation) {
  this.path.segments[1].point = this.anchor.point;

  var dx = this.anchor.point.x - this.path.segments[1].point.x;
  var dy = this.anchor.point.y - this.path.segments[1].point.y;
  var angle = Math.atan2(dy, dx) + ((orientation + 90) * (Math.PI / 180));

  this.path.segments[1].point.x += Math.cos(angle);
  this.path.segments[1].point.y += Math.sin(angle);

  for(var i = 2; i < this.path.segments.length; i++){
    var px = this.path.segments[i].point.x - this.path.segments[i - 2].point.x;
    var py = this.path.segments[i].point.y - this.path.segments[i - 2].point.y;
    var pt = new Point(px, py);
    var len = pt.length;
    if(len > 0.0) {
      this.path.segments[i].point.x = this.path.segments[i - 1].point.x + (pt.x * this.segmentLength) / len;
      this.path.segments[i].point.y = this.path.segments[i - 1].point.y + (pt.y * this.segmentLength) / len;
    }
  }
}
