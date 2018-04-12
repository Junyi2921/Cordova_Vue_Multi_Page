<template>
    <div class="mainWarp">
        <hb-head headfont="alert弹窗111"></hb-head>

        <group title="prop:content">
            <x-switch title="显示" v-model="show2"></x-switch>
        </group>
        <div @click="maxNumber()">点我改变显示内容</div>
        <br>
        <div>当前显示内容为:<span v-html="msg"></span></div>
        <div>
            <alert v-model="show2" title="温馨提示" content="这里是内容了"></alert>
        </div>

        <group title="插件">
            <cell title="显示" @click.native="showPlugin" is-link></cell>
            <cell title="3S后关闭" @click.native="showPluginAuto" is-link></cell>
        </group>
    </div>
</template>

<script>

    import Lib from 'assets/js/Lib';
    import { Alert, Group, XSwitch, Cell } from 'vux'
    import HbHead from 'components/HbHead';
//    const test = function testFunc(msg){
//        alertVue.methods.changeMsg(msg);
//        alert( alertVue.data().msg + "---" + msg )
//    };
//    window.test = test;
    const alertVue = {
        components : {
            Alert, Group, XSwitch, Cell, HbHead
        }, data () {
            return {
                show : false, show1 : false, show2 : false, msg : "aaa"
            }
        }, created(){
//            console.log( cordova )
        }, methods : {
            changeMsg(msg){
                const _this = this;
                console.log(this);
                this.$nextTick(function(){
                    _this.msg = msg;
                });
            },
            maxNumber(){
                cordova.plugins.MyTest.testMax( [100, 1], function(result){
                    alert( result )
                }, function(error){
                    alert( error )
                } );
//                cordova.plugins.MathHH.max( [29, 10], function(result){
//                    console.log( "成功:" + result );
//                }, function(error){
//                    console.log( error )
//                } );
            }, onHide () {
                console.log( 'on hide' )
            }, onShow () {
                console.log( 'on show' )
            }, showPlugin () {
                this.$vux.alert.show( {
                    title : 'VUX is Cool', content : '哈哈哈', onShow () {
                        console.log( 'Plugin: I\'m showing' )
                    }, onHide () {
                        console.log( 'Plugin: I\'m hiding now' )
                    }
                } )
            }, showPluginAuto () {
                this.showPlugin()
                setTimeout( () =>{
                    this.$vux.alert.hide()
                }, 3000 )
            }
        }
    };
    export default alertVue;

</script>

<style lang="less">


</style>
