# 手动搭建react + react-router + antd + mobx + nwjs 的demo

### 搭建react工程

#### 初始化npm环境
`npm init` 选择配置项，得到package.json文件

#### 安装webpack
`npm i webpack webpack-cli  -D`

#### 创建目录及配置文件
创建 src文件夹，src下创建webpack打包入口文件 index.js
创建webpack.config.js 并编写配置文件。
```javascript
const path = require('path') // 引入‘path’
module.exports = {
    // 应用入口
    entry: {
        app: path.join(__dirname, './src/index.js') // index.js作为打包的入口
    },
    // 输出目录
    output: {
        filename: 'build.js',
        // filename: '[name].[hash:8].js', //name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
        path: path.join(__dirname, 'dist'), // 打包好之后的输出路径
    }
}
```

#### 修改package.json
```javascript
"build": "webpack --mode production"
```

#### 需要引入 babel-loader
`npm i babel-core babel-loader@7.1.5 babel-preset-env -D`

`npm install babel babel-cli  -D`

`npm install babel-preset-react  babel-preset-es2015 -D`

`npm install babel-preset-stage-0 -D`

webpack.config.js中配置loder
```javascript
......
 module: {
    rules: [{
      test: /\.(js|jsx)$/, //使用loader的目标文件。这里是.js
      use: {
        loader: 'babel-loader'
      },
      exclude: [
        path.join(__dirname, '../node_modules') // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
      ]
    }]
  }
```

在项目根目录下创建 babel 的配置文件： .babelrc
```javascript
{
    "presets": [
        "react",
        "es2015",
        "stage-0"
    ],
    "plugins": [
        "transform-decorators-legacy"
    ]
}
```
#### 安装css-loader
`npm i css-loader style-loader -D`

修改配置文件，添加plugins
```
....
module: {
        rules: [{
            test:/\.css$/,
            use: ['style-loader', 'css-loader']
        }
.....
```
#### 安装url-loader
`npm i url-loader -D`

修改配置文件，添加plugins
```
....
module: {
        rules: [
			....
			{
            test:/\.(jpg|png|jpeg|gif)$/,
            use: {
                loader:"url-loader"
            }
        }
.....
```

#### 使用HTML模板
`npm i html-webpack-plugin -D`

修改配置文件，添加plugins

```javascript
const HTMLPlugin = require('html-webpack-plugin')
.....
.....
plugins: [
    new HTMLPlugin({
      filename: 'index.html', //制定的文件，默认
      template: 'index.html' //制定html生成使用的模板文件 
    }) // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的。
  ]
```

#### 创建html模板
在跟目录下创建一个index.html文件

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>demo</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

#### 开发模式热更新

`npm i webpack-dev-server -D`

在package.json中script中添加
```
"dev": "webpack-dev-server --mode development --open",
```
执行`npm run dev`，项目就可以运行了

#### 安装react
`npm i react react-dom -S`

`创建src文件夹，并在src文件夹下创建index.jsx入口文件`

```
import React from 'react'
import ReactDom from 'react-dom'

class Demo extends  React.Component{
  render() {
    return (
      <div>hello word</div>
    )
  }
}
export default Demo

ReactDom.render(<Dome />, document.getElementById('root'))
```

### 搭建react项目

#### 安装 react-router-dom mobx mobx-react antd

`npm i react-router-dom mobx mobx-react antd -S`

#### 搭建骨架

