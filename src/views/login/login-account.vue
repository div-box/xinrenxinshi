<template>
  <div class="login-page">
    <div class="login-form">
      <div class="icon">
        <div class="logo" alt="">
          <img :src="logo" alt="" />
        </div>
        <p class="title">薪人薪事</p>
      </div>
      <div class="info">
        <input class="hc-input" v-model="loginInfo.username" placeholder="薪人薪事账号" />
        <input class="hc-input" v-model="loginInfo.password" placeholder="密码" />
      </div>
      <div class="enter-circle">
        <el-icon class="icon-arrow" @click="handleLogin"><Right /></el-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Right } from "@element-plus/icons-vue";
import logo from "/@/assets/img/homeLogo.png";
import { ElMessage } from "element-plus";
const router = useRouter();
const loginInfo = ref({
  username: "",
  password: "",
});

const getSystemInfo = async () => {
  const currUser = localStorage.getItem("workUser");
  if (currUser) {
    router.push("/home");
  }
};
const handleLogin = () => {
  if (loginInfo.value.username && loginInfo.value.password == "123") {
    localStorage.setItem("workUser", loginInfo.value.username);
    router.push("/home");
  } else {
    loginInfo.value.password = "";
    ElMessage.error("账号或密码错误");
  }
};
onMounted(() => {
  getSystemInfo();
});
</script>
<style lang="scss" scoped>
.login-page {
  background-image: url("/@/assets/img/bg.png");
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    height: 32.142857rem /* 450/14 */;
    width: 25rem /* 350/14 */;
    background-color: white;
    border-radius: 49px;
    box-shadow: 2px 2px 15px rgba(193, 191, 191, 0.8);
    margin-bottom: 7.142857rem /* 100/14 */;
    position: relative;
    .icon {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 3.214286rem /* 45/14 */;
      user-select: none;

      .logo {
        width: 10.714286rem /* 150/14 */;
        height: 10.714286rem /* 150/14 */;
        border-radius: 50%;
        background-color: #06414a;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 80%;
          user-select: none;
        }
      }
      .title {
        margin: 1.071429rem /* 15/14 */ 0;
        color: #93d1ca;
        font-size: 24px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-top: 1.428571rem /* 20/14 */;
      align-items: center;
      .hc-input {
        display: inline-block;
        width: 80%;
        height: 2.285714rem /* 32/14 */;
        outline: none;
        border: none;
        color: #93d1ca;
        box-shadow: 0 1px #93d1ca;
        position: relative;
        background: none;
        transition: 0.3s;
        border-bottom: 1px solid #777;
        outline: none;
        margin: 0.714286rem /* 10/14 */ 0;
      }
    }
    .enter-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 15px;
      right: 40%;
      background: #93d1ca;
      width: 4.285714rem /* 60/14 */;
      height: 4.285714rem /* 60/14 */;
      border-radius: 50%;
      color: #fff;
      font-size: 32px;
      border: none;
      position: absolute;
      margin: auto;
      transition: 0.3s;
      box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.3) inset;
      cursor: pointer;
      &:hover {
        box-shadow:
          0 0 0 rgba(0, 0, 0, 0.3) inset,
          0 3px 6px rgba(0, 0, 0, 0.16),
          0 5px 11px rgba(0, 0, 0, 0.23);
      }
    }
  }
}
</style>
