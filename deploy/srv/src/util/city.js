const _ = require('lodash');

let allcitys = {
    "A": [
        {
            "cityname": "安远",
            "zipcode": "0797",
            "pinyin": "Anyuan"
        },
        {
            "cityname": "安义",
            "zipcode": "0791",
            "pinyin": "Anyi"
        },
        {
            "cityname": "安溪",
            "zipcode": "0595",
            "pinyin": "Anxi"
        },
        {
            "cityname": "安丘",
            "zipcode": "0536",
            "pinyin": "Anqiu"
        },
        {
            "cityname": "安宁",
            "zipcode": "0871",
            "pinyin": "Anning"
        },
        {
            "cityname": "安吉",
            "zipcode": "0572",
            "pinyin": "Anji"
        },
        {
            "cityname": "安福",
            "zipcode": "0796",
            "pinyin": "Anfu"
        },
        {
            "cityname": "阿城",
            "zipcode": "0451",
            "pinyin": "Acheng"
        },
        {
            "cityname": "安阳",
            "zipcode": "0372",
            "pinyin": "Anyang"
        },
        {
            "cityname": "安顺",
            "zipcode": "0853",
            "pinyin": "Anshun"
        },
        {
            "cityname": "鞍山",
            "zipcode": "0412",
            "pinyin": "Anshan"
        },
        {
            "cityname": "安庆",
            "zipcode": "0556",
            "pinyin": "Anqing"
        },
        {
            "cityname": "安康",
            "zipcode": "0915",
            "pinyin": "Ankang"
        },
        {
            "cityname": "阿里",
            "zipcode": "0897",
            "pinyin": "Ali"
        },
        {
            "cityname": "阿勒泰",
            "zipcode": "0906",
            "pinyin": "Aletai"
        },
        {
            "cityname": "阿拉善盟",
            "zipcode": "0483",
            "pinyin": "Alashanmeng"
        },
        {
            "cityname": "阿克苏",
            "zipcode": "0997",
            "pinyin": "Akesu"
        },
        {
            "cityname": "阿坝",
            "zipcode": "0837",
            "pinyin": "Aba"
        }
    ],
    "B": [
        {
            "cityname": "北京",
            "zipcode": "010",
            "pinyin": "Beijing"
        },
        {
            "cityname": "博兴",
            "zipcode": "0543",
            "pinyin": "Boxing"
        },
        {
            "cityname": "博罗",
            "zipcode": "0752",
            "pinyin": "Boluo"
        },
        {
            "cityname": "博爱",
            "zipcode": "0391",
            "pinyin": "Boai"
        },
        {
            "cityname": "璧山",
            "zipcode": "023",
            "pinyin": "Bishan"
        },
        {
            "cityname": "宾阳",
            "zipcode": "0771",
            "pinyin": "Binyang"
        },
        {
            "cityname": "宾县",
            "zipcode": "0451",
            "pinyin": "Binxian"
        },
        {
            "cityname": "滨海",
            "zipcode": "0515",
            "pinyin": "Binhai"
        },
        {
            "cityname": "巴彦",
            "zipcode": "0451",
            "pinyin": "Bayan"
        },
        {
            "cityname": "宝应",
            "zipcode": "0514",
            "pinyin": "Baoying"
        },
        {
            "cityname": "亳州",
            "zipcode": "0558",
            "pinyin": "Bozhou"
        },
        {
            "cityname": "博尔塔拉",
            "zipcode": "0909",
            "pinyin": "Boertala"
        },
        {
            "cityname": "滨州",
            "zipcode": "0543",
            "pinyin": "Binzhou"
        },
        {
            "cityname": "毕节",
            "zipcode": "0857",
            "pinyin": "Bijie"
        },
        {
            "cityname": "本溪",
            "zipcode": "0414",
            "pinyin": "Benxi"
        },
        {
            "cityname": "北海",
            "zipcode": "0779",
            "pinyin": "Beihai"
        },
        {
            "cityname": "巴中",
            "zipcode": "0827",
            "pinyin": "Bazhong"
        },
        {
            "cityname": "巴音郭楞",
            "zipcode": "0996",
            "pinyin": "Bayinguoleng"
        },
        {
            "cityname": "巴彦淖尔",
            "zipcode": "0478",
            "pinyin": "Bayannaoer"
        },
        {
            "cityname": "包头",
            "zipcode": "0472",
            "pinyin": "Baotou"
        },
        {
            "cityname": "保山",
            "zipcode": "0875",
            "pinyin": "Baoshan"
        },
        {
            "cityname": "宝鸡",
            "zipcode": "0917",
            "pinyin": "Baoji"
        },
        {
            "cityname": "保定",
            "zipcode": "0312",
            "pinyin": "Baoding"
        },
        {
            "cityname": "蚌埠",
            "zipcode": "0552",
            "pinyin": "Bangbu"
        },
        {
            "cityname": "白银",
            "zipcode": "0943",
            "pinyin": "Baiyin"
        },
        {
            "cityname": "白山",
            "zipcode": "0439",
            "pinyin": "Baishan"
        },
        {
            "cityname": "百色",
            "zipcode": "0776",
            "pinyin": "Baise"
        },
        {
            "cityname": "白城",
            "zipcode": "0436",
            "pinyin": "Baicheng"
        }
    ],
    "C": [
        {
            "cityname": "成都",
            "zipcode": "028",
            "pinyin": "Chengdu"
        },
        {
            "cityname": "常州",
            "zipcode": "0519",
            "pinyin": "Changzhou"
        },
        {
            "cityname": "长沙",
            "zipcode": "0731",
            "pinyin": "Changsha"
        },
        {
            "cityname": "长春",
            "zipcode": "0431",
            "pinyin": "Changchun"
        },
        {
            "cityname": "重庆",
            "zipcode": "023",
            "pinyin": "Chongqing"
        },
        {
            "cityname": "朝阳",
            "zipcode": "0421",
            "pinyin": "Chaoyang"
        },
        {
            "cityname": "巢湖",
            "zipcode": "0565",
            "pinyin": "Chaohu"
        },
        {
            "cityname": "长治",
            "zipcode": "0355",
            "pinyin": "Changzhi"
        },
        {
            "cityname": "昌吉",
            "zipcode": "0997",
            "pinyin": "Changji"
        },
        {
            "cityname": "昌都",
            "zipcode": "0895",
            "pinyin": "Changdu"
        },
        {
            "cityname": "常德",
            "zipcode": "0736",
            "pinyin": "Changde"
        },
        {
            "cityname": "沧州",
            "zipcode": "0317",
            "pinyin": "Cangzhou"
        },
        {
            "cityname": "郴州",
            "zipcode": "0735",
            "pinyin": "Chenzhou"
        },
        {
            "cityname": "承德",
            "zipcode": "0314",
            "pinyin": "Chengde"
        },
        {
            "cityname": "潮州",
            "zipcode": "0768",
            "pinyin": "Chaozhou"
        },
        {
            "cityname": "滁州",
            "zipcode": "0550",
            "pinyin": "Chuzhou"
        },
        {
            "cityname": "楚雄",
            "zipcode": "0875",
            "pinyin": "Chuxiong"
        },
        {
            "cityname": "崇左",
            "zipcode": "0771",
            "pinyin": "Chongzuo"
        },
        {
            "cityname": "池州",
            "zipcode": "0566",
            "pinyin": "Chizhou"
        },
        {
            "cityname": "赤峰",
            "zipcode": "0476",
            "pinyin": "Chifeng"
        },
        {
            "cityname": "枞阳",
            "zipcode": "0556",
            "pinyin": "Congyang"
        },
        {
            "cityname": "从化",
            "zipcode": "020",
            "pinyin": "Conghua"
        },
        {
            "cityname": "慈溪",
            "zipcode": "0574",
            "pinyin": "Cixi"
        },
        {
            "cityname": "淳安",
            "zipcode": "0571",
            "pinyin": "Chunan"
        },
        {
            "cityname": "崇州",
            "zipcode": "028",
            "pinyin": "Chongzhou"
        },
        {
            "cityname": "崇义",
            "zipcode": "0797",
            "pinyin": "Chongyi"
        },
        {
            "cityname": "崇仁",
            "zipcode": "0794",
            "pinyin": "Chongren"
        },
        {
            "cityname": "茌平",
            "zipcode": "0635",
            "pinyin": "Chiping"
        },
        {
            "cityname": "成武",
            "zipcode": "0530",
            "pinyin": "Chengwu"
        },
        {
            "cityname": "城口",
            "zipcode": "023",
            "pinyin": "Chengkou"
        },
        {
            "cityname": "呈贡",
            "zipcode": "0871",
            "pinyin": "Chenggong"
        },
        {
            "cityname": "潮安",
            "zipcode": "0768",
            "pinyin": "Chaoan"
        },
        {
            "cityname": "昌邑",
            "zipcode": "0536",
            "pinyin": "Changyi"
        },
        {
            "cityname": "长兴",
            "zipcode": "0572",
            "pinyin": "Changxing"
        },
        {
            "cityname": "长汀",
            "zipcode": "0597",
            "pinyin": "Changting"
        },
        {
            "cityname": "长泰",
            "zipcode": "0596",
            "pinyin": "Changtai"
        },
        {
            "cityname": "常熟",
            "zipcode": "0512",
            "pinyin": "Changshu"
        },
        {
            "cityname": "常山",
            "zipcode": "0570",
            "pinyin": "Changshan"
        },
        {
            "cityname": "昌乐",
            "zipcode": "0536",
            "pinyin": "Changle"
        },
        {
            "cityname": "长乐",
            "zipcode": "0591",
            "pinyin": "Changle"
        },
        {
            "cityname": "长海",
            "zipcode": "0411",
            "pinyin": "Changhai"
        },
        {
            "cityname": "长丰",
            "zipcode": "0551",
            "pinyin": "Changfeng"
        },
        {
            "cityname": "长岛",
            "zipcode": "0535",
            "pinyin": "Changdao"
        },
        {
            "cityname": "曹县",
            "zipcode": "0530",
            "pinyin": "Caoxian"
        },
        {
            "cityname": "苍山",
            "zipcode": "0539",
            "pinyin": "Cangshan"
        },
        {
            "cityname": "苍南",
            "zipcode": "0577",
            "pinyin": "Cangnan"
        }
    ],
    "D": [
        {
            "cityname": "丹东",
            "zipcode": "0415",
            "pinyin": "Dandong"
        },
        {
            "cityname": "大理",
            "zipcode": "0872",
            "pinyin": "Dali"
        },
        {
            "cityname": "东莞",
            "zipcode": "0769",
            "pinyin": "Dongguan"
        },
        {
            "cityname": "大连",
            "zipcode": "0411",
            "pinyin": "Dalian"
        },
        {
            "cityname": "大兴安岭",
            "zipcode": "0457",
            "pinyin": "Daxinganling"
        },
        {
            "cityname": "大同",
            "zipcode": "0352",
            "pinyin": "Datong"
        },
        {
            "cityname": "大庆",
            "zipcode": "0459",
            "pinyin": "Daqing"
        },
        {
            "cityname": "德州",
            "zipcode": "0534",
            "pinyin": "Dezhou"
        },
        {
            "cityname": "德阳",
            "zipcode": "0838",
            "pinyin": "Deyang"
        },
        {
            "cityname": "德宏",
            "zipcode": "0692",
            "pinyin": "Dehong"
        },
        {
            "cityname": "达州",
            "zipcode": "0818",
            "pinyin": "Dazhou"
        },
        {
            "cityname": "大丰",
            "zipcode": "0515",
            "pinyin": "Dafeng"
        },
        {
            "cityname": "东营",
            "zipcode": "0546",
            "pinyin": "Dongying"
        },
        {
            "cityname": "迪庆",
            "zipcode": "0887",
            "pinyin": "Diqing"
        },
        {
            "cityname": "定西",
            "zipcode": "0932",
            "pinyin": "Dingxi"
        },
        {
            "cityname": "单县",
            "zipcode": "0530",
            "pinyin": "Danxian"
        },
        {
            "cityname": "当涂",
            "zipcode": "0555",
            "pinyin": "Dangtu"
        },
        {
            "cityname": "砀山",
            "zipcode": "0557",
            "pinyin": "Dangshan"
        },
        {
            "cityname": "岱山",
            "zipcode": "0580",
            "pinyin": "Daishan"
        },
        {
            "cityname": "大邑",
            "zipcode": "028",
            "pinyin": "Dayi"
        },
        {
            "cityname": "大田",
            "zipcode": "0598",
            "pinyin": "Datian"
        },
        {
            "cityname": "大埔",
            "zipcode": "0753",
            "pinyin": "Dapu"
        },
        {
            "cityname": "丹阳",
            "zipcode": "0511",
            "pinyin": "Danyang"
        },
        {
            "cityname": "德化",
            "zipcode": "0595",
            "pinyin": "Dehua"
        },
        {
            "cityname": "德安",
            "zipcode": "0792",
            "pinyin": "Dean"
        },
        {
            "cityname": "大足",
            "zipcode": "023",
            "pinyin": "Dazu"
        },
        {
            "cityname": "大余",
            "zipcode": "0797",
            "pinyin": "Dayu"
        },
        {
            "cityname": "德庆",
            "zipcode": "0758",
            "pinyin": "Deqing"
        },
        {
            "cityname": "德清",
            "zipcode": "0572",
            "pinyin": "Deqing"
        },
        {
            "cityname": "登封",
            "zipcode": "0371",
            "pinyin": "Dengfeng"
        },
        {
            "cityname": "德惠",
            "zipcode": "0431",
            "pinyin": "Dehui"
        },
        {
            "cityname": "定南",
            "zipcode": "0797",
            "pinyin": "Dingnan"
        },
        {
            "cityname": "垫江",
            "zipcode": "023",
            "pinyin": "Dianjiang"
        },
        {
            "cityname": "电白",
            "zipcode": "0668",
            "pinyin": "Dianbai"
        },
        {
            "cityname": "德兴",
            "zipcode": "0793",
            "pinyin": "Dexing"
        },
        {
            "cityname": "东海",
            "zipcode": "0518",
            "pinyin": "Donghai"
        },
        {
            "cityname": "东阿",
            "zipcode": "0635",
            "pinyin": "Donga"
        },
        {
            "cityname": "定远",
            "zipcode": "0550",
            "pinyin": "Dingyuan"
        },
        {
            "cityname": "定陶",
            "zipcode": "0530",
            "pinyin": "Dingtao"
        },
        {
            "cityname": "东台",
            "zipcode": "0515",
            "pinyin": "Dongtai"
        },
        {
            "cityname": "东山",
            "zipcode": "0596",
            "pinyin": "Dongshan"
        },
        {
            "cityname": "东平",
            "zipcode": "0538",
            "pinyin": "Dongping"
        },
        {
            "cityname": "东明",
            "zipcode": "0530",
            "pinyin": "Dongming"
        },
        {
            "cityname": "东源",
            "zipcode": "0762",
            "pinyin": "Dongyuan"
        },
        {
            "cityname": "东阳",
            "zipcode": "0579",
            "pinyin": "Dongyang"
        },
        {
            "cityname": "东乡",
            "zipcode": "0794",
            "pinyin": "Dongxiang"
        },
        {
            "cityname": "洞头",
            "zipcode": "0577",
            "pinyin": "Dongtou"
        },
        {
            "cityname": "都江堰",
            "zipcode": "028",
            "pinyin": "Dujiangyan"
        },
        {
            "cityname": "都昌",
            "zipcode": "0792",
            "pinyin": "Duchang"
        },
        {
            "cityname": "东至",
            "zipcode": "0566",
            "pinyin": "Dongzhi"
        }
    ],
    "E": [
        {
            "cityname": "鄂尔多斯",
            "zipcode": "0477",
            "pinyin": "Eerduosi"
        },
        {
            "cityname": "恩施",
            "zipcode": "0718",
            "pinyin": "Enshi"
        },
        {
            "cityname": "恩平",
            "zipcode": "0750",
            "pinyin": "Enping"
        },
        {
            "cityname": "鄂州",
            "zipcode": "0711",
            "pinyin": "Ezhou"
        }
    ],
    "F": [
        {
            "cityname": "佛山",
            "zipcode": "0757",
            "pinyin": "Foshan"
        },
        {
            "cityname": "福州",
            "zipcode": "0591",
            "pinyin": "Fuzhou"
        },
        {
            "cityname": "防城港",
            "zipcode": "0770",
            "pinyin": "Fangchenggang"
        },
        {
            "cityname": "抚顺",
            "zipcode": "0413",
            "pinyin": "Fushun"
        },
        {
            "cityname": "阜新",
            "zipcode": "0418",
            "pinyin": "Fuxin"
        },
        {
            "cityname": "阜阳",
            "zipcode": "0558",
            "pinyin": "Fuyang"
        },
        {
            "cityname": "抚州",
            "zipcode": "0794",
            "pinyin": "Fuzhou"
        },
        {
            "cityname": "法库",
            "zipcode": "024",
            "pinyin": "Faku"
        },
        {
            "cityname": "富阳",
            "zipcode": "0571",
            "pinyin": "Fuyang"
        },
        {
            "cityname": "福清",
            "zipcode": "0591",
            "pinyin": "Fuqing"
        },
        {
            "cityname": "阜宁",
            "zipcode": "0515",
            "pinyin": "Funing"
        },
        {
            "cityname": "阜南",
            "zipcode": "0558",
            "pinyin": "Funan"
        },
        {
            "cityname": "富民",
            "zipcode": "0871",
            "pinyin": "Fumin"
        },
        {
            "cityname": "浮梁",
            "zipcode": "0798",
            "pinyin": "Fuliang"
        },
        {
            "cityname": "福鼎",
            "zipcode": "0593",
            "pinyin": "Fuding"
        },
        {
            "cityname": "福安",
            "zipcode": "0593",
            "pinyin": "Fuan"
        },
        {
            "cityname": "佛冈",
            "zipcode": "0763",
            "pinyin": "Fogang"
        },
        {
            "cityname": "分宜",
            "zipcode": "0790",
            "pinyin": "Fenyi"
        },
        {
            "cityname": "凤阳",
            "zipcode": "0550",
            "pinyin": "Fengyang"
        },
        {
            "cityname": "奉新",
            "zipcode": "0795",
            "pinyin": "Fengxin"
        },
        {
            "cityname": "丰县",
            "zipcode": "0516",
            "pinyin": "Fengxian"
        },
        {
            "cityname": "凤台",
            "zipcode": "0554",
            "pinyin": "Fengtai"
        },
        {
            "cityname": "丰顺",
            "zipcode": "0753",
            "pinyin": "Fengshun"
        },
        {
            "cityname": "封开",
            "zipcode": "0758",
            "pinyin": "Fengkai"
        },
        {
            "cityname": "奉节",
            "zipcode": "023",
            "pinyin": "Fengjie"
        },
        {
            "cityname": "奉化",
            "zipcode": "0574",
            "pinyin": "Fenghua"
        },
        {
            "cityname": "丰都",
            "zipcode": "023",
            "pinyin": "Fengdu"
        },
        {
            "cityname": "丰城",
            "zipcode": "0795",
            "pinyin": "Fengcheng"
        },
        {
            "cityname": "费县",
            "zipcode": "0539",
            "pinyin": "Feixian"
        },
        {
            "cityname": "肥西",
            "zipcode": "0551",
            "pinyin": "Feixi"
        },
        {
            "cityname": "肥东",
            "zipcode": "0551",
            "pinyin": "Feidong"
        },
        {
            "cityname": "肥城",
            "zipcode": "0538",
            "pinyin": "Feicheng"
        },
        {
            "cityname": "方正",
            "zipcode": "0451",
            "pinyin": "Fangzheng"
        },
        {
            "cityname": "繁昌",
            "zipcode": "0553",
            "pinyin": "Fanchang"
        }
    ],
    "G": [
        {
            "cityname": "广州",
            "zipcode": "020",
            "pinyin": "Guangzhou"
        },
        {
            "cityname": "贵阳",
            "zipcode": "0851",
            "pinyin": "Guiyang"
        },
        {
            "cityname": "甘南",
            "zipcode": "0941",
            "pinyin": "Gannan"
        },
        {
            "cityname": "赣州",
            "zipcode": "0797",
            "pinyin": "Ganzhou"
        },
        {
            "cityname": "甘孜",
            "zipcode": "0836",
            "pinyin": "Ganzi"
        },
        {
            "cityname": "广安",
            "zipcode": "0826",
            "pinyin": "Guangan"
        },
        {
            "cityname": "广元",
            "zipcode": "0839",
            "pinyin": "Guangyuan"
        },
        {
            "cityname": "贵港",
            "zipcode": "0775",
            "pinyin": "Guigang"
        },
        {
            "cityname": "桂林",
            "zipcode": "0773",
            "pinyin": "Guilin"
        },
        {
            "cityname": "果洛",
            "zipcode": "0975",
            "pinyin": "Guoluo"
        },
        {
            "cityname": "固原",
            "zipcode": "0954",
            "pinyin": "Guyuan"
        },
        {
            "cityname": "赣县",
            "zipcode": "0797",
            "pinyin": "Ganxian"
        },
        {
            "cityname": "赣榆",
            "zipcode": "0518",
            "pinyin": "Ganyu"
        },
        {
            "cityname": "高安",
            "zipcode": "0795",
            "pinyin": "Gaoan"
        },
        {
            "cityname": "固镇",
            "zipcode": "0552",
            "pinyin": "Guzhen"
        },
        {
            "cityname": "古田",
            "zipcode": "0593",
            "pinyin": "Gutian"
        },
        {
            "cityname": "贵溪",
            "zipcode": "0701",
            "pinyin": "Guixi"
        },
        {
            "cityname": "灌云",
            "zipcode": "0518",
            "pinyin": "Guanyun"
        },
        {
            "cityname": "冠县",
            "zipcode": "0635",
            "pinyin": "Guanxian"
        },
        {
            "cityname": "灌南",
            "zipcode": "0518",
            "pinyin": "Guannan"
        },
        {
            "cityname": "光泽",
            "zipcode": "0599",
            "pinyin": "Guangze"
        },
        {
            "cityname": "广饶",
            "zipcode": "0546",
            "pinyin": "Guangrao"
        },
        {
            "cityname": "广宁",
            "zipcode": "0758",
            "pinyin": "Guangning"
        },
        {
            "cityname": "广丰",
            "zipcode": "0793",
            "pinyin": "Guangfeng"
        },
        {
            "cityname": "广德",
            "zipcode": "0563",
            "pinyin": "Guangde"
        },
        {
            "cityname": "广昌",
            "zipcode": "0794",
            "pinyin": "Guangchang"
        },
        {
            "cityname": "巩义",
            "zipcode": "0371",
            "pinyin": "Gongyi"
        },
        {
            "cityname": "高州",
            "zipcode": "0668",
            "pinyin": "Gaozhou"
        },
        {
            "cityname": "高邮",
            "zipcode": "0514",
            "pinyin": "Gaoyou"
        },
        {
            "cityname": "高邑",
            "zipcode": "0311",
            "pinyin": "Gaoyi"
        },
        {
            "cityname": "高要",
            "zipcode": "0758",
            "pinyin": "Gaoyao"
        },
        {
            "cityname": "高唐",
            "zipcode": "0635",
            "pinyin": "Gaotang"
        },
        {
            "cityname": "高青",
            "zipcode": "0533",
            "pinyin": "Gaoqing"
        },
        {
            "cityname": "高密",
            "zipcode": "0536",
            "pinyin": "Gaomi"
        },
        {
            "cityname": "高陵",
            "zipcode": "029",
            "pinyin": "Gaoling"
        },
        {
            "cityname": "皋兰",
            "zipcode": "0931",
            "pinyin": "Gaolan"
        },
        {
            "cityname": "高淳",
            "zipcode": "025",
            "pinyin": "Gaochun"
        },
        {
            "cityname": "藁城",
            "zipcode": "0311",
            "pinyin": "Gaocheng"
        }
    ],
    "H": [
        {
            "cityname": "杭州",
            "zipcode": "0571",
            "pinyin": "Hangzhou"
        },
        {
            "cityname": "哈尔滨",
            "zipcode": "0451",
            "pinyin": "Haerbin"
        },
        {
            "cityname": "邯郸",
            "zipcode": "0310",
            "pinyin": "Handan"
        },
        {
            "cityname": "海口",
            "zipcode": "0898",
            "pinyin": "Haikou"
        },
        {
            "cityname": "黑河",
            "zipcode": "0456",
            "pinyin": "Heihe"
        },
        {
            "cityname": "合肥",
            "zipcode": "0551",
            "pinyin": "Hefei"
        },
        {
            "cityname": "鹤岗",
            "zipcode": "0468",
            "pinyin": "Hegang"
        },
        {
            "cityname": "河池",
            "zipcode": "0778",
            "pinyin": "Hechi"
        },
        {
            "cityname": "鹤壁",
            "zipcode": "0392",
            "pinyin": "Hebi"
        },
        {
            "cityname": "汉中",
            "zipcode": "0916",
            "pinyin": "Hanzhong"
        },
        {
            "cityname": "哈密",
            "zipcode": "0902",
            "pinyin": "Hami"
        },
        {
            "cityname": "海西",
            "zipcode": "0977",
            "pinyin": "Haixi"
        },
        {
            "cityname": "海南",
            "zipcode": "0974",
            "pinyin": "Hainan"
        },
        {
            "cityname": "海东",
            "zipcode": "0972",
            "pinyin": "Haidong"
        },
        {
            "cityname": "海北",
            "zipcode": "0970",
            "pinyin": "Haibei"
        },
        {
            "cityname": "惠州",
            "zipcode": "0752",
            "pinyin": "Huizhou"
        },
        {
            "cityname": "呼伦贝尔",
            "zipcode": "0470",
            "pinyin": "Hulunbeier"
        },
        {
            "cityname": "葫芦岛",
            "zipcode": "0429",
            "pinyin": "Huludao"
        },
        {
            "cityname": "呼和浩特",
            "zipcode": "0471",
            "pinyin": "Huhehaote"
        },
        {
            "cityname": "黄石",
            "zipcode": "0714",
            "pinyin": "Huangshi"
        },
        {
            "cityname": "黄山",
            "zipcode": "0559",
            "pinyin": "Huangshan"
        },
        {
            "cityname": "黄南",
            "zipcode": "0973",
            "pinyin": "Huangnan"
        },
        {
            "cityname": "黄冈",
            "zipcode": "0713",
            "pinyin": "Huanggang"
        },
        {
            "cityname": "淮南",
            "zipcode": "0554",
            "pinyin": "Huainan"
        },
        {
            "cityname": "怀化",
            "zipcode": "0745",
            "pinyin": "Huaihua"
        },
        {
            "cityname": "淮北",
            "zipcode": "0561",
            "pinyin": "Huaibei"
        },
        {
            "cityname": "淮安",
            "zipcode": "0517",
            "pinyin": "Huaian"
        },
        {
            "cityname": "红河",
            "zipcode": "0873",
            "pinyin": "Honghe"
        },
        {
            "cityname": "贺州",
            "zipcode": "0774",
            "pinyin": "Hezhou"
        },
        {
            "cityname": "菏泽",
            "zipcode": "0530",
            "pinyin": "Heze"
        },
        {
            "cityname": "河源",
            "zipcode": "0762",
            "pinyin": "Heyuan"
        },
        {
            "cityname": "和田地",
            "zipcode": "0903",
            "pinyin": "Hetiandi"
        },
        {
            "cityname": "衡阳",
            "zipcode": "0734",
            "pinyin": "Hengyang"
        },
        {
            "cityname": "衡水",
            "zipcode": "0318",
            "pinyin": "Hengshui"
        },
        {
            "cityname": "怀远",
            "zipcode": "0552",
            "pinyin": "Huaiyuan"
        },
        {
            "cityname": "怀宁",
            "zipcode": "0556",
            "pinyin": "Huaining"
        },
        {
            "cityname": "怀集",
            "zipcode": "0758",
            "pinyin": "Huaiji"
        },
        {
            "cityname": "桦甸",
            "zipcode": "0423",
            "pinyin": "Huadian"
        },
        {
            "cityname": "华安",
            "zipcode": "0596",
            "pinyin": "Huaan"
        },
        {
            "cityname": "洪泽",
            "zipcode": "0517",
            "pinyin": "Hongze"
        },
        {
            "cityname": "和县",
            "zipcode": "0565",
            "pinyin": "Hexian"
        },
        {
            "cityname": "鹤山",
            "zipcode": "0750",
            "pinyin": "Heshan"
        },
        {
            "cityname": "和平",
            "zipcode": "0762",
            "pinyin": "Heping"
        },
        {
            "cityname": "横县",
            "zipcode": "0771",
            "pinyin": "Hengxian"
        },
        {
            "cityname": "横峰",
            "zipcode": "0793",
            "pinyin": "Hengfeng"
        },
        {
            "cityname": "合川",
            "zipcode": "023",
            "pinyin": "Hechuan"
        },
        {
            "cityname": "含山",
            "zipcode": "0565",
            "pinyin": "Hanshan"
        },
        {
            "cityname": "海阳",
            "zipcode": "0535",
            "pinyin": "Haiyang"
        },
        {
            "cityname": "海盐",
            "zipcode": "0573",
            "pinyin": "Haiyan"
        },
        {
            "cityname": "海宁",
            "zipcode": "0573",
            "pinyin": "Haining"
        },
        {
            "cityname": "海门",
            "zipcode": "0513",
            "pinyin": "Haimen"
        },
        {
            "cityname": "海丰",
            "zipcode": "0660",
            "pinyin": "Haifeng"
        },
        {
            "cityname": "海安",
            "zipcode": "0513",
            "pinyin": "Haian"
        },
        {
            "cityname": "湖州",
            "zipcode": "0572",
            "pinyin": "Huzhou"
        },
        {
            "cityname": "户县",
            "zipcode": "029",
            "pinyin": "Huxian"
        },
        {
            "cityname": "霍山",
            "zipcode": "0564",
            "pinyin": "Huoshan"
        },
        {
            "cityname": "霍邱",
            "zipcode": "0564",
            "pinyin": "Huoqiu"
        },
        {
            "cityname": "呼兰",
            "zipcode": "0451",
            "pinyin": "Hulan"
        },
        {
            "cityname": "湖口",
            "zipcode": "0792",
            "pinyin": "Hukou"
        },
        {
            "cityname": "惠民",
            "zipcode": "0543",
            "pinyin": "Huimin"
        },
        {
            "cityname": "惠来",
            "zipcode": "0663",
            "pinyin": "Huilai"
        },
        {
            "cityname": "惠东",
            "zipcode": "0752",
            "pinyin": "Huidong"
        },
        {
            "cityname": "会昌",
            "zipcode": "0797",
            "pinyin": "Huichang"
        },
        {
            "cityname": "惠安",
            "zipcode": "0595",
            "pinyin": "Huian"
        },
        {
            "cityname": "化州",
            "zipcode": "0668",
            "pinyin": "Huazhou"
        },
        {
            "cityname": "桓台",
            "zipcode": "0533",
            "pinyin": "Huantai"
        }
    ],
    "J": [
        {
            "cityname": "鸡西",
            "zipcode": "0467",
            "pinyin": "Jixi"
        },
        {
            "cityname": "酒泉",
            "zipcode": "0937",
            "pinyin": "Jiuquan"
        },
        {
            "cityname": "锦州",
            "zipcode": "0416",
            "pinyin": "Jinzhou"
        },
        {
            "cityname": "晋中",
            "zipcode": "0354",
            "pinyin": "Jinzhong"
        },
        {
            "cityname": "济宁",
            "zipcode": "0537",
            "pinyin": "Jining"
        },
        {
            "cityname": "金华",
            "zipcode": "0579",
            "pinyin": "Jinhua"
        },
        {
            "cityname": "荆州",
            "zipcode": "0716",
            "pinyin": "Jingzhou"
        },
        {
            "cityname": "荆门",
            "zipcode": "0724",
            "pinyin": "Jingmen"
        },
        {
            "cityname": "景德镇",
            "zipcode": "0798",
            "pinyin": "Jingdezhen"
        },
        {
            "cityname": "晋城",
            "zipcode": "0356",
            "pinyin": "Jincheng"
        },
        {
            "cityname": "金昌",
            "zipcode": "0935",
            "pinyin": "Jinchang"
        },
        {
            "cityname": "揭阳",
            "zipcode": "0663",
            "pinyin": "Jieyang"
        },
        {
            "cityname": "嘉峪关",
            "zipcode": "0937",
            "pinyin": "Jiayuguan"
        },
        {
            "cityname": "吉安",
            "zipcode": "0796",
            "pinyin": "Jian"
        },
        {
            "cityname": "江门",
            "zipcode": "0750",
            "pinyin": "Jiangmen"
        },
        {
            "cityname": "佳木斯",
            "zipcode": "0454",
            "pinyin": "Jiamusi"
        },
        {
            "cityname": "济南",
            "zipcode": "0531",
            "pinyin": "Jinan"
        },
        {
            "cityname": "吉林",
            "zipcode": "0423",
            "pinyin": "Jilin"
        },
        {
            "cityname": "嘉兴",
            "zipcode": "0573",
            "pinyin": "Jiaxing"
        },
        {
            "cityname": "焦作",
            "zipcode": "0391",
            "pinyin": "Jiaozuo"
        },
        {
            "cityname": "井冈山",
            "zipcode": "0796",
            "pinyin": "Jinggangshan"
        },
        {
            "cityname": "旌德",
            "zipcode": "0563",
            "pinyin": "Jingde"
        },
        {
            "cityname": "靖安",
            "zipcode": "0795",
            "pinyin": "Jingan"
        },
        {
            "cityname": "即墨",
            "zipcode": "0532",
            "pinyin": "Jimo"
        },
        {
            "cityname": "揭西",
            "zipcode": "0663",
            "pinyin": "Jiexi"
        },
        {
            "cityname": "界首",
            "zipcode": "0558",
            "pinyin": "Jieshou"
        },
        {
            "cityname": "揭东",
            "zipcode": "0663",
            "pinyin": "Jiedong"
        },
        {
            "cityname": "嘉祥",
            "zipcode": "0537",
            "pinyin": "Jiaxiang"
        },
        {
            "cityname": "嘉善",
            "zipcode": "0573",
            "pinyin": "Jiashan"
        },
        {
            "cityname": "胶州",
            "zipcode": "0532",
            "pinyin": "Jiaozhou"
        },
        {
            "cityname": "胶南",
            "zipcode": "0532",
            "pinyin": "Jiaonan"
        },
        {
            "cityname": "蕉岭",
            "zipcode": "0753",
            "pinyin": "Jiaoling"
        },
        {
            "cityname": "蛟河",
            "zipcode": "0423",
            "pinyin": "Jiaohe"
        },
        {
            "cityname": "建阳",
            "zipcode": "0599",
            "pinyin": "Jianyang"
        },
        {
            "cityname": "建瓯",
            "zipcode": "0599",
            "pinyin": "Jianou"
        },
        {
            "cityname": "建宁",
            "zipcode": "0598",
            "pinyin": "Jianning"
        },
        {
            "cityname": "建湖",
            "zipcode": "0515",
            "pinyin": "Jianhu"
        },
        {
            "cityname": "江阴",
            "zipcode": "0510",
            "pinyin": "Jiangyin"
        },
        {
            "cityname": "姜堰",
            "zipcode": "0523",
            "pinyin": "Jiangyan"
        },
        {
            "cityname": "江山",
            "zipcode": "0570",
            "pinyin": "Jiangshan"
        },
        {
            "cityname": "将乐",
            "zipcode": "0598",
            "pinyin": "Jiangle"
        },
        {
            "cityname": "江津",
            "zipcode": "023",
            "pinyin": "Jiangjin"
        },
        {
            "cityname": "江都",
            "zipcode": "0514",
            "pinyin": "Jiangdu"
        },
        {
            "cityname": "建德",
            "zipcode": "0571",
            "pinyin": "Jiande"
        },
        {
            "cityname": "九台",
            "zipcode": "0431",
            "pinyin": "Jiutai"
        },
        {
            "cityname": "九江",
            "zipcode": "0792",
            "pinyin": "Jiujiang"
        },
        {
            "cityname": "吉水",
            "zipcode": "0796",
            "pinyin": "Jishui"
        },
        {
            "cityname": "晋州",
            "zipcode": "0311",
            "pinyin": "Jinzhou"
        },
        {
            "cityname": "金寨",
            "zipcode": "0564",
            "pinyin": "Jinzhai"
        },
        {
            "cityname": "缙云",
            "zipcode": "0578",
            "pinyin": "Jinyun"
        },
        {
            "cityname": "金乡",
            "zipcode": "0537",
            "pinyin": "Jinxiang"
        },
        {
            "cityname": "金溪",
            "zipcode": "0794",
            "pinyin": "Jinxi"
        },
        {
            "cityname": "进贤",
            "zipcode": "0791",
            "pinyin": "Jinxian"
        },
        {
            "cityname": "金堂",
            "zipcode": "028",
            "pinyin": "Jintang"
        },
        {
            "cityname": "金坛",
            "zipcode": "0519",
            "pinyin": "Jintan"
        },
        {
            "cityname": "晋宁",
            "zipcode": "0871",
            "pinyin": "Jinning"
        },
        {
            "cityname": "金门",
            "zipcode": "0595",
            "pinyin": "Jinmen"
        },
        {
            "cityname": "晋江",
            "zipcode": "0595",
            "pinyin": "Jinjiang"
        },
        {
            "cityname": "金湖",
            "zipcode": "0517",
            "pinyin": "Jinhu"
        },
        {
            "cityname": "井陉",
            "zipcode": "0311",
            "pinyin": "Jingxing"
        },
        {
            "cityname": "泾县",
            "zipcode": "0563",
            "pinyin": "Jingxian"
        },
        {
            "cityname": "景宁",
            "zipcode": "0578",
            "pinyin": "Jingning"
        },
        {
            "cityname": "靖江",
            "zipcode": "0523",
            "pinyin": "Jingjiang"
        },
        {
            "cityname": "巨野",
            "zipcode": "0530",
            "pinyin": "Juye"
        },
        {
            "cityname": "莒县",
            "zipcode": "0633",
            "pinyin": "Juxian"
        },
        {
            "cityname": "句容",
            "zipcode": "0511",
            "pinyin": "Jurong"
        },
        {
            "cityname": "莒南",
            "zipcode": "0539",
            "pinyin": "Junan"
        },
        {
            "cityname": "鄄城",
            "zipcode": "0530",
            "pinyin": "Juancheng"
        },
        {
            "cityname": "济源",
            "zipcode": "0391",
            "pinyin": "Jiyuan"
        },
        {
            "cityname": "济阳",
            "zipcode": "0531",
            "pinyin": "Jiyang"
        },
        {
            "cityname": "绩溪",
            "zipcode": "0563",
            "pinyin": "Jixi"
        }
    ],
    "K": [
        {
            "cityname": "昆明",
            "zipcode": "0871",
            "pinyin": "Kunming"
        },
        {
            "cityname": "开封",
            "zipcode": "0378",
            "pinyin": "Kaifeng"
        },
        {
            "cityname": "喀什地",
            "zipcode": "0998",
            "pinyin": "Kashidi"
        },
        {
            "cityname": "克拉玛依",
            "zipcode": "0990",
            "pinyin": "Kelamayi"
        },
        {
            "cityname": "克孜勒",
            "zipcode": "0908",
            "pinyin": "Kezile"
        },
        {
            "cityname": "开化",
            "zipcode": "0570",
            "pinyin": "Kaihua"
        },
        {
            "cityname": "开平",
            "zipcode": "0750",
            "pinyin": "Kaiping"
        },
        {
            "cityname": "开县",
            "zipcode": "023",
            "pinyin": "Kaixian"
        },
        {
            "cityname": "开阳",
            "zipcode": "0851",
            "pinyin": "Kaiyang"
        },
        {
            "cityname": "康平",
            "zipcode": "024",
            "pinyin": "Kangping"
        },
        {
            "cityname": "垦利",
            "zipcode": "0546",
            "pinyin": "Kenli"
        },
        {
            "cityname": "昆山",
            "zipcode": "0512",
            "pinyin": "Kunshan"
        }
    ],
    "L": [
        {
            "cityname": "连云港",
            "zipcode": "0518",
            "pinyin": "Lianyungang"
        },
        {
            "cityname": "凉山",
            "zipcode": "0834",
            "pinyin": "Liangshan"
        },
        {
            "cityname": "乐山",
            "zipcode": "0833",
            "pinyin": "Leshan"
        },
        {
            "cityname": "拉萨",
            "zipcode": "0891",
            "pinyin": "Lasa"
        },
        {
            "cityname": "廊坊",
            "zipcode": "0316",
            "pinyin": "Langfang"
        },
        {
            "cityname": "莱芜",
            "zipcode": "0634",
            "pinyin": "Laiwu"
        },
        {
            "cityname": "来宾",
            "zipcode": "0772",
            "pinyin": "Laibin"
        },
        {
            "cityname": "洛阳",
            "zipcode": "0379",
            "pinyin": "Luoyang"
        },
        {
            "cityname": "柳州",
            "zipcode": "0772",
            "pinyin": "Liuzhou"
        },
        {
            "cityname": "兰州",
            "zipcode": "0931",
            "pinyin": "Lanzhou"
        },
        {
            "cityname": "六盘水",
            "zipcode": "0858",
            "pinyin": "Liupanshui"
        },
        {
            "cityname": "六安",
            "zipcode": "0564",
            "pinyin": "Liuan"
        },
        {
            "cityname": "丽水",
            "zipcode": "0578",
            "pinyin": "Lishui"
        },
        {
            "cityname": "林芝",
            "zipcode": "0894",
            "pinyin": "Linzhi"
        },
        {
            "cityname": "临沂",
            "zipcode": "0539",
            "pinyin": "Linyi"
        },
        {
            "cityname": "临夏",
            "zipcode": "0930",
            "pinyin": "Linxia"
        },
        {
            "cityname": "临汾",
            "zipcode": "0357",
            "pinyin": "Linfen"
        },
        {
            "cityname": "临沧",
            "zipcode": "0883",
            "pinyin": "Lincang"
        },
        {
            "cityname": "丽江",
            "zipcode": "0888",
            "pinyin": "Lijiang"
        },
        {
            "cityname": "辽源",
            "zipcode": "0437",
            "pinyin": "Liaoyuan"
        },
        {
            "cityname": "辽阳",
            "zipcode": "0419",
            "pinyin": "Liaoyang"
        },
        {
            "cityname": "聊城",
            "zipcode": "0635",
            "pinyin": "Liaocheng"
        },
        {
            "cityname": "乐亭",
            "zipcode": "0315",
            "pinyin": "Leting"
        },
        {
            "cityname": "乐清",
            "zipcode": "0577",
            "pinyin": "Leqing"
        },
        {
            "cityname": "乐平",
            "zipcode": "0798",
            "pinyin": "Leping"
        },
        {
            "cityname": "乐陵",
            "zipcode": "0534",
            "pinyin": "Leling"
        },
        {
            "cityname": "雷州",
            "zipcode": "0759",
            "pinyin": "Leizhou"
        },
        {
            "cityname": "乐昌",
            "zipcode": "0751",
            "pinyin": "Lechang"
        },
        {
            "cityname": "乐安",
            "zipcode": "0794",
            "pinyin": "Lean"
        },
        {
            "cityname": "兰溪",
            "zipcode": "0579",
            "pinyin": "Lanxi"
        },
        {
            "cityname": "蓝田",
            "zipcode": "029",
            "pinyin": "Lantian"
        },
        {
            "cityname": "郎溪",
            "zipcode": "0563",
            "pinyin": "Langxi"
        },
        {
            "cityname": "莱州",
            "zipcode": "0535",
            "pinyin": "Laizhou"
        },
        {
            "cityname": "莱阳",
            "zipcode": "0535",
            "pinyin": "Laiyang"
        },
        {
            "cityname": "莱西",
            "zipcode": "0532",
            "pinyin": "Laixi"
        },
        {
            "cityname": "来安",
            "zipcode": "0550",
            "pinyin": "Laian"
        },
        {
            "cityname": "吕梁",
            "zipcode": "0358",
            "pinyin": "Lvliang"
        },
        {
            "cityname": "泸州",
            "zipcode": "0830",
            "pinyin": "Luzhou"
        },
        {
            "cityname": "漯河",
            "zipcode": "0395",
            "pinyin": "Luohe"
        },
        {
            "cityname": "娄底",
            "zipcode": "0738",
            "pinyin": "Loudi"
        },
        {
            "cityname": "龙岩",
            "zipcode": "0597",
            "pinyin": "Longyan"
        },
        {
            "cityname": "陇南",
            "zipcode": "0939",
            "pinyin": "Longnan"
        },
        {
            "cityname": "临邑",
            "zipcode": "0534",
            "pinyin": "Linyi"
        },
        {
            "cityname": "临沭",
            "zipcode": "0539",
            "pinyin": "Linshu"
        },
        {
            "cityname": "临朐",
            "zipcode": "0536",
            "pinyin": "Linqu"
        },
        {
            "cityname": "临泉",
            "zipcode": "0558",
            "pinyin": "Linquan"
        },
        {
            "cityname": "临清",
            "zipcode": "0635",
            "pinyin": "Linqing"
        },
        {
            "cityname": "临海",
            "zipcode": "0576",
            "pinyin": "Linhai"
        },
        {
            "cityname": "陵县",
            "zipcode": "0534",
            "pinyin": "Lingxian"
        },
        {
            "cityname": "灵寿",
            "zipcode": "0311",
            "pinyin": "Lingshou"
        },
        {
            "cityname": "灵璧",
            "zipcode": "0557",
            "pinyin": "Lingbi"
        },
        {
            "cityname": "临安",
            "zipcode": "0571",
            "pinyin": "Linan"
        },
        {
            "cityname": "利津",
            "zipcode": "0546",
            "pinyin": "Lijin"
        },
        {
            "cityname": "黎川",
            "zipcode": "0794",
            "pinyin": "Lichuan"
        },
        {
            "cityname": "辽中",
            "zipcode": "024",
            "pinyin": "Liaozhong"
        },
        {
            "cityname": "连州",
            "zipcode": "0763",
            "pinyin": "Lianzhou"
        },
        {
            "cityname": "涟水",
            "zipcode": "0517",
            "pinyin": "Lianshui"
        },
        {
            "cityname": "连山",
            "zipcode": "0763",
            "pinyin": "Lianshan"
        },
        {
            "cityname": "连平",
            "zipcode": "0762",
            "pinyin": "Lianping"
        },
        {
            "cityname": "连南",
            "zipcode": "0763",
            "pinyin": "Liannan"
        },
        {
            "cityname": "廉江",
            "zipcode": "0759",
            "pinyin": "Lianjiang"
        },
        {
            "cityname": "连江",
            "zipcode": "0591",
            "pinyin": "Lianjiang"
        },
        {
            "cityname": "莲花",
            "zipcode": "0799",
            "pinyin": "Lianhua"
        },
        {
            "cityname": "梁山",
            "zipcode": "0537",
            "pinyin": "Liangshan"
        },
        {
            "cityname": "梁平",
            "zipcode": "023",
            "pinyin": "Liangping"
        },
        {
            "cityname": "连城",
            "zipcode": "0597",
            "pinyin": "Liancheng"
        },
        {
            "cityname": "鹿寨",
            "zipcode": "0772",
            "pinyin": "Luzhai"
        },
        {
            "cityname": "芦溪",
            "zipcode": "0799",
            "pinyin": "Luxi"
        },
        {
            "cityname": "禄劝",
            "zipcode": "0871",
            "pinyin": "Luquan"
        },
        {
            "cityname": "鹿泉",
            "zipcode": "0311",
            "pinyin": "Luquan"
        },
        {
            "cityname": "罗源",
            "zipcode": "0591",
            "pinyin": "Luoyuan"
        },
        {
            "cityname": "洛宁",
            "zipcode": "0379",
            "pinyin": "Luoning"
        },
        {
            "cityname": "罗定",
            "zipcode": "0766",
            "pinyin": "Luoding"
        },
        {
            "cityname": "庐江",
            "zipcode": "0565",
            "pinyin": "Lujiang"
        },
        {
            "cityname": "陆河",
            "zipcode": "0660",
            "pinyin": "Luhe"
        },
        {
            "cityname": "陆丰",
            "zipcode": "0660",
            "pinyin": "Lufeng"
        },
        {
            "cityname": "滦县",
            "zipcode": "0315",
            "pinyin": "Luanxian"
        },
        {
            "cityname": "滦南",
            "zipcode": "0315",
            "pinyin": "Luannan"
        },
        {
            "cityname": "栾川",
            "zipcode": "0379",
            "pinyin": "Luanchuan"
        },
        {
            "cityname": "栾城",
            "zipcode": "0311",
            "pinyin": "Luancheng"
        },
        {
            "cityname": "龙游",
            "zipcode": "0570",
            "pinyin": "Longyou"
        },
        {
            "cityname": "龙泉",
            "zipcode": "0578",
            "pinyin": "Longquan"
        },
        {
            "cityname": "龙南",
            "zipcode": "0797",
            "pinyin": "Longnan"
        },
        {
            "cityname": "龙门",
            "zipcode": "0752",
            "pinyin": "Longmen"
        },
        {
            "cityname": "龙口",
            "zipcode": "0535",
            "pinyin": "Longkou"
        },
        {
            "cityname": "龙海",
            "zipcode": "0596",
            "pinyin": "Longhai"
        },
        {
            "cityname": "龙川",
            "zipcode": "0762",
            "pinyin": "Longchuan"
        },
        {
            "cityname": "隆安",
            "zipcode": "0771",
            "pinyin": "Longan"
        },
        {
            "cityname": "溧阳",
            "zipcode": "0519",
            "pinyin": "Liyang"
        },
        {
            "cityname": "利辛",
            "zipcode": "0558",
            "pinyin": "Lixin"
        },
        {
            "cityname": "浏阳",
            "zipcode": "0731",
            "pinyin": "Liuyang"
        },
        {
            "cityname": "柳江",
            "zipcode": "0772",
            "pinyin": "Liujiang"
        },
        {
            "cityname": "柳城",
            "zipcode": "0772",
            "pinyin": "Liucheng"
        },
        {
            "cityname": "溧水",
            "zipcode": "025",
            "pinyin": "Lishui"
        }
    ],
    "M": [
        {
            "cityname": "马鞍山",
            "zipcode": "0555",
            "pinyin": "Maanshan"
        },
        {
            "cityname": "茂名",
            "zipcode": "0668",
            "pinyin": "Maoming"
        },
        {
            "cityname": "眉山",
            "zipcode": "028",
            "pinyin": "Meishan"
        },
        {
            "cityname": "梅州",
            "zipcode": "0753",
            "pinyin": "Meizhou"
        },
        {
            "cityname": "绵阳",
            "zipcode": "0816",
            "pinyin": "Mianyang"
        },
        {
            "cityname": "牡丹江",
            "zipcode": "0453",
            "pinyin": "Mudanjiang"
        },
        {
            "cityname": "马山",
            "zipcode": "0771",
            "pinyin": "Mashan"
        },
        {
            "cityname": "梅县",
            "zipcode": "0753",
            "pinyin": "Meixian"
        },
        {
            "cityname": "蒙城",
            "zipcode": "0558",
            "pinyin": "Mengcheng"
        },
        {
            "cityname": "孟津",
            "zipcode": "0379",
            "pinyin": "Mengjin"
        },
        {
            "cityname": "蒙阴",
            "zipcode": "0539",
            "pinyin": "Mengyin"
        },
        {
            "cityname": "孟州",
            "zipcode": "0391",
            "pinyin": "Mengzhou"
        },
        {
            "cityname": "明光",
            "zipcode": "0550",
            "pinyin": "Mingguang"
        },
        {
            "cityname": "明溪",
            "zipcode": "0598",
            "pinyin": "Mingxi"
        },
        {
            "cityname": "闽侯",
            "zipcode": "0591",
            "pinyin": "Minhou"
        },
        {
            "cityname": "闽清",
            "zipcode": "0591",
            "pinyin": "Minqing"
        },
        {
            "cityname": "木兰",
            "zipcode": "0451",
            "pinyin": "Mulan"
        }
    ],
    "N": [
        {
            "cityname": "南昌",
            "zipcode": "0791",
            "pinyin": "Nanchang"
        },
        {
            "cityname": "南京",
            "zipcode": "025",
            "pinyin": "Nanjing"
        },
        {
            "cityname": "南宁",
            "zipcode": "0771",
            "pinyin": "Nanning"
        },
        {
            "cityname": "南通",
            "zipcode": "0513",
            "pinyin": "Nantong"
        },
        {
            "cityname": "宁波",
            "zipcode": "0574",
            "pinyin": "Ningbo"
        },
        {
            "cityname": "南充",
            "zipcode": "0817",
            "pinyin": "Nanchong"
        },
        {
            "cityname": "南平",
            "zipcode": "0599",
            "pinyin": "Nanping"
        },
        {
            "cityname": "南阳",
            "zipcode": "0377",
            "pinyin": "Nanyang"
        },
        {
            "cityname": "那曲",
            "zipcode": "0896",
            "pinyin": "Naqu"
        },
        {
            "cityname": "内江",
            "zipcode": "0832",
            "pinyin": "Neijiang"
        },
        {
            "cityname": "宁德",
            "zipcode": "0593",
            "pinyin": "Ningde"
        },
        {
            "cityname": "怒江",
            "zipcode": "0886",
            "pinyin": "Nujiang"
        },
        {
            "cityname": "南安",
            "zipcode": "0595",
            "pinyin": "Nanan"
        },
        {
            "cityname": "南澳",
            "zipcode": "0754",
            "pinyin": "Nanao"
        },
        {
            "cityname": "南城",
            "zipcode": "0794",
            "pinyin": "Nancheng"
        },
        {
            "cityname": "南川",
            "zipcode": "023",
            "pinyin": "Nanchuan"
        },
        {
            "cityname": "南丰",
            "zipcode": "0794",
            "pinyin": "Nanfeng"
        },
        {
            "cityname": "南靖",
            "zipcode": "0596",
            "pinyin": "Nanjing"
        },
        {
            "cityname": "南康",
            "zipcode": "0797",
            "pinyin": "Nankang"
        },
        {
            "cityname": "南陵",
            "zipcode": "0553",
            "pinyin": "Nanling"
        },
        {
            "cityname": "南雄",
            "zipcode": "0751",
            "pinyin": "Nanxiong"
        },
        {
            "cityname": "宁都",
            "zipcode": "0797",
            "pinyin": "Ningdu"
        },
        {
            "cityname": "宁国",
            "zipcode": "0563",
            "pinyin": "Ningguo"
        },
        {
            "cityname": "宁海",
            "zipcode": "0574",
            "pinyin": "Ninghai"
        },
        {
            "cityname": "宁化",
            "zipcode": "0598",
            "pinyin": "Ninghua"
        },
        {
            "cityname": "宁津",
            "zipcode": "0534",
            "pinyin": "Ningjin"
        },
        {
            "cityname": "宁乡",
            "zipcode": "0731",
            "pinyin": "Ningxiang"
        },
        {
            "cityname": "宁阳",
            "zipcode": "0538",
            "pinyin": "Ningyang"
        },
        {
            "cityname": "农安",
            "zipcode": "0431",
            "pinyin": "Nongan"
        }
    ],
    "P": [
        {
            "cityname": "盘锦",
            "zipcode": "0427",
            "pinyin": "Panjin"
        },
        {
            "cityname": "攀枝花",
            "zipcode": "0812",
            "pinyin": "Panzhihua"
        },
        {
            "cityname": "平顶山",
            "zipcode": "0375",
            "pinyin": "Pingdingshan"
        },
        {
            "cityname": "平凉",
            "zipcode": "0933",
            "pinyin": "Pingliang"
        },
        {
            "cityname": "萍乡",
            "zipcode": "0799",
            "pinyin": "Pingxiang"
        },
        {
            "cityname": "普洱",
            "zipcode": "0879",
            "pinyin": "Puer"
        },
        {
            "cityname": "莆田",
            "zipcode": "0594",
            "pinyin": "Putian"
        },
        {
            "cityname": "濮阳",
            "zipcode": "0393",
            "pinyin": "Puyang"
        },
        {
            "cityname": "磐安",
            "zipcode": "0579",
            "pinyin": "Panan"
        },
        {
            "cityname": "磐石",
            "zipcode": "0423",
            "pinyin": "Panshi"
        },
        {
            "cityname": "沛县",
            "zipcode": "0516",
            "pinyin": "Peixian"
        },
        {
            "cityname": "蓬莱",
            "zipcode": "0535",
            "pinyin": "Penglai"
        },
        {
            "cityname": "彭水",
            "zipcode": "023",
            "pinyin": "Pengshui"
        },
        {
            "cityname": "彭泽",
            "zipcode": "0792",
            "pinyin": "Pengze"
        },
        {
            "cityname": "彭州",
            "zipcode": "028",
            "pinyin": "Pengzhou"
        },
        {
            "cityname": "平度",
            "zipcode": "0532",
            "pinyin": "Pingdu"
        },
        {
            "cityname": "平和",
            "zipcode": "0596",
            "pinyin": "Pinghe"
        },
        {
            "cityname": "平湖",
            "zipcode": "0573",
            "pinyin": "Pinghu"
        },
        {
            "cityname": "屏南",
            "zipcode": "0593",
            "pinyin": "Pingnan"
        },
        {
            "cityname": "平山",
            "zipcode": "0311",
            "pinyin": "Pingshan"
        },
        {
            "cityname": "平潭",
            "zipcode": "0591",
            "pinyin": "Pingtan"
        },
        {
            "cityname": "平阳",
            "zipcode": "0577",
            "pinyin": "Pingyang"
        },
        {
            "cityname": "平阴",
            "zipcode": "0531",
            "pinyin": "Pingyin"
        },
        {
            "cityname": "平邑",
            "zipcode": "0539",
            "pinyin": "Pingyi"
        },
        {
            "cityname": "平原",
            "zipcode": "0534",
            "pinyin": "Pingyuan"
        },
        {
            "cityname": "平远",
            "zipcode": "0753",
            "pinyin": "Pingyuan"
        },
        {
            "cityname": "郫县",
            "zipcode": "028",
            "pinyin": "Pixian"
        },
        {
            "cityname": "邳州",
            "zipcode": "0516",
            "pinyin": "Pizhou"
        },
        {
            "cityname": "鄱阳",
            "zipcode": "0793",
            "pinyin": "Poyang"
        },
        {
            "cityname": "浦城",
            "zipcode": "0599",
            "pinyin": "Pucheng"
        },
        {
            "cityname": "浦江",
            "zipcode": "0579",
            "pinyin": "Pujiang"
        },
        {
            "cityname": "蒲江",
            "zipcode": "028",
            "pinyin": "Pujiang"
        },
        {
            "cityname": "普兰店",
            "zipcode": "0411",
            "pinyin": "Pulandian"
        },
        {
            "cityname": "普宁",
            "zipcode": "0663",
            "pinyin": "Puning"
        }
    ],
    "Q": [
        {
            "cityname": "青岛",
            "zipcode": "0532",
            "pinyin": "Qingdao"
        },
        {
            "cityname": "泉州",
            "zipcode": "0595",
            "pinyin": "Quanzhou"
        },
        {
            "cityname": "黔东",
            "zipcode": "0855",
            "pinyin": "Qiandong"
        },
        {
            "cityname": "黔南",
            "zipcode": "0854",
            "pinyin": "Qiannan"
        },
        {
            "cityname": "黔西南",
            "zipcode": "0859",
            "pinyin": "Qianxinan"
        },
        {
            "cityname": "庆阳",
            "zipcode": "0934",
            "pinyin": "Qingyang"
        },
        {
            "cityname": "清远",
            "zipcode": "0763",
            "pinyin": "Qingyuan"
        },
        {
            "cityname": "秦皇岛",
            "zipcode": "0335",
            "pinyin": "Qinhuangdao"
        },
        {
            "cityname": "钦州",
            "zipcode": "0777",
            "pinyin": "Qinzhou"
        },
        {
            "cityname": "齐齐哈尔",
            "zipcode": "0452",
            "pinyin": "Qiqihaer"
        },
        {
            "cityname": "七台河",
            "zipcode": "0464",
            "pinyin": "Qitaihe"
        },
        {
            "cityname": "曲靖",
            "zipcode": "0874",
            "pinyin": "Qujing"
        },
        {
            "cityname": "衢州",
            "zipcode": "0570",
            "pinyin": "Quzhou"
        },
        {
            "cityname": "迁安",
            "zipcode": "0315",
            "pinyin": "Qianan"
        },
        {
            "cityname": "潜山",
            "zipcode": "0556",
            "pinyin": "Qianshan"
        },
        {
            "cityname": "铅山",
            "zipcode": "0793",
            "pinyin": "Qianshan"
        },
        {
            "cityname": "迁西",
            "zipcode": "0315",
            "pinyin": "Qianxi"
        },
        {
            "cityname": "启东",
            "zipcode": "0513",
            "pinyin": "Qidong"
        },
        {
            "cityname": "齐河",
            "zipcode": "0534",
            "pinyin": "Qihe"
        },
        {
            "cityname": "綦江",
            "zipcode": "023",
            "pinyin": "Qijiang"
        },
        {
            "cityname": "祁门",
            "zipcode": "0559",
            "pinyin": "Qimen"
        },
        {
            "cityname": "清流",
            "zipcode": "0598",
            "pinyin": "Qingliu"
        },
        {
            "cityname": "青田",
            "zipcode": "0578",
            "pinyin": "Qingtian"
        },
        {
            "cityname": "清新",
            "zipcode": "0763",
            "pinyin": "Qingxin"
        },
        {
            "cityname": "青阳",
            "zipcode": "0566",
            "pinyin": "Qingyang"
        },
        {
            "cityname": "庆元",
            "zipcode": "0578",
            "pinyin": "Qingyuan"
        },
        {
            "cityname": "庆云",
            "zipcode": "0534",
            "pinyin": "Qingyun"
        },
        {
            "cityname": "清镇",
            "zipcode": "0851",
            "pinyin": "Qingzhen"
        },
        {
            "cityname": "青州",
            "zipcode": "0536",
            "pinyin": "Qingzhou"
        },
        {
            "cityname": "沁阳",
            "zipcode": "0391",
            "pinyin": "Qinyang"
        },
        {
            "cityname": "邛崃",
            "zipcode": "028",
            "pinyin": "Qionglai"
        },
        {
            "cityname": "栖霞",
            "zipcode": "0535",
            "pinyin": "Qixia"
        },
        {
            "cityname": "全椒",
            "zipcode": "0550",
            "pinyin": "Quanjiao"
        },
        {
            "cityname": "曲江",
            "zipcode": "0751",
            "pinyin": "Qujiang"
        },
        {
            "cityname": "曲阜",
            "zipcode": "0537",
            "pinyin": "Qufu"
        },
        {
            "cityname": "全南",
            "zipcode": "0797",
            "pinyin": "Quannan"
        }
    ],
    "R": [
        {
            "cityname": "日喀则",
            "zipcode": "0892",
            "pinyin": "Rikaze"
        },
        {
            "cityname": "日照",
            "zipcode": "0633",
            "pinyin": "Rizhao"
        },
        {
            "cityname": "饶平",
            "zipcode": "0768",
            "pinyin": "Raoping"
        },
        {
            "cityname": "仁化",
            "zipcode": "0751",
            "pinyin": "Renhua"
        },
        {
            "cityname": "融安",
            "zipcode": "0772",
            "pinyin": "Rongan"
        },
        {
            "cityname": "荣昌",
            "zipcode": "023",
            "pinyin": "Rongchang"
        },
        {
            "cityname": "荣成",
            "zipcode": "0631",
            "pinyin": "Rongcheng"
        },
        {
            "cityname": "融水",
            "zipcode": "0772",
            "pinyin": "Rongshui"
        },
        {
            "cityname": "如东",
            "zipcode": "0513",
            "pinyin": "Rudong"
        },
        {
            "cityname": "如皋",
            "zipcode": "0513",
            "pinyin": "Rugao"
        },
        {
            "cityname": "瑞安",
            "zipcode": "0577",
            "pinyin": "Ruian"
        },
        {
            "cityname": "瑞昌",
            "zipcode": "0792",
            "pinyin": "Ruichang"
        },
        {
            "cityname": "瑞金",
            "zipcode": "0797",
            "pinyin": "Ruijin"
        },
        {
            "cityname": "乳山",
            "zipcode": "0631",
            "pinyin": "Rushan"
        },
        {
            "cityname": "汝阳",
            "zipcode": "0379",
            "pinyin": "Ruyang"
        },
        {
            "cityname": "乳源",
            "zipcode": "0751",
            "pinyin": "Ruyuan"
        }
    ],
    "S": [
        {
            "cityname": "上海",
            "zipcode": "021",
            "pinyin": "Shanghai"
        },
        {
            "cityname": "沈阳",
            "zipcode": "024",
            "pinyin": "Shenyang"
        },
        {
            "cityname": "深圳",
            "zipcode": "0755",
            "pinyin": "Shenzhen"
        },
        {
            "cityname": "石家庄",
            "zipcode": "0311",
            "pinyin": "Shijiazhuang"
        },
        {
            "cityname": "苏州",
            "zipcode": "0512",
            "pinyin": "Suzhou"
        },
        {
            "cityname": "三门峡",
            "zipcode": "0398",
            "pinyin": "Sanmenxia"
        },
        {
            "cityname": "三明",
            "zipcode": "0598",
            "pinyin": "Sanming"
        },
        {
            "cityname": "三亚",
            "zipcode": "0899",
            "pinyin": "Sanya"
        },
        {
            "cityname": "商丘",
            "zipcode": "0370",
            "pinyin": "Shangqiu"
        },
        {
            "cityname": "商洛",
            "zipcode": "0914",
            "pinyin": "Shangluo"
        },
        {
            "cityname": "汕尾",
            "zipcode": "0660",
            "pinyin": "Shanwei"
        },
        {
            "cityname": "汕头",
            "zipcode": "0754",
            "pinyin": "Shantou"
        },
        {
            "cityname": "绍兴",
            "zipcode": "0575",
            "pinyin": "Shaoxing"
        },
        {
            "cityname": "韶关",
            "zipcode": "0751",
            "pinyin": "Shaoguan"
        },
        {
            "cityname": "山南",
            "zipcode": "0893",
            "pinyin": "Shannan"
        },
        {
            "cityname": "邵阳",
            "zipcode": "0739",
            "pinyin": "Shaoyang"
        },
        {
            "cityname": "十堰",
            "zipcode": "0719",
            "pinyin": "Shiyan"
        },
        {
            "cityname": "双鸭山",
            "zipcode": "0469",
            "pinyin": "Shuangyashan"
        },
        {
            "cityname": "石嘴山",
            "zipcode": "0952",
            "pinyin": "Shizuishan"
        },
        {
            "cityname": "绥化",
            "zipcode": "0455",
            "pinyin": "Suihua"
        },
        {
            "cityname": "松原",
            "zipcode": "0438",
            "pinyin": "Songyuan"
        },
        {
            "cityname": "四平",
            "zipcode": "0434",
            "pinyin": "Siping"
        },
        {
            "cityname": "朔州",
            "zipcode": "0349",
            "pinyin": "Shuozhou"
        },
        {
            "cityname": "泗阳",
            "zipcode": "0527",
            "pinyin": "Siyang"
        },
        {
            "cityname": "泗县",
            "zipcode": "0557",
            "pinyin": "Sixian"
        },
        {
            "cityname": "泗水",
            "zipcode": "0537",
            "pinyin": "Sishui"
        },
        {
            "cityname": "四会",
            "zipcode": "0758",
            "pinyin": "Sihui"
        },
        {
            "cityname": "泗洪",
            "zipcode": "0527",
            "pinyin": "Sihong"
        },
        {
            "cityname": "沭阳",
            "zipcode": "0527",
            "pinyin": "Shuyang"
        },
        {
            "cityname": "顺昌",
            "zipcode": "0599",
            "pinyin": "Shunchang"
        },
        {
            "cityname": "舒兰",
            "zipcode": "0423",
            "pinyin": "Shulan"
        },
        {
            "cityname": "舒城",
            "zipcode": "0564",
            "pinyin": "Shucheng"
        },
        {
            "cityname": "双流",
            "zipcode": "028",
            "pinyin": "Shuangliu"
        },
        {
            "cityname": "双城",
            "zipcode": "0451",
            "pinyin": "Shuangcheng"
        },
        {
            "cityname": "寿县",
            "zipcode": "0564",
            "pinyin": "Shouxian"
        },
        {
            "cityname": "寿宁",
            "zipcode": "0593",
            "pinyin": "Shouning"
        },
        {
            "cityname": "寿光",
            "zipcode": "0536",
            "pinyin": "Shouguang"
        },
        {
            "cityname": "石柱",
            "zipcode": "023",
            "pinyin": "Shizhu"
        },
        {
            "cityname": "始兴",
            "zipcode": "0751",
            "pinyin": "Shixing"
        },
        {
            "cityname": "石台",
            "zipcode": "0566",
            "pinyin": "Shitai"
        },
        {
            "cityname": "石狮",
            "zipcode": "0595",
            "pinyin": "Shishi"
        },
        {
            "cityname": "石林",
            "zipcode": "0871",
            "pinyin": "Shilin"
        },
        {
            "cityname": "石城",
            "zipcode": "0797",
            "pinyin": "Shicheng"
        },
        {
            "cityname": "射阳",
            "zipcode": "0515",
            "pinyin": "Sheyang"
        },
        {
            "cityname": "歙县",
            "zipcode": "0559",
            "pinyin": "Shexian"
        },
        {
            "cityname": "深泽",
            "zipcode": "0311",
            "pinyin": "Shenze"
        },
        {
            "cityname": "莘县",
            "zipcode": "0635",
            "pinyin": "Shenxian"
        },
        {
            "cityname": "嵊州",
            "zipcode": "0575",
            "pinyin": "Shengzhou"
        },
        {
            "cityname": "嵊泗",
            "zipcode": "0580",
            "pinyin": "Shengsi"
        },
        {
            "cityname": "沙县",
            "zipcode": "0598",
            "pinyin": "Shaxian"
        },
        {
            "cityname": "邵武",
            "zipcode": "0599",
            "pinyin": "Shaowu"
        },
        {
            "cityname": "尚志",
            "zipcode": "0451",
            "pinyin": "Shangzhi"
        },
        {
            "cityname": "上虞",
            "zipcode": "0575",
            "pinyin": "Shangyu"
        },
        {
            "cityname": "上犹",
            "zipcode": "0797",
            "pinyin": "Shangyou"
        },
        {
            "cityname": "上饶",
            "zipcode": "0793",
            "pinyin": "Shangrao"
        },
        {
            "cityname": "上林",
            "zipcode": "0771",
            "pinyin": "Shanglin"
        },
        {
            "cityname": "上栗",
            "zipcode": "0799",
            "pinyin": "Shangli"
        },
        {
            "cityname": "商河",
            "zipcode": "0531",
            "pinyin": "Shanghe"
        },
        {
            "cityname": "上杭",
            "zipcode": "0597",
            "pinyin": "Shanghang"
        },
        {
            "cityname": "上高",
            "zipcode": "0795",
            "pinyin": "Shanggao"
        },
        {
            "cityname": "诏安",
            "zipcode": "0596",
            "pinyin": "Saoan"
        },
        {
            "cityname": "三门",
            "zipcode": "0576",
            "pinyin": "Sanmen"
        },
        {
            "cityname": "三江",
            "zipcode": "0772",
            "pinyin": "Sanjiang"
        },
        {
            "cityname": "松阳",
            "zipcode": "0578",
            "pinyin": "Songyang"
        },
        {
            "cityname": "嵩县",
            "zipcode": "0379",
            "pinyin": "Songxian"
        },
        {
            "cityname": "松溪",
            "zipcode": "0599",
            "pinyin": "Songxi"
        },
        {
            "cityname": "嵩明",
            "zipcode": "0871",
            "pinyin": "Songming"
        },
        {
            "cityname": "宿州",
            "zipcode": "0557",
            "pinyin": "Suzhou"
        },
        {
            "cityname": "宿迁",
            "zipcode": "0527",
            "pinyin": "Suqian"
        },
        {
            "cityname": "随州",
            "zipcode": "0722",
            "pinyin": "Suizhou"
        },
        {
            "cityname": "遂宁",
            "zipcode": "0825",
            "pinyin": "Suining"
        },
        {
            "cityname": "宿松",
            "zipcode": "0556",
            "pinyin": "Susong"
        },
        {
            "cityname": "遂溪",
            "zipcode": "0759",
            "pinyin": "Suixi"
        },
        {
            "cityname": "濉溪",
            "zipcode": "0561",
            "pinyin": "Suixi"
        },
        {
            "cityname": "睢宁",
            "zipcode": "0516",
            "pinyin": "Suining"
        },
        {
            "cityname": "遂川",
            "zipcode": "0796",
            "pinyin": "Suichuan"
        },
        {
            "cityname": "遂昌",
            "zipcode": "0578",
            "pinyin": "Suichang"
        },
        {
            "cityname": "宿豫",
            "zipcode": "0527",
            "pinyin": "Suyu"
        }
    ],
    "T": [
        {
            "cityname": "天津",
            "zipcode": "022",
            "pinyin": "Tianjin"
        },
        {
            "cityname": "台州",
            "zipcode": "0576",
            "pinyin": "Taizhou"
        },
        {
            "cityname": "唐山",
            "zipcode": "0315",
            "pinyin": "Tangshan"
        },
        {
            "cityname": "塔城地",
            "zipcode": "0901",
            "pinyin": "Tachengdi"
        },
        {
            "cityname": "泰安",
            "zipcode": "0538",
            "pinyin": "Taian"
        },
        {
            "cityname": "太原",
            "zipcode": "0351",
            "pinyin": "Taiyuan"
        },
        {
            "cityname": "泰州",
            "zipcode": "0523",
            "pinyin": "Taizhou"
        },
        {
            "cityname": "天水",
            "zipcode": "0938",
            "pinyin": "Tianshui"
        },
        {
            "cityname": "铁岭",
            "zipcode": "0410",
            "pinyin": "Tieling"
        },
        {
            "cityname": "铜川",
            "zipcode": "0919",
            "pinyin": "Tongchuan"
        },
        {
            "cityname": "通化",
            "zipcode": "0435",
            "pinyin": "Tonghua"
        },
        {
            "cityname": "通辽",
            "zipcode": "0475",
            "pinyin": "Tongliao"
        },
        {
            "cityname": "铜陵",
            "zipcode": "0562",
            "pinyin": "Tongling"
        },
        {
            "cityname": "铜仁",
            "zipcode": "0856",
            "pinyin": "Tongren"
        },
        {
            "cityname": "通州",
            "zipcode": "0513",
            "pinyin": "Tongzhou"
        },
        {
            "cityname": "桐乡",
            "zipcode": "0573",
            "pinyin": "Tongxiang"
        },
        {
            "cityname": "铜山",
            "zipcode": "0516",
            "pinyin": "Tongshan"
        },
        {
            "cityname": "潼南",
            "zipcode": "023",
            "pinyin": "Tongnan"
        },
        {
            "cityname": "桐庐",
            "zipcode": "0571",
            "pinyin": "Tonglu"
        },
        {
            "cityname": "铜梁",
            "zipcode": "023",
            "pinyin": "Tongliang"
        },
        {
            "cityname": "通河",
            "zipcode": "0451",
            "pinyin": "Tonghe"
        },
        {
            "cityname": "铜鼓",
            "zipcode": "0795",
            "pinyin": "Tonggu"
        },
        {
            "cityname": "桐城",
            "zipcode": "0556",
            "pinyin": "Tongcheng"
        },
        {
            "cityname": "天台",
            "zipcode": "0576",
            "pinyin": "Tiantai"
        },
        {
            "cityname": "天长",
            "zipcode": "0550",
            "pinyin": "Tianchang"
        },
        {
            "cityname": "滕州",
            "zipcode": "0623",
            "pinyin": "Tengzhou"
        },
        {
            "cityname": "唐海",
            "zipcode": "0315",
            "pinyin": "Tanghai"
        },
        {
            "cityname": "郯城",
            "zipcode": "0539",
            "pinyin": "Tancheng"
        },
        {
            "cityname": "泰兴",
            "zipcode": "0523",
            "pinyin": "Taixing"
        },
        {
            "cityname": "泰顺",
            "zipcode": "0577",
            "pinyin": "Taishun"
        },
        {
            "cityname": "台山",
            "zipcode": "0750",
            "pinyin": "Taishan"
        },
        {
            "cityname": "泰宁",
            "zipcode": "0598",
            "pinyin": "Taining"
        },
        {
            "cityname": "太湖",
            "zipcode": "0556",
            "pinyin": "Taihu"
        },
        {
            "cityname": "泰和",
            "zipcode": "0796",
            "pinyin": "Taihe"
        },
        {
            "cityname": "太和",
            "zipcode": "0558",
            "pinyin": "Taihe"
        },
        {
            "cityname": "太仓",
            "zipcode": "0512",
            "pinyin": "Taicang"
        },
        {
            "cityname": "吐鲁番",
            "zipcode": "0995",
            "pinyin": "Tulufan"
        }
    ],
    "W": [
        {
            "cityname": "潍坊",
            "zipcode": "0536",
            "pinyin": "Weifang"
        },
        {
            "cityname": "威海",
            "zipcode": "0631",
            "pinyin": "Weihai"
        },
        {
            "cityname": "武汉",
            "zipcode": "027",
            "pinyin": "Wuhan"
        },
        {
            "cityname": "无锡",
            "zipcode": "0510",
            "pinyin": "Wuxi"
        },
        {
            "cityname": "渭南",
            "zipcode": "0913",
            "pinyin": "Weinan"
        },
        {
            "cityname": "文山",
            "zipcode": "0876",
            "pinyin": "Wenshan"
        },
        {
            "cityname": "温州",
            "zipcode": "0577",
            "pinyin": "Wenzhou"
        },
        {
            "cityname": "乌海",
            "zipcode": "0473",
            "pinyin": "Wuhai"
        },
        {
            "cityname": "芜湖",
            "zipcode": "0553",
            "pinyin": "Wuhu"
        },
        {
            "cityname": "乌兰察布",
            "zipcode": "0474",
            "pinyin": "Wulanchabu"
        },
        {
            "cityname": "乌鲁木齐",
            "zipcode": "0991",
            "pinyin": "Wulumuqi"
        },
        {
            "cityname": "武威",
            "zipcode": "0935",
            "pinyin": "Wuwei"
        },
        {
            "cityname": "吴忠",
            "zipcode": "0953",
            "pinyin": "Wuzhong"
        },
        {
            "cityname": "武陟",
            "zipcode": "0391",
            "pinyin": "Wuzhi"
        },
        {
            "cityname": "婺源",
            "zipcode": "0793",
            "pinyin": "Wuyuan"
        },
        {
            "cityname": "武夷山",
            "zipcode": "0599",
            "pinyin": "Wuyishan"
        },
        {
            "cityname": "武义",
            "zipcode": "0579",
            "pinyin": "Wuyi"
        },
        {
            "cityname": "巫溪",
            "zipcode": "023",
            "pinyin": "Wuxi"
        },
        {
            "cityname": "无为",
            "zipcode": "0565",
            "pinyin": "Wuwei"
        },
        {
            "cityname": "巫山",
            "zipcode": "023",
            "pinyin": "Wushan"
        },
        {
            "cityname": "武平",
            "zipcode": "0597",
            "pinyin": "Wuping"
        },
        {
            "cityname": "武宁",
            "zipcode": "0792",
            "pinyin": "Wuning"
        },
        {
            "cityname": "武鸣",
            "zipcode": "0771",
            "pinyin": "Wuming"
        },
        {
            "cityname": "武隆",
            "zipcode": "023",
            "pinyin": "Wulong"
        },
        {
            "cityname": "五莲",
            "zipcode": "0633",
            "pinyin": "Wulian"
        },
        {
            "cityname": "吴江",
            "zipcode": "0512",
            "pinyin": "Wujiang"
        },
        {
            "cityname": "无极",
            "zipcode": "0311",
            "pinyin": "Wuji"
        },
        {
            "cityname": "五华",
            "zipcode": "0753",
            "pinyin": "Wuhua"
        },
        {
            "cityname": "五河",
            "zipcode": "0552",
            "pinyin": "Wuhe"
        },
        {
            "cityname": "无棣",
            "zipcode": "0543",
            "pinyin": "Wudi"
        },
        {
            "cityname": "吴川",
            "zipcode": "0759",
            "pinyin": "Wuchuan"
        },
        {
            "cityname": "武城",
            "zipcode": "0534",
            "pinyin": "Wucheng"
        },
        {
            "cityname": "五常",
            "zipcode": "0451",
            "pinyin": "Wuchang"
        },
        {
            "cityname": "涡阳",
            "zipcode": "0558",
            "pinyin": "Woyang"
        },
        {
            "cityname": "温县",
            "zipcode": "0391",
            "pinyin": "Wenxian"
        },
        {
            "cityname": "汶上",
            "zipcode": "0537",
            "pinyin": "Wenshang"
        },
        {
            "cityname": "温岭",
            "zipcode": "0576",
            "pinyin": "Wenling"
        },
        {
            "cityname": "翁源",
            "zipcode": "0751",
            "pinyin": "Wengyuan"
        },
        {
            "cityname": "文登",
            "zipcode": "0631",
            "pinyin": "Wendeng"
        },
        {
            "cityname": "文成",
            "zipcode": "0577",
            "pinyin": "Wencheng"
        },
        {
            "cityname": "微山",
            "zipcode": "0537",
            "pinyin": "Weishan"
        },
        {
            "cityname": "万载",
            "zipcode": "0795",
            "pinyin": "Wanzai"
        },
        {
            "cityname": "万年",
            "zipcode": "0793",
            "pinyin": "Wannian"
        },
        {
            "cityname": "望江",
            "zipcode": "0556",
            "pinyin": "Wangjiang"
        },
        {
            "cityname": "望城",
            "zipcode": "0731",
            "pinyin": "Wangcheng"
        },
        {
            "cityname": "万安",
            "zipcode": "0796",
            "pinyin": "Wanan"
        },
        {
            "cityname": "瓦房店",
            "zipcode": "0411",
            "pinyin": "Wafangdian"
        },
        {
            "cityname": "梧州",
            "zipcode": "0774",
            "pinyin": "Wuzhou"
        }
    ],
    "X": [
        {
            "cityname": "厦门",
            "zipcode": "0592",
            "pinyin": "Xiamen"
        },
        {
            "cityname": "西安",
            "zipcode": "029",
            "pinyin": "Xian"
        },
        {
            "cityname": "许昌",
            "zipcode": "0374",
            "pinyin": "Xuchang"
        },
        {
            "cityname": "徐州",
            "zipcode": "0516",
            "pinyin": "Xuzhou"
        },
        {
            "cityname": "襄樊",
            "zipcode": "0710",
            "pinyin": "Xiangfan"
        },
        {
            "cityname": "湘潭",
            "zipcode": "0732",
            "pinyin": "Xiangtan"
        },
        {
            "cityname": "湘西",
            "zipcode": "0743",
            "pinyin": "Xiangxi"
        },
        {
            "cityname": "咸宁",
            "zipcode": "0715",
            "pinyin": "Xianning"
        },
        {
            "cityname": "咸阳",
            "zipcode": "029",
            "pinyin": "Xianyang"
        },
        {
            "cityname": "孝感",
            "zipcode": "0712",
            "pinyin": "Xiaogan"
        },
        {
            "cityname": "锡林郭勒盟",
            "zipcode": "0479",
            "pinyin": "Xilinguolemeng"
        },
        {
            "cityname": "兴安盟",
            "zipcode": "0482",
            "pinyin": "Xinganmeng"
        },
        {
            "cityname": "邢台",
            "zipcode": "0319",
            "pinyin": "Xingtai"
        },
        {
            "cityname": "西宁",
            "zipcode": "0971",
            "pinyin": "Xining"
        },
        {
            "cityname": "新乡",
            "zipcode": "0373",
            "pinyin": "Xinxiang"
        },
        {
            "cityname": "信阳",
            "zipcode": "0376",
            "pinyin": "Xinyang"
        },
        {
            "cityname": "新余",
            "zipcode": "0790",
            "pinyin": "Xinyu"
        },
        {
            "cityname": "忻州",
            "zipcode": "0350",
            "pinyin": "Xinzhou"
        },
        {
            "cityname": "西双版纳",
            "zipcode": "0691",
            "pinyin": "Xishuangbanna"
        },
        {
            "cityname": "宣城",
            "zipcode": "0563",
            "pinyin": "Xuancheng"
        },
        {
            "cityname": "峡江",
            "zipcode": "0796",
            "pinyin": "Xiajiang"
        },
        {
            "cityname": "夏津",
            "zipcode": "0534",
            "pinyin": "Xiajin"
        },
        {
            "cityname": "象山",
            "zipcode": "0574",
            "pinyin": "Xiangshan"
        },
        {
            "cityname": "响水",
            "zipcode": "0515",
            "pinyin": "Xiangshui"
        },
        {
            "cityname": "仙居",
            "zipcode": "0576",
            "pinyin": "Xianju"
        },
        {
            "cityname": "仙游",
            "zipcode": "0594",
            "pinyin": "Xianyou"
        },
        {
            "cityname": "萧县",
            "zipcode": "0557",
            "pinyin": "Xiaoxian"
        },
        {
            "cityname": "霞浦",
            "zipcode": "0593",
            "pinyin": "Xiapu"
        },
        {
            "cityname": "息烽",
            "zipcode": "0851",
            "pinyin": "Xifeng"
        },
        {
            "cityname": "新安",
            "zipcode": "0379",
            "pinyin": "Xinan"
        },
        {
            "cityname": "新昌",
            "zipcode": "0575",
            "pinyin": "Xinchang"
        },
        {
            "cityname": "信丰",
            "zipcode": "0797",
            "pinyin": "Xinfeng"
        },
        {
            "cityname": "新丰",
            "zipcode": "0751",
            "pinyin": "Xinfeng"
        },
        {
            "cityname": "新干",
            "zipcode": "0796",
            "pinyin": "Xingan"
        },
        {
            "cityname": "兴国",
            "zipcode": "0797",
            "pinyin": "Xingguo"
        },
        {
            "cityname": "兴化",
            "zipcode": "0523",
            "pinyin": "Xinghua"
        },
        {
            "cityname": "兴宁",
            "zipcode": "0753",
            "pinyin": "Xingning"
        },
        {
            "cityname": "行唐",
            "zipcode": "0311",
            "pinyin": "Xingtang"
        },
        {
            "cityname": "荥阳",
            "zipcode": "0371",
            "pinyin": "Xingyang"
        },
        {
            "cityname": "星子",
            "zipcode": "0792",
            "pinyin": "Xingzi"
        },
        {
            "cityname": "辛集",
            "zipcode": "0311",
            "pinyin": "Xinji"
        },
        {
            "cityname": "新建",
            "zipcode": "0791",
            "pinyin": "Xinjian"
        },
        {
            "cityname": "新津",
            "zipcode": "028",
            "pinyin": "Xinjin"
        },
        {
            "cityname": "新乐",
            "zipcode": "0311",
            "pinyin": "Xinle"
        },
        {
            "cityname": "新民",
            "zipcode": "024",
            "pinyin": "Xinmin"
        },
        {
            "cityname": "新密",
            "zipcode": "0371",
            "pinyin": "Xinmi"
        },
        {
            "cityname": "新泰",
            "zipcode": "0538",
            "pinyin": "Xintai"
        },
        {
            "cityname": "新兴",
            "zipcode": "0766",
            "pinyin": "Xinxing"
        },
        {
            "cityname": "新沂",
            "zipcode": "0516",
            "pinyin": "Xinyi"
        },
        {
            "cityname": "信宜",
            "zipcode": "0668",
            "pinyin": "Xinyi"
        },
        {
            "cityname": "新郑",
            "zipcode": "0371",
            "pinyin": "Xinzheng"
        },
        {
            "cityname": "休宁",
            "zipcode": "0559",
            "pinyin": "Xiuning"
        },
        {
            "cityname": "秀山",
            "zipcode": "023",
            "pinyin": "Xiushan"
        },
        {
            "cityname": "修水",
            "zipcode": "0792",
            "pinyin": "Xiushui"
        },
        {
            "cityname": "修文",
            "zipcode": "0851",
            "pinyin": "Xiuwen"
        },
        {
            "cityname": "修武",
            "zipcode": "0391",
            "pinyin": "Xiuwu"
        },
        {
            "cityname": "寻甸",
            "zipcode": "0871",
            "pinyin": "Xundian"
        },
        {
            "cityname": "盱眙",
            "zipcode": "0517",
            "pinyin": "Xuyi"
        },
        {
            "cityname": "徐闻",
            "zipcode": "0759",
            "pinyin": "Xuwen"
        },
        {
            "cityname": "寻乌",
            "zipcode": "0797",
            "pinyin": "Xunwu"
        }
    ],
    "Y": [
        {
            "cityname": "扬州",
            "zipcode": "0514",
            "pinyin": "Yangzhou"
        },
        {
            "cityname": "烟台",
            "zipcode": "0535",
            "pinyin": "Yantai"
        },
        {
            "cityname": "雅安",
            "zipcode": "0835",
            "pinyin": "Yaan"
        },
        {
            "cityname": "延安",
            "zipcode": "0911",
            "pinyin": "Yanan"
        },
        {
            "cityname": "延边",
            "zipcode": "0433",
            "pinyin": "Yanbian"
        },
        {
            "cityname": "盐城",
            "zipcode": "0515",
            "pinyin": "Yancheng"
        },
        {
            "cityname": "阳江",
            "zipcode": "0662",
            "pinyin": "Yangjiang"
        },
        {
            "cityname": "阳泉",
            "zipcode": "0353",
            "pinyin": "Yangquan"
        },
        {
            "cityname": "宜宾",
            "zipcode": "0831",
            "pinyin": "Yibin"
        },
        {
            "cityname": "宜昌",
            "zipcode": "0717",
            "pinyin": "Yichang"
        },
        {
            "cityname": "伊春",
            "zipcode": "0458",
            "pinyin": "Yichun"
        },
        {
            "cityname": "宜春",
            "zipcode": "0795",
            "pinyin": "Yichun"
        },
        {
            "cityname": "伊犁哈萨克",
            "zipcode": "0999",
            "pinyin": "Yilihasake"
        },
        {
            "cityname": "银川",
            "zipcode": "0951",
            "pinyin": "Yinchuan"
        },
        {
            "cityname": "营口",
            "zipcode": "0417",
            "pinyin": "Yingkou"
        },
        {
            "cityname": "鹰潭",
            "zipcode": "0701",
            "pinyin": "Yingtan"
        },
        {
            "cityname": "益阳",
            "zipcode": "0737",
            "pinyin": "Yiyang"
        },
        {
            "cityname": "永州",
            "zipcode": "0746",
            "pinyin": "Yongzhou"
        },
        {
            "cityname": "岳阳",
            "zipcode": "0730",
            "pinyin": "Yueyang"
        },
        {
            "cityname": "玉林",
            "zipcode": "0775",
            "pinyin": "Yulin"
        },
        {
            "cityname": "榆林",
            "zipcode": "0912",
            "pinyin": "Yulin"
        },
        {
            "cityname": "运城",
            "zipcode": "0359",
            "pinyin": "Yuncheng"
        },
        {
            "cityname": "云浮",
            "zipcode": "0766",
            "pinyin": "Yunfu"
        },
        {
            "cityname": "玉树",
            "zipcode": "0976",
            "pinyin": "Yushu"
        },
        {
            "cityname": "玉溪",
            "zipcode": "0877",
            "pinyin": "Yuxi"
        },
        {
            "cityname": "阳春",
            "zipcode": "0662",
            "pinyin": "Yangchun"
        },
        {
            "cityname": "阳东",
            "zipcode": "0662",
            "pinyin": "Yangdong"
        },
        {
            "cityname": "阳谷",
            "zipcode": "0635",
            "pinyin": "Yanggu"
        },
        {
            "cityname": "阳山",
            "zipcode": "0763",
            "pinyin": "Yangshan"
        },
        {
            "cityname": "阳信",
            "zipcode": "0543",
            "pinyin": "Yangxin"
        },
        {
            "cityname": "阳西",
            "zipcode": "0662",
            "pinyin": "Yangxi"
        },
        {
            "cityname": "扬中",
            "zipcode": "0511",
            "pinyin": "Yangzhong"
        },
        {
            "cityname": "偃师",
            "zipcode": "0379",
            "pinyin": "Yanshi"
        },
        {
            "cityname": "延寿",
            "zipcode": "0451",
            "pinyin": "Yanshou"
        },
        {
            "cityname": "兖州",
            "zipcode": "0537",
            "pinyin": "Yanzhou"
        },
        {
            "cityname": "伊川",
            "zipcode": "0379",
            "pinyin": "Yichuan"
        },
        {
            "cityname": "宜丰",
            "zipcode": "0795",
            "pinyin": "Yifeng"
        },
        {
            "cityname": "宜黄",
            "zipcode": "0794",
            "pinyin": "Yihuang"
        },
        {
            "cityname": "依兰",
            "zipcode": "0451",
            "pinyin": "Yilan"
        },
        {
            "cityname": "宜良",
            "zipcode": "0871",
            "pinyin": "Yiliang"
        },
        {
            "cityname": "沂南",
            "zipcode": "0539",
            "pinyin": "Yinan"
        },
        {
            "cityname": "英德",
            "zipcode": "0763",
            "pinyin": "Yingde"
        },
        {
            "cityname": "颍上",
            "zipcode": "0558",
            "pinyin": "Yingshang"
        },
        {
            "cityname": "沂水",
            "zipcode": "0539",
            "pinyin": "Yishui"
        },
        {
            "cityname": "义乌",
            "zipcode": "0579",
            "pinyin": "Yiwu"
        },
        {
            "cityname": "黟县",
            "zipcode": "0559",
            "pinyin": "Yixian"
        },
        {
            "cityname": "宜兴",
            "zipcode": "0510",
            "pinyin": "Yixing"
        },
        {
            "cityname": "弋阳",
            "zipcode": "0793",
            "pinyin": "Yiyang"
        },
        {
            "cityname": "宜阳",
            "zipcode": "0379",
            "pinyin": "Yiyang"
        },
        {
            "cityname": "沂源",
            "zipcode": "0533",
            "pinyin": "Yiyuan"
        },
        {
            "cityname": "仪征",
            "zipcode": "0514",
            "pinyin": "Yizheng"
        },
        {
            "cityname": "永安",
            "zipcode": "0598",
            "pinyin": "Yongan"
        },
        {
            "cityname": "永川",
            "zipcode": "023",
            "pinyin": "Yongchuan"
        },
        {
            "cityname": "永春",
            "zipcode": "0595",
            "pinyin": "Yongchun"
        },
        {
            "cityname": "永登",
            "zipcode": "0931",
            "pinyin": "Yongdeng"
        },
        {
            "cityname": "永定",
            "zipcode": "0597",
            "pinyin": "Yongding"
        },
        {
            "cityname": "永丰",
            "zipcode": "0796",
            "pinyin": "Yongfeng"
        },
        {
            "cityname": "永吉",
            "zipcode": "0423",
            "pinyin": "Yongji"
        },
        {
            "cityname": "永嘉",
            "zipcode": "0577",
            "pinyin": "Yongjia"
        },
        {
            "cityname": "永康",
            "zipcode": "0579",
            "pinyin": "Yongkang"
        },
        {
            "cityname": "邕宁",
            "zipcode": "0771",
            "pinyin": "Yongning"
        },
        {
            "cityname": "永泰",
            "zipcode": "0591",
            "pinyin": "Yongtai"
        },
        {
            "cityname": "永新",
            "zipcode": "0796",
            "pinyin": "Yongxin"
        },
        {
            "cityname": "永修",
            "zipcode": "0792",
            "pinyin": "Yongxiu"
        },
        {
            "cityname": "尤溪",
            "zipcode": "0598",
            "pinyin": "Youxi"
        },
        {
            "cityname": "酉阳",
            "zipcode": "023",
            "pinyin": "Youyang"
        },
        {
            "cityname": "元氏",
            "zipcode": "0311",
            "pinyin": "Yuanshi"
        },
        {
            "cityname": "禹城",
            "zipcode": "0534",
            "pinyin": "Yucheng"
        },
        {
            "cityname": "于都",
            "zipcode": "0797",
            "pinyin": "Yudu"
        },
        {
            "cityname": "岳西",
            "zipcode": "0556",
            "pinyin": "Yuexi"
        },
        {
            "cityname": "余干",
            "zipcode": "0793",
            "pinyin": "Yugan"
        },
        {
            "cityname": "玉环",
            "zipcode": "0576",
            "pinyin": "Yuhuan"
        },
        {
            "cityname": "余江",
            "zipcode": "0701",
            "pinyin": "Yujiang"
        },
        {
            "cityname": "郁南",
            "zipcode": "0766",
            "pinyin": "Yunan"
        },
        {
            "cityname": "云安",
            "zipcode": "0766",
            "pinyin": "Yunan"
        },
        {
            "cityname": "郓城",
            "zipcode": "0530",
            "pinyin": "Yuncheng"
        },
        {
            "cityname": "云和",
            "zipcode": "0578",
            "pinyin": "Yunhe"
        },
        {
            "cityname": "云霄",
            "zipcode": "0596",
            "pinyin": "Yunxiao"
        },
        {
            "cityname": "云阳",
            "zipcode": "023",
            "pinyin": "Yunyang"
        },
        {
            "cityname": "玉山",
            "zipcode": "0793",
            "pinyin": "Yushan"
        },
        {
            "cityname": "榆树",
            "zipcode": "0431",
            "pinyin": "Yushu"
        },
        {
            "cityname": "鱼台",
            "zipcode": "0537",
            "pinyin": "Yutai"
        },
        {
            "cityname": "玉田",
            "zipcode": "0315",
            "pinyin": "Yutian"
        },
        {
            "cityname": "余姚",
            "zipcode": "0574",
            "pinyin": "Yuyao"
        },
        {
            "cityname": "榆中",
            "zipcode": "0931",
            "pinyin": "Yuzhong"
        }
    ],
    "Z": [
        {
            "cityname": "漳州",
            "zipcode": "0596",
            "pinyin": "Zhangzhou"
        },
        {
            "cityname": "遵化",
            "zipcode": "0315",
            "pinyin": "Zunhua"
        },
        {
            "cityname": "郑州",
            "zipcode": "0371",
            "pinyin": "Zhengzhou"
        },
        {
            "cityname": "中山",
            "zipcode": "0760",
            "pinyin": "Zhongshan"
        },
        {
            "cityname": "珠海",
            "zipcode": "0756",
            "pinyin": "Zhuhai"
        },
        {
            "cityname": "枣庄",
            "zipcode": "0623",
            "pinyin": "Zaozhuang"
        },
        {
            "cityname": "张家界",
            "zipcode": "0744",
            "pinyin": "Zhangjiajie"
        },
        {
            "cityname": "张家口",
            "zipcode": "0313",
            "pinyin": "Zhangjiakou"
        },
        {
            "cityname": "张掖",
            "zipcode": "0936",
            "pinyin": "Zhangye"
        },
        {
            "cityname": "湛江",
            "zipcode": "0759",
            "pinyin": "Zhanjiang"
        },
        {
            "cityname": "肇庆",
            "zipcode": "0758",
            "pinyin": "Zhaoqing"
        },
        {
            "cityname": "昭通",
            "zipcode": "0870",
            "pinyin": "Zhaotong"
        },
        {
            "cityname": "镇江",
            "zipcode": "0511",
            "pinyin": "Zhenjiang"
        },
        {
            "cityname": "中卫",
            "zipcode": "0955",
            "pinyin": "Zhongwei"
        },
        {
            "cityname": "周口",
            "zipcode": "0394",
            "pinyin": "Zhoukou"
        },
        {
            "cityname": "舟山",
            "zipcode": "0580",
            "pinyin": "Zhoushan"
        },
        {
            "cityname": "驻马店",
            "zipcode": "0396",
            "pinyin": "Zhumadian"
        },
        {
            "cityname": "株洲",
            "zipcode": "0731",
            "pinyin": "Zhuzhou"
        },
        {
            "cityname": "淄博",
            "zipcode": "0533",
            "pinyin": "Zibo"
        },
        {
            "cityname": "自贡",
            "zipcode": "0813",
            "pinyin": "Zigong"
        },
        {
            "cityname": "资阳",
            "zipcode": "028",
            "pinyin": "Ziyang"
        },
        {
            "cityname": "遵义",
            "zipcode": "0852",
            "pinyin": "Zunyi"
        },
        {
            "cityname": "赞皇",
            "zipcode": "0311",
            "pinyin": "Zanhuang"
        },
        {
            "cityname": "增城",
            "zipcode": "020",
            "pinyin": "Zengcheng"
        },
        {
            "cityname": "张家港",
            "zipcode": "0512",
            "pinyin": "Zhangjiagang"
        },
        {
            "cityname": "漳平",
            "zipcode": "0597",
            "pinyin": "Zhangping"
        },
        {
            "cityname": "漳浦",
            "zipcode": "0596",
            "pinyin": "Zhangpu"
        },
        {
            "cityname": "章丘",
            "zipcode": "0531",
            "pinyin": "Zhangqiu"
        },
        {
            "cityname": "樟树",
            "zipcode": "0795",
            "pinyin": "Zhangshu"
        },
        {
            "cityname": "沾化",
            "zipcode": "0543",
            "pinyin": "Zhanhua"
        },
        {
            "cityname": "赵县",
            "zipcode": "0311",
            "pinyin": "Zhaoxian"
        },
        {
            "cityname": "招远",
            "zipcode": "0535",
            "pinyin": "Zhaoyuan"
        },
        {
            "cityname": "正定",
            "zipcode": "0311",
            "pinyin": "Zhengding"
        },
        {
            "cityname": "政和",
            "zipcode": "0599",
            "pinyin": "Zhenghe"
        },
        {
            "cityname": "柘荣",
            "zipcode": "0593",
            "pinyin": "Zherong"
        },
        {
            "cityname": "中牟",
            "zipcode": "0371",
            "pinyin": "Zhongmou"
        },
        {
            "cityname": "忠县",
            "zipcode": "023",
            "pinyin": "Zhongxian"
        },
        {
            "cityname": "周宁",
            "zipcode": "0593",
            "pinyin": "Zhouning"
        },
        {
            "cityname": "周至",
            "zipcode": "029",
            "pinyin": "Zhouzhi"
        },
        {
            "cityname": "庄河",
            "zipcode": "0411",
            "pinyin": "Zhuanghe"
        },
        {
            "cityname": "诸城",
            "zipcode": "0536",
            "pinyin": "Zhucheng"
        },
        {
            "cityname": "诸暨",
            "zipcode": "0575",
            "pinyin": "Zhuji"
        },
        {
            "cityname": "紫金",
            "zipcode": "0762",
            "pinyin": "Zijin"
        },
        {
            "cityname": "资溪",
            "zipcode": "0794",
            "pinyin": "Zixi"
        },
        {
            "cityname": "邹城",
            "zipcode": "0537",
            "pinyin": "Zoucheng"
        },
        {
            "cityname": "邹平",
            "zipcode": "0543",
            "pinyin": "Zouping"
        }
    ]
};

let mapcity = {};
let initcitymap = ()=>{
  _.map(allcitys,(lettercitylist,key)=>{
    _.map(lettercitylist,(item,index)=>{
      mapcity[item.cityname] = item.zipcode;
    });
  });
};
exports.initcitymap = initcitymap;

let gethotcitys = (citylist)=>{
  let hotcity = [];
  _.map(citylist,(cityname)=>{
    if(mapcity.hasOwnProperty(cityname)){
      hotcity.push({
            cityname: cityname,
            zipcode:mapcity[cityname]
          });
    }
  });
  return hotcity;
};
exports.gethotcitys = gethotcitys;
