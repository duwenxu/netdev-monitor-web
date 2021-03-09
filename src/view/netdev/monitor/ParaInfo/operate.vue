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
          <FormItem label="参数数据类型" prop="ndpaDatatype">
            <Select v-model="ParaInfo.ndpaDatatype" clearable  placeholder="请选择参数数据类型">
              <Option  v-for='choose in paraDataTypes' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数长度" prop="ndpaStrLen">
            <Input v-model="ParaInfo.ndpaStrLen" placeholder="请输入参数长度"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="显示模式" prop="ndpaShowMode">
            <Input v-model="ParaInfo.ndpaShowMode" placeholder="请输入显示模式"></Input>
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
          <FormItem label="下拉值域" prop="ndpaSelectData">
            <Input v-model="ParaInfo.ndpaSelectData" placeholder="请输入下拉值域"></Input>
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
          <FormItem label="数据映射规则" prop="ndpaTransRule">
            <Input v-model="ParaInfo.ndpaTransRule" placeholder="请输入数据映射规则"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="设备是否故障" prop="ndpaAlertPara">
            <Select v-model="ParaInfo.ndpaAlertPara" clearable   placeholder="请选择设备是否故障">
              <Option  v-for='choose in alertParaStatus' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
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
            {required: true, message: '参数数据类型不能为空', trigger: 'blur'}
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
            {required: true, message: '设备是否故障不能为空', trigger: 'blur'}
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
        this.$xy.getParamGroup('0025').then(res=>{
          this.paraStatus = res;
        })
      },
      async getOutterStatus(){
        this.$xy.getParamGroup('0003').then(res=>{
          this.outterStatus = res;
        })
      },

      async getAlertParaStatus(){
        this.$xy.getParamGroup('0003').then(res=>{
          this.alertParaStatus = res;
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
