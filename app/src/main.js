import { VideoService } from './commons/video/video.service';
import { CanvasService } from './commons//canvas/canvas.service';
import { ArduinoService } from './commons/arduino/arduino.service';
import { FaceDetectionService } from './commons/face-detection/face-detection.service';

import './main.scss';

(function () {
  let isBoxesDisplayed = false;
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const mirroredVideo = document.createElement('canvas');
  const boxesCanvas = document.getElementById('box-canvas');
  const wrapper = document.getElementsByClassName('video__wrapper')[0];
  const positionContainer = document.getElementsByClassName('position__message')[0];
  const buttonContainer = document.getElementsByClassName('button__container')[0];
  const button = document.createElement('button');
  button.innerHTML = 'Display boxes';

  button.onclick = () => {
    isBoxesDisplayed = !isBoxesDisplayed;
  };

  button.addEventListener('click', () => {
    button.innerHTML = `${isBoxesDisplayed ? 'Hide' : 'Display'} boxes`;
  });

  buttonContainer.appendChild(button);

  mirroredVideo.width = video.width;
  mirroredVideo.height = video.height ;
  mirroredVideo.style.display = 'none';
  wrapper.appendChild(mirroredVideo);

  const ctx = mirroredVideo.getContext('2d');
  const ctxBoxes = boxesCanvas.getContext('2d');

  video.addEventListener('play', () => {
    FaceDetectionService.loadModel()
      .then(() => {
        setInterval(() => {
          CanvasService.drawMirrorImage(ctx, video);

          FaceDetectionService.detectFaces(mirroredVideo)
            .then(([face = {}] = []) => {
              positionContainer.innerHTML = `(${face.center?.[0]}, ${face.center?.[1]})`;

              ctxBoxes.clearRect(0, 0, boxesCanvas.width, boxesCanvas.height);
              isBoxesDisplayed && CanvasService.drawBox(boxesCanvas, [face]);

              return ArduinoService.setPosition(
                face?.center,
                { width: canvas.width, height: canvas.height },
              );
            });
        }, 200);
      }).catch(() => {
        // do nothing
      });
  });

  VideoService.startVideo(video)
    .catch(() => {
      // do nothing
    });
})();
