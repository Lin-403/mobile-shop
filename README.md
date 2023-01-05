React商城系统

# 启动前端

## 创建脚手架

```
 npx create-react-app frontend
```

设置rules关闭不需要的语法提示

```
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "rules":{
      "no-undef":"off",
      "no-restricted-globals":"off",
      "no-unused-vars":"off"
    }
  },
```

提交git

```
git init
git add .
git commit -m "react setup"
git remote add origin git@github.com:Lin-403/mobile-shop.git
git remote set-url origin git@github.com:Lin-403/mobile-shop.git
git pull --rebase origin master
git push -u origin master
```

## 创建header和footer

bootswatch主题样式

```
https://bootswatch.com/

// 下载min.css文件后引入到index.js中
import "./bootstrap.min.css"

下载
npm install react-bootstrap bootstrap

使用Container包裹主要部分

cdnjs引入图标
https://cdnjs.com/libraries/font-awesome
复制链接放到index.html中

```

