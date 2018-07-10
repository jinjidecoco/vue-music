# vue-music

> 音乐播放器

## 服务端开启（[查看详情](https://github.com/Binaryify/NeteaseCloudMusicApi)）

``` bash

git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git

npm install

node app.js

##服务器启动默认端口为 3000,若不想使用 3000 端口,可使用以下命令: Mac/Linux

PORT=4000 node app.js

##windows 下使用 git-bash 或者 cmder 等终端执行以下命令:

set PORT=4000 && node app.js

```

## Build Setup

#### 克隆到本地
``` bash
git clone https://github.com/jinjidecoco/vue-music.git

```
### 安装
``` bash
npm install
```
### 运行
``` bash
##serve with hot reload at localhost:8083
npm run dev
```
### 打包
``` bash
# build for production with minification
npm run build
```



###效果展示：

######  首页部分
![image](https://raw.githubusercontent.com/jinjidecoco/vue-music/master/src/assets/1171531187561_.pic.jpg)

######播放器页面
![image](https://raw.githubusercontent.com/jinjidecoco/vue-music/master/src/assets/1201531187655_.pic.jpg)
###### 排行榜
![image](https://raw.githubusercontent.com/jinjidecoco/vue-music/master/src/assets/1181531187589_.pic.jpg)
###### 歌曲列表
![image](https://raw.githubusercontent.com/jinjidecoco/vue-music/master/src/assets/1191531187633_.pic.jpg)

## 技术栈
 ###### 前端
 1.用于构建用户界面的 MVVM 框架  
 2.为单页面应用提供的路由系统  
 3.vue 集中状态管理  

 ###### 后端  
 1.vue-axios：用来请求后端 API 音乐数据  
 2.NeteaseCloudMusicApi：网易云音乐 NodeJS 版 API，提供音乐数据

## 实现功能   
播放器内核、推荐页面、热榜页面、歌手页面、歌单详情、搜索页面、播放列表。

## TODO
  优化页面加载速度
##感谢
感谢 Binaryify 对接口文档 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)） 的不断维护与更新。


