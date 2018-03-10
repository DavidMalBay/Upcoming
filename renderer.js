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
  }
  else{
    console.log("please enter a notebook name")
  }
});

ipcRenderer.on('new-project', function () {
  console.log('New Project');

});

ipcRenderer.on('new-note', function () {
  //save current note!!
  NotesManager.saveNote();
  document.querySelector(".TextEditorTitle").value = "";
  monaco.editor.getModels()[0].setValue("");
  $(".TextEditorTitle").focus()
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
  var g = $("#sub-menu")

  if (!x.is(":visible")) {
    x.show()
    g.show()
  } else {
    x.hide()
    g.hide()
  }

  if ($('.ChangeDiv').css('margin-left') == '500px') {
    $(".ChangeDiv").css({
      "margin-left" : "0px"
    })
  } else {
    $(".ChangeDiv").css({
      "margin-left": "500px"
    })
  }

});

ipcRenderer.on('new-goal', function () {
  console.log('New Goal');
});

var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      $(this).removeClass('active');

    } else {
      panel.style.display = "block";
      $(this).addClass('active').siblings().removeClass('active');

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


$(".EditorUIButton").click(function(){
  console.log("clicked")
  // var focusedWindow = BrowserWindow.focusedWindow();
  // focusedWindow.webContents.executeJavaScript("bold", false, null)
  // mainWindow.webContents.executeJavascript("bold", false)
  // BrowserWindow.loadURL('https://github.com')

})

// var options = {
//   debug: 'info',
//   modules: {
//     toolbar: '#toolbar'
//   },
//   placeholder: 'Compose an epic...',
//   readOnly: true,
//   theme: 'snow',
//   background: 'black'
// };

var container = $('#notesEditor').get(0);
// var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [ 'link', 'image'],          // add's image support
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],         // outdent/indent
  [{ 'color': [] }, {'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

var quill = new Quill(container, {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

