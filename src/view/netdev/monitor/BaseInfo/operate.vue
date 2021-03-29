<template>
    <div class="content-box">
        <Form ref="form" :model="BaseInfo" :rules="rulePro" :label-width="150">
            <Row>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备编号" prop="devNo">
                          <Input v-model="BaseInfo.devNo"  placeholder="请输入设备编号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备类型" prop="devType">
                          <Select clearable placeholder="请选择设备类型" v-model="BaseInfo.devType">
                            <Option :key="choose.id" :value='choose.value' v-for='choose in devTypeList'>{{choose.name}}
                            </Option>
                          </Select>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备名称" prop="devName">
                            <Input v-model="BaseInfo.devName"  placeholder="请输入设备名称"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备状态" prop="devStatus">
                            <!--<Input v-model="BaseInfo.devStatus"  placeholder="请输入设备状态"></Input>-->
                          <Select clearable placeholder="请选择设备状态" v-model="BaseInfo.devStatus">
                            <Option :key="choose.id" :value='choose.value' v-for='choose in devStatusList'>{{choose.name}}
                            </Option>
                          </Select>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备所属公司" prop="devCorp">
                            <!--<Input v-model="BaseInfo.devCorp"  placeholder="请输入设备所属公司"></Input>-->
                          <Select clearable placeholder="请选择设备所属公司" v-model="BaseInfo.devCorp">
                            <Option :key="choose.id" :value='choose.value' v-for='choose in devCorpList'>{{choose.name}}
                            </Option>
                          </Select>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备版本" prop="devVer">
                            <Input v-model="BaseInfo.devVer"  placeholder="请输入设备版本"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备IP地址" prop="devIpAddr">
                            <Input v-model="BaseInfo.devIpAddr"  placeholder="请输入设备IP地址"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备内部地址" prop="devLocalAddr">
                            <Input v-model="BaseInfo.devLocalAddr"  placeholder="请输入设备内部地址"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备端口" prop="devPort">
                            <Input v-model="BaseInfo.devPort"  placeholder="请输入设备端口"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="上级设备编号" prop="devParentNo">
                            <Input v-model="BaseInfo.devParentNo"  placeholder="请输入上级设备编号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备访间隔时间(毫秒)" prop="devIntervalTime">
                            <Input v-model="BaseInfo.devIntervalTime"  placeholder="请输入设备访间隔时间(毫秒)"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                          <FormItem label="网络协议" prop="devNetPtcl">
                            <Select clearable placeholder="请输入网络协议" v-model="BaseInfo.devNetPtcl">
                              <Option :key="choose.id" :value='choose.value' v-for='choose in devNetPtclList'>{{choose.name}}
                              </Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                          <FormItem label="设备部署类型" prop="devDeployType">
                            <Select clearable placeholder="请输入设备部署类型" v-model="BaseInfo.devDeployType">
                              <Option :key="choose.id" :value='choose.value' v-for='choose in devDeployTypeList'>{{choose.name}}
                              </Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                          <FormItem label="设备使用状态" prop="devUseStatus">
                            <Select clearable placeholder="请输入设备使用状态" v-model="BaseInfo.devUseStatus">
                              <Option :key="choose.id" :value='choose.value' v-for='choose in devUseStatusList'>{{choose.name}}
                              </Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                          <FormItem label="设备型号" prop="devSubType">
                            <Select clearable placeholder="请选择设备型号" v-model="BaseInfo.devSubType">
                              <Option :key="choose.id" :value='choose.value' v-for='choose in devSubTypeList'>{{choose.name}}
                              </Option>
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

    import { addBaseInfo, editBaseInfo } from '@/api/monitor/BaseInfo'

    export default {
        name: 'operate',
        data () {
            return {
                updateMark: false,
                    BaseInfo: {},
              devTypeList:[],
              devStatusList:[],
              devCorpList:[],
              devNetPtclList:[],
              devDeployTypeList:[],
                validateList:[],
              devUseStatusList:[],
              devSubTypeList:[],
                rulePro: {
                            devNo: [
                          {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            devType: [
                            {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            devName: [
                            {required: true, message: '设备名称不能为空', trigger: 'blur'}
                        ],
                            devStatus: [
                            {required: true, message: '设备状态不能为空', trigger: 'blur'}
                        ],
                            devCorp: [
                            {required: true, message: '设备所属公司不能为空', trigger: 'blur'}
                        ],
                            devVer: [
                        ],
                            devIpAddr: [
                        ],
                            devLocalAddr: [
                        ],
                            devPort: [
                        ],
                            devParentNo: [
                        ],
                            devIntervalTime: [
                        ],
                        devNetPtcl: [
                              {required: true, message: '网络协议不能为空', trigger: 'blur'}
                         ],
                        devDeployType: [
                                {required: true, message: '设备部署类型不能为空', trigger: 'blur'}
                              ],
                        devUseStatus: [
                          {required: true, message: '设备使用状态不能为空', trigger: 'blur'}
                        ],
                        devSubType: [],
                }
            }
        },
        created: function () {
            this.$xy.vector.$on('operateRow', this.operateRow)
        },
        beforeDestroy: function () {
            this.$xy.vector.$off('operateRow', this.operateRow)
        },
        mounted () {
          this.getDeviceTypes();
          this.getDeviceStatus();
          this.getDeviceCorp();
          this.getDevNetPtclList();
          this.getDevDeployTypeList();
          this.getDevUseStatusList();
        },
        methods: {
            operateRow (obj) {
                if (obj != null) {
                    this.BaseInfo = obj;
                    this.updateMark = true
                }else{
                    this.updateMark = false
                }
            },
            handleSubmit() {
                let form  = this.$refs['form']
                form.validate((valid) => {
                    if (valid) {
                        this.save(name)
                    } else {
                        this.$Message.error('验证未通过!')
                    }
                })
            },
            async save (name) {
                let data = (this.updateMark) ? editBaseInfo(this.BaseInfo) : addBaseInfo(this.BaseInfo);
                let { result, success, message } = await data
                let notice = this.$Notice;
                if (success) {
                    notice.success({
                        title:'成功',
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
            cancel () {
                this.$refs['form'].resetFields()
                this.$xy.vector.$emit('closeModal')
            },
          async getDeviceTypes () {
            this.$xy.getParamGroup('0020').then(res => {
              this.devTypeList = res
            })
          },
          async getDeviceStatus () {
            this.$xy.getParamGroup('0028').then(res => {
              this.devStatusList = res
            })
          },
          async getDeviceCorp () {
            this.$xy.getParamGroup('0010').then(res => {
              this.devCorpList = res
            })
          },
          async getDevNetPtclList () {
            this.$xy.getParamGroup('0030').then(res => {
              this.devNetPtclList = res
            })
          },
          async getDevDeployTypeList () {
            this.$xy.getParamGroup('0031').then(res => {
              this.devDeployTypeList = res
            })
          },
          async getDevUseStatusList () {
            this.$xy.getParamGroup('0032').then(res => {
              this.devUseStatusList = res
            })
          },
          async refreshDevSubTypeList (devType){
            let {result, success, message} = await this.$xy.getParamGroup(devType)
            let subDevType = result.map.remark3
            if (subDevType!=null&&subDevType.length>=4){
              let subTypeCode = subDevType.substring(0,4);
              this.$xy.getParamGroup(subTypeCode).then(res => {
                this.devSubTypeList = res
              })
            }
          }
        }
    }
</script>
