let Range = window.ace.require('ace/range').Range;
export const intial = async () => {
  window.editor = ace.edit("ace-editor");
  window.editor.setTheme("ace/theme/textmate");
  window.editor.session.setMode("ace/mode/plain_text");
  window.editor.setOption("tabSize", 1)
  window.editor.setOption("displayIndentGuides", false)
  window.editor.setReadOnly(true);
  window.editor.setShowPrintMargin(false);
  window.editor.commands.removeCommand('find');
  window.session = window.editor.session;
  window.markers = []

}

export const setValue = async (value) => {
    if (typeof (value) != "undefined") {
        editor = ace.edit("ace-editor");
        editor.setValue(value, 1);
    }
}
export const setFontSize = async (value) => {
    if (typeof (value) != "undefined") {
        editor = ace.edit("ace-editor");
        editor.setFontSize(value);
    }
}
export const getLocationInfo = async () => {
    var selectionRange = editor.getSelectionRange();
    var row = selectionRange.start.row + 1;
    var col = selectionRange.start.column + 1;
    var content = session.getTextRange(selectionRange);
    return row + ";" + col + ";" + content.length;
}
export const setMarker = async (row, col, width, height) => {
  var startRow = row;
  var endRow = startRow + height;
  var startColumn = col;
  var endColumn = col + width;
  for (var currentRow = startRow; currentRow < endRow; currentRow++) {
    markers.push(session.addMarker(
      new Range(
        currentRow,
        startColumn,
        currentRow,
        endColumn
      ), "text-marker", "text"
    ));
  }
}
export const clearMarker = async () => {
  while (markers.length > 0) {
    session.removeMarker(markers.pop());
  }
}
export const gotoLine = async (row, col) => {
  editor.gotoLine(row, col)
}