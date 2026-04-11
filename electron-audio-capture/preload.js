const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 发送音频进行解析
  analyzeAudio: (audioBuffer) => ipcRenderer.invoke('analyze-audio', audioBuffer)
});
