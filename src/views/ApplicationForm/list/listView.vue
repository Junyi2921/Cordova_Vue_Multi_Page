<template>
    <div class="list">
        <IndexHeader></IndexHeader>
        <div @click="choose">点我</div>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../../assets/css/globleConstant";

    .list {
        display: flex;
        flex-direction: column;
    }

</style>

<script>
    import Lib from 'assets/js/Lib';
    import IndexHeader from 'components/IndexHeader'
    export default {
        components : {
            IndexHeader
        }, data () {
            return {}
        }, mounted(){
        }, created(){
        }, methods : {
            choose(){
                Lib.P.AppBase.popStack(1,function(result){
                    alert("成功的回调");
                },function(error){
                    alert("失败的回调");
                })
            }
        }
    }
</script>
