import { VideoService } from './commons/video/video.service';
import { CanvasService } from './commons//canvas/canvas.service';
import { ArduinoService } from './commons/arduino/arduino.service';
import { FaceDetectionService } from './commons/face-detection/face-detection.service';

import './main.scss';

(function () {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const mirroredVideo = document.createElement('canvas');
  const wrapper = document.getElementsByClassName('wrapper')[0];

  mirroredVideo.width = video.width;
  mirroredVideo.height = video.height ;
  mirroredVideo.style.display = 'none';
  wrapper.appendChild(mirroredVideo);

  const ctx = mirroredVideo.getContext('2d');

  video.addEventListener('play', () => {
    FaceDetectionService.loadModel()
      .then(() => {
        setInterval(() => {
          CanvasService.drawMirrorImage(ctx, video);

          FaceDetectionService.detectFaces(mirroredVideo)
            .then(([face = {}] = []) => ArduinoService.setPosition(
              face?.center,
              { width: canvas.width, height: canvas.height },
            ));
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
