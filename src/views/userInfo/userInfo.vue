<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人资料" left-arrow @click-left="$router.back()">
    </van-nav-bar>

    <div class="container">
      <input
        type="file"
        hidden
        id="file"
        accept="image/*"
        ref="file"
        @change="change"
      />

      <van-cell title="头像" center>
        <label for="file">
          <van-image
            width="50"
            height="50"
            round
            fit="cover"
            :src="userInfo.avatar"
          />
        </label>
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :to="{ path: '/edit', query: { nickname: userInfo.nickname } }"
        :value="userInfo.nickname"
      />

      <van-cell
        title="性别"
        @click="sexPickerShow = true"
        is-link
        :value="userInfo.sex || '请选择性别'"
      />

      <van-popup v-model="sexPickerShow" position="bottom">
        <van-picker
          title="选择"
          show-toolbar
          @confirm="sexPickerConfirm"
          @cancel="sexPickerShow = false"
          :columns="sexColumns"
        />
      </van-popup>

      <van-cell title="生日" is-link 
      @click="datePickerShow = true"
      :value="userInfo.birthday||'请选择生日'" />

      <van-popup v-model="datePickerShow" position="bottom">
        <van-datetime-picker
          :value="userInfo.birthday?new Date(userInfo.birthday):new Date(2000,0,1)"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="datePickerConfirm"
          @cancel="datePickerShow = false"
        />
      </van-popup>

      <div style="margin: 30px 50px">
        <van-button
          round
          block
          style="background-color:#7e8ad4;"
          size="normal"
          :square="true"
          native-type="submit"
          @click="submit"
          >确定</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { editUserInfo } from "@/api/user";
import sexPickerMixin from "./sexPickerMixin";
import datePickerMixin from "./datePickerMixin";

export default {
  name: "userInfo",
  data() {
    return {
      userInfo: {},
    };
  },
  mixins: [sexPickerMixin, datePickerMixin],
  mounted() {
      console.log(this.userInfo)
  },
 
 activated(){
     let nickname = sessionStorage.getItem('nickname')
     if(nickname){
         this.userInfo.nickname = nickname
     }
 },
 deactivated(){
    console.log('加入到缓存')
 },

  watch: {
    "$store.state.userInfo": {
      immediate: true,
      handler(n, o) {
        this.userInfo = JSON.parse(JSON.stringify(n));
      },
    },
  },
  methods: {
    ...mapActions(["upload"]),
    async change(e) {
      console.log();

      let file = e.target.files[0];
      this.userInfo.file = file;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        this.userInfo.avatar = e.target.result;
      };
    },
    // submit
    async submit() {
      let {
        _id,
        nickname,
        avatar,
        file,
        sex = "",
        birthday = "",
      } = this.userInfo;

      if (file) {

        let fileList = [{file}];

        let res = await this.upload(fileList);
        avatar = res[0];
      }

      editUserInfo({
        uid: _id,
        nickname,
        avatar,
        sex,
        birthday,
      }).then((res) => {
        console.log(res);

     this.$toast(res.msg)
       if(res.code == 0){
          this.$store.dispatch('getUserInfo',localStorage.getItem('token'))
            setTimeout(v=>{
              this.$router.back()
            },500)
       }
      
      });
    },
  },
};
</script>
<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}

.update-photo-popup {
  background-color: #000;
}

.name-field-wrap {
  padding: 10px;
}
.update-photo {
  height: 100%;
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
.image {
  display: block;
  max-width: 100%;
}
</style>
