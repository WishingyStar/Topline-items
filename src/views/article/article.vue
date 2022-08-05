<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      fixed
      placeholder
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>

    <!-- /导航栏 -->
    <div class="container">
      <div
        class="article-content"
        :style="{ height: 'calc(' + windowHeight + ' - 100px)' }"
      >
        <h1 class="title">{{ title }}</h1>

        <!--  骨架屏 -->
        <van-skeleton title avatar :row="3" :loading="!article.time">
          <van-cell center class="user-info">
            <div slot="title" class="name">{{ article.author }}</div>
            <van-image
              slot="icon"
              class="avatar"
              round
              fit="cover"
              :src="article.avatar"
            />
            <div slot="label" class="pubdate">{{ article.time }}</div>
          </van-cell>
          <div
            class="markdown-body"
            ref="articleContent"
            v-html="article.content"
          ></div>
        </van-skeleton>

        <van-divider
          ref="divider"
          :style="{ borderColor: '#999', height: '5px' }"
        ></van-divider>
        <!-- 文章评论列表 -->
        <div class="section-title2">热门评论</div>
        <div>
          <!-- 上拉加载 van-list -->
          <van-list
            v-model="commentLoading"
            :finished="commentFinished"
            @load="getCommentList"
          >
            <template #finished>
              <div>
                <p v-if="commentList.length === 0">抢沙发</p>
                <p v-else>没有更多数据了</p>
              </div>
            </template>

            <van-cell
              class="comment-item"
              v-for="(item, index) in commentList"
              :key="item._id"
            >
              <van-image
                slot="icon"
                class="avatar"
                round
                fit="cover"
                :src="item.info.avatar"
              />
              <div slot="title" @click="openReply(item, index)">
                <div class="title-w">
                  <div class="name">{{ item.info.nickname }}</div>
                  <div class="like-w">
                    <van-icon
                      class="like-icon"
                      :class="{ liked: item.is_like }"
                      @click.stop="
                        toggleCommentLike(item._id, item.is_like, index)
                      "
                      name="good-job"
                    />
                    <span class="like-count">{{
                      item.like_count == 0 ? "" : item.like_count
                    }}</span>
                  </div>
                </div>
                <div class="content">{{ item.content }}</div>
                <div class="info">
                  <span class="pubdate">{{
                    item.create_time | formatDate
                  }}</span>
                  <van-button
                    class="reply-btn"
                    round
                    size="mini"
                    @click.stop="
                      popupShow(1, item.info.nickname, item._id, index)
                    "
                    >{{
                      item.reply_num == 0 ? "" : item.reply_num
                    }}回复</van-button
                  >
                </div>
              </div>
            </van-cell>
          </van-list>
        </div>
        <!-- /文章评论列表 -->
      </div>
    </div>

    <!-- /发布评论 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="popupShow(0)"
        >写评论</van-button
      >

      <!-- 评论  -->
      <van-icon name="comment-o" color="#777" v-if="article.comment == 0" />
      <van-icon name="comment-o" color="#777" :badge="article.comment" v-else />

      <!-- 收藏 -->
      <van-icon
        name="star"
        :color="article.is_fav ? '#f00' : '#777'"
        @click="toggleFav"
      />
      <!-- 点赞 -->
      <van-icon
        name="good-job"
        :color="article.is_like ? '#f00' : '#777'"
        @click="toggleLike"
      />
      <van-icon name="share" color="#777777" @click="showShare = true"></van-icon>
    </div>

    <!-- 评论回复 -->
    <van-popup v-model="commentPopupShow" position="bottom">
      <div class="post-comment">
        <van-field
          v-model="content"
          rows="4"
          autosize
          type="textarea"
          maxlength="1000"
          :placeholder="reply_placeholder"
          show-word-limit
          ref="content"
        />
        <div style="width: 100%">
          <van-button size="large" type="primary" @click="submit"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
    <!-- /评论回复 -->
    <!--   /回复   -->

    <van-popup
      v-model="replyPopupShow"
      round
      :overlay="false"
      position="bottom"
      style="height: 100%"
    >
      <replyCom
        :key="key"
        @close="replyPopupShow = false"
        :article_id="article_id"
        :replyInfo="replyInfo"
      ></replyCom>
      <!-- 评论 -->
      <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="popupShow(1, replyInfo.info.nickname, replyInfo._id)"
        >写评论</van-button
      >
      </div>
    </van-popup>
    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
