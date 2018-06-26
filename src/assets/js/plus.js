(function (win,doc) {
    win.pays={};
    //todo 获取支付通道
    // 检测是否安装支付服务
    function checkServices(pc){
        if(!pc.serviceReady){
            var txt=null;
            switch(pc.id){
                case 'alipay':
                    txt='检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
                    break;
                default:
                    txt='系统未安装“'+pc.description+'”服务，无法完成支付，是否立即安装？';
                    break;
            }
            plus.nativeUI.confirm(txt, function(e){
                if(e.index==0){
                    pc.installService();
                }
            }, pc.description);
        }
    }
    function paymentInit() {
        plus.payment.getChannels(function(channels){
            for(var i in channels){
                var channel=channels[i];
                if(channel.id=='qhpay'||channel.id=='qihoo'){	// 过滤掉不支持的支付通道：暂不支持360相关支付
                    continue;
                }
                win.pays[channel.id]=channel;
                // checkServices(channel);
            }
        },function(e){
            // outLine('获取支付通道失败：'+e.message);
        });
    }


    //todo 软件更新
    //获取当前应用的版本号
    var wgtVer=null;
    function getWgtVer(callback){
        // 获取本地应用资源版本号
        plus.runtime.getProperty(plus.runtime.appid,function(inf){
            wgtVer=inf.version;
            // console.log("当前应用版本："+wgtVer);
            callback(inf);
        });
    };
    // 更新应用资源
    function installWgt(path){
        plus.nativeUI.showWaiting("正在安装...");
        plus.runtime.install(path,{},function(){
            plus.nativeUI.closeWaiting();
            // console.log("安装wgt文件成功！");
            plus.nativeUI.alert("应用资源更新完成！",function(){
                plus.runtime.restart();
            });
        },function(e){
            plus.nativeUI.closeWaiting();
            // console.log("安装失败["+e.code+"]："+e.message);
            plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);
        });
    };
    // 下载wgt文件
    function downWgt(callback,err, ok,wgtUrl){
        callback();
        // plus.nativeUI.showWaiting("正在下载更新包...");
        plus.downloader.createDownload( wgtUrl, {
            method: 'GET',
            filename:"_doc/update/",
        }, function(d,status){
            // console.log(status);
            if ( status == 200 ) {
                // console.log("下载wgt成功："+d.filename);
                installWgt(d.filename); // 安装wgt包
            } else {
                ok();
                // console.log("下载wgt失败！");
                // plus.nativeUI.alert("下载更新包失败！");
                err();
            }
            // plus.nativeUI.closeWaiting();
        }).start();
    };
    //// 检测更新
    var wgtUrl="http://192.168.1.117/h5.apk";
    var checkUrl="http://fq.egretloan.com/app/VersionDown/downs";
    function checkUpdate(opt){
        var opts = {
            callback:new Function(),
            err:new Function(),
            ok:new Function(),
            bool:false,
            checkUrl:checkUrl,
            wgtUrl:wgtUrl,
        };
        opt = opt || {};
        for(var  i in opt){
            opts[i] = opt[i];
        }

        if(!opts.bool) {
            plus.nativeUI.showWaiting("检测更新...");
        }
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            switch(xhr.readyState){
                case 4:
                    plus.nativeUI.closeWaiting();
                    if(xhr.status==200){
                        // console.log("检测更新成功："+xhr.responseText);
                        var newVer=xhr.responseText;

                        var resData = {};
                        try {
                            resData = JSON.parse(xhr.responseText).data;
                            newVer=resData.version_code;
                            opts.wgtUrl = resData.version_path;
                            newVer = parseInt(newVer.replace(/\./img,''));

                        }catch (e){}

                        //获取版本号
                        getWgtVer(function () {
                            try {
                                wgtVer = parseInt(wgtVer.replace(/\./img,''));
                            } catch (e){}
                            if(wgtVer&&newVer&&(newVer > wgtVer)){
                            // if(true){
                                if(!opts.bool){
                                    downWgt(opts.callback,opts.err,opts.ok,opts.wgtUrl);  // 下载升级包
                                }
                                opts.callback();
                            }else{
                                if(!opts.bool) {
                                    plus.nativeUI.alert("无新版本可更新！");
                                }
                            }
                        });
                    }else{
                        // console.log("检测更新失败！");
                        if(!opts.bool) {
                            plus.nativeUI.alert("检测更新失败！");
                        }
                    }
                    break;
                default:
                    plus.nativeUI.closeWaiting();
                    break;
            }
        }
        xhr.open('GET',opts.checkUrl);
        xhr.send();
    };

    //todo 监听安卓手机返回键
    // 开始监听backbutton事件
    function startBack(backListener){
        plus.key.addEventListener('backbutton',backListener,false);
    }
    // 取消监听backbutton事件
    function stopBack(backListener){
        plus.key.removeEventListener('backbutton',backListener);
    }

    function plusReady(){
        win.checkUpdate = checkUpdate;
        win.getWgtVer = getWgtVer;
        win.backListener = {
            start:startBack,
            stop:stopBack,
        };
        // 获取支付通道
        paymentInit();
        //检测更新
        // checkUpdate();

    }
    doc.addEventListener('plusready', plusReady, false);

})(window,document);