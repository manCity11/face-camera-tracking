// formula center of rect  ( (x1 + x2) / 2, (y1 + y2) / 2 ) 
const computeCenter = (topLeft = [], bottomRight = []) => [
  Math.floor((topLeft[0] + bottomRight[0]) / 2),
  Math.floor((topLeft[1] + bottomRight[1]) / 2),
];

export class Face {
  constructor({ topLeft = [], bottomRight = [] } = {}) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
    this.center = computeCenter(topLeft, bottomRight);
  }
}
