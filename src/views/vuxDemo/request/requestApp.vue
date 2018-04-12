<template>
    <div class="mainWarp">
        <hb-head headfont="Native请求测试"></hb-head>
        <div style="width: 100%;height: 30px;background: #1aad19;color:#ffffff;line-height: 30px;text-align: center"
             @click="testOne()">
            测试一
        </div>
        <div style="width: 100%;height: 30px;background: #1aad19;color:#ffffff;line-height: 30px;text-align: center"
             @click="testTwo()">
            测试二
        </div>
        <div style="width: 100%;height: 30px;background: #1aad19;color:#ffffff;line-height: 30px;text-align: center"
             @click="getData()">
            点我发请求
        </div>

        <div style="margin-top:10px;width: 100%;height: 30px;background: #1aad19;color:#f00;line-height: 30px;text-align: center"
             @click="getData2()">
            点我发Get请求
        </div>
    </div>
</template>

<script>

    import Lib from 'assets/js/Lib';
    import HbHead from 'components/HbHead';
    const requestVue = {
        components : {
            HbHead
        }, data () {
            return {
                msg : "啊啊啊"
            }
        }, mounted(){
        }, methods : {
            testOne(){
                Lib.P.Network.GET( "/api/test", "", function(result){
                    alert( result )
                }, function(error){
                    alert( error )
                } )
            }, testTwo(){
//                Lib.P.
            }, getData(){
                cordova.plugins.MyTestNet.testNet( ["/api/test", "post", {
                    name : "aaa"
                }], function(result){
                    alert( result );
                }, function(error){
                    alert( error );
                } )
            }, getData2(){
                cordova.plugins.MyTestNet.testNet( ["/api/testGet", "get", {
                    name : "啊啊啊"
                }], function(result){
                    alert( result );
                }, function(error){
                    alert( error );
                } )
            }
        }, created(){
        }
    };
    export default requestVue;

</script>

<style lang="less">

</style>
