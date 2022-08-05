<template>
  <div class="reply">
    <van-nav-bar :title="replyInfo.reply_num==0?'回复':replyInfo.reply_num+'条回复'" @click-left="close" border>
      <template #left>
        <van-icon name="cross" color="#333" />
      </template>
    </van-nav-bar>

    <van-cell class="comment-item">
      <van-image slot="icon" class="avatar" round fit="cover" :src="replyInfo.info.avatar" />
      <div slot="title">
        <div class="title-w">
          <div class="name">{{ replyInfo.info.nickname }}</div>
        </div>
        <div class="content">{{ replyInfo.content }}</div>
        <div class="info">
          <span class="pubdate">{{ replyInfo.create_time | formatDate }}</span>
        </div>
      </div>
    </van-cell>
    <!-- 分割线 -->
    <div style="
      width: 100%;
      height: 1px;
      background: black;"></div>
    <!-- 回复列表 -->
    <h3 class="huifu">全部回复</h3>
    <commonList :API="getReplyList" :params="params">
      <template #default="{list}">
        <van-cell class="comment-items" v-for="item in list" :key="item._id">
          <van-image slot="icon" class="avatar" round fit="cover" :src="item.info.avatar" />
          <div slot="title">
            <div class="title-w">
              <div class="name">{{ item.info.nickname }}</div>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="info">
              <span class="pubdate">{{ item.create_time | formatDate }}</span>
            </div>
            <div style="
            width: 280px;
            height: 1px;
            background: #CBCFCF;"></div>
          </div>
        </van-cell>
      </template>
    </commonList>
  </div>
</template>

<script>
import { getReplyList } from '@/api/api'
import commonList from '@/components/commonList.vue'

export default {
    name:'replyCom',
    data(){
      return{
        getReplyList,
        params:{
          user_id:this.$store.state.uid,
          reply_comment_id:this.replyInfo._id,
          article_id: this.article_id,
        }
      }
    },
    props:{
      replyInfo:{
           default:{}
      },
      article_id:{}
    },
    // 时间戳转日期格式
    filters:{
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
        }
      },
    },
    components:{
      commonList
    },
    methods:{
        close(){
            this.$emit('close')
        },
    }

}
</script>

<style lang="less" scoped>

::v-deep .van-nav-bar{
 background-color: #fff;
 border-radius: 10px 10px 0 0 ;
}
::v-deep  .van-nav-bar__title{
    color: #333;
}
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }

  .name {
    font-size: 16px;
    color: #555;
  }

  .content {
    font-size: 16px;
    color: #222222;
    margin: 10px 0;
    padding: 0;
  }

  .info {
    display: flex;
    height: 36px;
    align-items: center;
  }

  .pubdate {
    font-size: 12px;
    margin-right: 12px;
  }

  .title-w {
    display: flex;
    justify-content: space-between;
    height: 36px;
    align-items: center;
  }
}
// 回复列表
.comment-items {
  // background-color: #d5cdd5;
  padding-left: 32px;
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name {
    font-size: 16px;
    color: #555;
  }
  .content {
    font-size: 16px;
    color: #222222;
    margin: 10px 0;
    padding: 0;
  }
  .info {
    display: flex;
    height: 36px;
    align-items: center;
  }
  .pubdate {
    font-size: 12px;
    margin-right: 12px;
  }
  .title-w {
    display: flex;
    justify-content: space-between;
    height: 36px;
    align-items: center;
  }
}
.huifu{
  padding: 20px 20px;
}
</style>