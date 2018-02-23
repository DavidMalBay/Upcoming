var fs = require('fs');
var util = require('util');

const ipcRenderer = require('electron').ipcRenderer;


ipcRenderer.on('save', function (currentNotebook) {
  var currentNotebook = $(".CurrentNotebookName").text()
  console.log('save file!!!');
  console.log(document.querySelector(".TextEditorTitle").value);
  console.log(monaco.editor.getModels()[0].getValue());
  console.log((currentNotebook));
  if (document.querySelector(".TextEditorTitle").value == "") {
    $(".TextEditorTitle").focus();
    $('.TextEditorTitle').attr("placeholder", "Please enter a tilte");

  } else {
    fs.writeFile(__dirname + "/Files/Notebooks/" + (currentNotebook) + "/" + String(document.querySelector(".TextEditorTitle").value), function (err) {
      if (err) {
        return console.log(err);
      };

      console.log("The file was saved!");
      //only append if note does not already exsist
      $(".table").append("<tr class='note' ><td>" + String(document.querySelector(".TextEditorTitle").value) + "<td class='text-right'>" + "Today" + "</td>" + "</td></tr>");

      $(".save").css({
        "color": "green"
      });

      $(".save").css({
        "color": "black"
      });

    });
  }

});



$('#newNotebookModal').on('shown.bs.modal', function () {
  console.log("on");
  $("#modalInput").focus();

  
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
  console.log('New Note');
  //save current note!!
  document.querySelector(".TextEditorTitle").value = "";
  monaco.editor.getModels()[0].setValue("");


});


$(".new-notebook").click(function () {
  var notebookName = $("#modalInput").val();
  console.log(notebookName);
  if (!fs.existsSync("./Files/Notebooks/" + String(notebookName) + "/")) {
    fs.mkdirSync("./Files/Notebooks/" + String(notebookName) + "/");
  };
  renderFolders();
});


ipcRenderer.on('new-notebook', function () {
  console.log('New Notebook');
  $('#newNotebookModal').modal('toggle');
  // $("#modalInput").focus();

});

ipcRenderer.on('new-todo', function () {
  console.log('New Todo');
});

ipcRenderer.on('focus-mode', function () {
  console.log('focus');
  var x = document.getElementById("main-menu")
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var g = document.getElementById("sub-menu")
  if (g.style.display === "none") {
    g.style.display = "block";
  } else {
    g.style.display = "none";
  }

  // $(".ChangeDiv").css({
  //   "margin-left": "10px"
  // })
  if ($('.ChangeDiv').css('margin-left') == '500px') {
    $(".ChangeDiv").css({
      "margin-left": "5px"
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
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
};



var nodes = document.querySelectorAll('.Notebook');
nodes.forEach(n => {
  n.addEventListener("click", function (e) {
    console.log("active");
    this.classList.toggle("activeNotebook");
  })
});

// var nodes = document.querySelectorAll('.accordion');
// nodes.forEach(n => {
//   n.addEventListener("click", function (e) {
//     var icon = n.querySelector('.icon');
//     icon.classList.toggle("open");
//   })
// });


// $(document).ready(function(){
//   $('.new-notebook').click(function(){
//       console.log("deleted-tiem");
//       document.querySelector(".TextEditorTitle").value = "";
//       monaco.editor.getModels()[0].setValue("");


//   });
// });

$(document).ready(function () {
  $('.delete-item').click(function () {
    console.log("deleted-tiem");
    document.querySelector(".TextEditorTitle").value = "";
    monaco.editor.getModels()[0].setValue("");


  });
});

const testFolder = './Files/Notebooks/';



var notebooks = document.querySelector('.Notebooks');





//  embedd this in a function that refreshes and checks for changes in this folder
//here underneath

// noteName = document.querySelector(".noteName");
var currentNotebook = $(".CurrentNotebookName").text()

var currentNotebookDirectory = "./Files/Notebooks/" + currentNotebook + "/";

function renderNotes() {
  fs.readdir(currentNotebookDirectory, (err, files) => {
    if (err) return console.log(err);

    console.log(files)
    files.forEach(file => {
      var stats = fs.statSync(currentNotebookDirectory + file);
      var date = stats.mtime.toLocaleDateString();


      $(".table").append("<tr class='note' ><td>" + file + "<td class='text-right'>" + date + "</td>" + "</td></tr>");
    })

    $(".note").on("click", function (e) {
      $(this).addClass('activeNotebook').siblings().removeClass('activeNotebook');
    });

  })
}

renderNotes();


function renderFolders() {
  fs.readdir(testFolder, (err, files) => {

    // you shouldn't ignore errors
    if (err) return console.log(err);

    // re-use the same element's structure
    let p = document.createElement("p");
    p.classList.add("notebook")

    notebooks.innerHTML = result = files.reduce((r, c) => {
      p.innerHTML = c
      return r + p.outerHTML
    }, "")

    $(".notebook").on("click", function (e) {
      $(this).addClass('activeNotebook').siblings().removeClass('activeNotebook');
      $(".CurrentNotebookName").text($(this).text());
    });


  });
}

renderFolders();



// need to get current folder instead
// var notes = document.querySelector('.notes');
// fs.readdir(currentNotebook, (err, files) => {
//   for (var i = 0, len = files.length; i < len; i++) {
//     if (!document.getElementById('note') + i) {
//       var ele = document.createElement("p");
//       ele.setAttribute("id", "note" + i);
//       ele.innerHTML = files[i];
//       notes.appendChild(ele);

//     }
//   }
// });




function loadNote() {

}



var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};