// import "@/common/github-markdown.css";
import { Popup, Skeleton, Divider, Field, ShareSheet } from "vant";
import { mapState } from "vuex";
import { addComment } from "@/api/api";
import articleMethods from "./articleMethods";
import commentMixin from "./commentMixin";
import replyCom from "./replyCom.vue";

export default {
  name: "articleView",
  components: {
    [Popup.name]: Popup,
    [Skeleton.name]: Skeleton,
    [Divider.name]: Divider,
    [Field.name]: Field,
    [replyCom.name]: replyCom,
    [ShareSheet.name]: ShareSheet,
  },
  mixins: [commentMixin],
  data() {
    return {
      commentPopupShow: false,
      content: "",
      title: "",
      article_id: "",
      article: {},
      comment_type: 0,
      reply_placeholder: "请留下您的精彩评论",
      reply_comment_id: "",
      replyPopupShow: false,
      replyInfo: {},
      reply_active_index: 0,
      key: 1,
      // 分享
      showShare: false,
      options: [
        { name: 'QQ', icon: 'qq' },
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    };
  },
  filters: {
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
  computed: {
    ...mapState(["uid", "userInfo"]),
  },
  watch: {
    replyPopupShow() {
      console.log(this.key);
      this.key++;
    },
  },
  created() {
    let { title, article_id } = this.$route.query;
    this.article_id = article_id;
    this.title = title;
    this.getArticleDetail();
  },
  methods: {
    // 分享
    onSelect({name}){
      let title = this.article.title
      let href = window.location.href
      switch(name){
        // QQ
        case "QQ":
          window.location.href =
            `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=${title}&href=${href}&content={title}`;
          break;
        // 微信
        case "微信":
              break;
        // 新浪微博
        case "微博":
          window.location.href = 
            `http://service.weibo.com/share/share.php?appkey=583395093&title=${title}&url=${window.location.href}&source=bshare&retcode=0&ralateUid=s新浪微博`
              break;
        // 复制链接
        case "复制链接":
        // 二维码
        case "二维码":
        // 分享海报
        case "分享海报":
      }
    },
    ...articleMethods,
    //  点击评论
    openReply(item, index) {
      this.replyPopupShow = true;
      this.replyInfo = { ...item, index };
    },

    // 弹出评论弹窗
    popupShow(comment_type = 0, reply_placeholder, reply_comment_id, index) {
      if (!this.checkLogin()) return;
      this.comment_type = comment_type;
      this.reply_active_index = index || this.reply_active_index;

      if (comment_type == 0) {
        this.reply_placeholder = "留下您的精彩评论";
        this.reply_comment_id = "";
      } else {
        this.reply_placeholder = "回复：" + reply_placeholder;
        this.reply_comment_id = reply_comment_id;
      }
      this.commentPopupShow = true;
      this.$nextTick(function () {
        console.log(this.$refs.content);
        this.$refs.content.focus();
      });
    },
    // 发评论
    submit() {
      let {
        content,
        uid: user_id,
        article_id,
        comment_type,
        reply_comment_id,
      } = this;
      content = content.trim();
      if (typeof content != "string" || content.length === 0) {
        this.$toast("格式错误");
        return;
      }

      addComment({
        content,
        user_id,
        article_id,
        comment_type,
        reply_comment_id,
      }).then((res) => {
        console.log(res);

        this.$toast(res.msg);

        if (res.code == 0) {
          this.commentPopupShow = false;
          this.content = "";
          this.article.comment++;

          if (comment_type == 0) {
            let { avatar, nickname, username } = this.userInfo;
            let newCommentData = {
              article_id,
              comment_type,
              content,
              create_time: new Date().getTime(),
              like_count: 0,
              reply_comment_id: "",
              reply_num: 0,
              user_id,
              info: {
                avatar,
                nickname,
                username,
                _id: user_id,
              },
              _id: res.data.id,
            };

            this.commentList.unshift(newCommentData);
          } else {
            // 回复条数变化(二级评论)
            this.commentList[this.reply_active_index].reply_num++;

            // 评论完立即弹出 弹出层
            this.openReply(
              this.commentList[this.reply_active_index],
              this.reply_active_index
            );
            this.key++

          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.article-content {
  overflow-y: auto;
  padding-bottom: 50px;
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 24px 20px 18px;
    background-color: #fff;
    margin: 0;
  }
}

.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}

ul {
  list-style: unset;
}

.markdown-body {
  padding: 14px;
  background-color: #fff;
}

.section-title2 {
  padding: 10px;
  font-size: 24px;
  color: #222;
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
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
  .like-w {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .like-icon.liked {
    color: #ef092c;
  }
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 200px;
    height: 30px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
}

.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
