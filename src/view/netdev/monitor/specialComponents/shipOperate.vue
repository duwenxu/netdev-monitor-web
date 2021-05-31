<template>
  <div>
    <RadioGroup @on-change="clickHand" v-model="btnCheck">
      <template v-for="(info,index) in topBtns">
        <Radio style="width: 100px;margin-bottom: 5px" :label="info.id" border>{{ info.name }}</Radio>
        <span v-if="index == 3"><Br/></span>
      </template>
    </RadioGroup>
    <Row style="margin-top: 15px">
      <Col :xs="24" :sm="24" :lg="16" :md="20">
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
                      <InputNumber :min="0" :max="20" :step="0.1" style="width: 95%" v-model.trim="handmic.az" placeholder="方位"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button @click="run('az',handmic.az)">执行</Button>
                    <Button @click="run('az',0,true)">停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="俯仰" prop="menuName">
                      <InputNumber :min="0" :max="20" :step="0.1"  style="width: 95%" v-model.trim="handmic.el" placeholder="俯仰"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button @click="run('el',handmic.el)">执行</Button>
                    <Button @click="run('el',0,true)">停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="交叉" prop="menuName">
                      <InputNumber :min="0" :max="20" :step="0.1"  style="width: 95%" v-model.trim="handmic.jc" placeholder="交叉"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button @click="run('gc',handmic.gc)">执行</Button>
                    <Button @click="run('gc',0,true)">停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="极化" prop="menuName">
                      <InputNumber :min="0" :max="20" :step="0.1"  style="width: 95%" v-model.trim="handmic.pol" placeholder="极化"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button @click="run('pol',handmic.pol)">执行</Button>
                    <Button @click="run('pol',0,true)">停止</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == 3">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-24">
              <Alert type="success">当前状态为步进</Alert>

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
                      <InputNumber :min="0" :max="360" :step="0.1" style="width: 95%" v-model.trim="automic.az" placeholder="方位"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="俯仰" prop="el">
                      <InputNumber  :min="15" :max="110" :step="0.1" style="width: 95%" v-model.trim="automic.el" placeholder="俯仰"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="交叉" prop="jc">
                      <InputNumber :min="-25" :max="25" :step="0.1"  style="width: 95%" v-model.trim="automic.jc" placeholder="交叉"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="极化" prop="pol">
                      <InputNumber :min="-45" :max="225" :step="0.1"  style="width: 95%" v-model.trim="automic.pol" placeholder="极化"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button @click="byHand(3)">执行</Button>
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
                      <Select @on-change="getStar(1)" v-model="starModel.star">
                        <Option v-for="item in selects" :value="item.code" :key="item.code">{{ item.name }}</Option>
                      </Select>
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
                    <FormItem label="频率" prop="hz">
                      <Input v-model.trim="starModel.freq" placeholder="频率" Number>
                        <span slot="suffix">MHs</span>
                      </Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="24" :md="24">
                    <FormItem>
                      <Button @click="starPrepare(1)" style="margin-right: 20px;background: #009688;color: white"  icon="md-checkmark">确认
                      </Button>
                      <Button  @click="byHand(1)"   style="margin-right: 20px;background: #009688;color: white" >手动</Button>
                      <Button  @click="byAuto(1)" style="background: #009688;color: white" >自动</Button>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="24" :md="24"></Col>

                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="方位" prop="az">
                      <Input v-model.trim="starModel.az" placeholder="方位" Number></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="俯仰" prop="el">
                      <Input v-model.trim="starModel.el" placeholder="俯仰" Number></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="极化" prop="pol">
                      <Input v-model.trim="starModel.pol" placeholder="极化" Number></Input>
                    </FormItem>
                  </Col>
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
                          <Select @on-change="getStar(2)" v-model="zoneDirect.star">
                            <Option v-for="item in selects" :value="item.code" :key="item.code">{{ item.name }}</Option>
                          </Select>
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
                        <Button @click="starPrepare(2)" style="margin-top: 4px;background: #009688;color: white" type="primary" icon="md-checkmark" size="small">确认
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
                <Form :model="zoneData" :label-width="60">
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
                      <FormItem label="频率" prop="hz">
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
import {ctrlAngle, getLocalDeg,operCtrl,autoCtrl} from "@/api/monitor/ShipAcu"
import {queryCtrlInfo} from "@/api/monitor/DeviceParam";
export default {
  name: "shipOperate",
  data() {
    return {
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
        star:1,
        isLevel:'0',
        freq:'',
        az:'',
        el:'',
        pol:'',
      },
      zoneDirect: {
        star:1,
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
      starMap:{
        1:{
          vertical: 12250, horizon: 12749.8
        },
        2:{
          vertical: 12741, horizon: 12745
        }
      }
    }
  },
  mounted(){
      this.getNowPosition()
      // this.getHz('0')
  },
  methods:{
   async run(name,value,tag){
     let obj={
       func:this.btnCheck,
       devNo:this.$route.name
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
        if(value == '0000' || value == '0110' || value == '0101'){
          this.byHand()
        }else if(value == '0100'){
          this.getHz(1,'0')
        }else if(value == '0011'){
          this.getHz(2,'0')
        }
    },
    async getNowPosition(){
      let {result, success, message} = await getLocalDeg({devNo: this.$route.name})
      if(success){
          this.gestureData.devJd = result.devJd
          this.gestureData.devWd = result.devWd
          this.stargestureData.devJd = result.devJd
          this.stargestureData.devWd = result.devWd
      }
    },
    getHz(flag,data){//根据水平或者垂直选择频率
      if(flag == 1){
        this.starModel.freq = data == '0'? this.starMap[this.starModel.star].horizon:this.starMap[this.starModel.star].vertical
      }else{
        this.zoneData.freq = data == '0'? this.starMap[this.zoneDirect.star].horizon:this.starMap[this.zoneDirect.star].vertical
      }

    },
    getStar(flag,data){//选择卫星
      if(flag == 1){
        this.getHz(1,'0')
      }else{
        this.getHz(2,'0')
      }
    },
    async  starPrepare(flag){//星预置选择卫星
      let level = flag == 1?(this.starModel.isLevel == '0'?true:false):(this.zoneDirect.isLevel == '0'?true:false)
      let satJd = flag == 1?(this.starModel.star == 1?'134.0':'110.5'):(this.zoneDirect.star == 1?'134.0':'110.5')
      let obj = {
        isLevel:level,
        satJd:satJd,
      }
      if(flag == 2){
        obj = Object.assign(obj,this.gestureData)
      }else{
        obj = Object.assign(obj,this.stargestureData)
      }
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
        devNo:this.$route.name,
        func:this.btnCheck,
      }
      if(flag == 2){
        obj = Object.assign(obj,this.zoneData)
      }else if(flag == 1){
        let param = {
          az:this.starModel.az,
          el:this.starModel.el,
          pol:this.starModel.pol,
          freq:this.starModel.freq
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
        devNo:this.$route.name,
        func:this.btnCheck,
      }
      if(flag == 2){
        obj = Object.assign(obj,this.zoneData)
      }else if(flag == 1){
        let param = {
          az:this.starModel.az,
          el:this.starModel.el,
          pol:this.starModel.pol,
          freq:this.starModel.freq
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

<style scoped>
.col-24{
  margin-right: 10px;height: 150px;
}
.col-17{
  margin-right: 10px;border: 1px solid grey;height: 320px
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
