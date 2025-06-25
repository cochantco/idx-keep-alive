const express = require('express');
const http = require('http');
const app = express();

// 基本路由，确认服务器运行
app.get('/', (req, res) => {
  res.send('Keep-alive server is running!');
});

// 定时请求预览 URL 保持活跃
const keepAlive = () => {
  const previewUrl = process.env.PREVIEW_URL || 'http://localhost:3000';
  http.get(previewUrl, (res) => {
    console.log(`Pinged ${previewUrl} at ${new Date().toISOString()}`);
  }).on('error', (err) => {
    console.error('Ping error:', err.message);
  });
};

// 每 5 分钟 ping 一次
setInterval(keepAlive, 5 * 60 * 1000);

// 监听端口
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  keepAlive(); // 启动时立即 ping
});
