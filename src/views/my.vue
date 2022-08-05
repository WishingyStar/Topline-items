<template>
  <div class="container" style="padding-top: 0;">
    <van-cell-group class="my-info" v-if="isLogin">
      <van-cell class="base-info" center :border="false" @click="$router.push('/userInfo')">
        <van-image class="avatar" slot="icon" round fit="cover" :src="userInfo.avatar" />
        <div class="name" slot="title">{{userInfo.nickname}}</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false" column-num="2">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{publish_num}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{liked_num}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!--  没登录 -->
    <div class="not-login" v-else>
      <div @click="loginm()">
        <img class="mobile" src="~@/assets/tel.png">
      </div>
      <div class="text">
        <span @click="loginm()">登录</span> / <span @click="regm()">注册</span>
      </div>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="2">

      <van-grid-item class="nav-grid-item">
        <van-icon name="star-o" size="36" color="#FFBC00" />
        <span>收藏</span>
      </van-grid-item>
      <van-grid-item class="nav-grid-item">
        <van-icon name="clock-o" size="36" color="#FFBC00" />
        <span>历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="修改密码" is-link to="/" />
    <!-- 联系我们 -->
    <van-cell is-link title="联系我们" @click="show = true" />
    <van-action-sheet v-model="show" title="联系我们">
      <div class="content">
        <p>市场、商务合作请联系邮箱 : <a href="#">bd@bytedance.com</a></p><br>
        <p>广告投放及售后请联系 : <a href="#">https://www.oceanengine.com/</a><br>在线客服或拨打：400-618-1518</p><br>
        <p>广告投诉 <a href="#">请点击这里</a></p><br>
        <p>媒体合作请联系邮箱 : <a href="#">media@toutiao.com</a></p><br>
        <p>用户反馈 : 请打开莱头条App，前往“我的->用户反馈”进行反馈</p><br>
        <p>头条号问题 : <a href="#">请点击这里</a></p><br>
        <p>抖音电商请访问 : <a href="#">https://douyinec.com/</a></p><br>
      </div>
    </van-action-sheet>
    <!-- 关于我们 -->
    <van-cell is-link title="关于我们" @click="show2 = true" />
    <van-action-sheet v-model="show2" title="关于我们">
      <div class="content">
        <p>莱头条是一个通用信息平台，致力于连接人与信息，让优质丰富的信息得到高效精准的分发，促使信息创造价值。</p><br>
        <p>莱头条目前拥有推荐引擎、搜索引擎、关注订阅和内容运营等多种分发方式，囊括图文、视频、问答、微头条、专栏、小说、直播、音频和小程序等多种内容体裁，并涵盖科技、体育、健康、美食、教育、三农、国风等超过100个内容领域。
        </p><br>
        <p>
          头条搜索是莱头条推出的搜索引擎服务，支持海量优质内容和全网公开内容的检索，为用户提供精准、专业、快捷的搜索结果。用户可以在莱头条客户端内体验，除了默认的综合搜索频道外，还有视频、资讯、小视频、图片、音乐、影视等多个垂直搜索，全方位满足搜索需求。
        </p><br>
        <p>头条号是莱头条旗下开放的内容创作与分发平台， 实现政府部门、媒体、企业、个人等内容创作者与用户之间的智能连接。截至2019年12月，头条号帐号总数已超过 180 万，平均每天发布 60 万条内容。</p><br>
        <p>微头条是莱头条旗下的社交产品，用户可通过发布图文、短视频、直播等多形式的动态与人互动，逐渐与人建立起社交关系。在微头条，用户每天产生的互动数量超过2000万，发布量近1000万，活跃的大咖超过1万位。</p><br>
      </div>
    </van-action-sheet>

    <van-cell v-if="isLogin" class="logout-cell" title="退出登录" @click="logout" />
    <tabBar></tabBar>
  </div>
</template>

<script>
import Vue from 'vue';
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);

//  做一个判断  如果没登录  和登录后看到的界面 有所不同
import {mapState,mapMutations} from 'vuex'
import { Dialog } from 'vant';
import Tabbar from "@/components/tabBar";

export default{
    name:'my',
    data(){
     return {
       show: false,
       show2:false
     }
    },
    components:{
      [Dialog.Component.name]: Dialog.Component,
      [Tabbar.name]:Tabbar
    },

    computed:{
     ...mapState(['uid','token','isLogin','userInfo','liked_num','publish_num'])
    },

    methods:{
        loginm(){
          this.$router.push("/login")
        },
        regm() {
          this.$router.push("/reg")
        },
        ...mapMutations(['clear']),
        async logout(){
        
        let res = await Dialog.confirm({
            title: '提示',
            message: '您确认退出吗?',
          });

          if(res =='confirm'){
              localStorage.clear();
              this.clear() 
          }
        },
        onSelect(item) {
          this.show = false;
          this.show2 = false;
          Toast(item.name);
        },
    }
}


</script>

<style  lang="less">


// 联系/关于我们
.content {
  padding: 16px 16px 160px;
}

.container {
  .my-info {
     background: url("~@/assets/baiblue.jpg") no-repeat;
    // background-size: cover;
    background-size: 720px 300px;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #565A5E;
      }
      .update-btn {
        height: 24px;
        font-size: 12px;
        color: #666666;
        background-color: burlywood;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 16px;
            color: #717578;
          }
          .text {
            font-size: 14px;
            color: burlywood;
            font-weight: 900;
          }
        }
      }
    }
     .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url("~@/assets/baiblue.jpg") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

   .nav-grid {
    .nav-grid-item {
      height: 70px;
      .iconfont {
        font-size: 22px;
		margin-bottom: 5px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
