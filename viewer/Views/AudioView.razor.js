
  var audio = document.getElementById("audio-control");
  audio.addEventListener("play", function () {
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("audio-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 1024;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#FFF";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = "rgb(" + 192 + "," + 192 + "," + 192 + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }
    renderFrame();
  }, true);



export const setAudio = async (audioElementId, stream) => {
  const buffer = await stream.arrayBuffer();
  const blob = new Blob([buffer]);
  const url = URL.createObjectURL(blob);
  const audio = document.getElementById(audioElementId);
  audio.onload = () => {
    URL.revokeObjectURL(url);
  }
  audio.src = url;
}

