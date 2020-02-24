import React from 'react';
import ReactDom from 'react-dom';
import Dashboard from './dashboard/index.jsx';
// 在跟组件通过Provider中间件注入store
import {
  Provider
} from 'mobx-react';
import store from './store';

import 'antd/dist/antd.css';
import './index.css';

ReactDom.render(<Provider {...store}><Dashboard /></Provider>, document.getElementById('root')
);
