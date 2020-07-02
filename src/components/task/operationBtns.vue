<template>
  <div>
    <div class="btns">
      <div class="btn" :class="{'active': item.code == 0 || operationCode.indexOf(item.code) > -1}" v-for="(item, index) in btns" :key="index" @click="operationClick(item, item.code == 0 || operationCode.indexOf(item.code) > -1)">
        <img :src="item.icon" alt />
        <span>{{item.label}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['operationCode'],
  data() {
    return {
      // 这里约定1-启动,2-暂停,3-删除,4-取消,5-查看
      btns: [
        {
          label: "新增",
          code: 0,
          icon: require("../../assets/images/task/add.png")
        },
        {
          label: "运行",
          code: 1,
          icon: require("../../assets/images/task/start.png")
        },
        {
          label: "停止",
          code: 2,
          icon: require("../../assets/images/task/pause.png")
        },
        {
          label: "删除",
          code: 3,
          icon: require("../../assets/images/task/delete.png")
        }
      ], 
    }
  },
  methods: {
    operationClick(e, clickAble) {
      if (clickAble) {
        this.$emit('operate', e.code)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: flex-start;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 101px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background: rgba(163, 181, 241, 1);
    border-radius: 4px;
    margin-right: 20px;
    cursor: not-allowed;
    img {
      width: 21px;
      height: 21px;
      margin-right: 9px;
    }
  }
  .active,
  .btn:nth-child(1) {
    background: rgba(77, 114, 231, 1);
    cursor: pointer;
  }
}
</style>