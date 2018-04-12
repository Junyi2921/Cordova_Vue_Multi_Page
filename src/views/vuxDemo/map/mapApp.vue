<template>
    <div class="mainWarp">
        <hb-head headfont="地图测试"></hb-head>
        <!--地图-->
        <div id="container" class="myMap">
            <div class="mapCenter">
                <transition name="fade">
                    <div class="mapCenterInfo" v-if="mapCenterInfo">
                        <div class="mapCenterContent">
                            <span class="mapCenterTime">120分钟</span>后上车
                        </div>
                        <div class="bottomTriangle"></div>
                    </div>
                </transition>
                <div class="mapCenterPoint" v-show="sliding">
                    <img src="/static/locationStart.png" v-show="moving">
                    <img src="/static/locationEnd.png" v-show="!moving">
                </div>
            </div>
        </div>
        <!--选择地址控制台-->
        <div class="controlBar">
            <div class="controlBarItem" @click="chooseStartAddress()">
                <div class="controlBarItemIcon">
                    <i class="icon iconfont" style="color: #1aad19">&#xe6d9;</i>
                </div>
                <div class="controlBarItemContent" v-html="address.start.formattedAddress"></div>
            </div>
            <transition name="controlEndItem">
                <div class="controlBarItem" @click="chooseEndAddress()" v-if="controlEndItemShow">
                    <div class="controlBarItemIcon">
                        <i class="icon iconfont">&#xe6d9;</i>
                    </div>
                    <div class="controlBarItemContent" v-html="address.end.formattedAddress"></div>
                </div>
            </transition>
            <transition name="controlEndItem">
                <div class="controlBarCreateOrder" v-if="fullRouteType">
                    确认叫车
                </div>
            </transition>
        </div>
        <!--搜索栏-->
        <transition name="moveSearchBox">
            <div class="searchBox" v-if="controlBoxShow">
                <div class="selectedCity">
                    天津市
                </div>
                <div class="searchContent">
                    <x-input class="searchBoxInput" placeholder="请输入您要搜索的地址" v-model="searchValue"
                             @on-change="searchPlace"></x-input>
                </div>
                <div class="cancelBtn" @click="chooseStartAddress()">
                    取消
                </div>
            </div>
        </transition>
        <!--搜索列表-->
        <transition name="moveControlBox">
            <div class="controlBox" v-if="controlBoxShow">
                <div class="controlItem" v-for="(item,index) in searchResult" @click="chooseSearchAddress(index)">
                    <div class="controlItemIcon"></div>
                    <div class="controlItemAddress">
                        <div class="addressFormat" v-html="item.name"></div>
                        <div class="addressDetail" v-html="item.address"></div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="selectCarAndCreateOrder">

        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import HbHead from 'components/HbHead';
    import { XInput, Selector } from 'vux'
    import AMap from 'AMap';
    var map, geoLocation, geoCoder, placeSearch, moveStart, moveEnd;
    const mapVue = {
        components : {
            HbHead, XInput
        }, data () {
            return {
                sliding : true,
                moving : false,
                mapCenterInfo : true,
                address : {
                    start : {
                        lat : "", lng : "", formattedAddress : "正在定位您当前位置..."
                    }, end : {
                        lat : "", lng : "", formattedAddress : "你要去哪?"
                    }
                },
                localCityCode : "all",
                controlBoxShow : false,
                controlEndItemShow : false,
                fullRouteType:false,
                chooseSearchType : "start",
                searchValue : "",
                searchResult : []
            }
        }, mounted(){
            this.init();     //加载地图和相关组件
        }, created(){
        }, methods : {
            init(){
                const _this = this;
                //加载地图，调用浏览器定位服务
                map = new AMap.Map( 'container', {
                    resizeEnable : true,
                    animateEnable : true,
                    jogEnable : true,
                    showBuildingBlock : true,
                    viewMode : "3D",
                    buildingAnimation : true,
                    showIndoorMap : true, //显示室内地图
//                    mapStyle : "amap://styles/grey" //切换地图主题样式
                } );
                moveStart = AMap.event.addListener( map, "movestart", function(e){
                    _this.moving = true;
                    _this.mapCenterInfo = false;
                } );
                moveEnd = AMap.event.addListener( map, "moveend", function(e){
                    _this.moving = false;
                    _this.mapCenterInfo = true;
                    _this.getCenterPoint();
                } );
                map.plugin( 'AMap.Geolocation', function(){
                    geoLocation = new AMap.Geolocation( {
                        enableHighAccuracy : true,//是否使用高精度定位，默认:true
                        timeout : 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge : 0,           //定位结果缓存0毫秒，默认：0
                        convert : true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton : true,        //显示定位按钮，默认：true
                        buttonPosition : 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset : new AMap.Pixel( 10, 20 ),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker : true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle : true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation : true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy : true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    } );
                    map.addControl( geoLocation );
                    geoLocation.getCurrentPosition( function(state, result){
                        _this.localCityCode = result.addressComponent.citycode;
                        console.log( _this.localCityCode );
                        _this.initSearchPlace();
                    } );
                } );
                map.plugin( 'AMap.Geocoder', function(){
                    geoCoder = new AMap.Geocoder( {
                        radius : 1000, extensions : "all"
                    } );
                } );
            }, getCenterPoint(){
                const _this = this;
                const centerLocation = map.getCenter();
                _this.address.start.lat = centerLocation.lat;
                _this.address.start.lng = centerLocation.lng;
                const locationArr = [_this.address.start.lng, _this.address.start.lat];
                geoCoder.getAddress( locationArr, function(status, result){
                    if( status === 'complete' && result.info === 'OK' ){
                        _this.address.start.formattedAddress = result.regeocode.formattedAddress;
                        _this.controlEndItemShow = true;
                    }else{
                        _this.address.start.formattedAddress = "系统不能确定您的具体位置,请点击选择。";
                        _this.controlEndItemShow = false;
                    }
                } )
            }, //初始化模糊搜索插件
            initSearchPlace(){
                const _this = this;
                map.plugin( 'AMap.PlaceSearch', function(){
                    placeSearch = new AMap.PlaceSearch( {
                        pageSize : 50, pageIndex : 1, city : _this.localCityCode, extensions : "all"
                    } );
                } );
            }, chooseStartAddress(){
                const _this = this;
                _this.controlBoxShow = !_this.controlBoxShow;
                _this.chooseSearchType = "start";
                _this.searchValue = "";
                _this.searchResult = [];
            }, chooseEndAddress(){
                const _this = this;
                _this.controlBoxShow = !_this.controlBoxShow;
                _this.chooseSearchType = "end";
                _this.searchValue = "";
                _this.searchResult = [];
            }, searchPlace(){
                const _this = this;
                placeSearch.search( _this.searchValue, function(status, result){
                    if( status === 'complete' && result.info === 'OK' ){
                        _this.searchResult = result.poiList.pois;
                        console.log( _this.searchResult )
                    }
                } );
            }, chooseSearchAddress(index){
                const _this = this;
                const location = _this.searchResult[index].location;
                const locationArr = [location.lng, location.lat];
                if( _this.chooseSearchType == "start" ){
                    _this.address.start.lat = location.lat;
                    _this.address.start.lng = location.lng;
                    geoCoder.getAddress( locationArr, function(status, result){
                        if( status === 'complete' && result.info === 'OK' ){
                            _this.address.start.formattedAddress = result.regeocode.formattedAddress;
                            _this.controlEndItemShow = true;
                            map.panTo( new AMap.LngLat( _this.address.start.lng, _this.address.start.lat ) );
                            _this.setFullRoute();
                            _this.controlBoxShow = !_this.controlBoxShow;
                        }else{
                            alert( "系统不能确定您的具体位置,请重新选择" );
                        }
                    } )
                }else if( _this.chooseSearchType == "end" ){
                    _this.address.end.lat = location.lat;
                    _this.address.end.lng = location.lng;
                    geoCoder.getAddress( locationArr, function(status, result){
                        if( status === 'complete' && result.info === 'OK' ){
                            _this.address.end.formattedAddress = result.regeocode.formattedAddress;
                            _this.controlEndItemShow = true;
                            _this.setFullRoute();
                            _this.controlBoxShow = !_this.controlBoxShow;
                        }else{
                            alert( "系统不能确定您的具体位置,请重新选择" );
                        }
                    } )
                }
            }, setFullRoute(){
                const _this = this;
                if( _this.address.start.lat && _this.address.start.lng && _this.address.end.lat && _this.address.end.lng ){
                    console.log( "准备好了,可以规划路线了" );
                    map.clearMap();
                    _this.fullRouteType = true;
                    const startMaker = new AMap.Marker( {
                        map : map,
                        position : [_this.address.start.lng, _this.address.start.lat],
                        offset : new AMap.Pixel( -25, -50 ),
                        content : '<img style="width:50px;height: 50px" src="/static/startMark.png" />'
                    } );
                    const endMarker = new AMap.Marker( {
                        map : map,
                        position : [_this.address.end.lng, _this.address.end.lat],
                        offset : new AMap.Pixel( -25, -50 ),
                        content : '<img style="width:50px;height: 50px" src="/static/endMark.png" />'
                    } );
                    if( moveStart ){
                        AMap.event.removeListener( moveStart );//移除事件，以绑定时返回的对象作为参数
                    }
                    if( moveEnd ){
                        AMap.event.removeListener( moveEnd );//移除事件，以绑定时返回的对象作为参数
                    }
                    _this.sliding = false;
                    _this.mapCenterInfo = false;
                    map.setFitView();
                }else{
                    _this.fullRouteType = false;
                }
            }
        }
    };
    export default mapVue;

