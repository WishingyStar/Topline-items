<template>
  <div class="Add">
    <!-- 顶部栏 -->
    <van-nav-bar title="发布" />
    <!-- 请输入标题 -->
    <div class="cellgroup1"></div>
    <van-cell-group>
      <van-field 
      v-model="valuee" 
      placeholder="请输入标题" />
    </van-cell-group>

    <!-- 上拉菜单 -->
    <van-field
  readonly
  clickable
  name="picker"
  :value="value"
  label="分类"
  placeholder="点击选择分类"
  @click="showPicker = true"
/>
  <van-popup v-model="showPicker" position="bottom">
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  -</van-popup>
    <!-- 请输入内容 -->
    <van-field 
      v-model="message" 
      rows="3" 
      type="textarea" 
      placeholder="请输入内容" 
      show-word-limit />
    <!-- 相机按钮 -->
    <div class="iconn"><span class="iconfont icon-xiangji"></span></div>
    <!-- 发布按钮 -->
    <div class="buttonx">
      <van-button type="primary" size="large">确定</van-button>
    </div>

    <van-tabbar v-model="active" active-color="#07C160" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="add-o" to="/Add">发布</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/manager">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>

import Vue from 'vue';

// 顶部栏
import { NavBar, Cell, CellGroup } from 'vant';


import { Field } from 'vant';
import { Form } from 'vant';
import { Popup } from 'vant';

Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);



export default {
  data() {
    return {
      valuee: '',
      value: '',
      message:'',
      active:1,
      columns: [],
      showPicker: false,
    };
  },
  components:{
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]:NavBar,
    [Field.name]:Field,
    [Form.name]: Form,
  },
  mounted(){
    this.axios.post("https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/get_cate_list",{
      
    }).then(res => {
      console.log(res)
      this.list = res.data.data;
    })
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
  },
};
</script>

<style lang="less">
// 发布 顶部栏
.van-nav-bar__content {
  background-color: #07C160;
}
.van-nav-bar__title {
  color: #ffffff;
}
.van-button--large {
  width: 70%;
  margin-left: 54px;
}
// 输入框1 发布标题
.cellgroup1 {
  width: 100%;
  height: 12px;
  background-color: #F5F7F9;
}
// 输入框2 发布内容
.cellgroup2{
  width: 100%;
  height: 12px;
  background-color: #F5F7F9;
}
// 相机
.iconn {
  width: 100%;
  height: 48px;
  background-color: #F5F7F9;
  padding-top: 7.6vw;
}
.iconfont {
  font-size: 36px;
  margin-left: -312px;
  color: #b1b5b9;
  cursor: pointer;
}
// 发布按钮
.buttonx{
  width: 100%;
  height: 660px;
  background-color: #F5F7F9;
}
.van-button--large{
  margin-top: 1.8vw;
}
</style>