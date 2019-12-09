/*
 * @Author: your name
 * @Date: 2019-12-08 21:19:16
 * @LastEditTime: 2019-12-09 16:12:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\xianyun\store\usei.js
 */
export const state=()=> ({  //向外暴露的是一个函数
     userInfo:{
          token:"",
          user:{}
     }
    })

//这是一个mutations属性  通过里面的函数来修改store的值
export const mutations={
    //前面是设置初始值 ，但你要修改值的时候 只能在写在这个函数里面来修改
    //这个是用来处理同步的数据
    //这个函数  要传两个参数  第一个state是原来这是初始值的那块 第二个参数是要修改是的值
    setUserInfo(state,data){
        state.userInfo=data
    },
    cleanUserInfo(state,date){
        //操作的是state
        //因为vuex和本地localStore同步了  所以要删两个
        localStorage.removeItem("store")
        state.userInfo={}
    }
}

export const actions={
    //这是用来处理异步的数据  为什么要在这里呢  为什么不
    login({commit},form){
     return this.$axios({
            url: "/accounts/login",
            method: "post",
            data:form
        }).then(res=>{
            //登录成功之后 把数据存到state的userInfo
            const data=res.data
            //保存到state  commit("setUserInfo",data)
            commit("setUserInfo",data)
            return data
        })
        

    }
    
}