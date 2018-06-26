/**
 * @公共类 class
 */
import Utils from '@/utils/utils'
export default class {
  /**
   * @类主体 class
   * _this 第二上下文
   * */
  constructor(_this) {
    this._this = _this;
    this.action = _this.action;
  }
  /**
  * @初始化获取位置信息对象 getMapCallback
   * callback_OK 成功回调
   * callback_ERR 失败回调
  */
  getMapCallback(callback_OK = new Function,callback_ERR = new Function){
    var _this = this;
    var geolocation = new qq.maps.Geolocation();
    //*
    if(navigator.userAgent.indexOf("iPhone") > -1){
      //iPhone手机获取粗糙位置
      geolocation.getIpLocation(function (e) {
        callback_OK.call(_this._this,e,_this);
      },function (e) {
        callback_ERR.call(_this._this,e,_this);
      })
    }else{
      geolocation.getLocation(function (e) {
        callback_OK.call(_this._this,e,_this);
      },function (e) {
        callback_ERR.call(_this._this,e,_this);
      }, {timeout: 9000});
    }
    //*/
    return this;
  }
  /**
   * @获取位置信息方法 getMap
   * callback_OK 成功回调
   * callback_ERR 失败回调
   */
  getMap(callback_OK = new Function,callback_ERR = new Function){
    var _this = this;
    /*
    if(window.qq){
      _this.getMapCallback(callback_OK,callback_ERR);
    }else{
      var js = document.createElement("script");
      js.id="getMap";
      //腾讯位置API地址
      js.src="https://apis.map.qq.com/tools/geolocation/min?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
      js.type = 'text/javascript';
      js.async = true;
      js.onload = function () {
        _this.getMapCallback(callback_OK,callback_ERR);
      }
      document.body.appendChild(js);
    }
    //*/
    //*
    var js = document.createElement("iframe");
    js.id="getMap";
    //腾讯位置API地址
    js.src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&MapRandom="+Math.random();
    js.style.display = 'none';
    js.onload = function () {
      var loc;
      var isMapInit = false;
      window.addEventListener('message', function(event) {
        loc = event.data;
        console.log('location', loc);
        if(loc  && loc.module == 'geolocation') {
          callback_OK.call(_this._this,loc,_this);
        } else {
          callback_ERR.call(_this._this,loc,_this);
        }
      }, false);
      document.getElementById("getMap").contentWindow.postMessage('getLocation', '*');
      setTimeout(function() {
        if(!loc) {
          document.getElementById("getMap")
            .contentWindow.postMessage('getLocation.robust', '*');
        }
      }, 6000);
    }
    document.body.appendChild(js);
    //*/
    return this;
  }
  /**
   * @暂存数据 temporaryStorage
   * callback_fn 插入数据回调
   * StrName 当前页面暂存数据名称
   */
  temporaryStorage(callback_fn = new Function,StrName = ''){
    var _this = this._this;
    _this.action({
      moduleName: 'findPasswordNextStep',
      method: 'get',
      url:"getmerchantHold",
      params:{
        mpOpenId:_this.airforce.openId,//微信openId
        distributorId:(function (e) {
          if(e != "boingpay"){
            return e;
          }
          return '';
        })(Utils.parseQuery(location.search).state)
      },
      callback: (res) => {
        callback_fn.call(_this,this);
        _this.action({
          moduleName: 'findPasswordNextStep',
          method: 'post',
          url:"merchantHold",
          data:{
            mpOpenId:_this.airforce.openId,//微信openId
            distributorId:(function (e) {
              if(e != "boingpay"){
                return e;
              }
              return '';
            })(Utils.parseQuery(location.search).state),
            params:(function (res,StrName) {
              var obj = {
                CreateAmerchantChannel:res.CreateAmerchantChannel,
                CreateAmerchant2Channel:res.CreateAmerchant2Channel,
                CreateAmerchant3Channel:res.CreateAmerchant3Channel,
                CreateAmerchant4Channel:res.CreateAmerchant4Channel,
              }
              obj[StrName] = _this.newData;
              return JSON.stringify(obj)
            })(res,StrName)
          }
        });
      }
    })
    return this;
  }
  /**
   * @获取暂存数据 temporaryStorageGet
   */
  temporaryStorageGet(temporaryStorageGetIndex){
    var _this = this._this;
    _this.action({
      moduleName: 'findPasswordNextStep',
      method: 'get',
      url:"getmerchantHold",
      params:{
        mpOpenId:_this.airforce.openId,//微信openId
        distributorId:(function (e) {
          if(e != "boingpay"){
            return e;
          }
          return '';
        })(Utils.parseQuery(location.search).state)
      },
      callback: (res) => {
        var bool = true;
        var StrName = "ComponentsInfo";
        switch (temporaryStorageGetIndex){
          case 1:
            //todo 判断时候启用自动定位
            if(!res.CreateAmerchantChannel || !res.CreateAmerchantChannel.diqu){
              _this.getMap();
            }
            //todo 数据回显
            _this.getmerchantHold_bool = false;
            if(res.CreateAmerchantChannel){
              _this.ishuabei(res.CreateAmerchantChannel.huabei,!res.CreateAmerchantChannel.huabei,true);
              _this.ishuabeifenqi(res.CreateAmerchantChannel.huabeifneqi,!res.CreateAmerchantChannel.huabeifneqi,true);
              _this.diqu = res.CreateAmerchantChannel.diqu;
              _this.dizhi = res.CreateAmerchantChannel.dizhi;
              _this.updata = {
                zhanghao:res.CreateAmerchantChannel.zhanghao,
                pwss:res.CreateAmerchantChannel.pwss,
                shouji:res.CreateAmerchantChannel.shouji,
                name:res.CreateAmerchantChannel.name,
                namejc:res.CreateAmerchantChannel.namejc,
                diqu:res.CreateAmerchantChannel.diqu,
                dizhi:res.CreateAmerchantChannel.dizhi,
                kefu:res.CreateAmerchantChannel.kefu,
                ren:res.CreateAmerchantChannel.ren,
                zhengjian:res.CreateAmerchantChannel.zhengjian,
                renshouji:res.CreateAmerchantChannel.renshouji,
              };
            }
            break;
          case 2:
            if (res.CreateAmerchant2Channel) {
              StrName = "ComponentsPapers";
              bool = false;
              //todo 数据回显
              if(res.CreateAmerchant2Channel.img_zhizhao && res.CreateAmerchant2Channel.img_zhizhao.length != 0){
                _this.src = res.CreateAmerchant2Channel.img_zhizhao;
                _this.img_zhizhao = res.CreateAmerchant2Channel.img_zhizhao;
                _this.uploadImgBool = false;
              }
              _this.updata = {
                select_zhizhao: res.CreateAmerchant2Channel.select_zhizhao,
                code_zhizhao: res.CreateAmerchant2Channel.code_zhizhao,
                leimu_zhizhao: res.CreateAmerchant2Channel.leimu_zhizhao,
              };
            }
            break;
        }
        _this.$vux.loading.hide();
        //todo 更新数据绑定，初始化数据
        this.temporaryStorageGetInit(StrName,bool);
      }
    });
  }
  /**
   * @数据回显init初始化 temporaryStorageGetInit
   */
  temporaryStorageGetInit(StrName,bool){
    bool = bool || true;
    StrName = StrName || '';
    var _this = this._this;
    for(var i in _this.updata){
      _this.newData[i] = _this.updata[i];
      (function (i) {
        Object.defineProperty(_this.updata,i,{
          set:function (v) {
               // console.log(i,v)
            _this.newData[i] = v;
            if(i == "shouji"){
              _this.shouji = v;
            }else
            if(i == "kefu"){
              _this.kefu = v;
            }else
            if(i == "renshouji"){
              _this.renshouji = v;
            }
          }
        })
      })(i)
    }
    // if(!this.dataValidation.call(_this,StrName,bool)){
    //   _this.btnIsDisabled = false;
    // }
  }
  /**
   * @数字空格格式化 formatNumber
   * event event节点回调参数
   * index 空格位数
   */
  formatNumber(event = {},index = 0){
    var v = event.target.value.replace(/\D/,"");
    var code = v.match(new RegExp("\\d{1,"+index+"}","img"))
    if(code){
      event.target.value = code.join(" ");
    }else{
      event.target.value = v;
    }
    return this;
  }

