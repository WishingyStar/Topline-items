<template>
  <div class="home">
    <!--  头部 -->
    <van-nav-bar fixed placeholder style="height: 50px;">
      <template #title>
        <router-link class="home-header-searchbox" to="/search">
          <van-icon name="search" color="#fff" size="24" /> <span>搜索</span>
        </router-link>
      </template>
    </van-nav-bar>

    <!--  tabs 导航 -->
    <van-tabs v-model="active" border @click="switchTab" style="position:fixed;z-index: 10;">
      <van-tab v-for="item in cate" :key="item._id" :title="item.name"></van-tab>
    </van-tabs>

    <div class="home-article-list" style="padding-bottom: 50px;padding-top: 48px;">
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <!--  容器 -->
        <van-list class="vanList" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getArtList"
          :immediate-check="false">
          <li class="listcss" v-for="(item, index) in articleList" :key="index._id"
            @click="$router.push({path:'/article',query:{article_id:item._id,title:item.title}})">
            <p>{{ item.title }}</p>
            <div :class="{
            hide: item.poster_type == 1,
            rightImg: item.poster_type == 2,
            articleImgs: item.poster_type == 3,}">
              <div class="imgg">
                <img v-for="img in item.imageSrc" :key="img" v-lazy="img"/>
              </div>
              <div class="userdate">
                <span>用户名：{{ item.author }}</span>
                发布于：<em>{{ item.time | formatDate }}</em>
              </div>
            </div>
          </li>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 底部栏 -->
    <tabBar></tabBar>
  </div>
</template>

<script>
import { Tab, Tabs, List, PullRefresh } from "vant";
import Tabbar from "@/components/tabBar";
import { getCateList, getArticleList } from "@/api/home";

export default {
  name: "HomeView",
  components: {
    [Tabbar.name]: Tabbar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      active: 0,
      cate: [],
      active_cate_id: "",
      articleList: [],
      loading: false,
      finished: false,
      skip: 0,
      limit: 20,
      isRefresh: false,
    };
  },
  mounted() {
    this.getCate();
  },
  filters:{
    // 时间戳转日期格式
    formatDate: function (value) {
      // 时间戳转换日期格式方法
      if (value == null) {
        return "";
      } else {
        let date = new Date(value);
        let y = date.getFullYear(); // 年
        let MM = date.getMonth() + 1; // 月
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate(); // 日
        d = d < 10 ? "0" + d : d;
        let h = date.getHours(); // 时
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes(); // 分
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds(); // 秒
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
        // return y + "-" + MM + "-" + d;
      }
    },
  },
  methods: {
    //   下拉刷新
    onRefresh() {
      this.skip = 0;
      this.finished = false;
      this.getArtList(true);
    },
    //  分类切换
    switchTab() {
      this.active_cate_id = this.cate[this.active]._id;
      this.articleList = [];
      this.skip = 0;
      this.finished = false;
      this.getArtList();
    },
    getCate() {
      getCateList().then((res) => {
        console.log(res);
        this.cate = res.data;
        this.active_cate_id = this.cate[this.active]._id;
        this.getArtList();
      });
    },
    
    //  获取文章列表
    getArtList(flag) {
      let { active_cate_id, skip, limit } = this;

      getArticleList({
        cate_id: active_cate_id,
        skip,
        limit,
      }).then((res) => {
        res.data = res.data.map(v=>{
          if(v.imageSrc.length){
            v.imageSrc = v.imageSrc.map(v=>{
              return v+'?imageslim'
            })
          }
          return v
        })

        if (flag) {
          //  如果是刷新操作
          this.isRefresh = false; //  结束下拉刷新的转圈
          this.articleList = res.data; //  替换为新的
        } else {
          this.articleList.push(...res.data); //  新数据和老数据 拼接
        }

        let len = this.articleList.length; //  数量
        if (len >= res.count) {
          this.finished = true; //  数据加载完了  再滑也别触发事件了
        } else {
          this.skip = len; // skip  更新
          this.loading = false; //  我可以继续去加载
        }
      });
    },
  },
};
</script>


<style lang="less" scoped>
//  主色
::v-deep .van-nav-bar__title{
  max-width:75%
}
.home-header-searchbox {
  height: 32px;
  width: 270px;
  background: rgb(247 255 247 / 50%);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.home-article-list {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  .listcss{
    border: 6px solid cornflowerblue;
  }
  img {
    width: 90%;
    border-radius: 8px;
  }
  p{
    padding: 12px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: burlywood;
    // 文本超出隐藏
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  span{
    font-weight: 500;
    color: #000;
    display: inline-block;
  }
  .userdate{
    padding: 8px 0;
    font-size: 12px;
  }
}
</style>
