const {remote} = require('electron')
const {Menu,MenuItem} = remote
var util = require('util');
var NotesManager = require('../NotesManager');


let rightClickPosition = null

const menu = new Menu()
menu.append(new MenuItem({
  label: 'delete',
  click() {
    console.log(NotesManager.pathToNotesFolder() + clickedElement)
    NotesManager.deleteFolderRecursive(NotesManager.pathToNotesFolder() + clickedElement)
  }
}))

const menuItem = new MenuItem({
  label: 'Inspect Element',
  click() {
    remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
  }

})
menu.append(menuItem)

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  clickedElement = $(e.target).text();
  rightClickPosition = {
    x: e.x,
    y: e.y
  }
  menu.popup(remote.getCurrentWindow())
}, false)