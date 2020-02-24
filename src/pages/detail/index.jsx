import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Divider } from 'antd';

@inject('news')
class Detail extends Component {
  render() {
    const { news } = this.props;
    const id = this.props.match.params.id;
    const index = news.list.findIndex(item => {
      return item.id == id;
    });
    const info = news.list[index] || {};

    return (
      <div>
        <p>{info.title}</p>
        <Divider />
        <p>{info.content}</p>
      </div>
    );
  }
}
export default Detail;
