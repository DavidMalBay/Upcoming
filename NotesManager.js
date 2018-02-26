var fs = require('fs');

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
          fs.writeFile(__dirname + "/Files/Notebooks/" + (currentNotebook) + "/" + String(document.querySelector(".TextEditorTitle").value), monaco.editor.getModels()[0].getValue(), function (err) {
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
        console.log(notebookName);
        if (!fs.existsSync("./Files/Notebooks/" + String(notebookName) + "/")) {
          fs.mkdirSync("./Files/Notebooks/" + String(notebookName) + "/");
        };
        module.exports.renderFolders();
      },

      loadNote: function(fileName){
        fs.readFile(module.exports.pathToNotesFolder() + $(".CurrentNotebookName").text() + "\\" + fileName, "utf8", "r+", (err, fd) => {
            $(".TextEditorTitle").val(fileName);
            monaco.editor.getModels()[0].setValue(fd);


        })
      }
  }
  