<template>
  <div class="demo-split">
    <Split v-model="split0">
      <div slot="left" class="demo-split-pane no-padding" style=" height:101.5%;" >
        <Split v-model="split3" mode="vertical">
          <div slot="top" class="demo-split-pane"  style="border-left:0;border-right:0;border-top:0;border-bottom:1px solid #6f7897;">
            <Col span="12"  offset="-1" >
              <Card :bordered="true" style="background: #111216 ;border: 1px solid #6f7897;margin-top: 5px;margin-left: 10px;margin-bottom:10px">
                <p slot="title"   style="font-size: 15px; color: #FFFFFF;">任务规划</p>
                <Row style="background:#eee;padding:1px">
                  <Card :bordered="false" style="background:#3472ff;border: 1px solid #6f7897;">
                    <p slot="title" style="color: #fff">需求登记</p>
                    <p class="midFont">{{tkplSP+tkplNSP}}</p>
                    <p class="baseFont">指定：{{tkplSP}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;非指定：{{tkplNSP}}</p>
                  </Card>
                 </Row>
                <Row style="background:#eee;padding:1px">
                    <Card :bordered="false" style="background:#707fa2;border: 1px solid #6f7897;">
                      <p slot="title" style="color: #fff">未确认</p>
                      <p class="midFont">{{tkplSP_NConfm+tkplNSP_NConfm}}</p>
                      <p class="baseFont">指定：{{tkplSP_NConfm}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;非指定：{{tkplNSP_NConfm}}</p>
                    </Card>
                </Row>
              </Card>
            </Col>

            <Col span="12"  >
              <Card :bordered="true" style="background: #111216;border: 1px solid #6f7897;margin-top: 5px;margin-left: 10px;margin-right:15px；margin-bottom:10px">
                <p slot="title"  style="font-size: 15px; color: #FFFFFF;">资源调度</p>
                <Row style="background:#eee;padding:1px">

                  <Card :bordered="false" style="background:#3472ff;border: 1px solid #6f7897;">
                    <p slot="title" style="color: #fff">需求登记</p>
                    <p class="midFont">{{rscmSP+rscmNSP}}</p>
                    <p class="baseFont">指定：{{rscmSP}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;非指定：{{rscmNSP}}</p>
                  </Card>
                </Row>

                <Row style="background:#eee;padding:1px">
                  <Card :bordered="false" style="background:#707fa2;border: 1px solid #6f7897;">
                    <p slot="title" style="color: #fff">未确认</p>
                    <p class="midFont">{{rscmSP_NConfm+rscmNSP_NConfm}}</p>
                    <p class="baseFont">指定：{{rscmSP_NConfm}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;非指定：{{rscmNSP_NConfm}}</p>
                  </Card>
                </Row>
              </Card>
            </Col>
          </div>
          <div slot="bottom" class="demo-split-pane" style="border: 0">
            <!---右下区域内容开始--->

            <Row style="padding:5px;border:0">


                <div class="lay1left"> <p class="rightTopFont" >卫星态势图 </p></div>
                <div class="lay2left" style="float:left;width:70%;">

                  <Button  style="float:left;margin-right:5px;" type="primary" @click="drawGT('2','iD2h')" value="2"  id="iD2h">2小时</Button>
                  <Button  style="float:left;margin-right:5px;" type="default" @click="drawGT('4','iD4h')" value="4"  id="iD4h">4小时</Button>
                  <Button  style="float:left;margin-right:5px;" type="default" @click="drawGT('8','iD8h')" value="8"  id="iD8h">8小时</Button>
                  <Button  style="float:left;margin-right:5px;" type="default" @click="drawGT('12','iD12h')" value="12"  id="iD12h">12小时</Button>
                  <Button  style="float:left;margin-right:5px;" type="default" @click="drawGT('24','iD24h')" value="24"  id="iD24h">24小时</Button>

                </div>
                <Divider style="border: 0.1px solid #6f7897;"/>
                <div ref="container" :style="{width: '100%', height: '380%'}"></div>

            </Row>
            <!---右下区域内容结束--->
          </div>
        </Split>
      </div>
      <div slot="right" class="demo-split-pane no-padding" style=" height:101.5%;">
        <Split v-model="split3" mode="vertical">
          <!---左上区域内容开始--->
          <div slot="top" class="demo-split-pane"  style="border-left:0;border-right:0;border-top:0;border-bottom:1px solid #6f7897;">
            <Row style="padding:0px">
              <Col span="12" style="padding:1px">
                  <Card :bordered="true" style="background: #111216;border: 1px solid #6f7897;margin-top:5px;margin-left: 0px" >

                  <p slot="title"  style="font-size: 15px; color: #FFFFFF;border: 0px solid #6f7897;">本周计划</p>
                    <div ref="containerplan" :style="{width: '500px', height: '190%'}"></div>

                </Card>
              </col>
              <Col span="12" style="padding:1px">
                <Card :bordered="true" style="background: #111216;border: 1px solid #6f7897;margin-top: 5px;margin-left: 10px;margin-right: 5px">
                  <p slot="title"  style="font-size: 15px; color: #FFFFFF;">本周互联互通</p>

                  <div class="lay11"  style="font-size:34px;float:auto">
                    <img  src="./images/satellite.png"    width="100%"  style="opacity:0.55;"/></div>  <br>



                  <div class="lay12" style="float:right;font-size:16px;color: #fff">&nbsp;&nbsp; &#8226;&nbsp;对外申请数 &nbsp;{{apply_link_cnt}}</div><br>
                  <div class="lay12" style="float:right;font-size:16px">&nbsp;</div><br>
                  <div class="lay12" style="float:right;font-size:16px;">&nbsp;</div><br>
                  <div class="lay12" style="float:right;font-size:16px;color: #fff">&nbsp;&nbsp;&#8226;&nbsp;互联跟踪卫星数&nbsp;{{sat_link_cnt}}</div><br>

                  <div class="lay12" style="float:right;font-size:16px">&nbsp;</div><br>
                  <div class="lay12" style="float:right;font-size:16px">&nbsp;</div><br>
                  <div class="lay12" style="float:right;font-size:16px;color: #fff">&nbsp;&nbsp;&#8226;&nbsp;对外跟踪弧段数&nbsp;{{forArc_link_cnt}}</div><br>
                  <div class="lay12" style="float:right;font-size:16px">&nbsp;</div><br>

                </Card>
              </col>
            </Row>



             <Row style="padding:1px">
              <Col span="6" >
                <Card style="height:100px;background: #111216;border:1px solid #6f7897;margin-top:10px;margin-bottom:10px;margin-left: 0px">
                  <div class="laycardleft"><img  src="./images/custom.png"    width="50%"/></div>
                  <div class="rightpart">
                  <div class="laycardRight" style="font-size:30px">{{custom_cnt}}</div>
                  <div class="laycardRightText">客户</div>
          </div>
                </Card>
              </col>
              <Col span="6" >
                <Card style="height:100px;background: #111216;border: 1px solid #6f7897;margin-top:10px;margin-bottom:10px;margin-left: 10px">
                  <div class="laycardleft"> <img  src="./images/cezhan.png"    width="50%"/></div>
                  <div class="rightpart">
                  <div class="laycardRight" style="font-size:30px">{{station_cnt}} </div>
                  <div class="laycardRightText">测站</div>
          </div>
                </Card>

              </col>
               <Col span="6">
                 <Card style="height:100px;background: #111216;border: 1px solid #6f7897;margin-top:10px;margin-bottom:10px;margin-left: 10px;margin-right: 5px">
                   <div class="laycardleft"> <img  src="./images/device.png"    width="50%"/></div>
                   <div class="rightpart">
                   <div class="laycardRight" style="font-size:30px">{{dev_cnt}}  </div>
                   <div class="laycardRightText">设备</div>
          </div>
                 </Card>
               </col>
               <Col span="6" >
                 <Card style="height:100px;background: #111216;  border: 1px solid #6f7897;margin-top:10px;margin-bottom:10px;margin-left:5px;margin-right: 10px">
                   <div class="laycardleft"  style="background: #111216"> <img  src="./images/sat.png"    width="50%"/></div>
                   <div class="rightpart">
                   <div class="laycardRight" style="font-size:30px;">{{sat_cnt}}</div>
                   <div class="laycardRightText" style="background: #111216">卫星</div>
                   </div>
                 </Card>

               </col>

            </Row>

          </div>
          <!---左上区域内容结束--->
          <!---左下区域内容开始--->
          <div slot="bottom" class="demo-split-pane;" >
            <Row style="padding:10px;" >

                  <div class="lay1Right"> <p class="rightTopFont" style="width:110% ">本周跟踪弧段执行情况  </p></div>
                  <Divider style="border: 1px solid #6f7897;"/>
                  <div ref="myChart" :style="{width: '105%', height: '380%'}"></div>

            </Row>

          </div>
          <!---左下区域内容结束--->
        </Split>
      </div>
    </Split>
  </div>
</template>

    <script>
        import {rscmAptReqCnt} from '@/api/rscm/rscm_orinreq'
        import {getDevName,queryParamListValid} from '@/api/base/devInfo.js'
        import {tkplFpageCnt} from '@/api/tkpl/tkpl_ctrlReq.js'
        import {schFpageCnt,schFpageCntGT} from '@/api/sch/schArc.js'
        import {formatDate}  from '@/libs/url'
        import {customerCount,stationCount,devCount,sateCount,curBidCount,curIotSateCount,curArcCount,satPlan} from '@/api/stat/satHome'
        import {schDevGT} from '@/api/sch/schArc.js'
        const prepsat = require('../../../assets/images/sat/prepSat.png');
        const oversat = require('../../../assets/images/sat/overSat.png');
        const processSat = require('../../../assets/images/sat/processSat.png');
        const immedcSat = require('../../../assets/images/sat/immedcSat.png');

        //引入




    export default {
        data () {
            return {
                split0: 0.51,
                split3: 0.49,
                //资源调度--指定需求数
                rscmSP:0,
                //资源调度--非指定需求数
                rscmNSP:0,
                //资源调度未确认的 指定数
                rscmSP_NConfm:0,
                //资源调度未确认的 非指定数
                rscmNSP_NConfm:0,

                //任务规划--指定需求数
                tkplSP:0,
                //任务规划--非指定需求数
                tkplNSP:0,
                //任务规划未确认的 指定数
                tkplSP_NConfm:0,
                //任务规划未确认的 非指定数
                tkplNSP_NConfm:0,
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
                    devCd:''
                },
                startTime:'',
                endTime:'',
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
            this.initDevMenu()
            this.init()

          //  this.initSelectMenu()
           // this.arcsTypeSelect()
           // this.TypeSelect()
            this.doquery_plan();
            this.drawLine();
            this.drawGT();
        },
        methods: {
            //设备查询下拉框
            initDevMenu() {
                this.$xy.getDevInfoSelect('0').then(res => {
                    this.devCdList = res
                    //赋值默认值
                    let schArc = {
                        devCd: 'QSX73C'

                    }
                    console.log(res);
                })
            },
            sendReq: function (obj) {
                this.search = Object.assign(this.search, obj)
                this.init()
            },
            async init() {


                this.doQuery_tkpl();
                this.doQuery_rscm();
                this.doQuery_righttop();
            },
            //本周计划pie图


            //本周跟踪弧段执行情况
            async drawLine() {
               //获取设备编号
               let tmp = this.schArc.devCd;
               let searchALL = Object.assign({devCd: tmp});
               console.log("tmp");
               console.log(searchALL);
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
                            color: '#fff',
                            fontSize: 13
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
                                color: '#fff',  //更改坐标轴文字颜色
                                fontSize : 12      //更改坐标轴文字大小
                            }

                        },
                        data: ["遥测","遥测+数传","遥测+数传+遥控","遥测+数传+遥控+注入"]

                    },
                    yAxis: {
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff',  //更改坐标轴文字颜色
                                fontSize : 13      //更改坐标轴文字大小
                            }
                        },
                        //网格线样式
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
            async drawGT(obj,id){

                let {result, success, message} = await queryParamListValid()
                if (success) {
                    this.tmparray = eval(result.records)
                }
                //延迟0.1秒
                await new Promise((resolve, reject) => setTimeout(resolve, 100));
                //获取设备编号
                let tmp=this.devCdsrc;
                let endTime=this.getNewHour(2);

                //如果是空，或者0，则是当天
                if(obj==null||obj=='2'){
                    obj=this.getNewHour(-2);
                    endTime=this.getNewHour(2);
                    console.log("2obj");
                    console.log(obj);
                    console.log(endTime);
                    //当日的按钮样式调整
                    document.getElementById("iD2h").style.backgroundColor="#3472ff";
                    document.getElementById("iD2h").style.color="#fff";
                    document.getElementById("iD4h").style.backgroundColor="#FFF";
                    document.getElementById("iD4h").style.color="#000";
                    document.getElementById("iD8h").style.backgroundColor="#FFF";
                    document.getElementById("iD8h").style.color="#000";
                    document.getElementById("iD12h").style.backgroundColor="#FFF";
                    document.getElementById("iD12h").style.color="#000";
                    document.getElementById("iD24h").style.backgroundColor="#FFF";
                    document.getElementById("iD24h").style.color="#000";
                }
                //获取4
                if(obj=='4'){
                    obj=  this.getNewHour(-4)
                    endTime=this.getNewHour(4);
                    document.getElementById("iD2h").style.backgroundColor="#FFF";
                    document.getElementById("iD2h").style.color="#000";
                    document.getElementById("iD4h").style.backgroundColor="#3472ff";
                    document.getElementById("iD4h").style.color="#fff";
                    document.getElementById("iD8h").style.backgroundColor="#FFF";
                    document.getElementById("iD8h").style.color="#000";
                    document.getElementById("iD12h").style.backgroundColor="#FFF";
                    document.getElementById("iD12h").style.color="#000";
                    document.getElementById("iD24h").style.backgroundColor="#FFF";
                    document.getElementById("iD24h").style.color="#000";
                }
                //8h
                if(obj=='8'){
                    obj=  this.getNewHour(-8)
                    endTime=this.getNewHour(8);
                    document.getElementById("iD2h").style.backgroundColor="#FFF";
                    document.getElementById("iD2h").style.color="#000";
                    document.getElementById("iD4h").style.backgroundColor="#FFF";
                    document.getElementById("iD4h").style.color="#000";
                    document.getElementById("iD8h").style.backgroundColor="#3472ff";
                    document.getElementById("iD8h").style.color="#fff";
                    document.getElementById("iD12h").style.backgroundColor="#FFF";
                    document.getElementById("iD12h").style.color="#000";
                    document.getElementById("iD24h").style.backgroundColor="#FFF";
                    document.getElementById("iD24h").style.color="#000";
                }
                //8h
                if(obj=='12'){
                    obj=  this.getNewHour(-12)
                    endTime=this.getNewHour(12);
                    document.getElementById("iD2h").style.backgroundColor="#FFF";
                    document.getElementById("iD2h").style.color="#000";
                    document.getElementById("iD4h").style.backgroundColor="#FFF";
                    document.getElementById("iD4h").style.color="#000";
                    document.getElementById("iD8h").style.backgroundColor="#FFF";
                    document.getElementById("iD8h").style.color="#000";
                    document.getElementById("iD12h").style.backgroundColor="#3472ff";
                    document.getElementById("iD12h").style.color="#fff";
                    document.getElementById("iD24h").style.backgroundColor="#FFF";
                    document.getElementById("iD24h").style.color="#000";
                }
                //8h
                if(obj=='24'){
                    obj=  this.getNewHour(-24)
                    endTime=this.getNewHour(24);
                    document.getElementById("iD2h").style.backgroundColor="#FFF";
                    document.getElementById("iD2h").style.color="#000";
                    document.getElementById("iD4h").style.backgroundColor="#FFF";
                    document.getElementById("iD4h").style.color="#000";
                    document.getElementById("iD8h").style.backgroundColor="#FFF";
                    document.getElementById("iD8h").style.color="#000";
                    document.getElementById("iD12h").style.backgroundColor="#FFF";
                    document.getElementById("iD12h").style.color="#000";
                    document.getElementById("iD24h").style.backgroundColor="#3472ff";
                    document.getElementById("iD24h").style.color="#fff";
                }
                console.log(obj)
                let searchALL=Object.assign({startTime:obj},{endTime:endTime},{devCd:tmp});
                console.log(searchALL);
                let resulttmp= await schDevGT(searchALL)
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
                let myCharts = this.$echarts.init(this.$refs.container)
                var  option= {

                    grid: {
                        left: '5%',
                        right: 10,
                        top: '5%',
                        bottom: '10%'
                    },
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
                            color: '#fff',
                            fontSize: 15
                        }

                    },

                    dataZoom: [{
                        type: 'slider',
                        height: 2,
                        bottom: 40,
                        borderColor: 'transparent',
                        backgroundColor: '#e2e2e2',
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                        handleSize: 20,
                        handleStyle: {
                            shadowBlur: 6,
                            shadowOffsetX: 1,
                            shadowOffsetY: 2,
                            shadowColor: '#red'
                        }
                    }, {
                        type: 'inside'
                    }],

                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'time',
                        name:'时间',
                        axisLabel: {
                            rotate: -20,
                            textStyle: {
                                color: '#fff',  //更改坐标轴文字颜色
                                fontSize : 13      //更改坐标轴文字大小
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
                        type: 'value',
                        name:'设备',
                        min:0, //y轴的最小值
                       //  max:that.tmparray.length, //y轴最大值

                        //axisLabel: {formatter: '{value} %'}
                        axisLabel: {formatter: function (value) {
                                var res ='';
                                if(value<1){return  '' }
                                if(value>that.tmparray.length){return  '' }
                                //整数的时候，坐标轴上显示值
                                if(((value-1)%1)==0){
                                    res=eval(that.tmparray[value-1]).devName;
                                }
                                return res
                            },
                             textStyle: {
                                color: '#fff',  //更改坐标轴文字颜色
                                fontSize : 13      //更改坐标轴文字大小
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
                    series: [
                        {
                            name: '已完成',
                            type: 'scatter',
                            symbolSize:30,
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
                            symbolSize:30,
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
                                    color:'#000'
                                },
                            },
                            //  data: processDataIdle,
                            data: processData,
                        },
                        {
                            name: '将处理',
                            type: 'scatter',
                            symbolSize:30,
                            symbol:`image://${immedcSat}`,
                            label: {
                                normal: {
                                    textStyle:{
                                        fontSize:5,
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
                            symbolSize:30,
                            symbol:`image://${prepsat}`,
                            label: {
                                normal: {
                                    textStyle:{
                                        fontSize:5,
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
            async doQuery_rscm() {
                let result= await rscmAptReqCnt()
                console.log(" this.rscmSP  result")
                console.log(result)
                console.log(result.length)
                console.log(" this.rscmSP  result2")
                 if(result.length>=1) {
                    this.rscmSP = result[0].rscmSP;
                    console.log(" this.rscmSP")
                    console.log(this.rscmSP)
                    this.rscmNSP = result[0].rscmNSP;
                    this.rscmSP_NConfm = result[0].rscmSPNConfm;
                    this.rscmNSP_NConfm = result[0].rscmNSPNConfm;
                             }
                  },
            async  doQuery_tkpl() {
                    let resultTkpl= await tkplFpageCnt()
                     console.log("resultTkpl.length="+resultTkpl.length);
                    if ((resultTkpl[0])) {
                       this.tkplSP=resultTkpl[0].tkplSP;
                       this.tkplNSP = resultTkpl[0].tkplNSP;
                       this.tkplSP_NConfm = resultTkpl[0].tkplSPNConfm;
                       this.tkplNSP_NConfm = resultTkpl[0].tkplNSPNConfm;
                    }

            },
            //显示计划
            async doquery_plan() {
                let that=this;
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
                var option = {
                    title: {
                        text: '计划数',
                        subtext: all_cnt,
                        x: 'center',
                        y: 'center',
                        textStyle : {
                            fontWeight : 'normal',
                            color:'#fff',
                            fontSize : 14
                        }
                    },
                  /* tooltip: {
                     trigger: 'item',
                       formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },*/

                    legend: {
                        textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 13,

                        },

                        orient: 'vertical',
                        left: 0.5,
                        top :10,
                       // data: ['卫星设备计划', '总计划', '程控计划', '设备工作计划', '软件调度计划','通用调度计划','遥控计划']
                        data:planTypearray,
                        formatter: function (name) {
                            for(let tmp=0;tmp<that.plancntlList.length;tmp++){
                                if (that.plancntlList[tmp].name == name)
                                    return name +":    "+that.plancntlList[tmp].value;
                            };
                        }

                    },

                    series: [
                        {
                            name: '计划',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            //avoidLabelOverlap: false,

                           label : {
                                normal : {
                                    show: false,
                                   // formatter: '{b}:{c}: ({d}%)',
                                    textStyle : {
                                        fontWeight : 'normal',
                                        fontSize : 10
                                    }
                                }
                            },

                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                //show: true
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
    background-image: url('../../../assets/images/bg.jpg');
    height: 100%;
    border: 0px solid #6f7897;

  }
  .demo-split-pane{
    background: #111216;
    height:100%;
    padding: 4px;
    border: 1px solid #6f7897;
  }
  .demo-split-pane2{

    height:100px;
    padding: 2px;
    border: 0px solid #6f7897;

  }

  .demo-split-pane.no-padding{

    height: 100%;
    padding: 1;
    border: 0.1px solid #6f7897;
  }
  .ivu-split-trigger-horizontal{
    height:0px;width:100%;
    border: 0px solid #6f7897;
  }
  .ivu-split-trigger-vertical {
    width: 0px;
    height: 100%;
    border: 0px;
  }


  .titlefont{
    font-size: 15px;
    color: #FFFFFF;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .midFont{
    font-size: 35px;
    color: #FFFFFF;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .baseFont{
    font-size: 15px;
    color: #FFFFFF;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .rightTopFont{
    font-size: 15px;
    color: #FFFFFF;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .lay1{ width:140px; height:20px; border:0px solid #FF6699; float:left}
  .lay2{ width:140px; height:20px; border:0px solid #FF6699; float:left}
  .lay11{ width:170px; height:50px; border:0px solid #FF6699; float:left}
  .lay12{ width:170px; height:20px; border:0px solid #FF6699; float:left}
  .lay3{ width:20px; height:20px; border:0px solid #FF6699; float:left}
  .lay1left{ width:140px; height:34px; border:0px solid #FF6699; float:left}
  .laycardleft{ width:120px; height:60px; border:0px solid #FF6699; float:left;opacity:0.7;}
  .laycardRight{ position:absolute;right:0px;top:5px; width:100px; height:21px; border:0px solid #FF6699; color: #fff}
  .laycardRightText{position:absolute;right:0px;bottom:3px; width:100px; height:32px; border:0px solid #FF6699;color: #fff }
  .lay2left{width:160px; height:15px; padding-top:1px;padding-bottom:10px;border:0px solid #FF6699; float:left}
  .lay1Right{ width:140px; height:34px; border:0px solid #FF6699; float:left}
  .lay2Right{ width:140px; height:15px; border:0px solid #FF6699; float:left}
  .header-bar{height: 20px}
  .rightpart{
    float: left;width: 150px;height: 250px;text-align:center;
  }
</style>
