<template>
  <div>
    <van-nav-bar title="发布"> </van-nav-bar>

    <van-form @submit="onSubmit">
      <van-field 
      v-model="title" 
      name="title" 
      label="标题" 
      placeholder="标题" 
      label-width="48px"
      :rules="[{ required: true, message: '请填写标题' }]" 
      />
      <van-field 
      :value="cate_name" 
      label="分类" 
      label-width="48px" 
      placeholder="请选择分类" 
      readonly 
      name="cate_name"
      @click="catePickerShow = true" />

      <van-field 
      v-model="content" 
      name="content" 
      label="内容" 
      label-width="48px" 
      placeholder="内容" 
      type="textarea"
      :rules="[{ required: true, message: '请填写内容' }]" />

      <!--   上传 -->
      <van-field label="图片" label-width="48px" name="fileList">
        <template #input>
          <van-uploader 
          v-model="fileList" 
          :max-size="500 * 1024" 
          multiple :max-count="3" />
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button 
        round 
        block 
        style="background-color:#7e8ad4;" 
        native-type="submit">提交</van-button>
      </div>
    </van-form>

    <!--   弹出层 -->
    <van-popup 
    v-model="catePickerShow" 
    position="bottom" 
    :style="{ height: '40%' }"
    >
      <van-picker 
      title="请选择" 
      show-toolbar 
      :columns="cate" 
      @confirm="onConfirm" 
      @cancel="catePickerShow = false"
      value-key="name" 
      />
    </van-popup>

    <tabBar></tabBar>
  </div>
</template>

<script>
import Tabbar from "@/components/tabBar";
import { Form } from "vant";
import { Field, Picker, Popup } from "vant";
import { addArticle } from "@/api/api";
import { mapState,mapActions } from "vuex";
import { Uploader } from "vant";
export default {
  name: "publish",
  components: {
    [Tabbar.name]: Tabbar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
  },
  data() {
    return {
      title: "",
      content: "",
      cate_id: "",
      cate_name: "",
      catePickerShow: false,
      fileList: [],
    };
  },
  computed: {
    ...mapState(["cate", "uid", "userInfo"]),
  },
  created() {
    this.$store.dispatch("getCate");
  },
  methods: {
    ...mapActions(['upload']),
    onConfirm(e) {
      this.catePickerShow = false;
      this.cate_name = e.name;
      this.cate_id = e._id;
    },

    async onSubmit(values) {
      let { cate_id, uid, userInfo, fileList } = this;
      let { nickname } = userInfo;

      if (!uid) {
        this.$toast("请先登录");
        setTimeout((v) => {
          this.$router.push("/login");
        }, 500);
        return;
      }

      // 上传图片
      let imageSrc = await this.upload(fileList);

      console.log(imageSrc);
      delete values.fileList;
      addArticle({
        ...values,
        cate_id,
        author:nickname,
        author_id:uid,
        imageSrc
      }).then(res=>{
        console.log(res)

        if(res.code ==0){
          this.$toast(res.msg);
        }else{
          this.$toast(res.msg)
        }
      })
    },
  },
};
</script>

<style>
</style>