import '@tensorflow/tfjs'; // madatory 
import { modelUrl } from 'CONFIG';
import * as blazeface from '@tensorflow-models/blazeface';

import { Face } from './models/face.model';

export const FaceDetectionService = (() => {
  let model;

  return {
    loadModel() {
      return blazeface.load({ modelUrl })
        .then((loadedModel) => {
          model = loadedModel;
        });
    },
    detectFaces(video) {
      const isTensorValues = false;

      return model?.estimateFaces(video, isTensorValues)
        .then((faces) => faces.map((face) => new Face(face, video)));
    },
  };
})();
