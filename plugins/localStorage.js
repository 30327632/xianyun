/*
 * @Author: your name
 * @Date: 2019-12-09 14:43:40
 * @LastEditTime: 2019-12-09 14:43:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \code\xianyun\plugins\localStorage.js
 */
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store, 如果没有设置,默认是 vuex
        })(store)
    })
}