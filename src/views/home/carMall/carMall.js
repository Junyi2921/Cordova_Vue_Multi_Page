import Vue from 'vue'
import App from './carMallApp'
// var app = {
//       initialize : function(){
//             document.addEventListener( 'deviceready', this.onDeviceReady.bind( this ), false );
//       }, onDeviceReady : function(){
new Vue( {
      render : h => h( App )
} ).$mount( '#app' );
//       },
// };
// app.initialize();

