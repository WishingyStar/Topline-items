import { getArticleDetail, addFav, removeFav, like, unlike, commentLike, commentUnlike } from "@/api/api";
import { formatDate } from "@/common/utils";

export default {
  //  获取文章详情
  getArticleDetail() {
    let { article_id, uid: user_id } = this;

    getArticleDetail({
      article_id,
      user_id,
    }).then((res) => {
      console.log(res);
      if (res.code == 0) {
        res.data.time = formatDate(res.data.time);
        this.article = res.data;

      } else {
        this.$toast(res.msg);
      }
    });
  },

  // 切换文章收藏
  toggleFav() {
    let {
      uid,
      article: { is_fav },
      article_id,
    } = this;
    if (!this.checkLogin()) return
    // 没收藏 收藏

    if (is_fav) {
      removeFav({
        article_id,
        user_id: uid,
      }).then((res) => {
        this.$toast(res.msg);
        if (res.code == 0) {
          this.article.is_fav = false;
        }
      });
    } else {
      addFav({
        article_id,
        user_id: uid,
      }).then((res) => {
        this.$toast(res.msg);
        if (res.code == 0) {
          this.article.is_fav = true;
        }
      });
    }
  },

  // 切换文章点赞
  toggleLike() {
    let {
      uid,
      article: { is_like },
      article_id,
    } = this;
    if (!uid) {
      this.$toast("请先登录");
      setTimeout((v) => {
        this.$router.push("/login");
      });
      return;
    }

    // 没收藏 收藏
    if (is_like) {
      unlike({
        article_id,
        user_id: uid,
      }).then((res) => {
        this.$toast(res.msg);
        if (res.code == 0) {
          this.article.is_like = false;
        }
      });
    } else {
      like({
        article_id,
        user_id: uid,
      }).then((res) => {
        this.$toast(res.msg);
        if (res.code == 0) {
          this.article.is_like = true;
        }
      });
    }
  },

  //  切换 评论点赞
  toggleCommentLike(comment_id, is_like, index) {
    if (!this.checkLogin()) return;
    let { uid } = this;
    if (is_like) {
      //  取消
      commentUnlike({
        comment_id,
        user_id: uid
      }).then(res => {
        console.log(res)
        this.$toast(res.msg)
        if (res.code == 0) {
          this.commentList[index].like_count = res.count;
          this.commentList[index].is_like = false
        }
      })
    } else {
      commentLike({
        comment_id,
        user_id: uid
      }).then(res => {
        // console.log(res)
        this.$toast(res.msg)
        if (res.code == 0) {
          this.commentList[index].like_count = res.count;
          this.commentList[index].is_like = true
        }
      })
    }
  }
};
