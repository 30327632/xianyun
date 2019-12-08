<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="changTab(index)"
        :class="{active:currentTab===index}"
      >
        <i :class="item.icon"></i>
        <!-- 什么时候加高亮呢  默认currentTab是0  就默认第一项是高亮。怎么改变高亮呢？应该是点击到自己的时候  那怎么区别点到自己了呢 index  默认currentTab值是0 那就currentTab值和index值相等时显示咯 
        当点击当前的span时  再把当前值修改-->
        {{item.name}}
      </span>
    </el-row>

    <!-- 表单部分 -->
    <el-form ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <el-autocomplete
          class="inline-input"
          placeholder="请输入内容"
         
          :fetch-suggestions="getDepartList"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          class="inline-input"
      
          placeholder="请输入内容"
          :fetch-suggestions="getDestList"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <el-col :span="18">
          <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"  v-model="form.departDate"></el-date-picker>
        </el-col>
      </el-form-item>

      <!-- 搜索 -->
      <el-form-item label>
        <el-button style="width:75%;" type="primary" icon="el-icon-search" @click="submitSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 搜索按钮 -->
  </div>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0, //设置当前的值为0  默认第一个被点击

      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      } //定义一个form  来存放数据
    };
  },
  methods: {
    //  搜索机票
    submitSearch() {
        // console.log(this.form);
        //提交之前处理下 时间格式
      this.form.departDate=  moment(this.form.departDate).format("YYYY-MM-DD")
        console.log(this.form);
         this.$router.push({path:"/air/flights",query:this.form})
         
    },
    changTab(index) {
      //把当前点击的替换成当前值？？
      this.currentTab = index;
    },

    //获取出发城市列表
    async getDepartList(value, showCityList) {
      //当输入的数据被resolve的时候 会返回 可以理解为一旦输入完的文本框里面的内容 就会触发  那个回调函数  会自动渲染在建议中  要返回一个数组
      var cityList = await this.searchCity(value);
      //这个value就是你当前输入的东西
      //默认把第一个数组的sort  存到departCode中
      this.form.departCode=cityList[0].sort

      showCityList(cityList);
    },

    //获取到达城市列表
    async getDestList(value, showCityList) {
      var cityList = await this.searchCity(value);
      //这个value就是你当前输入的东西
      //默认把第一个数组的sort  存到destCode中
      // console.log(cityList);
      this.form.destCode=cityList[0].sort
      showCityList(cityList);
    },

    // 搜索城市
    searchCity(value) {
      // console.log(value);  //输入的是广州  打印出来的是广州
      return this.$axios({
        url: "/airs/city",
        params: { name: value } //用axios发送请求  要知道get  就用params  post就用data  发送参数
      }).then(res => {
        //因为返回的是name  需要是value值  所以要处理咯
        const { data } = res.data;
        const cities = data.map(item => {
          return {
            ...item,
            value: item.name.replace("市", "") //根据name 换成了value  把name中的市替换成了空
          };
        });
        //将没有代码的城市过滤掉  直接一句  把element存在的sort  直接返回
        const cityList = cities.filter(element => element.sort);
        return cityList; //最后谁调用这个查找城市的方法 就返回一个经过处理的城市列表
      });
    },
     mounted() {
    //当页面开始加载的时候  就渲染数据  获取特价机票
    //刚才的问题在哪里 在于  你把this.saleAir=this.$axios 了  所以会有什么问题  是先
    //  this.saleAir=
  }
  }
};
</script>

<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  margin-bottom: 20px;
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}
.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>