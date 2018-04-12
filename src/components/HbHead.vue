<template>
    <div class="headerBar">
        <x-header class="headfix" :left-options="preventGoBack" @on-click-back="popView()">{{headfont}}
        </x-header>
    </div>
</template>

<script>

    import Lib from 'assets/js/Lib';
    import { XHeader } from 'vux'
    export default {
        data() {
            return {
                preventGoBack : {
                    preventGoBack : true
                }
            }
        }, components : {
            XHeader
        }, props : {
            headfont : {
                type : String, default : '导航'
            }
        }, //实例初始化最之前，无法获取到data里的数据
        beforeCreate(){
        }, //在挂载开始之前被调用
        beforeMount(){
        }, //已成功挂载，相当ready()
        mounted(){
//            console.log( this )
        }, //相关操作事件
        methods : {
            popView(){
//                cordova.plugins.MathHH.max( [29, 10], function(result){
//                    console.log( "成功:" + result );
//                }, function(error){
//                    console.log( error )
//                } );
                cordova.plugins.PopToPage.popToPage( [1], function(result){
                    console.log( result );
                }, function(errorResult){
                    console.log( errorResult );
                } )
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../assets/css/globleConstant";
    .headerBar {
        position: fixed !important;
        z-index: 77;
        width: 100%;
        left: 0;
        top: 0;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: @HEADER_BACKGROUND_COLOR;
    }
    .vux-header{
        background-color: @HEADER_BACKGROUND_COLOR;
    }
    .headfix {
        width: 100%;
    }
</style>
