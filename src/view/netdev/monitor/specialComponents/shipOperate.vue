<template>
  <div>
    <RadioGroup @on-change="clickHand" v-model="btnCheck">
      <template v-for="(info,index) in topBtns">
        <Radio style="width: 100px;margin-bottom: 5px" :label="info.id" border>{{ info.name }}</Radio>
      </template>
    </RadioGroup>
    <Row style="margin-top: 15px">
      <Col :xs="24" :sm="24" :lg="24" :md="24">
        <Card v-if="btnCheck == '0000'">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-24">
              <Alert type="success">当前状态为待机</Alert>

            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == '0001'">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-17">
              <div class="title-text">手动</div>
              <Form :model="handmic" :label-width="100">
                <Row>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="方位" prop="menuTitle">
                      <Poptip trigger="focus">
                        <InputNumber :active-change="false" :min="handMin" :max="handMax" :step="0.1" style="width: 95%" v-model.trim="handmic.az" placeholder="方位"></InputNumber>
                        <div slot="content">最小值:{{ handMin }} ~ 最大值:{{handMax}}</div>
                      </Poptip>

                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button style="background: #009688;color: white" @click="run('az',handmic.az)">执行</Button>
                    <Button style="background: #009688;color: white"@click="run('az',0,true)">停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="俯仰" prop="menuName">
                      <Poptip trigger="focus">
                        <InputNumber :active-change="false" :min="handMin" :max="handMax" :step="0.1"  style="width: 95%" v-model.trim="handmic.el" placeholder="俯仰"></InputNumber>
                        <div slot="content">最小值:{{ handMin }} ~ 最大值:{{handMax}}</div>
                      </Poptip>

                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button style="background: #009688;color: white" @click="run('el',handmic.el)">执行</Button>
                    <Button style="background: #009688;color: white" @click="run('el',0,true)">停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="交叉" prop="menuName">
                      <Poptip trigger="focus">
                        <InputNumber :active-change="false" :min="handMin" :max="handMax" :step="0.1"  style="width: 95%" v-model.trim="handmic.jc" placeholder="交叉"></InputNumber>
                        <div slot="content">最小值:{{ handMin }} ~ 最大值:{{handMax}}</div>
                      </Poptip>

                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button style="background: #009688;color: white" @click="run('jc',handmic.jc)">执行</Button>
                    <Button style="background: #009688;color: white" @click="run('jc',0,true)">停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="极化" prop="menuName">
                      <Poptip trigger="focus">
                        <InputNumber :active-change="false" :min="handMin" :max="handMax" :step="0.1"  style="width: 95%" v-model.trim="handmic.pol" placeholder="极化"></InputNumber>
                        <div slot="content">最小值:{{ handMin }} ~ 最大值:{{handMax}}</div>
                      </Poptip>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button style="background: #009688;color: white" @click="run('pol',handmic.pol)">执行</Button>
                    <Button style="background: #009688;color: white" @click="run('pol',0,true)">停止</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == '1111'">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-17">
              <div class="title-text">步进</div>
              <Row style="margin-left: 30px">
                <Col :xs="12" :lg="6" :md="10">
                  <Row>
                    <Col :xs="20" :lg="20" :md="20">
                      <div class="col-text" @click="changePos('el',2)">
                        <p>俯仰+</p>
                        <Icon type="md-arrow-round-up" size="38"/>
                      </div>
                    </Col>
                    <Col :xs="24" :lg="24" :md="24">
                      <div>
                        <span @click="changePos('az',1)" style="cursor: pointer">方位-
                          <Icon type="md-arrow-round-back"  size="38" style="margin-right: 40px"/>
                        </span>
                        <span @click="changePos('az',2)" style="cursor: pointer">
                          <Icon type="md-arrow-round-forward" size="38"/>方位+
                        </span>
                      </div>
                    </Col>
                    <Col :xs="20" :lg="20" :md="20">
                      <div class="col-text" @click="changePos('el',1)">
                        <Icon type="md-arrow-round-down" size="38"/>
                        <p>俯仰-</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col :xs="12" :lg="6" :md="10">
                  <Row>
                    <Col :xs="20" :lg="20" :md="20">
                      <div @click="changePos('pol',2)" class="col-text">
                        <p>极化+</p>
                        <Icon type="md-arrow-round-up" size="38"/>
                      </div>
                    </Col>
                    <Col :xs="24" :lg="24" :md="24">
                      <div>
                        <span @click="changePos('jc',1)" style="cursor: pointer">交叉-
                          <Icon type="md-arrow-round-back"  size="38" style="margin-right: 40px"/>
                        </span>
                        <span @click="changePos('jc',2)" style="cursor: pointer">
                          <Icon type="md-arrow-round-forward" size="38"/>交叉+
                        </span>
                      </div>
                    </Col>
                    <Col :xs="20" :lg="20" :md="20">
                      <div @click="changePos('pol',1)" class="col-text">
                        <Icon type="md-arrow-round-down" size="38"/>
                        <p>极化-</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col :xs="24" :lg="24" :md="24" style="margin-top: 30px">
                  <Form>
                    <FormItem label="步进角度" :label-width="90">
                      <InputNumber :min="0" :max="360" :step="0.1" style="width: 40%" v-model.trim="stepAngel" placeholder="步进角度"></InputNumber>
                    </FormItem>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == '0010'">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-17">
              <div class="title-text">指向</div>
              <Form :model="automic" :label-width="100">
                <Row>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="方位" prop="az">
                      <Poptip trigger="focus">
                        <InputNumber :active-change="false" :min="0" :max="360" :step="0.1" style="width: 95%" v-model.trim="automic.az" placeholder="方位"></InputNumber>
                        <div slot="content">最小值:0 ~ 最大值:360</div>
                      </Poptip>
                    </FormItem>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="俯仰" prop="el">
                      <Poptip trigger="focus">
                        <InputNumber :active-change="false"  :min="15" :max="110" :step="0.1" style="width: 95%" v-model.trim="automic.el" placeholder="俯仰"></InputNumber>
                        <div slot="content">最小值:15 ~ 最大值:110</div>
                      </Poptip>

                    </FormItem>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="交叉" prop="jc">
                      <Poptip trigger="focus">
                        <InputNumber :active-change="false" :min="-25" :max="25" :step="0.1"  style="width: 95%" v-model.trim="automic.jc" placeholder="交叉"></InputNumber>
                        <div slot="content">最小值:-25 ~ 最大值:25</div>
                      </Poptip>

                    </FormItem>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="极化" prop="pol">
                      <Poptip trigger="focus">
                        <InputNumber :active-change="false" :min="-45" :max="225" :step="0.1"  style="width: 95%" v-model.trim="automic.pol" placeholder="极化"></InputNumber>
                        <div slot="content">最小值:-45 ~ 最大值:225</div>
                      </Poptip>

                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button style="background: #009688;color: white" @click="byHand(3)">执行</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == '0100'">
          <Row>
            <Col :xs="17" :lg="17" :md="17" class="col-17">
              <div class="title-text">星下点</div>
              <Form :model="starModel" :label-width="80">
                <Row style="padding: 0 10px">
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="卫星经度" prop="star">
                      <auto-complete
                        ref = "test"
                        v-model="starModel.star"
                        @on-change="changeSel(1,'test')"
                        @on-select="selectSel(1,$event,'test')"
                        style="width:200px" icon="ios-arrow-down" >
                        <Option v-for="item in oldArr" :value="item.name+'|'+item.code"  :key="item.code" >
                          <span >{{item.name}}</span>
                        </Option>
                      </auto-complete>

                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="卫星纬度" prop="satWd">
                      <Input v-model.trim="starModel.satWd" placeholder="卫星纬度" Number></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem  label="极化形式" prop="isLevel">
                      <Select @on-change="getHz(1,$event)" v-model="starModel.isLevel">
                        <Option value="0">水平极化</Option>
                        <Option value="1">垂直极化</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="频率" prop="freq">
                      <Input v-model.trim="starModel.freq" placeholder="频率" Number>
                        <span slot="suffix">MHs</span>
                      </Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="24" :md="24">
                    <FormItem>
                      <!--                      <Button @click="starPrepare(1)" style="margin-right: 20px;background: #009688;color: white">确认-->
                      <!--                      </Button>-->
                      <Button  @click="byHand(1)"   style="margin-right: 20px;background: #009688;color: white" >手动</Button>
                      <Button  @click="byAuto(1)" style="background: #009688;color: white" >自动</Button>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="24" :md="24"></Col>
                  <!--                  <Col :xs="24" :lg="12" :md="12">-->
                  <!--                    <FormItem label="方位" prop="az">-->
                  <!--                      <Input v-model.trim="starModel.az" placeholder="方位" Number></Input>-->
                  <!--                    </FormItem>-->
                  <!--                  </Col>-->
                  <!--                  <Col :xs="24" :lg="12" :md="12">-->
                  <!--                    <FormItem label="俯仰" prop="el">-->
                  <!--                      <Input v-model.trim="starModel.el" placeholder="俯仰" Number></Input>-->
                  <!--                    </FormItem>-->
                  <!--                  </Col>-->
                  <!--                  <Col :xs="24" :lg="12" :md="12">-->
                  <!--                    <FormItem label="极化" prop="pol">-->
                  <!--                      <Input v-model.trim="starModel.pol" placeholder="极化" Number></Input>-->
                  <!--                    </FormItem>-->
                  <!--                  </Col>-->
                </Row>
              </Form>
            </Col>
            <Col :xs="6" :lg="6" :md="6" class="col-6">
              <div class="title-text">姿态信息</div>
              <Row style="padding:0 10px">
                <Col :xs="24" :lg="24" :md="24">
                  <Form :model="stargestureData" :label-width="40">
                    <Row>
                      <Col :xs="24" :lg="24" :md="24">
                        <FormItem label="经度" prop="devJd">
                          <Input v-model.trim="stargestureData.devJd" placeholder="经度"></Input>
                        </FormItem>
                      </Col>
                      <Col :xs="24" :lg="24" :md="24">
                        <FormItem label="纬度" prop="devWd">
                          <Input v-model.trim="stargestureData.devWd" placeholder="纬度"></Input>
                        </FormItem>
                      </Col>
                      <!--                      <FormItem>-->
                      <!--                        <Button  style="background: #009688;color: white">确定</Button>-->
                      <!--                      </FormItem>-->
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == '0110'">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-24">
              <Alert type="success">当前状态为扫描跟踪</Alert>
            </Col>
          </Row>

        </Card>
        <Card v-if="btnCheck == '0101'">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-24">
              <Alert type="success">当前状态为扫自跟踪</Alert>
            </Col>
          </Row>

        </Card>
        <Card v-if="btnCheck == '0011'" style="height: 340px">
          <Row>
            <Col :xs="17" :lg="17" :md="17" class="col-17">
              <div class="title-text">空间指向</div>
              <div style="padding:0 10px">
                <div class="zone-title">
                  <Form :model="zoneDirect" :label-width="70">
                    <Row>
                      <Col :xs="14" :lg="14" :md="14" push="4">
                        <FormItem label="卫星预置" prop="star">
                          <auto-complete
                            ref = "starTest"
                            v-model="zoneDirect.star"
                            @on-change="changeSel(2,'starTest')"
                            @on-select="selectSel(2,$event,'starTest')"
                            style="width:200px" icon="ios-arrow-down" >
                            <Option v-for="item in starArr" :value="item.name+'|'+item.code"  :key="item.code" >
                              <span >{{item.name}}</span>
                            </Option>
                          </auto-complete>
                        </FormItem>
                      </Col>
                      <Col :xs="24" :lg="24" :md="24"></Col>
                      <Col :xs="17" :lg="17" :md="17" push="2">
                        <RadioGroup @on-change="getHz(2,$event)" v-model="zoneDirect.isLevel">
                          <Radio label="0">水平极化</Radio>
                          <Radio label="1">垂直极化</Radio>
                        </RadioGroup>
                      </Col>
                      <Col :xs="3" :lg="3" :md="3">
                        <Button @click="starPrepare(2)" style="margin-top: 4px;background: #009688;color: white" type="primary" size="small">确认
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
                <Form :model="zoneData" :label-width="120">
                  <Row>
                    <Col :xs="24" :lg="12" :md="12">
                      <FormItem label="方位" prop="az">
                        <Input v-model.trim="zoneData.az" placeholder="方位" Number></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :lg="12" :md="12">
                      <FormItem label="俯仰" prop="el">
                        <Input v-model.trim="zoneData.el" placeholder="俯仰" Number></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :lg="12" :md="12">
                      <FormItem label="极化" prop="pol">
                        <Input v-model.trim="zoneData.pol" placeholder="极化" Number></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :lg="12" :md="12">
                      <FormItem label="频率" prop="freq">
                        <Input v-model.trim="zoneData.freq" placeholder="频率" Number>
                          <span slot="suffix">MHs</span>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :lg="24" :md="24">
                      <FormItem>
                        <Button @click="byHand(2)"  style="margin-right: 20px;background: #009688;color: white">手动</Button>
                        <Button @click="byAuto(2)"  style="background: #009688;color: white" >自动</Button>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>

            </Col>
            <Col :xs="6" :lg="6" :md="6"  class="col-6">
              <div class="title-text">姿态信息</div>
              <Row style="padding:0 10px">
                <Col :xs="24" :lg="24" :md="24">
                  <Form :model="gestureData" :label-width="40">
                    <Row>
                      <Col :xs="24" :lg="24" :md="24">
                        <FormItem label="经度" prop="devJd">
                          <Input v-model.trim="gestureData.devJd" placeholder="经度" Number></Input>
                        </FormItem>
                      </Col>
                      <Col :xs="24" :lg="24" :md="24">
                        <FormItem label="纬度" prop="devWd">
                          <Input v-model.trim="gestureData.devWd" placeholder="纬度" Number></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

  </div>
