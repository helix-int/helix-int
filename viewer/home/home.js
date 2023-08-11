$(document).ready(function ()
{
  const render = async (list) => {
    $("#tbody").html("");
    $.each(list, function (index, { format, extensions, description, supported }) {
      var tr = $("<tr/>").appendTo("#tbody");
      var icon = supported ? '<i class="check circle icon teal"></i>' : ''
      $("<td/>", {
        html: format
      }).appendTo(tr);
      $("<td/>", {
        html: extensions.join(" ")
      }).appendTo(tr);
      $("<td/>", {
        html: description
      }).appendTo(tr);
      $("<td/>", {
        html: icon
      }).appendTo(tr);
    });
  }
  var table = []
  // fix menu when passed
  $('.masthead')
    .visibility({
      once: false,
      onBottomPassed: function () {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function () {
        $('.fixed.menu').transition('fade out');
      }
    });

  // create sidebar and attach to menu open
  $.getJSON("home/minetypes.json", function (data) {
    var categories = [];
    var active = true;
    $.each(data, function (key, list) {
      var item = active ? "active item" : "item";
      table[key] = list;
      $("<a/>", {
        class: item,
        html: key,
        click: function () {
          var key = $(this).text();
          render(table[key]);
          $(this).siblings().removeClass("active");
          $(this).addClass("active");
        }
      }).insertBefore("#tfoot>a:last-child");
      if (active) {
        render(list);
      }
      categories.push(key)
      active = false;
    });
    $("#tcat").attr("colspan", categories.length + 2);
  });

  // add data and event into sample-code
  $.each(languages, function (index, value) {
    $('#code-names').append($("<div/>", {
      class: "ui button",
      html: value['name'],
      click: function () {
        $("#sample-code").html(value["sample"]);
        $("#sample-code").removeClass();
        $("#sample-code").addClass(value["highlight"]);
        hljs.highlightBlock(document.getElementById('sample-code'));
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      }
    }));
  });
  $('#code-names').children().first().click();

  $.getJSON("home/demo-data.json", function (data) {
    $.each(data, function (index, value) {
      $('#data-demo').append($("<option/>", {
        value: value['path'],
        html: value['name'] + (value['description'] != "" ? " - " + value['description'] : "")
      }));
      
    });
  });
  $('#data-demo').dropdown({
    onChange: async function (value) {
      const response = await fetch(value);
      const blob = await response.blob();
      const formData = new FormData();
      var options = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      };
      formData.append('File', blob, value.split(/(\\|\/)/g).pop());
      fetch("/api/file-stream", options).then(response => response.text().then(url => frame.setAttribute("src", url)));
    }
  });
  $("#data-demo").dropdown('set value', 'home/media/flower.webm');
});