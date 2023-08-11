export const setVideo= async (videoElementId, stream) => {
  const buffer = await stream.arrayBuffer();
  const blob = new Blob([buffer]);
  const url = URL.createObjectURL(blob);
  const video = document.getElementById(videoElementId);
  video.onload = () => {
    URL.revokeObjectURL(url);
  }
  video.src = url;
}