import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Input, Button, message} from 'antd'

const { TextArea } = Input

@Form.create()
@inject('news')
@observer

class Add extends Component{
    render() {
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 7,
              },
            },
        }
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入标题' }],
                    })(
                        <Input
                            placeholder='请输入标题'
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请输入新闻内容' }],
                    })(
                        <TextArea rows={4} placeholder='请输入新闻内容' />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit'>
                        添加
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    handleSubmit = e => {
        e.preventDefault()
        const lastNews = this.props.news.list[this.props.news.list.length - 1]
        let list = JSON.parse(JSON.stringify(this.props.news.list))
        this.props.form.validateFields((err, values) => {
            if (!err) {
                list.push({
                    id: lastNews.id + 1,
                    title: values.title,
                    content: values.content
                })
                this.props.news.setList(list)
                message.success('添加成功')
            }
        })
    }
}
export default Add