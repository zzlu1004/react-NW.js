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