</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../../assets/css/globleConstant";

    .myMap {
        position: absolute;
        top: 50px;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .mapCenter {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
        -o-transform: translate(-50%, -100%);
        -ms-transform: translate(-50%, -100%);
        -webkit-transform: translate(-50%, -100%);
        -moz-transform: translate(-50%, -100%);
        z-index: 10;
    }

    .mapCenterInfo {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        .px2rem(padding, 8);
        background: @MAP_CENTER_INFO_BACKGROUND_COLOR;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
        color: @MAP_CENTER_INFO_FONT_COLOR;
        .mapCenterTime {
            margin-right: 5px;
            color: @MAP_CENTER_INFO_FONT_TIME_COLOR;
        }
        .bottomTriangle {
            position: absolute;
            .px2rem(top, 30);
            left: 50%;
            transform: translate(-50%, 0);
            -o-transform: translate(-50%, 0);
            -ms-transform: translate(-50%, 0);
            -webkit-transform: translate(-50%, 0);
            -moz-transform: translate(-50%, 0);
            font-size: 0;
            line-height: 0;
            border-width: 10px;
            border-color: @MAP_CENTER_INFO_TRIANGLE_BACKGROUND_COLOR;
            border-bottom-width: 0;
            border-style: dashed;
            border-top-style: solid;
            border-left-color: transparent;
            border-right-color: transparent;
        }
    }

    .mapCenterPoint {
        display: flex;
        .px2rem(width, 50);
        .px2rem(height, 50);
        img {
            width: 100%;
            height: 100%;
        }
    }

    .controlBar {
        position: fixed;
        bottom: 10px;
        left: 2%;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(0, 0, 0, .1);
        width: 96%;
        /*background: #ffffff;*/
        z-index: 160;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        transition: all .8s ease;
        .controlBarItem {
            display: flex;
            align-items: center;
            .px2rem(min-height, 56);
            .px2rem(padding, 8);
            background: #ffffff;
            .controlBarItemIcon {
                /*.px2rem(width, 15);
                .px2rem(height, 15);*/
                .px2rem(padding-left, 10);
                display: flex;
                justify-content: center;
                align-items: center;
                color: #FC0E3D;
            }
            .controlBarItemContent {
                display: flex;
                flex: 1;
                .px2rem(padding, 10);
                .px2rem(padding-left, 10);
                .px2rem(font-size, 14);
                /*padding-left: 0;*/
            }
        }
        .controlBarItem:nth-child(2) {
            border-top: 1px solid rgba(0, 0, 0, .1);
        }
        .controlBarCreateOrder {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000000;
            .px2rem(padding, 18);
            color: #ffffff;
        }
    }

    .searchBox {
        position: fixed;
        display: flex;
        width: 100%;
        .px2rem(height, 55);
        left: 0;
        top: 0;
        z-index: 170;
        background: #ffffff;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
        opacity: 1;
        transition: all .1s ease;
        .selectedCity, .searchContent, .cancelBtn {
            display: flex;
            .px2rem(font-size, 14);
        }
        .selectedCity, .cancelBtn {
            .px2rem(padding, 20);
            justify-content: center;
            align-items: center;
        }
        .selectedCity {
            border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
        .cancelBtn {
            border-left: 1px solid rgba(0, 0, 0, 0.1);
        }
        .searchContent {
            flex: 1;
            .searchBoxInput {
                width: 100%;
            }
        }
    }

    .controlBox {
        position: fixed;
        display: flex;
        flex-direction: column;
        width: 96%;
        left: 2%;
        height: calc(~"100% - 80px");
        z-index: 170;
        bottom: 0;
        background: #ffffff;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
        opacity: 1;
        transition: all .5s ease;
        overflow: auto;
        .controlItem {
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            flex: none;
            .px2rem(padding, 5);
            .controlItemIcon {
                display: flex;
                .px2rem(width, 50);
                .px2rem(height, 50);
            }
            .controlItemAddress {
                display: flex;
                flex: 1;
                flex-direction: column;
                .addressFormat {
                    display: flex;
                    flex: 1;
                }
                .addressDetail {
                    display: flex;
                    flex: 1;
                }
            }
        }
        .controlItem:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }

    .optionsBar {
        position: fixed;
        display: flex;
    }

</style>