![avatar ](https://images.qmai.cn/s1000123/2020/02/22/685c9e009a6c77d5c6.png)

#### mobx配置
index.js
```
import news from "./list"

/// 默认导出接口
export default {
    news
}
```
list.js
```
import { observable, action } from 'mobx'

class News {
    @observable list = [
        {
            id: 1,
            title: '字母哥33+16雄鹿胜活塞 吹杨50+8老鹰灭热火',
            content: '北京时间2月21日，全明星赛后，NBA下半程烽烟再起。雄鹿客场大胜活塞；热火则在客场失利，败给了老鹰，未能完成横扫。以下是这两场比赛的综述',
        },
        {
            id: 2,
            title: '美国专家团预测：字母哥卫冕MVP 总冠军属于LA',
            content: '北京时间2月20日，常规赛即将进入后半程，美国权威体育媒体邀请专家团对重大奖项和季后赛结果进行预测。',
        }
    ]
    @action setList(val) {
        this.list = val
    }
}

export default new News()
```

#### 路由配置
```

import React from 'react'
import Add from '../pages/add/index.jsx'
import List from '../pages/list/index.jsx'
import Detail from '../pages/detail/index.jsx'
import Nwjs from '../pages/nwjs/index.jsx'
import { Route } from "react-router-dom"
 
const routes = [
    {
        path: "/add",
        component: Add
    },
    {
        path: "/list",
        component: List
    },
    {
        path: "/detail/:id",
        component: Detail
    },
    {
        path: "/nwjs",
        component: Nwjs
    }
]

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
            <route.component {...props} routes={route.routes} />
            )}
        />
    )
}
  
export { routes, RouteWithSubRoutes }

```

### NW.js尝试

nw中 package.json的配置如下

```
{
    "name": "helloworld",
    "main": "http://localhost:8000/",
    "node-remote": "http://localhost:8000/",
    "window": {
        "width": 1000,
        "height": 600,
        "position": "center",
        "min_width": 400,
        "min_height": 200
    }
}
```

src/pages/nwjs/index.jsx 代码如下

```
import React, { Component } from 'react'
import { Button, Divider, message } from 'antd'
import icon from '../../images/vip.png'
import './index.css'

class Nwjs extends Component{
    constructor(props) {
        super(props)
        this.state = {
            win: null
        }
    }

    componentDidMount(){
        this.setState({
            win: nw.Window.get() //获取当前窗口
        }, () => {
            // 新窗口关闭后释放'win'对象
            this.state.win.on('closed', function() {
                this.setState({
                    win: null
                })
            })
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.minimize}>窗口最小化</Button>
                <Button className="mg-left" type="primary" onClick={this.maximize}>窗口最大化</Button>
                <Button className="mg-left" type="primary" onClick={this.normal}>默认窗口</Button>
                <Button className="mg-left" type="primary" onClick={this.close}>关闭窗口</Button>
                <Divider />
                <Button type="primary" onClick={this.createMenu}>创建菜单</Button>
                <Divider />
                <Button type="primary" onClick={this.shell}>shell</Button>
                <Divider />
                <Button type="primary" onClick={this.tray}>创建托盘</Button>
            </div>
        )
    }

    // 窗口最小化
    minimize = () => {
        const { win } = this.state
        // 监听最小化事件
        win.on('minimize', function() {
            console.log('窗口最小化')
        });

        // 窗口最小化
        win.minimize()

        // 移除最小化监听事件
        win.removeAllListeners('minimize')
    }

    // 窗口最大化
    maximize = () => {
        const { win } = this.state
        win.maximize()
    }

    // 默认窗口
    normal = () => {
        const { win } = this.state
        win.resizeTo(1000, 600)
    }
    
    // 关闭窗口
    close = () => {
        const { win } = this.state
        win.close()
    }

    // 创建菜单
    createMenu = () => {
        // 创建一个空的菜单栏
        var menu = new nw.Menu({type: 'menubar'})

        // 创建一个子菜单作为第二级菜单
        var submenu = new nw.Menu()
        submenu.append(new nw.MenuItem({ 
            label: '菜单项 A', 
            icon: icon,
            tooltip: 'test',
            click: function() {
                console.log("您选择了菜单项A");
            }
        }))
        submenu.append(new nw.MenuItem({ type: 'separator' }))
        submenu.append(new nw.MenuItem({ 
            label: '菜单项 B',
            type: 'checkbox',
            checked: true
         }))

        // 创建并附加一级菜单到菜单栏
        menu.append(new nw.MenuItem({
            label: '第一个菜单',
            submenu: submenu
        }))

        // 弹出窗口作为上下文菜单
        menu.popup(10, 10)

        // 分配至`window.menu`并显示菜单
        nw.Window.get().menu = menu

        message.success('创建成功')
    }

    // shell
    shell = () => {
        nw.Shell.openExternal('https://github.com/nwjs/nw.js')
        // 默认编辑器中打开指定文件 . 
        nw.Shell.openItem('../../../README.md')
    }

    // 创建托盘
    tray = () => {
        // 创建托盘图标
        var tray = new nw.Tray({ title: 'Tray', icon: icon })

        // 创建托盘菜单
        var menu = new nw.Menu()
        menu.append(new nw.MenuItem({ type: 'checkbox', label: 'box' }))
        tray.menu = menu;

        // 移除托盘图标
        tray.remove()
        tray = null
    }

}
export default Nwjs
```

### 总结

此次任务主要目的为熟悉react及相关生态圈，并结合NW.js实现的一个简单的demo，完整代码请[点这里](https://github.com/lzz1004/react-NW.js)
