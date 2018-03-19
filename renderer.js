var clipboard = require('electron').clipboard
var fs = require('fs');
var util = require('util');
const ipcRenderer = require('electron').ipcRenderer;
var NotesManager = require('./NotesManager');
var emoji = require("node-emoji")
const BrowserWindow = require('electron').BrowserWindow;
const Quill = require('quill');



ipcRenderer.on('save', function (currentNotebook) {
  NotesManager.saveNote();

});


$('#newNotebookModal').on('shown.bs.modal', function () {
  console.log("on");
  $("#modalInput").focus();
  $("#modalInput").val("");


});

$('#newNotebookModal').on('hide.bs.modal', function () {
  console.log("on");
  $("#modalInput").val("");
});

$('#modalInput').keypress(function (event) {
  if (event.keyCode == 13 && $('#modalInput').val() != "") {
    $(".new-notebook").click()
  } else {
    console.log("please enter a notebook name")
  }
});

ipcRenderer.on('new-project', function () {
  console.log('New Project');

});

ipcRenderer.on('new-note', function () {
  //save current note!!

  $(".choose-editor").show()

  // NotesManager.saveNote();
  // document.querySelector(".TextEditorTitle").value = "";
  // monaco.editor.getModels()[0].setValue("");
  // $(".TextEditorTitle").focus()
});


$(".new-notebook").click(function () {
  NotesManager.newNotebook();
});


ipcRenderer.on('new-notebook', function () {
  console.log('New Notebook');
  $('#newNotebookModal').modal('toggle');
  // $("#modalInput").focus();

});

ipcRenderer.on('copy-note', function () {
  console.log('Copy Note');
  textToCopy = emoji.emojify(monaco.editor.getModels()[0].getValue())
  clipboard.writeText(textToCopy)
  // $('#newNotebookModal').modal('toggle');
  // $("#modalInput").focus();

});

ipcRenderer.on('new-todo', function () {
  console.log('New Todo');
});

ipcRenderer.on('focus-mode', function () {
  var x = $("#side-menu")
  var g = $(".side-menu-medium")

  if (!x.is(":visible")) {
    x.show()
    g.show()
  } else {
    x.hide()
    g.hide()
  }

  if ($('.ChangeDiv').css('margin-left') == '500px') {
    $(".ChangeDiv").css({
      "margin-left": "0px"
    })
  } else {
    $(".ChangeDiv").css({
      "margin-left": "500px"
    })
  }

});

var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      $(this).removeClass('active');
      $(".side-menu-medium").addClass("hidden")
      $(".ChangeDiv").css({
        "margin-left": "200px"
      })


    } else {
      panel.style.display = "block";
      $(this).addClass('active').siblings().removeClass('active');
      $(".side-menu-medium").removeClass("hidden")
      $(".ChangeDiv").css({
        "margin-left": "450px"
      })
      $(".side-menu").css({
        "height": "0px"
      })
      $("#calendar").hide()
      $(".ContainerForEditor").show()

     

    }
  });
};

var acc = document.getElementsByClassName("non-open-accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    $(this).addClass('active').siblings().removeClass('active');

  });
};



var nodes = document.querySelectorAll('.Notebook');
nodes.forEach(n => {
  n.addEventListener("click", function (e) {
    console.log("active");
    this.classList.toggle("activeNotebook");
  })
});

var nodes = document.querySelectorAll('.accordion');
nodes.forEach(n => {
  n.addEventListener("click", function (e) {
    var icon = n.querySelector('.icon');
    icon.classList.toggle("open");
  })
});

$(document).ready(function () {
  $('.delete-item').click(function () {
    console.log("deleted-tiem");
    document.querySelector(".TextEditorTitle").value = "";
    monaco.editor.getModels()[0].setValue("");


  });
});

const testFolder = './Files/Notebooks/';



NotesManager.renderFolders();

var currentNotebook = $(".CurrentNotebookName").text()

var currentNotebookDirectory = "./Files/Notebooks/" + currentNotebook + "/";

var container = $('#notesEditor').get(0);
// var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{
    'header': [1, 2, 3, 4, 5, 6, false]
  }],
  ['link', 'image'], // add's image support
  [{
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }], // outdent/indent
  [{
    'color': []
  }, {
    'background': []
  }], // dropdown with defaults from theme
  [{
    'font': []
  }],
  [{
    'align': []
  }],
  ['clean'] // remove formatting button
];
var d = new Date()

// var bindings = {
//   customKey: {   
//     key: 'T',
//     ctrlKey: true,
//     handler: function(range) {
//       quill.insertText(range.index,String(d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })))
//     }
//   }

// }

var quill = new Quill(container, {
  modules: {
    toolbar: toolbarOptions,
    // bindings: bindings
  },
  theme: 'snow',
});


// quill.on('text-change', function() {
//   var delta = quill.getContents();
//   saveData = JSON.stringify(delta);
//   fs.writeFile(__dirname + "/Files/Notebooks/" + "Work Notebook" + "/" + "test.json", saveData, function (err) {
//   })

//   //save to a file
// });




$(document).on('click', '.fa-times-circle', function () {
  $(".choose-editor").hide()
})

ipcRenderer.on('new-goal', function () {
  console.log('load File');
  fs.readFile("D:\\OneDrive\\Documents\\Upcoming\\Files\\Notebooks\\Work Notebook\\test.json", "utf8", "r+", (err, fd) => {
    fd = JSON.parse(fd)
    quill.setContents(fd)
    console.log(fd)
  })
});


// $(".close").click(function(){
//   console.log("hi")
//   $(".choose-editor").hide();
// })


$(".quill-select").click(function () {
  console.log("quill")
  $(".choose-editor").hide()
  $("#editor").hide()
  $("#notesEditor").show()
})

$(".monaco-select").click(function () {
  console.log("monaco")
  $(".choose-editor").hide()
  $("#notesEditor").hide()
  $("#editor").show()



})




$(document).ready(function () {
  $('#calendar').fullCalendar({
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    height: "parent",
    contentHeight: "parent",
    defaultView: 'month',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },

  });
});

//function to calculate window height
function get_calendar_height() {
  return $(window).height();
}

//attacht resize event to window and set fullcalendar height property
$(document).ready(function () {
  $(window).resize(function () {
    $('#calendar').fullCalendar('option', 'height', get_calendar_height());
  });


  //set fullcalendar height property
  $('#calendar').fullCalendar({
    //options
    height: get_calendar_height
  });
});

$("#calendar-btn").on("click", function () {
  if ($(this).hasClass("active")) {
    $(".ContainerForEditor").hide()
    $("#calendar").show();
        $("#calendar").fullCalendar('render')



  } else {
    $("#calendar").hide();
    $(".ChangeDiv").show()

  }
})


