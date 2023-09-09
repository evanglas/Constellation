// Maximal proportion of screen width a star will move given mouse movement
var MOVEMENT_SPEED = 0.5;
var STAR_NUM = 1000;

// Margin beyond the screen boundaries that stars will be placed in units of screen width/height
var MARGIN_SIZE = 0.25;

// Largest original star diameter (all other stars scaled in setStars by 0.1 to 1.1)
var LARGEST_DIAMETER = 20;

var constellationInput = document.getElementById("constellationInput");

constellationInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    var constellation = constellationInput.value;
    constellationInput.value = "";
    console.log(constellation);
  }
});

var star = new Path.Circle({
  center: [0, 0],
  radius: LARGEST_DIAMETER / 2,
  fillColor: "white",
});

var starSymbol = new Symbol(star);

var stars = [];
var centers = [];

var flickeringStars = [];

var siteText = new PointText(view.center);
siteText.content = "this is a site";
siteText.fillColor = "black";
siteText.justification = "center";

setStars(STAR_NUM);

function setStars(n) {
  for (var i = 0; i < n; i++) {
    // gets position of star relative to top left corner in units of view centers
    var relCorner = Point.random() * 2 * (1 + MARGIN_SIZE) - MARGIN_SIZE;

    stars.push(starSymbol.place(relCorner * view.center));
    centers.push(relCorner);
    stars[i].scale(i / n + 0.1);
  }

  flickeringStars = stars.slice(100);
}

function onResize(event) {
  for (var i = 0; i < stars.length; i++) {
    stars[i].position = centers[i] * view.center;
  }
  siteText.position = view.center;
}

function onMouseMove(event) {
  var mouseRelCenter = (event.point - view.center) / view.center;

  for (var i = 0; i < stars.length; i++) {
    var newCenter =
      (centers[i] -
        mouseRelCenter *
          (stars[i].bounds.width / LARGEST_DIAMETER) *
          MOVEMENT_SPEED) *
      view.center;
    stars[i].position = newCenter;
  }

  // console.log(stars[stars.length - 1].position);

  siteText.content = mouseRelCenter;
}

var c = 0;
function onFrame(event) {
  c += 1;
  if (c % 5 == 0) {
    starNum = Math.floor(Math.random() * stars.length);
    // stars[starNum].scale(2);
  }
}
