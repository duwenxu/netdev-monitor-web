<template>
  <div class="demo-split">
    <div slot="right" class="demo-split-pane no-padding">
      <Split v-model="split3" mode="vertical">
        <!---左上区域内容开始--->
        <div slot="top" class="demo-split-pane">
          <Row style="padding:1px;height: 28%">
            <Col span="6" style="padding:5px">
              <div class="newmid"><img  src="./images/newCustom.png" width="80%"  height="95%" style="margin-left: 5px"/></div>
              <div class="newmup" style="color: rgba(255, 255, 255, 1)">{{custom_cnt}}</div>
              <div class="newdown" style="color: rgba(255, 255, 255, 1)">客户</div>
            </col>
            <Col span="6" style="padding:5px">
              <div class="newmid"><img  src="./images/newCeZhan.png" width="80%"  height="95%"  style="margin-left: 5px"/></div>
              <div class="newmup" style="color: rgba(255, 255, 255, 1)">{{station_cnt}} </div>
              <div class="newdown" style="color: rgba(255, 255, 255, 1)">测站</div>
            </col>
            <Col span="6" style="padding:5px">
              <div class="newmid"> <img  src="./images/newDevice.png" width="80%"  height="95%" style="margin-left: 5px" /></div>
              <div class="newmup" style="color: rgba(255, 255, 255, 1)">{{dev_cnt}} </div>
              <div class="newdown" style="color: rgba(255, 255, 255, 1);margin-left: 5px;">设备</div>
            </col>
            <Col span="6" style="padding:5px">
              <div class="newmid"> <img  src="./images/newSat.png" width="80%"  height="95%"  style="margin-left: 5px"/></div>
              <div class="newmup" style="color: rgba(255, 255, 255, 1);margin-left: 5px;left:30%">{{sat_cnt}}</div>
              <div class="newdown" style="color: rgba(255, 255, 255, 1);left:38%">卫星</div>
            </col>
          </Row>
          <Row style="padding:1px;height:1%"> <br><br></Row>
          <Row style="height:38%;" >
            <Col span="14" style="height:100%;">
              <div class="bg" style="width:98%;height:98%">
                <div class="titlbg">本周计划</div>
                <div ref="containerplan" :style="{width: '120%', height:'94%',marginLeft:'10%',}"></div>
              </div>
            </col>
            <Col span="10" style="padding:2px;height:100%;">
              <div class="bg" style="width: 98%">
                <div class="titlbg">本周互联互通</div>
                <br><br><br>
                <div class="lay11" > <img src="./images/satellite.png"  width="45%"  height="45%" style="opacity:0.65;margin-left: 36px;margin-top: 16px"/> </div>
                <div class="lay12" style="color: rgba(209,209,209,1)"> &#8226;&nbsp;对外申请数：{{apply_link_cnt}}<br>&#8226;&nbsp;互联跟踪卫星数：{{sat_link_cnt}}<br>&#8226;&nbsp;对外跟踪弧段数：{{forArc_link_cnt}}</div><br>
                <img src="./images/zhutu.png"   width="100%"   style="opacity:0.55;"/>
              </div>
            </col>
          </Row>

          <Row style="padding:10px;height:1%"> <br><br></Row>
          <Row style="height:35%;"  class="bg">
            <div ref="containerlistSat" :style="{width: '99%', height:'100%',position: 'absolute'}"></div>
            <div style="height: 0%;border: 1px solid #222222;opacity:0.99">
              <div class="lay2left" style="float:left;width:40%;">
                <Button  style="float:left;margin-right:15px;font-size:32px;width:120px"  @click="drawGT('4','iD4h')" value="4"  id="iD4h">4小时</Button>
                <Button  style="float:left;margin-right:15px;font-size:32px;width:120px"  @click="drawGT('8','iD8h')" value="8"  id="iD8h">8小时</Button>
                <Button  style="float:left;margin-right:15px;font-size:32px;width:120px"   @click="drawGT('12','iD12h')" value="12"  id="iD12h">12小时</Button>
                <Button  style="float:left;margin-right:15px;font-size:32px;width:120px"   @click="drawGT('24','iD24h')" value="24"  id="iD24h">24小时</Button>
              </div>
              <div class="titlbgTS"><div class="titlbgTS2" >卫星态势图</div></div>
            </div>
          </Row>
        </div>
        <!---下部分区域内容结束--->
      </Split>
    </div>

  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {schFpageCnt,schDevGTALL} from '@/api/sch/schArc.js'
    import {customerCount,stationCount,devCount,sateCount,curBidCount,curIotSateCount,curArcCount,satPlan} from '@/api/stat/satHome'


    import {getDevName,queryParamListValid} from '@/api/base/devInfo.js'
    const prepsat = require('../../../assets/images/sat/prepSat.png');
    const oversat = require('../../../assets/images/sat/overSat.png');
    const processSat = require('../../../assets/images/sat/processSat.png');
    const immedcSat = require('../../../assets/images/sat/immedcSat.png');

    //引入
    export default {
        data () {
            return {
                formInline: {
                    userName:'admin',
                    password:'123456'
                },
                split0: 0.00,
                split3: 1.0,
                //本周计划 总数
                all_plan_cnt:0,
                //软件调度计划
                software_plan_cnt:0,
                //遥控计划
                tel_plan_cnt:0,
                //程控计划
                auto_plan_cnt:0,
                //站网态势
                view_plan_cnt:0,
                //对外申请数
                apply_link_cnt:0,
                //互联跟踪卫星数
                sat_link_cnt:0,
                //对外跟踪弧段数
                forArc_link_cnt:0,
                // 客户
                custom_cnt:0,
                //测站
                station_cnt:0,
                //设备
                dev_cnt:0,
                //卫星
                sat_cnt:0,
                plancnt :'',
                plancntlList:[],
                temp_planCount:0,

                //设置下拉框的默认值
                //devCd:'DevKaShi',
                devCdsrc:'',
                schArc:{
                    devCd:'QSX73C'
                },
                startTime:'',
                devCdList:[],
                day:'',
                yesterday:'',
                nextday:'',
                hourValue:'',
                tmparray:[],

            }
        },

        created: function () {
            this.$xy.vector.$on('sendReq', this.sendReq)
            let  obj = new Date(); //
            //格式化
            console.log("obj");
            obj= obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate()
            console.log(obj);
            this.day=obj;
            let nextday=this.getNewDay(obj,1);
            this.nextday=nextday;
            let yesterday=this.getNewDay(obj,-1);
            this.yesterday=yesterday;

        },
        beforeDestroy: function () {
            this.$xy.vector.$off('sendReq', this.sendReq)
        },
        mounted() {
            //this.login();
            this.init()
            this.doquery_plan();
            this.drawLine();
            this.drawGT();

        },
        methods: {
            ...mapActions([
                'handleLogin',
                'getUserInfo',
                'getRouters'
            ]),

            login() {
                this.handleLogin(this.formInline).then(data => {
                    this.$router.push('/ghigh')
                })
            },

            sendReq: function (obj) {
                this.search = Object.assign(this.search, obj)
                this.init()            },
            async init() {
                this.doQuery_righttop();
            },
            //本周跟踪弧段执行情况
            async drawLine() {
                //获取设备编号
                let tmp = this.schArc.devCd;
                let searchALL = Object.assign({devCd: tmp});
                // let searchALL=Object.assign({startTime:obj},{devCd:tmp});
                let result = await schFpageCnt(searchALL)
                let planData = []
                planData[0] = result[0].yaowaice
                planData[1] = result[0].shuchuan
                planData[2] = result[0].guiKong
                planData[3] = result[0].inJect
                //计划类数据
                // planData=result[0].yaowaice
                //实际执行类数据
                let realData = []
                realData[0] = result[1].yaowaice
                realData[1] = result[1].shuchuan
                realData[2] = result[1].guiKong
                realData[3] = result[1].inJect
                // 基于准备好的dom，初始化echarts实例,柱状图
                let myChart = this.$echarts.init(this.$refs.myChart)
                // 绘制图表
                myChart.setOption({
                    legend: {
                        textStyle: { //图例文字的样式
                            color: 'rgba(255, 255, 255, 0.65)',
                            fontSize: 17
                        },
                        data:['计划弧段','完成弧段']
                    },

                    tooltip: { show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }},
                    xAxis: {
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.65)',  //更改坐标轴文字颜色
                                fontSize : 17      //更改坐标轴文字大小
                            },
                            //  rotate:15,
                        },
                        data: ["遥测","遥测+数传","遥测+数传+遥控","遥测+数传+遥控+注入"]
                    },
                    yAxis: {
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff',  //更改坐标轴文字颜色
                                fontSize : 17      //更改坐标轴文字大小
                            }

                        },

                        axisLine: { show: true },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'solid',
                                color: '#6f7897',
                                width: 0.5,
                            },
                        },

                    },
                    series: [{
                        name: '计划弧段',
                        type: 'bar',
                        data: planData,
                        itemStyle:{
                            normal:{
                                color:'#3472ff'
                            }
                        },
                    },
                        {
                            name: '完成弧段',
                            type: 'bar',
                            data: realData,
                            itemStyle:{
                                normal:{
                                    color:'#707fa2'
                                }
                            },
                        }]
                });
            },

            //显示计划
            async doquery_plan() {
                //本周计划
                this.plancntlList=await satPlan()
                //定义计划类型数组
                var planTypearray= new Array();
                //计算总计划数
                for(let tmp=0;tmp<this.plancntlList.length;tmp++){
                    this.temp_planCount=this.temp_planCount+this.plancntlList[tmp].value;
                    planTypearray[tmp]=this.plancntlList[tmp].name;
                };
                var all_cnt=this.temp_planCount;
                //PIE 图
                let myChartsPie = this.$echarts.init(this.$refs.containerplan);
                var that=this;
                var option = {
                    title: {
                        text: '计划数',
                        subtext: all_cnt,
                        subtextStyle:{
                            fontWeight : 'normal',
                            color:'#fff',
                            fontSize : 36
                        },
                        x: 'center',
                        y: 'center',

                        textStyle : {
                            fontWeight : 'normal',
                            color:'rgba(125,183,187,1)',
                            fontSize : 32
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        textStyle : {
                            fontWeight : 'normal',
                            fontSize : 32
                        },
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    color:['#D86040','#34D494','#D43434','#D2C44A','#4A68D2','#D2D2D2','#62B944'],
                    legend: {
                        textStyle: { //图例文字的样式
                            fontWeight : 'normal',
                            color: 'rgba(209,209,209,1)',
                            fontSize: 32
                        },
                        orient: 'vertical',
                        left: 10,
                        top:150,
                        itemGap:25,
                        itemHeight:30,
                        data:planTypearray,
                        formatter: function (name) {
                            for(let tmp=0;tmp<that.plancntlList.length;tmp++){
                                if (that.plancntlList[tmp].name == name)
                                    return name +":  "+that.plancntlList[tmp].value;
                            };
                        }
                    },

                    series: [
                        {
                            name: '计划',
                            type: 'pie',
                            radius: ['50%', '80%'],
                            avoidLabelOverlap: false,
                            center: ['50%', '50%'], //图的位置，距离左跟上的位置
                            label : {
                                normal : {
                                    show: false,
                                    formatter: '{b}:{c}: ({d}%)',
                                    textStyle : {
                                        fontWeight : 'normal',
                                        fontSize : 16
                                    }
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: true
                            },
                            itemStyle:{
                                //    normal:{color:"#fff"},

                            },
                            data:this.plancntlList
                        }
                    ]
                };
                myChartsPie.setOption(option);
            },
            async doQuery_righttop(){
                //获取客户数
                this.custom_cnt=await customerCount();
                //查询测站数
                this.station_cnt=await stationCount();
                //查询设备数
                this.dev_cnt=await devCount();
                //查询卫星数
                this.sat_cnt=await sateCount();
                //互联互通 ：本周对外申请数
                this.apply_link_cnt=await curBidCount();
                //互联互通 ：本周互联跟踪卫星数
                this.sat_link_cnt=await curIotSateCount();
                //互联互通 ：本周对外申请弧段数
                this.forArc_link_cnt =await curArcCount();
            },
            //显示卫星的态势
            async drawGT(obj,id){

                let {result, success, message} = await queryParamListValid()
                if (success) {
                    this.tmparray = eval(result.records)
                }
                //延迟0.5秒
                await new Promise((resolve, reject) => setTimeout(resolve, 100));
                //获取设备编号
                let tmp=this.devCdsrc;
                // let hourValue=document.getElementById(id).value;
                console.log("hourValue");
                //  console.log(hourValue);
                let endTime=this.getNewHour(2);

                //如果是空，或者0，则是当天

                //获取4
                if(obj==null||obj=='4'){
                    obj=  this.getNewHour(-4)
                    endTime=this.getNewHour(4);
                    document.getElementById("iD4h").style.backgroundColor="#111216";
                    document.getElementById("iD4h").style.color="#CCF9FC";
                    document.getElementById("iD4h").style.border="30px";
                    document.getElementById("iD8h").style.backgroundColor="#111216";
                    document.getElementById("iD8h").style.color="#D1D1D1";
                    document.getElementById("iD8h").style.border="0px";
                    document.getElementById("iD12h").style.backgroundColor="#111216";
                    document.getElementById("iD12h").style.color="#D1D1D1";
                    document.getElementById("iD12h").style.border="0px";
                    document.getElementById("iD24h").style.backgroundColor="#111216";
                    document.getElementById("iD24h").style.color="#D1D1D1";
                    document.getElementById("iD24h").style.border="0px";
                }
                //8h
                if(obj=='8'){
                    obj=  this.getNewHour(-8)
                    endTime=this.getNewHour(8);
                    document.getElementById("iD4h").style.backgroundColor="#111216";
                    document.getElementById("iD4h").style.color="#D1D1D1";
                    document.getElementById("iD4h").style.border="0px";
                    document.getElementById("iD8h").style.backgroundColor="#111216";
                    document.getElementById("iD8h").style.color="#CCF9FC";
                    document.getElementById("iD8h").style.border="30px";
                    document.getElementById("iD12h").style.backgroundColor="#111216";
                    document.getElementById("iD12h").style.color="#D1D1D1";
                    document.getElementById("iD12h").style.border="0px";
                    document.getElementById("iD24h").style.backgroundColor="#111216";
                    document.getElementById("iD24h").style.color="#D1D1D1";
                    document.getElementById("iD24h").style.border="0px";
                }
                //8h
                if(obj=='12'){
                    obj=  this.getNewHour(-12)
                    endTime=this.getNewHour(12);
                    document.getElementById("iD4h").style.backgroundColor="#111216";
                    document.getElementById("iD4h").style.color="#D1D1D1";
                    document.getElementById("iD4h").style.border="0px";
                    document.getElementById("iD8h").style.backgroundColor="#111216";
                    document.getElementById("iD8h").style.color="#D1D1D1";
                    document.getElementById("iD8h").style.border="0px";
                    document.getElementById("iD12h").style.backgroundColor="#111216";
                    document.getElementById("iD12h").style.color="#CCF9FC";
                    document.getElementById("iD12h").style.border="30px";
                    document.getElementById("iD24h").style.backgroundColor="#111216";
                    document.getElementById("iD24h").style.color="#D1D1D1";
                    document.getElementById("iD24h").style.border="0px";
                }
                //8h
                if(obj=='24'){
                    obj=  this.getNewHour(-24)
                    endTime=this.getNewHour(24);
                    document.getElementById("iD4h").style.backgroundColor="#111216";
                    document.getElementById("iD4h").style.color="#D1D1D1";
                    document.getElementById("iD4h").style.border="0px";
                    document.getElementById("iD8h").style.backgroundColor="#111216";
                    document.getElementById("iD8h").style.color="#D1D1D1";
                    document.getElementById("iD8h").style.border="0px";
                    document.getElementById("iD12h").style.backgroundColor="#111216";
                    document.getElementById("iD12h").style.color="#D1D1D1";
                    document.getElementById("iD12h").style.border="0px";
                    document.getElementById("iD24h").style.backgroundColor="#111216";
                    document.getElementById("iD24h").style.color="#CCF9FC";
                    document.getElementById("iD24h").style.border="30px";
                }
                console.log(obj)
                let searchALL=Object.assign({startTime:obj},{endTime:endTime},{devCd:tmp});
                console.log(searchALL);
                let resulttmp= await schDevGTALL(searchALL)
                console.log("resulttmp")
                console.log(resulttmp)
                //已完成的
                let  overData=[]
                //正在进行的
                let  processData=[]
                //马上进行的
                let immedcData=[]
                //需要准备的
                let  prepareData=[]

                //已完成的--空白的
                let  overDataIdle=[]
                //正在进行的--空白的
                let  processDataIdle=[]
                //准备的--空白的
                let  prepareDataIdle=[]

                //查询结果分别赋值到不同的数组中
                for(let i=0;i<resulttmp.length;i++){
                    if(resulttmp[i].flag=='over') {
                        overData.push([resulttmp[i].startTime, resulttmp[i].rownum, resulttmp[i].spaceCode, resulttmp[i].periods, resulttmp[i].devname])
                    }
                    if(resulttmp[i].flag=='process'){
                        processData.push([resulttmp[i].startTime, resulttmp[i].rownum, resulttmp[i].spaceCode, resulttmp[i].periods, resulttmp[i].devname])
                    }
                    if(resulttmp[i].flag=='immedc'){
                        immedcData.push([resulttmp[i].startTime, resulttmp[i].rownum, resulttmp[i].spaceCode, resulttmp[i].periods, resulttmp[i].devname])
                    }
                    if(resulttmp[i].flag=='prepare'){
                        prepareData.push([resulttmp[i].startTime, resulttmp[i].rownum, resulttmp[i].spaceCode, resulttmp[i].periods, resulttmp[i].devname])
                    }
                }
                console.log("overData")
                console.log(overData)
                console.log("immedcData")
                console.log(immedcData)
                console.log("prepareData")
                console.log(prepareData)
                var that = this
                let myCharts = this.$echarts.init(this.$refs.containerlistSat)
                var  option= {
                    tooltip: {
                        padding: 10,
                        backgroundColor: 'rgba(82,139,139,0.8)',
                        borderColor: '#777',
                        borderWidth: 1,
                        formatter: function (obj) {
                            var value = obj.value;
                            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                                + obj.seriesName + '  '
                                + '</div>'
                                + '测站设备：' + value[4] + '<br>'
                                + '卫星代号：' + value[2] + '<br>'
                                + '开始时间：' + value[0] + '<br>'
                                + '持续时长：' + value[3] + '秒<br>';
                        }
                    },
                    legend: {
                        data: ['已完成','进行中','将处理','待处理',''],
                        textStyle: { //图例文字的样式
                            color:'rgba(209,209,209,1)',
                            fontSize: 32
                        },
                        itemWidth:20,
                        itemHeight:20,
                        orient: 'horizontal', right:14,top:1
                    },
                    grid: {
                        show:true,
                        left: '2%',
                        right: '4%',
                        //height:'100%',
                        top: '20%',
                        bottom: '4%',
                        containLabel: true,
                        borderColor: '#6f7897',
                        borderWidth: 0.1,
                    },

                    xAxis: {
                        type: 'time',
                        name:'时间',
                        axisLabel: {
                            // rotate: -10,
                            textStyle: {
                                //  color: '#fff',  //更改坐标轴文字颜色
                                color:'rgba(209,209,209,1)',
                                fontSize : 32      //更改坐标轴文字大小
                            },
                        },
                        axisLine: { show: true },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'solid',
                                color: '#6f7897',
                                width: 0.5,
                            },
                        },
                    },
                    yAxis : {

                        name:'设备',
                        min:0, //y轴的最小值
                        //max:that.tmparray.length, //y轴最大值

                        axisLabel: {
                            formatter: function (value) {
                                var res ='';
                                if(value<1){return  '' }
                                if(value>that.tmparray.length){return  '' }
                                //整数的时候，坐标轴上显示值
                                if(((value-1)%1)==0){
                                    res=eval(that.tmparray[value-1]).devName;
                                }
                                return res+"    ";
                            },
                            interval:0,
                            textStyle: {
                                color:'rgba(209,209,209,1)',
                                // color: '#fff',  //更改坐标轴文字颜色
                                fontSize : 32      //更改坐标轴文字大小
                            },
                            type: 'value',
                        },
                        axisLine: { show: true },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'solid',
                                color: '#6f7897',
                                width: 0.5,
                            },
                        },

                    },
                    series: [
                        {
                            name: '已完成',
                            type: 'scatter',
                            symbolSize:28,
                            symbol:`image://${oversat}`,
                            stack: '总数',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'bottom',
                                    textStyle:{
                                        //fontSize:6,
                                        color:'#FFF'
                                    },
                                    formatter: function (params) {
                                        var devname=params.value[4];
                                        devname=devname.substr(0,5);
                                        var period=params.value[3];
                                        var spacecode=params.value[2];
                                        var data_src=params.value[0];
                                        data_src=data_src.substr(5,11);
                                        var  date0=spacecode
                                        return date0;
                                    }
                                }
                            },
                            itemStyle:{
                                normal:{color:"#36cfc9"},
                            },
                            data: overData
                        },
                        {
                            name: '进行中',
                            type: 'scatter',
                            symbolSize:28,
                            symbol:`image://${processSat}`,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'bottom',
                                    textStyle:{
                                        //fontSize:6,
                                        color:'#FFF'
                                    },
                                    formatter: function (params) {
                                        var devname=params.value[4];
                                        devname=devname.substr(0,5);
                                        var period=params.value[3];
                                        var spacecode=params.value[2];
                                        var data_src=params.value[0];
                                        data_src=data_src.substr(5,11);
                                        var  date0=spacecode
                                        return date0;
                                    }

                                }
                            },
                            itemStyle:{
                                normal:{color:"#3472ff"},
                                textStyle:{
                                    //fontSize:6,
                                    color:'#FFF'
                                },
                            },
                            data: processData,
                        },
                        {
                            name: '将处理',
                            type: 'scatter',
                            symbolSize:28,
                            symbol:`image://${immedcSat}`,
                            label: {
                                normal: {
                                    textStyle:{
                                        fontSize:10,
                                    },
                                    show: true,
                                    position: 'bottom',
                                    textStyle:{
                                        //fontSize:6,
                                        color:'#FFF'
                                    },
                                    formatter: function (params) {
                                        var devname=params.value[4];
                                        devname=devname.substr(0,5);
                                        var period=params.value[3];
                                        var spacecode=params.value[2];
                                        var data_src=params.value[0];
                                        data_src=data_src.substr(5,11);
                                        var  date0=spacecode
                                        // return date0+"/"+data_src;
                                        return date0;
                                    }
                                }
                            },
                            itemStyle:{
                                normal:{color:"#ffc53d"},

                            },
                            data:immedcData,
                        },
                        {
                            name: '待处理',
                            type: 'scatter',
                            symbolSize:28,
                            symbol:`image://${prepsat}`,
                            label: {
                                normal: {
                                    textStyle:{
                                        fontSize:10,
                                    },
                                    show: true,
                                    position: 'bottom',
                                    textStyle:{
                                        //fontSize:6,
                                        color:'#FFF'
                                    },
                                    formatter: function (params) {
                                        var devname=params.value[4];
                                        devname=devname.substr(0,5);
                                        var period=params.value[3];
                                        var spacecode=params.value[2];
                                        var data_src=params.value[0];
                                        data_src=data_src.substr(5,11);
                                        var  date0=spacecode
                                        return date0;
                                    }
                                }
                            },
                            itemStyle:{
                                normal:{color:"#ffc53d"},
                            },
                            data:prepareData,
                        }
                    ]
                };

                myCharts.setOption(option);
            },
            //获取 指定日期之后，几天
            getNewDay(dateTemp, days) {
                var dateTemp = dateTemp.split("-");
                //转换为MM-DD-YYYY格式
                var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]);
                var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
                var rDate = new Date(millSeconds);
                var year = rDate.getFullYear();
                var month = rDate.getMonth() + 1;
                if (month < 10) month = "0" + month;
                var date = rDate.getDate();
                if (date < 10) date = "0" + date;
                return (year + "-" + month + "-" + date);
            },

            //获取 指定日期之后，几小时
            getNewHour(hours) {
                let curday = new Date(new Date(new Date())); //
                //格式化
                // curday = this.$xy.formatDate(curday,true)
                var millSeconds = Math.abs(curday) + (hours * 60 * 60 * 1000);
                var rDate = new Date(millSeconds);
                var year = rDate.getFullYear();
                var month = rDate.getMonth() + 1;
                if (month < 10) month = "0" + month;
                var date = rDate.getDate();
                if (date < 10) date = "0" + date;
                var hour = rDate.getHours();
                if (hour < 10) hour = "0" + hour;
                var min = rDate.getMinutes();
                if (min < 10) min = "0" + min;
                var sec = rDate.getSeconds();
                if (sec < 10) sec = "0" + sec;
                return (year + "-" + month + "-" + date +" "+hour+":"+min+":"+sec);
            },

            async queryTask(obj){
                // Object.assign(this.search)
                let search={ startTime:obj}
                let tmp=this.devCdsrc;

                let searchALL=Object.assign({startTime:obj},{devCd:tmp});
                console.log(searchALL);
            }
        }
    }
