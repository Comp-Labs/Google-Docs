if (require('electron-squirrel-startup')) return;

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, webContents } = require("electron")
const path = require("path")
const { updateElectronApp, UpdateSourceType } = require('update-electron-app')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/assets/icon.ico",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.webContents.setUserAgent("Chrome");
  //  = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
  mainWindow.loadURL("https://docs.google.com/document/u/0/?pli=1");
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    mainWindow.loadURL(url)
  })
});

updateElectronApp()

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const isMac = process.platform === "darwin";

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    role: 'viewMenu',
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      // { role: "goBack" },
      // { role: "goForward" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    role: 'windowMenu',
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Google Docs v2022.12.1",
        enabled: false
      },
      {
        label: "Website",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://techfiddle.io/");
        },
      },
      {
        label: "Contact Us",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://techfiddle.io/contact");
        },
      },
      { type: "separator" },
      {
        label: "GitHub",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://github.com/Comp-Labs/Google-Docs");
        },
      },
      {
        label: "YouTube",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://youtube.com/@techfiddle");
        },
      },
      {
        label: "Discord",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://discord.gg/GAbzAGKccW");
        },
      },
      {
        label: "Bento",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://bento.me/techfiddle");
        },
      }
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
