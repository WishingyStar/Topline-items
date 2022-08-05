<template>
  <div>
    <van-nav-bar title="注册" left-arrow @click-left="$router.back()">
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="regForm">
      <!-- field 字段 -->
      <van-field
        v-model="username"
        name="username"
        label="手机号"
        placeholder="请填写手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
        ]"
      />

      <van-field
        v-model="vercode"
        name="vercode"
        label="验证码"
        placeholder="请填写验证码"
        clearable
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' },
        ]"
      >
        <template #button>
          <van-button
            size="small"
             style="background-color:#7e8ad4;"
            @click="sendSms"
            native-type="button"
            :disabled="codeBtnDisabled"
          
            >{{code_text}}</van-button
          >
        </template>
      </van-field>

      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            validator: (e) => /^\w{6,12}$/.test(e),
            message: '密码格式错误,需要是6-12位的字母或数字',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          style="background-color:#7e8ad4;"
         
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form } from "vant";
import { Field } from "vant";
import { reg, sendSms,delete_user } from "@/api/user";


export default {
  name: "login",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
  },
  data() {
    return {
      username: "",
      password: "",
      vercode: "",
      codeBtnDisabled:false,
      code_text:"发送验证码"
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);

      reg(values).then((res) => {
        console.log(res);
      });
    },
    async sendSms() {
     try{
     let validate_res =  await this.$refs.regForm.validate("username");
           this.codeBtnDisabled  = true;
          this.code_text = '发送中...'
          sendSms({
            mobile: this.username,
            type: "register",
          }).then((res) => {
            console.log(res);
               
             if(res.code ==0){
              // 发送成功
                this.$toast(`短信已经发送到手机号${this.username},请注意查收`);
                  let count = 60;
                  let timer =  setInterval(()=>{
                      count--;
                      this.code_text = `${count}s后再次获取`;
                      if(count<=0){
                        clearInterval(timer);
                        this.code_text = `再次发送`;
                        this.codeBtnDisabled  = false;
                        count = 60
                      }
                    },1000)
               
             }else{
                this.$toast(res.msg||'发送失败')
                this.codeBtnDisabled  = false;
                this.code_text = '再次发送'
             }

          }).catch(err=>{
                console.log(err)
                this.$toast(err.msg||'发送失败')
                this.codeBtnDisabled  = false;
                this.code_text = '再次发送'
          })
     }catch(e){}
    },
  },
};
</script>

<style>
</style>