import * as posenet from '@tensorflow-models/posenet';
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

async function estimatePoseOnImage(imageElement) {
  // load the posenet model from a checkpoint
  const net = await posenet.load();

  const pose = await net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride);

  return pose;
}

const imageElement = document.getElementById('cat');

const pose = estimatePoseOnImage(imageElement);

pose.then((data)=>{
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = parseInt(getComputedStyle(imageElement).width);
  canvas.height = parseInt(getComputedStyle(imageElement).height);

  document.body.appendChild(canvas);

  data.keypoints.forEach((point)=>{
    // poisnt.position.x;
    context.beginPath();
    context.arc(point.position.x, point.position.y, 5, 0, Math.PI*2, false);
    context.fill();

    const tmpDiv = document.createElement('div');
    tmpDiv.textContent = point.part;
    tmpDiv.style.position = 'absolute';
    tmpDiv.style.left = `${point.position.x}px`;
    tmpDiv.style.top = `${point.position.y}px`;

    document.body.appendChild(tmpDiv);
  });
});

console.log(pose);