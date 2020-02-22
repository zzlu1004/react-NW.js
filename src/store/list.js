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