<template>
  <div class="page_container">
    <el-pagination
            prev-text="上一页"
            next-text="下一页"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.curPage"
            :page-size="page.limit"
            background
            layout="prev, pager, next"
            :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      page: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      // 改变每页条数
      handleSizeChange(val) {
        // console.log(this.page)
        this.page.limit = val
        this.page.pageSize = val
        this.$emit('getPageSize')
      },
      // 当前页码
      handleCurrentChange(val) {
        this.page.curPage = val
        this.page.pageNum = val
        this.$emit('getPageSize', val)
      },
    }
  }
</script>

<style scoped>
</style>