# Electron 音频捕获与分析应用

这是一个使用 Electron 构建的音频捕获应用，可以录制音频并发送到后端进行 API 分析。

## 项目结构

```
electron-audio-capture/
├── main.js          # Electron 主进程
├── preload.js       # Electron 预加载脚本
├── index.html       # 前端界面
├── backend.js       # Node.js 后端服务器
└── package.json     # 项目配置
```

## 功能特点

- 🎤 **音频捕获**: 使用浏览器 MediaRecorder API 录制麦克风音频
- 📊 **实时可视化**: 显示录音时的音频波形
- 🚀 **后端集成**: 将录制的音频发送到后端 API 进行分析
- 💻 **Electron 桌面应用**: 跨平台桌面应用程序

## 安装与运行

### 1. 安装依赖

```bash
cd electron-audio-capture
npm install
```

### 2. 启动后端服务器

```bash
npm run backend
```

后端服务将在 http://localhost:3001 启动

### 3. 启动 Electron 应用

打开新终端窗口：

```bash
npm start
```

## 使用说明

1. 点击"开始录音"按钮开始录制音频
2. 说话或录制任何声音
3. 点击"停止录音"结束录制
4. 点击"发送分析"将音频发送到后端 API
5. 查看返回的分析结果

## 自定义后端 API

在 `backend.js` 文件中，找到 `callAudioAPI` 函数，将其替换为您实际的音频分析 API 调用：

```javascript
async function callAudioAPI(audioBuffer) {
  // 示例：调用真实的语音识别 API
  const response = await axios.post('https://your-audio-api.com/analyze', audioBuffer, {
    headers: {
      'Content-Type': 'audio/wav',
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  return response.data;
}
```

## 支持的音频 API 示例

- **Google Cloud Speech-to-Text**: 语音转文本
- **Azure Speech Service**: 语音识别和分析
- **AWS Transcribe**: 自动语音识别
- **IBM Watson Speech to Text**: 语音转录
- **自定义 AI 模型**: 情感分析、关键词提取等

## 技术栈

- **前端**: HTML5, CSS3, JavaScript
- **桌面框架**: Electron
- **后端**: Node.js, Express
- **音频处理**: MediaRecorder API, Web Audio API
- **HTTP 客户端**: Axios

## 注意事项

1. 确保您的设备有麦克风权限
2. 后端服务必须先于 Electron 应用启动
3. 音频文件大小限制为 10MB
4. 生产环境请替换模拟 API 为真实的服务

## 开发模式

如果需要同时启动后端和 Electron 应用，可以安装 concurrently:

```bash
npm install --save-dev concurrently
```

然后修改 package.json 添加 dev 脚本：

```json
"scripts": {
  "dev": "concurrently \"npm run backend\" \"npm start\""
}
```

运行：

```bash
npm run dev
```

## License

ISC
