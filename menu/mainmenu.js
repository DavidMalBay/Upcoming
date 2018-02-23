  const {app,Menu} = require('electron');
  const BrowserWindow = require('electron').BrowserWindow;


  const template = [{
          label: 'File',
          submenu: [{
                  label: 'New Project',
                  accelerator: 'CmdOrCtrl+P',
                  selector: "new:",
                  click: function () {
                      var focusedWindow = BrowserWindow.getFocusedWindow();
                      focusedWindow.webContents.send('new-project');
                  }

              },
              {
                label: 'New Notebook',
                accelerator: 'CmdOrCtrl+Shift+N',
                selector: "new:",
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('new-notebook');
                }

            },
            {
                label: 'New Note',
                accelerator: 'CmdOrCtrl+N',
                selector: "newNote:",
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('new-note');
                }

            },
            {
                label: 'Focus Mode',
                accelerator: 'F2',
                selector: "focusMode:",
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('focus-mode');
                }

            },
            {
                label: 'New Notebook',
                accelerator: 'CmdOrCtrl+Shift+T',
                selector: "new:",
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('new-todo');
                }

            },
            {
                label: 'New Notebook',
                accelerator: 'CmdOrCtrl+Shift+G',
                selector: "new:",
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('new-goal');
                }

            },
              {
                  label: "Save",
                  accelerator: "CmdOrCtrl+S",
                  selector: "save:",
                  click: function () {
                      var focusedWindow = BrowserWindow.getFocusedWindow();
                      focusedWindow.webContents.send('save');
                  }
              }
          ]
      },
      {
          label: 'Edit',
          submenu: [{
                  role: 'undo'
              },
              {
                  role: 'redo'
              },
              {
                  type: 'separator'
              },
              {
                  role: 'cut'
              },
              {
                  role: 'copy'
              },
              {
                  role: 'paste'
              },
              {
                  role: 'pasteandmatchstyle'
              },
              {
                  role: 'delete'
              },
              {
                  role: 'selectall'
              }
          ]
      },
      {
          label: 'View',
          submenu: [{
                  role: 'reload'
              },
              {
                  role: 'forcereload'
              },
              {
                  role: 'toggledevtools'
              },
              {
                  type: 'separator'
              },
              {
                  role: 'resetzoom'
              },
              {
                  role: 'zoomin'
              },
              {
                  role: 'zoomout'
              },
              {
                  type: 'separator'
              },
              {
                  role: 'togglefullscreen'
              }
          ]
      },
      {
          role: 'window',
          submenu: [{
                  role: 'minimize'
              },
              {
                  role: 'close'
              }
          ]
      },
      {
          role: 'help',
          submenu: [{
              label: 'Learn More',
              click() {
                  require('electron').shell.openExternal('https://electron.atom.io')
              }
          }]
      }
  ]

  if (process.platform === 'darwin') {
      template.unshift({
          label: app.getName(),
          submenu: [{
                  role: 'about'
              },
              {
                  type: 'separator'
              },
              {
                  role: 'services',
                  submenu: []
              },
              {
                  type: 'separator'
              },
              {
                  role: 'hide'
              },
              {
                  role: 'hideothers'
              },
              {
                  role: 'unhide'
              },
              {
                  type: 'separator'
              },
              {
                  role: 'quit'
              }
          ]
      })

      // Edit menu
      template[1].submenu.push({
          type: 'separator'
      }, {
          label: 'Speech',
          submenu: [{
                  role: 'startspeaking'
              },
              {
                  role: 'stopspeaking'
              }
          ]
      })

      // Window menu
      template[3].submenu = [{
              role: 'close'
          },
          {
              role: 'minimize'
          },
          {
              role: 'zoom'
          },
          {
              type: 'separator'
          },
          {
              role: 'front'
          }
      ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)