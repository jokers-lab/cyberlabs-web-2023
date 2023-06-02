gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 115;

const currentFrame = (index) =>
  `./assets/robot-model/${(index + 1).toString()}.PNG`;

const images = [];
let robot = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[robot.frame], 0, 0);
}

images[0].onload = render;

gsap.to(robot, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.65,
      pin: "canvas",
      end: "500%",
    },
    onUpdate: render,
  });
