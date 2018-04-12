<template>
    <div class="carMall">
        <div class="indexHeader">
            <div class="headerSideItem leftItem">
                <i class="icon iconfont">&#xe640;</i>
            </div>
            <div class="headerCenterItem">Parrish</div>
            <div class="headerSideItem rightItem">
                <i class="icon iconfont">&#xe610;</i>
            </div>
        </div>
        <sticky class="indexSticky">
            <div class="indexStickyBox">
                <div class="searchItem" :style=" { width : scrollTop + 'px' } "></div>
                <div class="searchBox">
                    <div class="searchBoxItem">
                        <i class="icon iconfont">&#xe606;</i>
                    </div>
                    <input class="searchInput" type="text" placeholder="啊啊啊啊"/>
                    <div class="searchBoxItem">
                        <i class="icon iconfont">&#xe60e;</i>
                    </div>
                </div>
                <div class="searchItem" :style=" { width : scrollTop + 'px' } "></div>
            </div>
        </sticky>
        <div class="indexTabCard">
            <div class="indexTabCardItem">
                <div class="indexTabCardItemPic">
                    <img src="/static/logo.png">
                </div>
                <div class="indexTabCardItemTitle">选项一</div>
            </div>
            <div class="indexTabCardItem">
                <div class="indexTabCardItemPic"></div>
                <div class="indexTabCardItemTitle">选项二</div>
            </div>
            <div class="indexTabCardItem">
                <div class="indexTabCardItemPic"></div>
                <div class="indexTabCardItemTitle">选项三</div>
            </div>
            <div class="indexTabCardItem">
                <div class="indexTabCardItemPic"></div>
                <div class="indexTabCardItemTitle">选项四</div>
            </div>
            <div class="indexTabCardItem">
                <div class="indexTabCardItemPic"></div>
                <div class="indexTabCardItemTitle">选项五</div>
            </div>
        </div>
        <swiper :list="swiperList"></swiper>
        <p v-for="i in 100">{{i}}<br></p>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../../assets/css/globleConstant";

    .carMall {
        display: flex;
        flex-direction: column;
        width: 100%;
        .indexHeader {
            display: flex;
            width: 100%;
            .px2rem(height, 50);
            background: @HEADER_BACKGROUND_COLOR;
            justify-content: center;
            align-items: center;
            .headerSideItem {
                display: flex;
                .px2rem(width, 50);
                .px2rem(height, 50);
                justify-content: center;
                align-items: center;
                .icon {
                    .px2rem(font-size, 25);
                    color: @HEADER_SIDE_ITEM_ICON_COLOR;
                }
            }
            .leftItem {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 600;
            }
            .rightItem {
                position: fixed;
                top: 0;
                right: 0;
                z-index: 600;
            }
            .headerCenterItem {
                display: flex;
                flex: 1;
                height: 100%;
                justify-content: center;
                align-items: flex-end;
                color: @HEADER_SIDE_ITEM_FONT_COLOR;
                .px2rem(font-size, 24);
            }
        }
        .indexSticky {
            .indexStickyBox {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                .px2rem(height, 50);
                z-index: 100;
                background: @HEADER_BACKGROUND_COLOR;
                .searchItem {
                    display: flex;
                    .px2rem(width, 12.5);
                    /*width: 12.5px;*/
                    transition: width .1s linear;
                }
                .searchBox {
                    display: flex;
                    flex: 1;
                    .px2rem(height, 35);
                    /*height: 35px;*/
                    background: #ffffff;
                    .searchBoxItem {
                        display: flex;
                        .px2rem(width, 35);
                        .px2rem(height, 35);
                        /*width: 35px;*/
                        /*height: 35px;*/
                        justify-content: center;
                        align-items: center;
                        .icon {
                            .px2rem(font-size, 21);
                            /*font-size: 21px;*/
                            color: @HEADER_SEARCH_BOX_ICON_COLOR;
                        }
                    }
                    .searchInput {
                        display: flex;
                        flex: 1;
                        height: 100%;
                        background: #ffffff;
                        border-radius: 0;
                    }
                }
            }
        }
        .indexTabCard {
            display: flex;
            background: #ffffff;
            .px2rem(padding, 10);
            /*padding: 10px;*/
            .indexTabCardItem {
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
                align-items: center;
                .indexTabCardItemPic {
                    .px2rem(width, 50);
                    .px2rem(height, 50);
                    /*width: 50px;*/
                    /*height: 50px;*/
                    .px2rem(margin-bottom, 8);
                    /*margin-bottom: 8px;*/
                    border-radius: 5px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

</style>

<script>
    import Lib from 'assets/js/Lib';
    import IndexHeader from 'components/IndexHeader'
    import { Sticky, Swiper } from 'vux'
    export default {
        components : {
            IndexHeader, Sticky, Swiper
        }, data () {
            return {
                scrollTop : 12.5, showSpace : false, swiperList : [{
                    url : 'javascript:', img : 'https://static.vux.li/demo/1.jpg', title : '送你一朵fua'
                }, {
                    url : 'javascript:',
                    img : 'https://static.vux.li/demo/5.jpg',
                    title : '送你一次旅行',
                    fallbackImg : 'https://static.vux.li/demo/3.jpg'
                }]
            }
        }, mounted(){
//            document.addEventListener( 'scroll', this.handleScroll );
        }, created(){
        }, methods : {
//            goStep(){
//                console.log( '-----' );
//            }, handleScroll(){
//                var data = document.documentElement.scrollTop * 2.5;
//                if( data >= 12.5 && data <= 50 ){
//                    this.scrollTop = data;
//                }
//            }
        }
    }
</script>