  /**
   * @数据验证每一步验证 dataValidation
   * callback 插入回调
   * typeStr 判断类型
   * toastMsg 弹出层状态
   */
  dataValidationDvery(key){
    //todo 数据验证
    var returnBool = true;
    var toastMsg = true;
    switch (key){
      case "zhanghao":
        if(!this.newData.zhanghao || Utils.is_S(this.newData.zhanghao)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户账号】不能为空";
          returnBool =  false;
        }else
        if(!Utils.isPhone(this.newData.zhanghao) && !Utils.isEmails(this.newData.zhanghao)){
          this.toastMsg = toastMsg;
          if(this.newData.zhanghao.indexOf("@") < 0){
            if(/[^0-9]/.test(this.newData.zhanghao)){
              this.toastMsgTxt = "【商户账号】手机号码不能有特殊字符，应该是0-9的数字组合";
            }else
            if(this.newData.zhanghao.length < 11){
              this.toastMsgTxt = "【商户账号】手机号码位数不够";
            }else
            if(this.newData.zhanghao.length > 11){
              this.toastMsgTxt = "【商户账号】手机号码位数不能大于11位，请输入正确的手机号码";
            }else{
              this.toastMsgTxt = "【商户账号】手机号码格式错误，请输入正确的手机号";
            }
          }else {
            this.toastMsgTxt = "【商户账号】邮箱格式错误";
          }
          returnBool = false;
        }
        break;
      case "pwss":
        if(!this.newData.pwss || Utils.is_S(this.newData.pwss)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户密码】不能为空";
          returnBool = false;
        }else
        if(this.newData.pwss.length < 6){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户密码】长度不够,至少为6位";
          returnBool = false;
        }else
        if(this.newData.pwss.length > 20){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户密码】长度超出范围，请设置在6-20位之间";
          returnBool = false;
        }
        break;
      case "shouji":
        if(!this.newData.shouji || Utils.is_S(this.newData.shouji)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】不能为空";
          returnBool = false;
        }else
        if(/[^0-9]/.test(this.newData.shouji)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】不能有特殊字符，应该是0-9的数字组合";
          returnBool = false;
        }else
        if(this.newData.shouji.length < 11){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】位数不够";
          returnBool = false;
        }else
        if(this.newData.shouji.length > 11){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】位数不能大于11位，请输入正确的手机号码";
          returnBool = false;
        }else
        if(!Utils.isPhone(this.newData.shouji)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】号码格式错误，请输入正确的手机号";
          returnBool = false;
        }
        break;
      case "name":
        if(!this.newData.name || Utils.is_S(this.newData.name)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户名称】不能为空";
          returnBool = false;
        }else
        if(this.newData.name.length > 50){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户名称】超出范围，请设置在50位字符以内。";
          returnBool = false;
        }
        break;
      case "namejc":
        if(!this.newData.namejc || Utils.is_S(this.newData.namejc)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户简称】不能为空";
          returnBool = false;
        }else
        if(this.newData.namejc.length > 20){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户简称】超出范围，请设置在20位字符以内。";
          returnBool = false;
        }
        break;
      case "dizhi":
        if(!this.newData.dizhi || Utils.is_S(this.newData.dizhi)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【详细地址】不能为空";
          returnBool = false;
        }else
        if(this.newData.dizhi.length > 100){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【详细地址】超出范围，请设置在100位字符以内。";
          returnBool = false;
        }
        break;
      case "ren":
        if(!this.newData.ren || Utils.is_S(this.newData.ren)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【负责人】不能为空";
          returnBool = false;
        }else
        if(this.newData.ren.length > 10){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【负责人】超出范围，请设置在10位字符以内。";
          returnBool = false;
        }
        break;
      case "zhengjian":
        if(this.newData.zhengjian){
          this.newData.zhengjian = this.newData.zhengjian.replace(/\s/img,"");
        }
        if(this.newData.huabeifneqi && (!this.newData.zhengjian || Utils.is_S(this.newData.zhengjian))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【证件号码】不能为空";
          returnBool = false;
        }else
        if((this.newData.huabeifneqi || (this.newData.zhengjian && this.newData.zhengjian.length > 0)) && (!Utils.isIdCard(this.newData.zhengjian))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【证件号码】格式错误，请输入有效的身份证号";
          returnBool = false;
        }
        break;
      case "kefu":
        if(!this.newData.kefu || Utils.is_S(this.newData.kefu)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【客服电话】不能为空";
          returnBool = false;
        }else
        if(!Utils.isPhone(this.newData.kefu) && (!Utils.isPhoneFixation(this.newData.kefu) || (this.newData.kefu.indexOf("-") == -1))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【客服电话】号码非法或号码格式错误";
          returnBool = false;
        }
        break;
      case "renshouji":
        if(!this.newData.renshouji || Utils.is_S(this.newData.renshouji)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【联系电话】不能为空";
          returnBool = false;
        }else
        if(!Utils.isPhone(this.newData.renshouji) && (!Utils.isPhoneFixation(this.newData.renshouji) || (this.newData.renshouji.indexOf("-") == -1))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【联系电话】号码非法或号码格式错误";
          returnBool = false;
        }
        break;
      case "diqu":
        if(this.newData.diqu.length != 3){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【所在地区】不能为空，请选择所在地区";
          returnBool = false;
        }
        break;
      case "code_zhizhao":
        var next1 = this.airforce.CreateAmerchantChannel;
        if(next1.data.huabeifneqi && (!this.newData.code_zhizhao || Utils.is_S(this.newData.code_zhizhao))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】不能为空";
          returnBool = false;
        }else
        if(next1.data.huabeifneqi && (this.newData.code_zhizhao.length > 28 || this.newData.code_zhizhao.length < 9)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】请填写9-28位以内的正确编码";
          returnBool = false;
        }else
        if(next1.data.huabeifneqi && !Utils.isIllegality(this.newData.code_zhizhao)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】含有非法字符，请填写正确的营业执照编号";
          returnBool = false;
        }else
        if(!Utils.is_S(this.newData.code_zhizhao)&& (this.newData.code_zhizhao.length > 28 || this.newData.code_zhizhao.length < 9)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】请填写9-28位以内的正确编码";
          returnBool = false;
        }else
        if(!Utils.is_S(this.newData.code_zhizhao)&& !Utils.isIllegality(this.newData.code_zhizhao)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】含有非法字符，请填写正确的营业执照编号";
          returnBool = false;
        }
        break;
      case "BillingZhanghao":
        if(!this.newData.zhanghao || Utils.is_S(this.newData.zhanghao)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【结算账号】不能为空";
          returnBool = false;
        }else
        if(this.newData.zhanghao.replace(/\W/img,"").length > 28 || this.newData.zhanghao.replace(/\W/img,"").length < 8){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【结算账号】长度超出范围，请输入8-28位以内的有效的结算账号";
          returnBool = false;
        }else
        if(!Utils.isNumbers(this.newData.zhanghao.replace(/\W/img,""))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【结算账号】含有非法字符，请填写正确的结算账号";
          returnBool = false;
        }
        break;
      case "BillingName":
        if(!this.newData.name || Utils.is_S(this.newData.name)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【户名】不能为空";
          returnBool = false;
        }else
        if(this.newData.name.length > 50){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【户名】长度超出范围，请输入50位以内的有效的结算账号";
          returnBool = false;
        }
        break;
      case "BillingidCard":
        if(!this.newData.isorno && !Utils.isIdCard(this.newData.zhengjian)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【身份证号码】格式错误，请输入有效的身份证号";
          returnBool = false;
        }
        break;
      case "zfb":
        var feilv_zfb = parseFloat(parseFloat(this.feilv_zfb).toFixed(5));
        if((!this.feilv_zfb || Utils.is_S(this.feilv_zfb)) && this.feilv_zfb_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【支付宝手续费】不能为空";
          returnBool = false;
        }else
        if((feilv_zfb < this.feilv_data.zfb.min_fee_rate || feilv_zfb > this.feilv_data.zfb.max_fee_rate) && this.feilv_zfb_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【支付宝手续费率】不正确，请参考右侧高低值";
          returnBool = false;
        }else
        if(isNaN(feilv_zfb) && this.feilv_zfb_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【支付宝手续费率】是非法手续费，请输入数字";
          returnBool = false;
        }
        break;
      case "wx":
        var feilv_wx = parseFloat(parseFloat(this.feilv_wx).toFixed(5));
        if((!this.feilv_wx || Utils.is_S(this.feilv_wx)) && this.feilv_wx_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【微信手续费】不能为空";
          returnBool = false;
        }else
        if((feilv_wx < this.feilv_data.wx.min_fee_rate || feilv_wx > this.feilv_data.wx.max_fee_rate) && this.feilv_wx_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【微信手续费率】不正确，请参考右侧高低值";
          returnBool = false;
        }else
        if(isNaN(feilv_wx) && this.feilv_wx_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【微信手续费率】是非法手续费，请输入数字";
          returnBool = false;
        }
        break;
    }
  }
  /**
   * @数据验证 dataValidation
   * callback 插入回调
   * typeStr 判断类型
   * toastMsg 弹出层状态
   */
  dataValidation(typeStr="",toastMsg = true,callback = new Function){
    if(typeof toastMsg == "function"){
      callback = toastMsg;
      toastMsg = true;
    };
    var returnBool = true;
    switch (typeStr){
      case "ComponentsInfo":
        if(this.huabei === true){
          this.updata.huabei = true;
        }else {
          this.updata.huabei = false;
        };
        if(this.huabeifneqi === true){
          this.updata.huabeifneqi = true;
        }else {
          this.updata.huabeifneqi = false;
        };
        this.newData.huabei = this.updata.huabei;
        this.newData.huabeifneqi = this.updata.huabeifneqi;
        this.newData.diqu = this.diqu;
        this.newData.dizhi = this.dizhi;
        callback.call(this);
        if(this.newData.zhengjian){
          this.newData.zhengjian = this.newData.zhengjian.replace(/\s/img,"");
        }
        if(!this.newData.zhanghao || Utils.is_S(this.newData.zhanghao)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户账号】不能为空";
          returnBool =  false;
        }else
        if(!Utils.isPhone(this.newData.zhanghao) && !Utils.isEmails(this.newData.zhanghao)){
          this.toastMsg = toastMsg;
          if(this.newData.zhanghao.indexOf("@") < 0){
            if(/[^0-9]/.test(this.newData.zhanghao)){
              this.toastMsgTxt = "【商户账号】手机号码不能有特殊字符，应该是0-9的数字组合";
            }else
            if(this.newData.zhanghao.length < 11){
              this.toastMsgTxt = "【商户账号】手机号码位数不够";
            }else
            if(this.newData.zhanghao.length > 11){
              this.toastMsgTxt = "【商户账号】手机号码位数不能大于11位，请输入正确的手机号码";
            }else{
              this.toastMsgTxt = "【商户账号】手机号码格式错误，请输入正确的手机号";
            }
          }else {
            this.toastMsgTxt = "【商户账号】邮箱格式错误";
          }
          returnBool = false;
        }else
        if(!this.newData.pwss || Utils.is_S(this.newData.pwss)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户密码】不能为空";
          returnBool = false;
        }else
        if(this.newData.pwss.length < 6){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户密码】长度不够,至少为6位";
          returnBool = false;
        }else
        if(this.newData.pwss.length > 20){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户密码】长度超出范围，请设置在6-20位之间";
          returnBool = false;
        }else
        if(!this.newData.shouji || Utils.is_S(this.newData.shouji)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】不能为空";
          returnBool = false;
        }else
        if(/[^0-9]/.test(this.newData.shouji)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】不能有特殊字符，应该是0-9的数字组合";
          returnBool = false;
        }else
        if(this.newData.shouji.length < 11){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】位数不够";
          returnBool = false;
        }else
        if(this.newData.shouji.length > 11){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】位数不能大于11位，请输入正确的手机号码";
          returnBool = false;
        }else
        if(!Utils.isPhone(this.newData.shouji)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【手机号码】号码格式错误，请输入正确的手机号";
          returnBool = false;
        }else
        if(!this.newData.name || Utils.is_S(this.newData.name)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户名称】不能为空";
          returnBool = false;
        }else
        if(this.newData.name.length > 50){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户名称】超出范围，请设置在50位字符以内。";
          returnBool = false;
        }else
        if(!this.newData.namejc || Utils.is_S(this.newData.namejc)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户简称】不能为空";
          returnBool = false;
        }else
        if(this.newData.namejc.length > 20){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【商户简称】超出范围，请设置在20位字符以内。";
          returnBool = false;
        }else
        if(this.newData.diqu.length != 3){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【所在地区】不能为空，请选择所在地区";
          returnBool = false;
        }else
        if(!this.newData.dizhi || Utils.is_S(this.newData.dizhi)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【详细地址】不能为空";
          returnBool = false;
        }else
        if(this.newData.dizhi.length > 100){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【详细地址】超出范围，请设置在100位字符以内。";
          returnBool = false;
        }else
        if(!this.newData.kefu || Utils.is_S(this.newData.kefu)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【客服电话】不能为空";
          returnBool = false;
        }else
        if(!Utils.isPhone(this.newData.kefu) && (!Utils.isPhoneFixation(this.newData.kefu) || (this.newData.kefu.indexOf("-") == -1))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【客服电话】号码非法或号码格式错误";
          returnBool = false;
        }else
        if(!this.newData.ren || Utils.is_S(this.newData.ren)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【负责人】不能为空";
          returnBool = false;
        }else
        if(this.newData.ren.length > 10){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【负责人】超出范围，请设置在10位字符以内。";
          returnBool = false;
        }else
        if(this.newData.huabeifneqi && (!this.newData.zhengjian || Utils.is_S(this.newData.zhengjian))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【证件号码】不能为空";
          returnBool = false;
        }else
        if((this.newData.huabeifneqi || (this.newData.zhengjian && this.newData.zhengjian.length > 0)) && (!Utils.isIdCard(this.newData.zhengjian))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【证件号码】格式错误，请输入有效的身份证号";
          returnBool = false;
        }else
        if(!this.newData.renshouji || Utils.is_S(this.newData.renshouji)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【联系电话】不能为空";
          returnBool = false;
        }else
        if(!Utils.isPhone(this.newData.renshouji) && (!Utils.isPhoneFixation(this.newData.renshouji) || (this.newData.renshouji.indexOf("-") == -1))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【联系电话】号码非法或号码格式错误";
          returnBool = false;
        }
        break;
      case "ComponentsPapers":
        callback.call(this);
        var next1 = this.airforce.CreateAmerchantChannel;
        if(!next1){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请先填写【基本信息资料】";
          returnBool = false;
        }else
          this.newData.img_zhizhao = this.img_zhizhao;
        if(next1.data.huabeifneqi && this.newData.select_zhizhao.length == 0){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请选择【营业执照类型】";
          returnBool = false;
        }else
        if(next1.data.huabeifneqi && (!this.newData.code_zhizhao || Utils.is_S(this.newData.code_zhizhao))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】不能为空";
          returnBool = false;
        }else
        if(next1.data.huabeifneqi && (this.newData.code_zhizhao.length > 28 || this.newData.code_zhizhao.length < 9)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】请填写9-28位以内的正确编码";
          returnBool = false;
        }else
        if(next1.data.huabeifneqi && !Utils.isIllegality(this.newData.code_zhizhao)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】含有非法字符，请填写正确的营业执照编号";
          returnBool = false;
        }else
        if(typeof this.newData.code_zhizhao == "string" && this.newData.code_zhizhao.length > 0 && (this.newData.code_zhizhao.length > 28 || this.newData.code_zhizhao.length < 9)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】请填写9-28位以内的正确编码";
          returnBool = false;
        }else
        if(typeof this.newData.code_zhizhao == "string" && this.newData.code_zhizhao.length > 0 && !Utils.isIllegality(this.newData.code_zhizhao)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【营业执照编号】含有非法字符，请填写正确的营业执照编号";
          returnBool = false;
        }else
        if(next1.data.huabeifneqi && !this.src &&  this.src.length == 0){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请上传【营业执照图片】";
          returnBool = false;
        }else
        if(this.newData.leimu_zhizhao.length == 0 || this.newData.leimu_zhizhao[0].length == 0 || JSON.parse(this.newData.leimu_zhizhao[0]).id == ""){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请选择【经营类目】";
          returnBool = false;
        }
        break;
      case "ComponentsServiceCharge":
        var feilv_zfb = parseFloat(parseFloat(this.feilv_zfb).toFixed(5));
        var feilv_wx = parseFloat(parseFloat(this.feilv_wx).toFixed(5));
        if(this.newData.bank.length == 0){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请选择【银行】";
          returnBool = false;
        }else
        if(this.newData.rate.length == 0){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请选择【手续费方案】";
          returnBool = false;
        }else
        if (!this.feilv_zfb_Bool && !this.feilv_wx_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请去银行管理添加支付宝或微信手续费费率";
          returnBool = false;
        }else
        if((!this.feilv_zfb || Utils.is_S(this.feilv_zfb)) && this.feilv_zfb_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【支付宝手续费】不能为空";
          returnBool = false;
        }else
        if((!this.feilv_wx || Utils.is_S(this.feilv_wx)) && this.feilv_wx_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【微信手续费】不能为空";
          returnBool = false;
        }else
        if((feilv_zfb < this.feilv_data.zfb.min_fee_rate || feilv_zfb > this.feilv_data.zfb.max_fee_rate) && this.feilv_zfb_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【支付宝手续费率】不正确，请参考右侧高低值";
          returnBool = false;
        }else
        if((feilv_wx < this.feilv_data.wx.min_fee_rate || feilv_wx > this.feilv_data.wx.max_fee_rate) && this.feilv_wx_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【微信手续费率】不正确，请参考右侧高低值";
          returnBool = false;
        }else
        if(isNaN(feilv_zfb) && this.feilv_zfb_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【支付宝手续费率】是非法手续费，请输入数字";
          returnBool = false;
        }else
        if(isNaN(feilv_wx) && this.feilv_wx_Bool){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【微信手续费率】是非法手续费，请输入数字";
          returnBool = false;
        }
        callback.call(this,feilv_zfb,feilv_wx);
        break;
      case "ComponentsBillingInfo":
        this.newData.diqu = this.diqu;
        this.newData.isorno = this.isorno;
        this.newData.src1 = this.src1;
        this.newData.src2 = this.src2;
        this.newData.zhengjian = this.newData.zhengjian;
        callback.call(this);
        if(this.newData.zhengjian){
          this.newData.zhengjian = this.newData.zhengjian.replace(/\s/img,"");
        }
        if(!this.newData.zhanghao || Utils.is_S(this.newData.zhanghao)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【结算账号】不能为空";
          returnBool = false;
        }else
        if(this.newData.zhanghao.replace(/\W/img,"").length > 28 || this.newData.zhanghao.replace(/\W/img,"").length < 8){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【结算账号】长度超出范围，请输入8-28位以内的有效的结算账号";
          returnBool = false;
        }else
        if(!Utils.isNumbers(this.newData.zhanghao.replace(/\W/img,""))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【结算账号】含有非法字符，请填写正确的结算账号";
          returnBool = false;
        }else
        if(!this.newData.name || Utils.is_S(this.newData.name)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【户名】不能为空";
          returnBool = false;
        }else
        if(this.newData.name.length > 50){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【户名】长度超出范围，请输入50位以内的有效的结算账号";
          returnBool = false;
        }else
        if(!this.newData.diqu || this.newData.diqu.length == 0){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请选择【所在地区】";
          returnBool = false;
        }else
        if(!this.newData.bank || this.newData.bank.length == 0){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请选择【开户银行】";
          returnBool = false;
        }else
        if(!this.newData.branch || this.newData.branch.length == 0){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请选择【开户网点】";
          returnBool = false;
        }else
        if(!this.newData.isorno && (!this.newData.zhengjian || Utils.is_S(this.newData.zhengjian))){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【身份证号码】不能为空";
          returnBool = false;
        }
        else
        if(!this.newData.isorno && !Utils.isIdCard(this.newData.zhengjian)){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "【身份证号码】格式错误，请输入有效的身份证号";
          returnBool = false;
        }else
        if(!this.newData.isorno && !this.newData.src1.src){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请上传【身份证图片-正面】";
          returnBool = false;
        }else
        if(!this.newData.isorno && !this.newData.src2.src){
          this.toastMsg = toastMsg;
          this.toastMsgTxt = "请上传【身份证图片-反面】";
          returnBool = false;
        }
        break;
    }
    return !returnBool;
  }
  /**
   * @获取城市数据 getChinaAddress
   * */
  getChinaAddress(){
    this._this.action({
      moduleName: 'findPasswordNextStep',
      method: 'get',
      url:"CreateAmerchantChannel",
      params:{
        a:"area.all.china.address",
      },
      callback: (res) => {
        if (res.result) {
          this._this.addressData = res.result;
        }
      }
    });
  }
  /**
   * @判断商户是否已绑定过 merchantIsBindingOrNot
   * */
  merchantIsBindingOrNot(){
    var _this = this._this;
    if(Utils.parseQuery(location.search).state == "boingpay" && _this.airforce.isChannel != "channel"){
      _this.action({
        moduleName: 'findPasswordNextStep',
        method: 'get',
        url:"checkWxBind",
        params:{
          openId:_this.airforce.openId,//微信openId
        },
        callback: (res) => {
          if(res.status == "ERROR"){
            setTimeout(function () {
              _this.$vux.loading.hide();
              WeixinJSBridge.call('closeWindow');
            },1500)
          }
        }
      });
    }
  }
  /**
   * @监听地区选择变化 ListeningAreaSelect
   * */
  ListeningAreaSelect(){
    var _this = this._this;
    var _thiss = this;
    var Maps = _this.diqu.toString();
    setInterval(function () {
      if(Maps != _this.diqu.toString()){
        Maps =  _this.diqu.toString();
        setTimeout(function () {
          _thiss.dataValidationDvery.call(_this,"diqu");
        },500);
      }
    })
  }

