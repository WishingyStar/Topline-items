<template>
    <div class="Login">
        <!-- 顶部栏 -->
        <van-nav-bar title="登录" left-arrow />
        <van-form @submit="onSubmit">
            <!-- 输入手机号 -->
            <van-field 
                v-model="username" 
                name="手机号"
                type="tel" 
                placeholder="请输入手机号"
                label="手机号" />
            <!-- 密码 -->
            <van-field 
                v-model="password" 
                type="password" 
                placeholder="请输入手机号" 
                label="密码" />        
            <!-- 按钮 -->
            <div class="buttonxx">
                <van-button 
                    type="primary" 
                    size="large" 
                    @click="goLogin">登录</van-button>
                <van-button 
                    type="primary" 
                    size="large" 
                    @click="reg">注册</van-button>
            </div>
        </van-form>
        
    </div>
</template>

<script>
import {NavBar} from 'vant';
// import { Toast } from 'vant';

export default {
    data() {
        return {
            value: '',
            text: '',
            digit: '',
            number: '',
            username: '',
            password: '',
        }
    },
    components: {
        [NavBar.name]: NavBar
    },
    methods: {
        goLogin() {
            this.axios
            .post("https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/login", {
                username: this.username,
                password: this.password
            })
            .then((res) => {
                if (res.data.code == "0") {
                    localStorage.username = res.data.username;
                    localStorage.tokenID = res.data.tokenID;
                    this.$router.push("/manager")
                } else {
                    alert("登录失败")
                    console.log(res);
                }
            })
        },
        
        reg() {
            this.$router.push('/reg')
        }
    }
}
</script>

<style lang="less">


.van-nav-bar .van-icon{
    color: #fff;
}
.van-nav-bar__content{
    background-color: #07C160;
}
.van-button--large {
    width: 90%;
    margin-left: 20px;
    margin-top: 48px;
}
.buttonxx {
    width: 100%;
    height: 667px;
    background-color: #F5F7F9;
}
</style>