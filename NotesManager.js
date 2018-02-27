var fs = require('fs');
var emoji = require("node-emoji")

module.exports = {

    deleteFolderRecursive: function(path) {
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
        module.exports.renderFolders();
      }
    },
  
    pathToHomeFolder: function() {
      return __dirname
    },
  
    pathToNotesFolder: function() {
      return  __dirname +  "\\Files\\Notebooks\\";    
    },
  
    renderFolders: function () {
      var notebooks = document.querySelector('.Notebooks');

      fs.readdir(__dirname +  "\\Files\\Notebooks\\", (err, files) => {
    
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
          $(".accordion").addClass('active').siblings().removeClass('active');
          $(".CurrentNotebookName").text($(this).text());
          module.exports.renderNotes()
        });

       
          
      });


      


    },
    rename: function (element) {
        let renamed = false
        let currentName = $(element).text() + "\\";
        console.log(currentName)
        $(element).click();
      setTimeout(function() {
        $(element).trigger('focus');
      }, 0);
        element.attr("contenteditable", "true")
        element.keypress(function (evt) {

            var keycode = evt.charCode || evt.keyCode;
            if (keycode  == 13 && renamed == false) { //Enter key's keycode
                fs.renameSync(module.exports.pathToNotesFolder() + currentName, module.exports.pathToNotesFolder() + $(element).text() + "\\")
                renamed = true;
                window.getSelection().removeAllRanges();
                element.attr("contenteditable", "false")
                return false;
            }
            else if (keycode  == 13 ){
                window.getSelection().removeAllRanges();
                element.attr("contenteditable", "false")
                return false;

            }

          });

          
          setTimeout(function() {
            $(element).trigger('focus');
          }, 0)


        

      },
      renderNotes: function(){
          renderNotesPath = module.exports.pathToNotesFolder() + $(".CurrentNotebookName").text() +"\\"
          fs.readdir(renderNotesPath, (err, files) => {
            if (err) return console.log(err);
        
            console.log(files)
            if (files.length >=1) {
                $(".table tbody tr").remove(); 
                files.forEach(file => {
                    var stats = fs.statSync(renderNotesPath + file);
                    var date = stats.mtime.toLocaleDateString()          
                    $(".table").append("<tr class='note' ><td class= 'fileName'>" + file +"</td>" + "<td class='text-right'>" + date + "</td>" + "</td></tr>");
                  })
              
                  $(".note").on("click", function (e) {
                    $(this).addClass('activeNotebook').siblings().removeClass('activeNotebook');
                    module.exports.loadNote($(this).find(".fileName").text())
                });
            }
            else {
                $(".table tbody tr").remove(); 
            }
            
        
          })
        
      },
      

      saveNote: function(){
        var currentNotebook = $(".CurrentNotebookName").text()
        if (document.querySelector(".TextEditorTitle").value == "") {  
          $(".TextEditorTitle").focus();
          $('.TextEditorTitle').attr("placeholder", "Please enter a tilte");
        } else {
            newTitle = emoji.emojify($(".TextEditorTitle").val())
            newSaveData = emoji.emojify(monaco.editor.getModels()[0].getValue())
          fs.writeFile(__dirname + "/Files/Notebooks/" + (currentNotebook) + "/" + newTitle,newSaveData , function (err) {
            newTitle = emoji.emojify($(".TextEditorTitle").val())
            $(".TextEditorTitle").val(newTitle);
            monaco.editor.getModels()[0].setValue(newSaveData)
            console.log("The file was saved!");
            module.exports.renderNotes();
            if (err) {
              return console.log(err);
            };
            

          });

        }
      },

      newNotebook: function() {
        var notebookName = $("#modalInput").val();
        if (!fs.existsSync(module.exports.pathToNotesFolder() + String(notebookName) + "/")) {
          fs.mkdirSync(module.exports.pathToNotesFolder() + String(notebookName) + "/");
        };
        module.exports.renderFolders();

      },

      loadNote: function(fileName){
        fs.readFile(module.exports.pathToNotesFolder() + $(".CurrentNotebookName").text() + "\\" + fileName, "utf8", "r+", (err, fd) => {
            $(".TextEditorTitle").val(fileName);
            monaco.editor.getModels()[0].setValue(fd);
        })
      },

      deleteNote: function(fileName) {
        fs.unlink(module.exports.pathToNotesFolder() + $(".CurrentNotebookName").text() + "\\" + fileName, (err) => {
          if (err) throw err;
          console.log('file was deleted');
        });
        module.exports.renderNotes();
      }
  }
  