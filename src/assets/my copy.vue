<template>
    <div class="Manager">
        {{$store.state.a}}
        <button @click="$store.commit('changea',2)">改</button>
        <!-- 头部-->
        <div class="header">

            <div class="top">
                <div class="txnc">
                    <div class="topimg"></div>
                    <p>心宿</p>
                </div>
                <div class="bjzl">
                    <p>编辑资料</p>
                </div>
            </div>
            <div class="down">
                <div class="downn">
                    <span class="downfont">1</span>
                    <h3 class="downh3">头条</h3>
                </div>
                <div class="downn">
                    <span class="downfont">3</span>
                    <h3 class="downh3">获赞</h3>
                </div>
            </div>
        </div>
        <!-- 收藏+历史 -->
        <!-- 收藏 -->
        <div class="iconn">
            <span class="iconfont icon-jingdiananli_kongwujiaoxing_shoucang"></span>
            <h5 class="iconh5">收藏</h5>
        </div>
        <!-- 历史 -->
        <div class="iconn">
            <span class="iconfont icon-shizhong"></span>
            <h5 class="iconh5">历史</h5>
        </div>

        <!-- 修改密码 -->
        <van-cell is-link title="修改密码" @click="passClick" />
        <!-- 联系我们 -->
        <van-cell is-link title="联系我们" @click="show2 = true" />
        <van-action-sheet v-model="show2" title="详情">
            <div class="content">
                市场、商务合作请联系邮箱 : laitoutiao@163.com<br><br>
                广告投放及售后请联系 : <a href="https://www.laitoutiao.com/">https://www.laitoutiao.com/</a>
                在线客服或拨打：666-888-9999<br><br>
                广告投诉 <a href="#">请点击这里</a><br><br>
                媒体合作请联系邮箱 : media@toutiao.com<br><br>
                用户反馈 : 请打开莱头条App，前往“我的->用户反馈”进行反馈<br><br>
                头条号问题 : 请点击这里<br><br>
                抖音电商请访问 : <a href="https://douyinec.com/">https://douyinec.com/</a><br><br>
            </div>
        </van-action-sheet>
        <!-- 关于我们 -->
        <van-cell is-link title="关于我们" @click="show = true" />
        <van-action-sheet v-model="show" title="关于头条">
            <div class="content">
                莱头条是一个通用信息平台，致力于连接人与信息，让优质丰富的信息得到高效精准的分发，促使信息创造价值。<br><br>
                莱头条目前拥有推荐引擎、搜索引擎、关注订阅和内容运营等多种分发方式，囊括图文、视频、问答、微头条、专栏、小说、直播、音频和小程序等多种内容体裁，并涵盖科技、体育、健康、美食、教育、三农、国风等超过100个内容领域。<br><br>
                头条搜索是莱头条推出的搜索引擎服务，支持海量优质内容和全网公开内容的检索，为用户提供精准、专业、快捷的搜索结果。用户可以在莱头条客户端内体验，除了默认的综合搜索频道外，还有视频、资讯、小视频、图片、音乐、影视等多个垂直搜索，全方位满足搜索需求。<br><br>
                头条号是莱头条旗下开放的内容创作与分发平台， 实现政府部门、媒体、企业、个人等内容创作者与用户之间的智能连接。截至2019年12月，头条号帐号总数已超过 180 万，平均每天发布 60
                万条内容。<br><br>
                微头条是莱头条旗下的社交产品，用户可通过发布图文、短视频、直播等多形式的动态与人互动，逐渐与人建立起社交关系。在微头条，用户每天产生的互动数量超过2000万，发布量近1000万，活跃的大咖超过1万位。<br><br>
            </div>
        </van-action-sheet>
        <!-- 确定按钮 -->
        <div class="buttonx">
            <van-button type="primary" size="large" @click="loginn()">退出登录</van-button>
        </div>
        <!-- 底部 -->
        <van-tabbar v-model="activee" active-color="#07C160" inactive-color="#000">
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="add-o" to="/Add">发布</van-tabbar-item>
            <van-tabbar-item icon="manager-o" to="/manager">我的</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
// 
import Vue from 'vue';
import { Cell } from 'vant';
import { ActionSheet } from 'vant';
Vue.use(Cell);
Vue.use(ActionSheet);


export default {
    data() {
        return {
            show: false,
            show2: false,
            activee:2
        };
    },
    methods: {
        loginn(){
            this.$router.push('/login')
        },
        passClick(){
            this.$router.push('/xiugaimima')
        }
    },
};
</script>

<style lang="less">




// 大头部
.header{
    width: 100%;
    height: 224px;
    background-image: url(../assets/banner.jpg);
    background-size: 548px 218px;
}
// 头部
.top {
    width: 100%;
    height: 96px;
    padding-top: 24px;
}
// 头像
.topimg{
    width: 84px;
    height: 84px;
    border-radius: 58px;
    float: left;
    background-image: url(../assets/vx.jpg);
    background-size: contain;
    margin-top: -2px;
    margin-left: 12px;
    cursor: pointer;
}
// 昵称
.txnc p{
    font-size: 18px;
    color: #F5F7F9;
    padding-left: 12px;
    padding-top: 32px;
    float: left;
    margin: 0;
}
// 编辑资料
.bjzl {
    width: 84px;
    height: 32px;
    background-color: #F5F7F9;
    border-radius: 24px;
    text-align: center;
    line-height: 26px;
    float: right;
    line-height: 0;
    cursor: pointer;
    margin-top: 36px;
}

// 收藏+历史
.iconn {
    width: 50%;
    height: 80px;
    float: left;
    padding-bottom: 6px;
    display: flex;
    align-items: center;
    flex-direction: column;
    align-content: center;
    color: #FF962F;
    font-size: 9.6vw;
    margin: 12px 0;
}
.iconfont {
    font-size: 36px;
}
.iconh5{
    margin-top: 8px;
    color: #000;
    font-size: 3.73333vw;
    font-weight: normal;
}
// 头条·  获赞·
.down{
    height: 94px;
}
.downn {
    width: 50%;
    height: 50px;
    float: left;
    padding-bottom: 6px;
    display: flex;
    align-items: center;
    flex-direction: column;
    align-content: center;
    margin: 12px 0;
    color: #fff;
}
.downh3{
    margin-top: 0px;
    margin-bottom: 0px;
}
.downfont {
    font-size: 36px;
}
// 联系我们+关于头条
.content {
    padding: 16px 16px 160px;
}
// 退出登录按钮
.buttonx {
    width: 100%;
    height: 380px;
    background-color: #F5F7F9;
}


</style>