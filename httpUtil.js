/**
 * Created by zhudan on 2016/9/26.
 */

var urllib = require('urllib');
var querystring = require('querystring');
var _url = require('url');
var _ = require('underscore');

/**
 * @param url
 * @param opts {method: "GET"}
 * @param callback
 */
exports.exchange = function(url, opts, eurekaClient, callback){
    var url_t = beforeRequest(url, opts, eurekaClient);
    urllib.request(url_t, opts, callback);
}

var beforeRequest = function (url, opts, eurekaClient) {
    var originUrlObject = _url.parse(url);
    var originHostname =  originUrlObject.hostname;
    var instances = eurekaClient.getInstancesByVipAddress(originHostname);
    if (!instances || instances.length == 0) return url;
    var instance = instances[_.random(0, instances.length - 1)];
    var reurl = url.replace(originHostname, instance.hostName + ":" + instance.port.$);
    console.log(url + " ---> " + reurl)
    return reurl
}

