<template>
  <div class="search-container">
    <van-search
      :placeholder="hotWord"
      @search="onSearch"
      @cancel="$router.back()"
      @input="onInput"
      show-action
      v-model="value"
    />

    <div v-show="searchList.length" class="searchList">
      <van-cell
        :title="item.title"
        @click="searchListTap(item.title)"
        v-for="(item, index) in searchList"
        :key="index"
      >
      </van-cell>
    </div>

    <!-- 历史记录 -->
    <div class="search-history">
      <van-cell title="搜索历史">
        <div>
          <span @click="clear">全部删除</span>
        </div>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in history"
        :key="item"
        :to="{ path: '/searchList', query: { key_word: item } }"
      >
        <van-icon name="close" @click="del(index)" />
      </van-cell>
    </div>
    
  </div>
</template>

<script>
import { Search } from "vant";
import { search as searchApi } from "@/api/api";

function debounce(fn, t = 500) {
  let timer = null;
  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout((v) => {
      fn.apply(this, arg);
    }, t);
  };
}

export default {
  name: "search",
  components: {
    [Search.name]: Search,
  },
  data() {
    return {
      hotWord: "二舅",
      value: "", //  输入的内容
      searchList: [],
      history: [], //  历史记录
    };
  },
  created() {
    let history = localStorage.getItem("history");
    if (history) {
      this.history = JSON.parse(history);
    }
  },
  watch: {
    value(n) {
      if (n.trim().length === 0) {
        this.searchList = [];
      }
    },
  },
  methods: {
    onInput: debounce(function (e) {
      e = e.trim();
      if (e.length === 0) return;
      searchApi({
        key_word: e,
      }).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.searchList = res.data;
        }
      });
    }),
    onSearch(e) {
      e = e.trim();
      e = e || this.hotWord;
      console.log(e);
      this.searchListTap(e);
    },
    searchListTap(title) {
      let index = this.history.findIndex((v) => v === title);
      if (index >= 0) {
        this.history.splice(index, 1);
      }
      this.history.unshift(title);
      localStorage.setItem("history", JSON.stringify(this.history));
      this.$router.push({ path: "/searchList", query: { key_word: title } });
    },
    // 删除某个历史记录
    del(index) {
      this.history.splice(index, 1);
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    //清除所有
    clear() {
      this.history = [];
      localStorage.setItem("history", JSON.stringify(this.history));
    },
  },
};
</script>

<style lang="less">
.searchList {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
  z-index: 999;
  background: #fff;
}
</style>
