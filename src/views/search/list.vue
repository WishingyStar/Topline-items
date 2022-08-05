<template>
  <div>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <!--  容器 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
      >
        <li v-for="(item, index) in list" :key="index._id">
          <p>{{ item.title }}</p>
          <div
            :class="{
              hide: item.poster_type == 1,
              rightImg: item.poster_type == 2,
              articleImgs: item.poster_type == 3,
            }"
          >
            <img v-for="img in item.imageSrc" :key="img" :src="img" />
          </div>
        </li>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, PullRefresh } from "vant";
import { search } from "@/api/api";

export default {
  name: "searchList",
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      loading: false,
      finished: false,
      skip: 0,
      limit: 20,
      isRefresh: false,
      list: [],
      key_word: "",
    };
  },
  created() {
    this.key_word = this.$route.query.key_word;
  },
  methods: {
    getList(flag) {
      let { key_word, skip, limit } = this;
      search({
        key_word,
        skip,
        limit,
      }).then((res) => {
        console.log(res);

        if (res.code == 0) {
          if (flag) {
            this.list = res.data;
            this.isRefresh = false
          } else {
            this.list.push(...res.data);
          }


          let len = this.list.length;

          if (len >= res.count) {
            this.finished = true;
          } else {
            this.loading = false;
            this.skip = len;
          }
        }
      });
    },
    onRefresh() {
      this.skip = 0;
      this.finished = false;
      this.getList(true);
    },
  },
};
</script>

<style>
</style>