export default {
    login:{
        // password:"12345678",
        // phone:"15958123761",
        // password:"123456",
        // phone:"18768527014"
    },
    layout:{
        backText:'',
        showBack:true,
        title:'',
    },
    register:{
        //验证码60秒设置
        TimeIndexInit:60,
        //MD5加密拼接字符串
        md5:"admin1988",
    },
    ForgetPwd:{
        //验证码60秒设置
        TimeIndexInit:60,
    },
    homeTabbar:[
        {
            txt:"分期",
            iconSelectBool:false,
            icons:"&#xe613;",
            iconsSelect:"&#xe619;",
            selected:true,
            link:'/app/HomeLayout/home'
        },
        {
            txt:"订单",
            iconSelectBool:false,
            icons:"&#xe606;",
            iconsSelect:"&#xe609;",
            selected:false,
            link:'/app/HomeLayout/order'
        },
        {
            txt:"工具",
            iconSelectBool:false,
            icons:"&#xe6ad;",
            iconsSelect:"&#xe6ae;",
            selected:false,
            link:'/app/HomeLayout/tool'
        },
        {
            txt:"我的",
            iconSelectBool:false,
            icons:"&#xe633;",
            iconsSelect:"&#xe6a2;",
            selected:false,
            link:'/app/HomeLayout/user'
        },
    ],
    AddCompanyInfo:{

    },
    homeSubmit:{
        // fenqicheType:true,
        // chepaiType:true,
        // company:{
        //     cid:"149",
        //     cname:"一笑倾人城",
        //     key:"149",
        //     order_no:"2017080910375551575350",
        //     value:"一笑倾人城",
        // },
        // channel:"23423",
        // money:"234",
        // remark:"23423",
        // fenqiType_Select:{
        //     name:"交强险",
        //     value:"2",
        // },
        // fenqiType_SelectVal:["2"],
        // fenqiType_SelectTxt:"交强险",
        rate_Select:{
            name:"20%",
            value:1,
        },
        rate_SelectVal:[1],
        rate_SelectTxt:"20%",
        // auth_name:"张三",
        // auth_phone:"18768527011",
        // auth_linkman1:"李四",
        // auth_linkman1_Select:{
        //     name:"父亲",
        //     value:'1',
        // },
        // auth_linkman1_SelectTxt:"父亲",
        // auth_linkman1_SelectVal:['1'],
        // auth_linkman1_phone:"18768527011",
        // auth_linkman2:"王五",
        // auth_linkman2_Select:{
        //     name:"单位座机",
        //     value:'2',
        // },
        // auth_linkman2_SelectTxt:"单位座机",
        // auth_linkman2_SelectVal:['2'],
        // auth_linkman2_phone:"18768527014",
        // auth_bankCode:"1111111111111111",
        // auth_idCode:"362329199303198119",
    },
    Tool:{},
    app_info:{},
}
