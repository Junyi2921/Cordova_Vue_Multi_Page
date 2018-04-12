/**
 * Created by junyi on 2018/3/16.
 */

const Network = {
      POST(requestURL, params, SUCCESSCALLBACK, ERRORCALLBACK){
            cordova.plugins.MyTestNet.testNet( [requestURL, "post", params], SUCCESSCALLBACK, ERRORCALLBACK );
      }, GET(requestURL, params, SUCCESSCALLBACK, ERRORCALLBACK){
            cordova.plugins.MyTestNet.testNet( [requestURL, "get", params], SUCCESSCALLBACK, ERRORCALLBACK );
      }
};
const AppBase = {
      popStack(params, SUCCESSCALLBACK, ERRORCALLBACK){
            cordova.plugins.AppBase.popStack( [params], SUCCESSCALLBACK, ERRORCALLBACK );
      }
};
export default { Network, AppBase };

