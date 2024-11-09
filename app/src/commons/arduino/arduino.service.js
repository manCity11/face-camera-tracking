import { ArduinoApi as ArduinoApiModule } from './arduino.api';
import { PositionRequest } from './models/position-request.model';

const CENTER_OFFSET = 60; // for camera stability
const ANGLE_STEP = 5;

export const ArduinoService = ((ArduinoApi) => {
  const computeAngle = (center, axis) => {
    const frameMiddle = axis / 2;
    let direction = 0;

    if (center < frameMiddle - CENTER_OFFSET) {
      direction = -ANGLE_STEP;
    } else if (center > frameMiddle + CENTER_OFFSET) {
      direction = ANGLE_STEP;
    }

    return direction;
  };

  return {
    setPosition(center = [], { width, height } = {}) {
      const xAngle = computeAngle(center?.[0], width);
      const yAngle = computeAngle(center?.[1], height);

      return ArduinoApi.setPosition(new PositionRequest([xAngle, yAngle]));
    },
  };
})(ArduinoApiModule);
