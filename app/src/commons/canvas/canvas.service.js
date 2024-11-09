export const CanvasService = (() => ({
  drawBox(canvas, faces = []) {
    const ctx = canvas.getContext('2d');

    faces.forEach(({ topLeft = [], bottomRight = [], center = [] } = {}) => {
      ctx.beginPath();
      ctx.lineWidth = '4';
      ctx.strokeStyle = 'blue';
      ctx.rect(topLeft[0], topLeft[1], bottomRight[0] - topLeft[0], bottomRight[1] - topLeft[1]);
      ctx.stroke();

      // draw middle
      ctx.fillRect(center[0], center[1], 3, 3);
    });
  },
  drawMirrorImage(ctx, video) {
    ctx.clearRect(0, 0, video.width, video.height);

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, video.width * -1, video.height);
    ctx.restore();
  },
}))();