</script>
<style>
  .demo-split{
    background-image: url('./images/bg.jpg');
    height: 100%;
    border: 0px solid #6f7897;
  }
  .demo-split-pane{
  //background: #111216;
    height:100%;
    padding: 2px;
  }
  .demo-split-pane.no-padding{
    height: 100%;
    padding: 1;
    border: 0px solid #6f7897;
  }
  .bg{
    background-image: url('./images/border.png');
    height: 100%;
  }
  .ivu-split-trigger-horizontal{
    height:0px;width:0%;
    color: #0A2530;
  }
  .ivu-split-trigger-vertical {
    width: 1px;
    height: 100%;
    border: 1px solid #6f7897;

  }
  .lay11{ width:45%; height:50%;  border:0px solid #FF6699; float:left;position:absolute;}
  .lay12{ width:55%; height:35%; border:0px solid #FF6699; float:right;font-size:32px;color: #fff;vertical-align:top}

  .newmid{ width:100%; height:300%; border:0px solid #FF6699; float:auto;position: absolute;}
  .newmup{width:200%; height:18%;align:center; border:0px solid #FF6699;color:#FFFFFF;font-size:68px;left:35%;top:280px;opacity:0.6; float:auto;color: #fff;position:relative;}
  .newdown{width:200%; height:180%;align:center; border:0px solid #FF6699;color:#FFFFFF;font-size:32px;left:32%;top:280px;float:auto;opacity:0.8;color: #fff;position:relative; }


  .lay2left{width:160px; height:15px; padding-top:1px;padding-bottom:10px;border:0px solid #FF6699; float:left}
  .titlbg{font-size: 28px; color: rgba(255, 255, 255, 1);text-align: center;background:url('./images/title_bg.png') no-repeat;height:50px;text-align:center;background-size: 100% 100%;
    background-position: 50% 50%}

  .titlbgTS{font-size: 28px; color: rgba(255, 255, 255, 1);text-align: center;background:url('./images/title_bg.png') no-repeat;height:50px;text-align:center;background-size: 45% 100%;
    background-position: 50% 50% ;}
  .titlbgTS2{font-size: 28px; color: rgba(255, 255, 255, 1);text-align: center;float: left}
</style>