  /**
   * @获取业态数据信息 getCommercialActivities
   */
  getCommercialActivities(){
    var _this = this._this;
    _this.action({
      moduleName: 'findPasswordNextStep',
      method: 'post',
      url:"CreateAmerchantChannel",
      params:{
        a:"commercial.activities",
        appId:_this.airforce.appId,
        status:1,
        startIndex:0,
        pageSize:1000,
      },
      callback: (res) => {
        if (res.records) {
          if(res.records.length == 0){
            res.records.push({id:'',value:'',name:'无经营类目，请联系客服'});
          }else{
            res.records.unshift({id:'',value:'',name:''});
            _this.leimu = res.records.map(function (e) {
              e.value = JSON.stringify(e);
              return e;
            });
          }
        }
      }
    });
  }
  /**
   * @图片上传 imageUpload
   */
  imageUpload(){
    var _this = this._this;
    var file = document.querySelector("#uploadImg");
    file.onchange = function (e) {
      var fs = e.target.files[0];
      var img = new FileReader(fs);
      img.readAsDataURL(fs);
      img.onload = function (d) {
        _this.uploadImgBool = false;
        _this.load_progress = true;
        var load_progressIndex = 0;
        var time = setInterval(function () {
          if(load_progressIndex <= 99){
            load_progressIndex += 0.1;
          }
          _this.load_progressIndex = load_progressIndex;
        });
        _this.action({
          moduleName: 'findPasswordNextStep',
          method: 'post',
          url:"uploadfileForPhone",data:{
            app_id:_this.airforce.appId,
            base64string:d.target.result,
          },
          callback: (res) => {
            clearInterval(time);
            _this.load_progressIndex = 100;
            _this.load_progress = false;
            if(res[0]){
              _this.src = d.target.result;
              _this.img_zhizhao = res[0];
              _this.SetmerchantHold("imageUpload");
            }
          }
        });
      }
    }
    file.click();
  }
  /**
   * @获取银行数据 BetweenTheBank
   */
  BetweenTheBank(){
    var _this = this._this;
    _this.action({
      moduleName: 'findPasswordNextStep',
      method: 'post',
      url: "CreateAmerchantChannel",
      params: {
        a: "Between.the.bank",
        appId: _this.airforce.appId,
      },
      callback: (res) => {
        if (res.bank_list) {
          _this.bank = res.bank_list.map(function (e) {
            e.name = e.op_app_name;
            e.value = JSON.stringify(e);
            return e;
          });
        }
      }
    });
  }
}