</template>

<script>
    import {ctrlAngle, getLocalDeg,operCtrl,autoCtrl,getNowState} from "@/api/monitor/ShipAcu"
    import {queryCtrlInfo} from "@/api/monitor/DeviceParam";
    export default {
        name: "shipOperate",
        data() {
            return {
              devNo:'',
                saveValue1:'',
                saveValue2:'',
                stepAngel:0.1,
                btnCheck: '0000',
                handmic:{
                    jc:1,
                    az:1,
                    el:1,
                    pol:1,
                },//手动
                automic:{
                    jc:0,
                    az:0,
                    el:0,
                    pol:0,
                },//自动
                starModel: {
                    satWd:0.000,
                    star:'亚太6C',
                    isLevel:'0',
                    freq:'',
                    // az:'',
                    // el:'',
                    // pol:'',
                },
                zoneDirect: {
                    star:'亚太6C',
                    isLevel:'0'
                },//卫星预置
                zoneData: {
                    az:'',
                    el:'',
                    pol:'',
                    freq:''
                },//空间指向
                gestureData:{
                    devJd:'',
                    devWd:''
                },//空间指向姿态信息
                stargestureData:{
                    devJd:'',
                    devWd:''
                },//星下点姿态信息
                topBtns: [
                    {id: '0000', name: '待机'},
                    {id: '0001', name: '手动'},
                    {id: '1111', name: '步进'},
                    {id: '0010', name: '指向'},
                    {id: '0100', name: '星下点'},
                    {id: '0110', name: '扫描跟踪'},
                    {id: '0101', name: '自跟踪'},
                    {id:'0011', name: '空间指向'}
                ],
                selects: [
                    {code: 1, name: '亚太6C', long: 134.0, vertical: 12250, horizon: 12749.8},
                    {code: 2, name: '中兴10号', long: 110.5, vertical: 12741, horizon: 12745}
                ],

                starArr:[],//存储select下拉框绑定的列表
                oldArr:[],//存储select下拉框绑定的列表
                nowSel: 1,    //存储需要提交给后台的value
                lastLabel: '',    //存储上一次输入的内容
                isSel:false, ////由于选中和输入内容都会触发onchange，设置此变量进行区分两种情况
                isCheck:false,
                starMap:{
                    1:{
                        vertical: 12250, horizon: 12749.8
                    },
                    2:{
                        vertical: 12741, horizon: 12745
                    }
                },
                handMin:-20,
                handMax:20,
            }
        },
        mounted(){
          if(this.$route.name != 'home'){
            this.getState()
            this.getNowPosition()
          }

        },
        created:function(){
          this.$xy.vector.$on('pageInfo', this.getDevNo)
            this.oldArr = this.selects;    //页面初次加载，下拉列表就是原始列表
            this.starArr = this.selects;    //页面初次加载，下拉列表就是原始列表
        },
      beforeDestroy: function () {
        this.$xy.vector.$off('pageInfo', this.getDevNo)
      },
        methods:{
          getDevNo(data){
            this.devNo = data.devNo
            this.getState()
            this.getNowPosition()
          },
            filterMethod:function(value,arr,flag) {
                var newArr = [];
                for(var i=0;i<arr.length;i++){
                    if(arr[i].name.toUpperCase().indexOf(value.toUpperCase()) !== -1){
                        //模糊查询到了，塞入新数组
                        newArr.push(arr[i]);
                    }
                }
                if(flag == 1){
                    this.oldArr = newArr;
                }else{
                    this.starArr = newArr;
                }
            },
            changeSel:function(flag,refName){
                //更改事件
                var that = this;

                if(that.isSel){
                    //如果输入框的改变是选中内容引发的，就什么也不做，同时重新初始化标识，为了解决选中同一内容两次引发的bug
                    that.isSel = false;
                    return false;
                }else{
                    that.isCheck = true//仅输入
                }
                if(flag == 1){
                    var input = that.starModel.star;    //获取输入框输入的内容
                }else{
                    var input = that.zoneDirect.star;    //获取输入框输入的内容
                }
                that.nowSel = input;
                that.clearSelCss(that,refName);
                //将输入内容与上一次的输入内容比对上一次输入内容，判断是到初始化列表中查还是从上次查询结果列表查
                if(input == null || input == undefined || input == ""){
                    //输入内容是空，显示原始列表
                    if(flag == 1){
                        that.oldArr = that.selects;
                    }else{
                        that.starArr = that.selects;
                    }
                }else if(input.indexOf(that.lastLabel)==0){
                    //此次输入内容是上次输入内容的开头，不需要到原始列表查，只要到上次查询结果中查
                    if(flag == 1){
                        that.filterMethod(input,that.oldArr,flag);
                    }else{
                        that.filterMethod(input,that.starArr,flag);
                    }
                }else{
                    //其他情况到原始列表中查
                    that.filterMethod(input,that.selects);
                }
                this.lastLabel = input;
            },
            selectSel:function(flag,val,refName){
                let that = this;
                that.isCheck = false
                //选中事件
                that.isSel = true;
                var label = val.split("|")[0];
                that.nowSel = val.split("|")[1];
                that.$nextTick(function () {
                    if(flag == 1){
                        that.starModel.star = label;
                    }else{
                        that.zoneDirect.star = label;
                    }
                    that.clearSelCss(that,refName);
                    var focusItem =  that.$refs[refName].$el.querySelector('.ivu-select-item-focus')
                    //定义一个属性，用于给选中项设置样式，之所以不设置class，是因为iview会将class替换掉
                    focusItem.setAttribute("myfocus","myfocus");
                });
                this.getStar(flag,val)
            },
            clearSelCss:function(that,ref){
                //清除掉已经被选中的项的css
                var lastSel = that.$refs[ref].$el.querySelector("[myfocus]");
                if(lastSel){
                    lastSel.removeAttribute("myfocus");
                }
            },
            async getState(){
                let {result, success, message} = await getNowState({devNo:this.devNo ? this.devNo : this.$route.name})
                if(success){
                    this.btnCheck = result.func
                    if(result.func == '0100'){
                        this.getHz(1,'0')
                    }else if(result.func == '0011'){
                        this.getHz(2,'0')
                    }
                }
            },
            async changePos(name,symb){//1是-，2是+
                let obj = {
                    devNo:this.devNo ? this.devNo : this.$route.name,
                    func:this.btnCheck,
                }
                obj[name] = symb == 1?-this.stepAngel:this.stepAngel
                let {result, success, message} = await operCtrl(obj)
                if(success){
                    this.$Notice.success({
                        title: '成功',
                        desc: message,
                        duration: 3
                    })
                }else{
                    this.$Notice.error({
                        title: '失败',
                        desc: message,
                        duration: 3
                    })
                }
            },
            async run(name,value,tag){
                let obj={
                    func:this.btnCheck,
                    devNo:this.devNo ? this.devNo : this.$route.name
                }
                obj[name] = value
                let {result, success, message} = await operCtrl(obj)
                if(success){
                    if(tag){
                        this.$set(this.handmic,name,0)
                    }
                    this.$Notice.success({
                        title: '成功',
                        desc: message,
                        duration: 3
                    })
                }else{
                    this.$Notice.error({
                        title: '失败',
                        desc: message,
                        duration: 3
                    })
                }
            },
            clickHand(value){//点击按钮触发手动执行
                this.nowSel = 1
                this.lastLabel = ''
                this.isSel = false
                if(value == '0000' || value == '0110' || value == '0101'){
                    this.byHand()
                }else if(value == '0100'){
                    this.getHz(1,'0')
                }else if(value == '0011'){
                    this.getHz(2,'0')
                }
            },
            async getNowPosition(){
                let {result, success, message} = await getLocalDeg({devNo: this.devNo ? this.devNo : this.$route.name})
                if(success){
                    this.gestureData.devJd = result.devJd
                    this.gestureData.devWd = result.devWd
                    this.stargestureData.devJd = result.devJd
                    this.stargestureData.devWd = result.devWd
                }
            },
            getHz(flag,data){//根据水平或者垂直选择频率
                if(flag == 1){
                    this.starModel.freq = data == '0'? this.starMap[this.nowSel].horizon:this.starMap[this.nowSel].vertical
                }else{
                    this.zoneData.freq = data == '0'? this.starMap[this.nowSel].horizon:this.starMap[this.nowSel].vertical
                }
            },
            getStar(flag,data){//选择卫星
                if(data){
                    if(flag == 1){
                        this.getHz(1,'0')
                    }else{
                        this.getHz(2,'0')
                    }
                }

            },
            async  starPrepare(flag){//星预置选择卫星
                let obj = {
                    isLevel:this.zoneDirect.isLevel == '0'?true:false,
                }
                if(this.isCheck){
                    obj.satJd = this.nowSel
                }else{
                    obj.satJd = this.nowSel == 1?'134.0':'110.5'
                }
                obj = Object.assign(obj,this.gestureData)
                let {result, success, message} = await ctrlAngle(obj)
                if(success){
                    if(flag == 1){
                        this.starModel.az = result.az
                        this.starModel.el = result.el
                        this.starModel.pol = result.pol

                    }else{
                        this.zoneData.az = result.az
                        this.zoneData.el = result.el
                        this.zoneData.pol = result.pol
                    }

                }else{
                    this.$Notice.error({
                        title: '失败',
                        desc: message,
                        duration: 3
                    })
                }
            },
            async byHand(flag){//手动
                let obj={
                    devNo:this.devNo ? this.devNo : this.$route.name,
                    func:this.btnCheck,
                }
                if(flag == 2){
                    obj = Object.assign(obj,this.zoneData)
                }else if(flag == 1){
                    let level = flag == 1?(this.starModel.isLevel == '0'?true:false):(this.zoneDirect.isLevel == '0'?true:false)
                    let param = {
                        satWd:this.starModel.satWd,
                        isLevel:level,
                        freq:this.starModel.freq
                    }
                    if(this.isCheck){
                        param.satJd = this.nowSel
                    }else{
                        param.satJd = flag == 1?(this.nowSel == 1?'134.0':'110.5'):(this.nowSel == 1?'134.0':'110.5')
                    }
                    obj = Object.assign(obj,param)
                }else if(flag == 3){
                    let param = {
                        az:this.automic.az,
                        el:this.automic.el,
                        pol:this.automic.pol,
                        jc:this.automic.jc
                    }
                    obj = Object.assign(obj,param)
                }
                let {result, success, message} = await operCtrl(obj)
                if(success){
                    this.$Notice.success({
                        title: '成功',
                        desc: message,
                        duration: 3
                    })
                }else{
                    this.$Notice.error({
                        title: '失败',
                        desc: message,
                        duration: 3
                    })
                }
            },
            async byAuto(flag){//自动
                let obj={
                    devNo:this.devNo ? this.devNo : this.$route.name,
                    func:this.btnCheck,
                }
                if(flag == 2){
                    obj = Object.assign(obj,this.zoneData)
                }else if(flag == 1){
                    let level = flag == 1?(this.starModel.isLevel == '0'?true:false):(this.zoneDirect.isLevel == '0'?true:false)
                    let param = {
                        satWd:this.starModel.satWd,
                        isLevel:level,
                        freq:this.starModel.freq
                    }
                    if(this.isCheck){
                        param.satJd = this.nowSel
                    }else{
                        param.satJd = flag == 1?(this.nowSel == 1?'134.0':'110.5'):(this.nowSel == 1?'134.0':'110.5')
                    }
                    obj = Object.assign(obj,param)
                }
                let {result, success, message} = await autoCtrl(obj)
                if(success){
                    this.$Notice.success({
                        title: '成功',
                        desc: message,
                        duration: 3
                    })
                }else{
                    this.$Notice.error({
                        title: '失败',
                        desc: message,
                        duration: 3
                    })
                }
            },
        }
    }
</script>
<style lang="less">
  .col-17{
    .ivu-poptip{
      width: 100%;
      .ivu-poptip-rel {
        width: 100%;

      }
    }
  }
</style>
<style scoped>

  [myfocus]{
    color: #2d8cf0;
    background: #f3f3f3;
  }
  .col-text{
    float: left;
    width: 145px;
    text-align: center;
    cursor: pointer;
    height: 70px;
    position: relative;
    margin-bottom: -10px;
    margin-left: 24px;
  }
  .col-24{
    margin-right: 10px;height: 150px;
  }
  .col-17{
    margin-right: 10px;border: 1px solid grey;height: 320px;
  }
  .col-6{
    border: 1px solid grey;height: 320px
  }
  .title-text {
    width: 100%;
    text-align: center;
    background:  #009688;
    color: whitesmoke;
    margin-bottom: 15px;
    height: 30px;
    line-height: 30px
  }
  .zone-title{
    width:100%;height: 100px;border:1px solid #b6b3b3;margin-bottom: 10px;padding: 5px;border-radius: 10px
  }
</style>
