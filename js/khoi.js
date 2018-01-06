var KHOI = KHOI || {};

KHOI.Main = (function() {
  paper.install(window);
  paper.setup("myCanvas");

  var timer = new Date();
  var fish1;
  var fishRes = 64;
  window.onload = function () {
    view.onFrame = draw;
  };

  this.draw = function(event){
    if(fish1 == null){
      fish1 = new KHOI.Fish(0, 50, fishRes);
      fish1.init();
    }
    else {
      fish1.update(event);
    }
  };
})();
