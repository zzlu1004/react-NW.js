import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button } from 'antd';
import './index.css';
import { Link } from 'react-router-dom';

@inject('news')
@observer

class List extends Component {
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 80,
        key: 'id'
      },
      {
        title: 'Title',
        dataIndex: 'title',
        ellipsis: true,
        width: 300,
        key: 'title'
      },
      {
        title: 'Content',
        dataIndex: 'content',
        ellipsis: true,
        key: 'content'
      }, {
        title: 'Action',
        dataIndex: 'action',
        width: 200,
        key: 'action',
        render: (text, row, index) => (
          <div>
            <Link to={'/detail/' + row.id}>
              <Button type='primary' className='detail'>查看</Button>
            </Link>
            <Button onClick={() => this.doDel(row)}>删除</Button>
          </div>
        )
      }];
    const data = this.props.news.list;

    return (
      <Table className='table' columns={columns} dataSource={data} rowKey={row => row.id} bordered />
    );
  }

  // 删除
  doDel = row => {
    const list = JSON.parse(JSON.stringify(this.props.news.list));
    const index = list.findIndex(item => {
      return item.id === row.id;
    });
    if (index > -1) {
      list.splice(index, 1);
      this.props.news.setList(list);
    }
  }
}
export default List;
