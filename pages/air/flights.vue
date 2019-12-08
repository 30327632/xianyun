<!--
 * @Author: your name
 * @Date: 2019-12-06 20:07:52
 * @LastEditTime: 2019-12-07 22:10:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianyun\pages\air\flights.vue
 -->
<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <!-- 飞机票列表头部信息 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsItem/>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
export default {
    components:{
        FlightsListHead,
        FlightsItem
    },
    mounted(){
      // console.log(this.$route.query);
      // 当组件加载完的时候  就去发送请求  获取搜索的城市列表
      this.$axios({
        url:"/airs",
        params:this.$route.query
      }).then(res=>{
        console.log(res);
      })

    }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>