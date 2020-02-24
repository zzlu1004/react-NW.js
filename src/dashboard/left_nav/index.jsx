import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';

@withRouter
class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/add'
    };
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    this.setState({
      current: path === '/' ? '/add' : path
    });
  }

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode='inline' theme='dark'>
        <Menu.Item key='/add'>
          <Link to='/add'><Icon type='mail' />添加新闻</Link>
        </Menu.Item>
        <Menu.Item key='/list'>
          <Link to='/list'><Icon type='appstore' />新闻列表</Link>
        </Menu.Item>
        <Menu.Item key='/nwjs'>
          <Link to='/nwjs'><Icon type='border-outer' />NW.js</Link>
        </Menu.Item>
      </Menu>
    );
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
}
export default LeftNav;
