const imageContainers = document.querySelectorAll(".images-container");
const header = document.querySelector(".header");

let initialClickX = 0;
let isMouseDown = false;
let oldDragPercentage = 0;
let currentDragPercentage = 0;

function panImageContainers(containers) {
  containers.forEach((container, index) => {
    if (index === 1) {
      container.style.transform = `translateX(${
        Math.min(Math.max(oldDragPercentage + currentDragPercentage, -70), 20) *
        -1
      }%)`;
    } else {
      container.style.transform = `translateX(${Math.min(
        Math.max(oldDragPercentage + currentDragPercentage, -70),
        20
      )}%)`;
    }
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

document.addEventListener("DOMContentLoaded", function () {
  header.style.transform = "translateY(0%)";
  setTimeout(() => {
    imageContainers[0].style.transform = "translateX(-20%)";
    imageContainers[1].style.transform = "translateX(-30%)";
    imageContainers[2].style.transform = "translateX(-40%)";
  }, 750);
});

window.addEventListener("touchstart", function (event) {
  const clientX = event.touches[0].clientX;
  initialClickX = clientX;
  isMouseDown = true;
  this.document.body.style.cursor = "grabbing";
});

window.addEventListener("touchend", function (event) {
  isMouseDown = false;
  oldDragPercentage = Math.min(
    Math.max(oldDragPercentage + currentDragPercentage, -70),
    20
  );
  this.document.body.style.cursor = "grab";
});

window.addEventListener("touchmove", function (event) {
  if (isMouseDown) {
    const clientX = event.touches[0].clientX;
    currentDragPercentage = Math.round(
      ((clientX - initialClickX) / window.innerWidth) * 100
    );

    currentDragPercentage = clamp(currentDragPercentage, -100, 100);

    panImageContainers(imageContainers);
  }
});

window.addEventListener("mousemove", function (event) {
  if (isMouseDown) {
    const clientX = event.clientX;
    currentDragPercentage = Math.round(
      ((clientX - initialClickX) / window.innerWidth) * 100
    );

    currentDragPercentage = clamp(currentDragPercentage, -100, 100);

    panImageContainers(imageContainers);
  }
});

window.addEventListener("mousedown", function (event) {
  const clientX = event.clientX;
  initialClickX = clientX;
  isMouseDown = true;
  this.document.body.style.cursor = "grabbing";
});

window.addEventListener("mouseup", function (event) {
  isMouseDown = false;
  oldDragPercentage = Math.min(
    Math.max(oldDragPercentage + currentDragPercentage, -70),
    20
  );
  this.document.body.style.cursor = "grab";
});
