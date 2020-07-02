<template>
<div>
<div class="flow-container" v-if="hide.indexOf(flowData.code) == -1">
    <div class="flow-item" :class="getClass">
      <i  :class="[subfix, sub + flowData.code]"></i>
      <p :class="getClass">{{flowData.name}}</p>
    </div>
    <img
      v-if="!isLast"
      style="margin:0 5px"
      :src="flowData.status === 1 ? arrow_active : arrow"
      alt
    />
  </div>
</div>
  
</template>
<script>
export default {
  props: ["flowData", "isLast"],
  data() {
    return {
      hide: ['appStart', 'appEnd'],
      sub: 'icon',
      subfix: "iconfont",
      arrow_active: require("../../assets/images/task/arrow_active.png"),
      arrow: require("../../assets/images/task/arrow.png"),
      colorClass: "color-finished"
    };
  },
  computed: {
    getClass: function() {
      let className = "color-finished";
      switch (this.flowData.status) {
        case 2:
          className = "color-finished";
          break;
        case 1:
          className = "color-ing";
          break;
        case 0:
          className = "color-wait";
          break;
        default:
          break;
      }
      return className;
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.flow-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flow-item {
  box-sizing: border-box;
  width: 86px;
  height: 86px;
  background: rgba(255, 255, 255, 1);
  border: solid 2px;
  text-align: center;
  border-radius: 4px;
  padding: 11px 13px 13px 11px;
  i{
    font-size: 38px;
  }
  p {
    font-size: 14px;
    margin-top: 10px;
  }
}
.color-finished {
  color: #4d72e7;
  border-color: #4d72e7;
}
.color-ing {
  color: #4bbdbb;
  border-color: #4bbdbb;
}
.color-wait {
  color: #cdd2e6;
  border-color: #cdd2e6;
}
</style>