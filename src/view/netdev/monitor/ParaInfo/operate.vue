<template>
  <div class="content-box">
    <Form ref="form" :model="ParaInfo" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="格式ID" prop="fmtId">
            <Input v-model="ParaInfo.fmtId" placeholder="请输入格式ID"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数编号" prop="ndpaNo">
            <Input v-model="ParaInfo.ndpaNo" placeholder="请输入参数编号"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数编码" prop="ndpaCode">
            <Input v-model="ParaInfo.ndpaCode" placeholder="请输入参数编码"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数名称" prop="ndpaName">
            <Input v-model="ParaInfo.ndpaName" placeholder="请输入参数名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="设备类型" prop="devType">
            <Select v-model="ParaInfo.devType" clearable   placeholder="请选择设备类型">
              <Option  v-for='choose in devTypes' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="访问权限" prop="ndpaAccessRight">
            <Select v-model="ParaInfo.ndpaAccessRight" clearable   placeholder="请选择访问权限">
              <Option  v-for='choose in accessAuths' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数单位" prop="ndpaUnit">
            <Input v-model="ParaInfo.ndpaUnit" placeholder="请输入参数单位"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="数据类型" prop="ndpaDatatype">
            <Select v-model="ParaInfo.ndpaDatatype" clearable  placeholder="请选择数据类型">
              <Option  v-for='choose in paraDataTypes' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数长度" prop="ndpaStrLen" :rules="[{required:ParaInfo.ndpaDatatype == '0023004'? true:false,message:'数据类型str参数长度不能为空',trigger:'blur'}]">
            <Input v-model="ParaInfo.ndpaStrLen" placeholder="请输入参数长度"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="显示模式" prop="ndpaShowMode">
            <Select v-model="ParaInfo.ndpaShowMode" clearable   placeholder="请选择显示模式">
              <Option  v-for='choose in displayModels' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="最大值" prop="ndpaValMax">
            <Input v-model="ParaInfo.ndpaValMax" placeholder="请输入最大值"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="最小值" prop="ndpaValMin">
            <Input v-model="ParaInfo.ndpaValMin" placeholder="请输入最小值"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="步进" prop="ndpaValStep">
            <Input v-model="ParaInfo.ndpaValStep" placeholder="请输入步进"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="字节长度" prop="ndpaByteLen">
            <Input v-model="ParaInfo.ndpaByteLen" placeholder="请输入字节长度"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="命令标识" prop="ndpaCmdMark">
            <Input v-model="ParaInfo.ndpaCmdMark" placeholder="请输入命令标识"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数状态" prop="ndpaStatus">
            <Select v-model="ParaInfo.ndpaStatus" clearable   placeholder="请选择参数状态">
              <Option  v-for='choose in paraStatus' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="供54所访问" prop="ndpaOutterStatus">
            <Select v-model="ParaInfo.ndpaOutterStatus" clearable   placeholder="请选择是否供54所访问">
              <Option  v-for='choose in outterStatus' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="状态上报类型" prop="ndpaAlertPara">
            <Select v-model="ParaInfo.ndpaAlertPara" clearable   placeholder="请选择状态上报类型">
              <Option  v-for='choose in alertParaStatus' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="告警级别" prop="ndpaAlertLevel">
            <Select v-model="ParaInfo.ndpaAlertLevel" clearable   placeholder="请选择告警级别">
              <Option  v-for='choose in ndpaAlertLevels' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数复杂级别" prop="ndpaCmplexLevel" >
            <Select v-model="ParaInfo.ndpaCmplexLevel" clearable   placeholder="请选择参数复杂级别">
              <Option  v-for='choose in ndpaCmplexLevelList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="下拉值域" prop="ndpaSelectData">
            <Input v-model="ParaInfo.ndpaSelectData" type="textarea" placeholder="请输入下拉值域"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="数据映射规则" prop="ndpaTransRule" >
            <Input v-model="ParaInfo.ndpaTransRule" type="textarea" placeholder="请输入数据映射规则"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="拼装样式" prop="ndpaSpellFmt">
            <Input v-model="ParaInfo.ndpaSpellFmt" type="textarea" placeholder="请输入拼装样式"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="显示样式" prop="ndpaViewFmt" >
            <Input v-model="ParaInfo.ndpaViewFmt" type="textarea" placeholder="请输入显示样式"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="缺省值" prop="ndpaDefaultVal" >
            <Input v-model="ParaInfo.ndpaDefaultVal" type="textarea" placeholder="请输入缺省值"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注一描述" prop="ndpaRemark1Desc" >
            <Input v-model="ParaInfo.ndpaRemark1Desc" type="textarea" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注一数据" prop="ndpaRemark1Data" >
            <Input v-model="ParaInfo.ndpaRemark1Data" type="textarea" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注二描述" prop="ndpaRemark2Desc" >
            <Input v-model="ParaInfo.ndpaRemark2Desc" type="textarea" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注二数据" prop="ndpaRemark2Data" v-if="this.remark2DataList.includes(ParaInfo.devType)">
            <Select v-model="ParaInfo.ndpaRemark2Data" clearable   placeholder="请选择参数处理类">
              <Option  v-for='choose in paraCodecList' :value='choose' :key="choose">{{choose}}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注二数据" prop="ndpaRemark2Data" v-else>
            <Input v-model="ParaInfo.ndpaRemark2Data" type="textarea" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注三描述" prop="ndpaRemark3Desc" >
            <Input v-model="ParaInfo.ndpaRemark3Desc" type="textarea" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注三数据" prop="ndpaRemark3Data" >
            <Input v-model="ParaInfo.ndpaRemark3Data" type="textarea" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="15">
          <FormItem>
            <Button type="primary" @click="handleSubmit()">保存</Button>
            <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>

  import {addParaInfo, editParaInfo} from '@/api/monitor/ParaInfo'
  import axios from '@/libs/api.request'
  import xy from "../../../../libs/url";

  export default {
    name: 'operate',
    data() {
      return {
        updateMark: false,
        ParaInfo: {},
        validateList: [],
        devTypes: [],
        paraDataTypes: [],
        accessAuths: [],
        paraStatus: [],
        outterStatus: [],
        alertParaStatus: [],
        displayModels:[],
        ndpaAlertLevels:[],
        ndpaCmplexLevelList:[],
        paraCodecList:[],
        remark2DataList:[],
        rulePro: {
          fmtId: [
            {required: false}
          ],
          ndpaNo: [
            {required: true, message: '参数编号不能为空', trigger: 'blur'}
          ],
          ndpaCode: [
            {required: false}
          ],
          ndpaName: [
            {required: true, message: '参数名称不能为空', trigger: 'blur'}
          ],
          devType: [
            {required: true, message: '设备类型不能为空', trigger: 'blur'}
          ],
          ndpaAccessRight: [
            {required: true, message: '访问权限不能为空', trigger: 'blur'}
          ],
          ndpaUnit: [
            {required: false}
          ],
          ndpaDatatype: [
            {required: true, message: '数据类型不能为空', trigger: 'blur'}
          ],
          ndpaStrLen: [
            {required: false}
          ],
          ndpaShowMode: [
            {required: true, message: '显示模式不能为空', trigger: 'blur'}
          ],
          ndpaValMax: [
            {required: false}
          ],
          ndpaValMin: [
            {required: false}
          ],
          ndpaValStep: [
            {required: false}
          ],
          ndpaSelectData: [
            {required: false}
          ],
          ndpaByteLen: [
            {required: false}
          ],
          ndpaCmdMark: [
            {required: false}
          ],
          ndpaStatus: [
            {required: true, message: '参数状态不能为空', trigger: 'blur'}
          ],
          ndpaOutterStatus: [
            {required: true, message: '是否该字段提供给54所访问不能为空', trigger: 'blur'}
          ],
          ndpaTransRule: [
            {required: false}
          ],
          ndpaAlertPara: [
            {required: true, message: '字段类型不能为空', trigger: 'blur'}
          ],
          ndpaAlertLevel: [
            {required: true, message: '报警级别不能为空', trigger: 'blur'}
          ],
          ndpaSpellFmt: [
            {required: false}
          ],
          ndpaViewFmt: [
            {required: false}
          ],
          ndpaCmplexLevel: [
            {required: true, message: '参数复杂级别不能为空', trigger: 'blur'}
          ],
          ndpaDefaultVal: [
            {required: false}
          ],
          ndpaRemark1Desc: [
            {required: false}
          ],
          ndpaRemark1Data: [
            {required: false}
          ],
          ndpaRemark2Desc: [
            {required: false}
          ],
          ndpaRemark2Data: [
            {required: false}
          ],
          ndpaRemark3Desc: [
            {required: false}
          ],
          ndpaRemark3Data: [
            {required: false}
          ],
        }
      }
    },
    created: function () {
      this.$xy.vector.$on('operateRow', this.operateRow)
    },
    beforeDestroy: function () {
      this.$xy.vector.$off('operateRow', this.operateRow)
    },
    mounted() {
      this.getAccessAuths();
      this.getParaStatus();
      this.getParaDataTypes();
      this.getDevTypes();
      this.getAlertParaStatus();
      this.getOutterStatus();
      this.getDisplayModels();
      this.getNdpaAlertLevels();
      this.getNdpaCmplexLevelList();
      this.getParaCodecList();
      this.initRemark2DataList();
    },
    methods: {
      async getDevTypes(){
        this.$xy.getParamGroup('0020').then(res=>{
          this.devTypes = res;
        })
      },
      async getParaDataTypes(){
        this.$xy.getParamGroup('0023').then(res=>{
          this.paraDataTypes = res;
        })
      },
      async getAccessAuths(){
        this.$xy.getParamGroup('0022').then(res=>{
          this.accessAuths = res;
        })
      },
      async getParaStatus(){
        this.$xy.getParamGroup('0001').then(res=>{
          this.paraStatus = res;
        })
      },
      async getOutterStatus(){
        this.$xy.getParamGroup('0003').then(res=>{
          this.outterStatus = res;
        })
      },

      async getAlertParaStatus(){
        this.$xy.getParamGroup('0029').then(res=>{
          this.alertParaStatus = res;
        })
      },

      async getDisplayModels(){
        this.$xy.getParamGroup('0024').then(res=>{
          this.displayModels = res;
        })
      },
      async getNdpaAlertLevels(){
        this.$xy.getParamGroup('0021').then(res=>{
          this.ndpaAlertLevels = res;
        })
      },
      async getNdpaCmplexLevelList(){
        this.$xy.getParamGroup('0019').then(res=>{
          res = res.filter(e => e.id!=='0019004')
          this.ndpaCmplexLevelList = res;
        })
      },
      async initRemark2DataList(){
        this.remark2DataList = ["0020008","0020012","0020017","0020018"];
      },
      async getParaCodecList(){
        axios.request({
          url: xy.Setting.SPACE_URL + '/monitor/paraInfo/paraCodec',
          method: 'get'
        })
        .then(res=>{
          this.paraCodecList = res.result;
        })
      },
      operateRow(obj) {
        if (obj != null) {
          this.ParaInfo = obj;
          this.updateMark = true
        } else {
          this.updateMark = false
        }
      },
      handleSubmit() {
        let form = this.$refs['form']
        form.validate((valid) => {
          if (valid) {
            this.save(name)
          } else {
            this.$Message.error('验证未通过!')
          }
        })
      },
      async save(name) {
        let data = (this.updateMark) ? editParaInfo(this.ParaInfo) : addParaInfo(this.ParaInfo);
        let {result, success, message} = await data
        let notice = this.$Notice;
        if (success) {
          notice.success({
            title: '成功',
            desc: message,
            duration: 1
          })
          this.$refs['form'].resetFields()
          this.$xy.vector.$emit('closeModal')
        } else {
          notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
        }
      },
      cancel() {
        this.$refs['form'].resetFields()
        this.$xy.vector.$emit('closeModal')
      }
    }
  }
</script>
