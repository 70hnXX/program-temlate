<template>
    <div class="layout">
        <div class="layout_sider">
            <div class="layout_children">
                <left-nav/>
            </div>
        </div>
        <div class="layout_inside">
            <div class="layout_main">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
  import leftNav from '@/components/common/leftNav.vue'

  export default {
    components: {
      leftNav
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
    .layout {
        display: flex;
        flex-direction: row;
        flex: auto;
        background: #f5f7f9;

        .layout_sider {
            width: 200px;
            min-width: 200px;
            max-width: 200px;
            flex: 0 0 200px;
            background: #354053;
            box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
            position: fixed;
            top: 0;
            left: 0;
            min-height: 100vh;

            .layout_children {
                height: 100%;
            }
        }

        .layout_inside {
            padding-left: 200px;
            min-height: 100vh;
            transition: all .2s ease-in-out;
            display: flex;
            flex-direction: column;
            flex: auto;
            background-color: #F8F6F9;
            overflow: hidden;

            .layout_main {
                // margin: 20px 27px;
                height: 100%;
                display: flex;
                flex-direction: row;
                /*background-color: #fff;*/
            }
        }

        /*position: absolute;*/
        /*top: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: 0;*/
    }
</style>