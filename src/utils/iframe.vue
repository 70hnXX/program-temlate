<template>
  <div class="iframe-container">
    首页
  </div>
</template>
<script>
import { getToken, getCookie } from "@/utils/auth.js";
export default {
  data() {
    return {
      url: "",
      accountToken: "",
      accountId: ""
    };
  },
  mounted() {
    let _this = this
    this.accountId = getCookie("id");
    this.accountToken = getToken();
    this.url =
      pointUrl + "#/index" +
      "?accountToken=" +
      this.accountToken +
      "&accountId=" +
      this.accountId;
                // 监听iframe
    window.onmessage = e => {
      // 提交配置
      console.log(e.data)
      if (e.data && e.data.name == 'routeJump') {
        _this.$router.push(e.data.url)
      }
      if (e.data && e.data.name == 'pointJump') {
        if (e.data.query) {
          _this.$router.push('/pointManagement' + '?redirect=' + e.data.url + '&indexSpaceId=' + e.data.query.indexSpaceId + '&type=' + e.data.query.type)
        } else {
          _this.$router.push('/pointManagement' + '?redirect=' + e.data.url)
        }
      }
    };
  }
};
</script>
<style lang="less" scoped>
.iframe-container {
  flex: auto;
}
</style>