if (typeof module === "object") {
  window.module = module;
  module = undefined;
}
if (window.module) module = window.module;

window.downloadFileFromStream = async (fileName, contentStreamReference) => {
  const arrayBuffer = await contentStreamReference.arrayBuffer();
  const blob = new Blob([arrayBuffer]);
  const url = URL.createObjectURL(blob);
  const anchorElement = document.createElement('a');
  anchorElement.href = url;
  anchorElement.download = fileName ?? '';
  anchorElement.click();
  anchorElement.remove();
  URL.revokeObjectURL(url);
  return true;
}

window.toastMessage = async (message, title='') => {
  $.toast({
    title: title,
    class: 'black',
    message,
    position: 'bottom right',
    showProgress: 'bottom'
  })
}

window.updateState = async() => {}