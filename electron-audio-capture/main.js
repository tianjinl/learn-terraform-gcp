const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
  
  // 开发模式下可以打开开发者工具
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// 处理来自前端的音频分析请求
ipcMain.handle('analyze-audio', async (event, audioBuffer) => {
  try {
    // 将音频缓冲转换为 Blob 并发送到后端
    const formData = new FormData();
    formData.append('audio', audioBuffer, {
      filename: 'recording.wav',
      contentType: 'audio/wav'
    });

    // 发送到后端 API
    const response = await axios.post('http://localhost:3001/api/analyze-audio', formData, {
      headers: {
        ...formData.getHeaders()
      },
      responseType: 'json'
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('音频分析失败:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
});
