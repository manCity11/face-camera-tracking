export const VideoService = (() => ({
  startVideo(video) {
    return navigator?.mediaDevices?.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          video.play();
        };
      });
  },
}))();
