var pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  scale = 1.0,
  canvas = document.getElementById('pdf-canvas'),
  context = canvas.getContext('2d');

var dotNetHelper = null

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.js/pdf.worker.js';

export const setData = async (stream) => {
  const data = await stream.arrayBuffer();
  pdfDoc = await pdfjsLib.getDocument({ data }).promise
  await dotNetHelper.invokeMethodAsync('SetPageCountAsync', pdfDoc.numPages)
  //await renderPage(pageNum);
}


export function setDotNetHelper(value) {
  dotNetHelper = value;
}

export const onPageChanged = async (num, zoom) => {
  if (num < 1) {
    return;
  }
  if (num > pdfDoc.numPages) {
    return;
  }
  pageNum = num
  scale = zoom
  queueRenderPage(pageNum);
}

function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function (page) {
    var viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
}


function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}
