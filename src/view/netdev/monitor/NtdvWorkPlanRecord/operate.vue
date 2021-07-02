<template>
  <div class="content-box">
    <Form ref="form" :model="WorkPlanRecoed" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="10" :sm="8" :md="8" :lg="8">
          <FormItem label="计划值班人员" prop="wpName">
            <Input disabled placeholder="请输入计划值班人员" v-model="WorkPlanRecoed.wpName">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="值班开始时间" prop="wpStartTime">
            <Date-picker  type="datetime" :options="optionsCheckWpStartTime" :value="WorkPlanRecoed.wpStartTime"
                         placeholder="请输入值班开始时间" disabled="" @on-change="WorkPlanRecoed.wpStartTime=$event"></Date-picker>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="值班结束时间" prop="wpEndTime">
            <Date-picker type="datetime" :options="optionsCheckWpEndTime" :value="WorkPlanRecoed.wpEndTime"
                         placeholder="请输入值班结束时间" disabled="" @on-change="WorkPlanRecoed.wpEndTime=$event"></Date-picker>
          </FormItem>
        </Col>
        <Col :xs="10" :sm="8" :md="8" :lg="8">
          <FormItem label="实际值班人员" prop="wpRealName">
            <Input clearable placeholder="请输入计划值班人员" v-model="WorkPlanRecoed.wpRealName">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="值班接班时间" prop="wpFlwinTime">
            <Date-picker type="datetime" :options="optionsCheckWpFlwinTime" :value="WorkPlanRecoed.wpFlwinTime"
                         placeholder="请输入值班接班时间" @on-change="WorkPlanRecoed.wpFlwinTime=$event"></Date-picker>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="值班交班时间" prop="wpFlwoutTime">
            <Date-picker type="datetime" :options="optionsCheckWpFlwoutTime" :value="WorkPlanRecoed.wpFlwoutTime"
                         placeholder="请输入值班交班时间" @on-change="WorkPlanRecoed.wpFlwoutTime=$event"></Date-picker>
          </FormItem>
        </Col>
        <Col :xs="10" :sm="8" :md="8" :lg="8">
          <FormItem label="值班天气" prop="wpWeather">
            <Input clearable placeholder="请输入值班天气" v-model="WorkPlanRecoed.wpWeather">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="10" :sm="8" :md="8" :lg="8">
          <FormItem label="状态" prop="wpStatus">
            <Select clearable placeholder="请选择状态" disabled="" v-model="WorkPlanRecoed.wpStatus">
              <Option :key="choose.id" :value='choose.value' v-for='choose in wpStatusList'>{{choose.name}}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="10" :sm="8" :md="8" :lg="8">
          <FormItem label="值班备注" prop="wpDesc">
            <Input  maxlength="600" show-word-limit type = "textarea" placeholder="请输入值班备注信息" v-model="WorkPlanRecoed.wpDesc">
            </Input>
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

    import {addWorkPlan, editWorkPlan} from '@/api/monitor/NtdvWorkPlan'

    export default {
        name: 'operate',
        data() {
            return {
                updateMark: false,
                WorkPlanRecoed: {},
                wpStatusList:[],
                optionsCheckWpStartTime: {
                    disabledDate(datetime) {
                        let start = new Date(new Date(new Date().toLocaleDateString())); // 当天0点
                        let timestamp = Date.parse(start);  //转换时间戳
                        return datetime && (datetime.valueOf() < (timestamp)) || (datetime.valueOf() >= (timestamp + 86400000 * 8));
                    }
                },
                optionsCheckWpEndTime: {
                    disabledDate(datetime) {
                        let start = new Date(new Date(new Date().toLocaleDateString())); // 当天0点
                        let timestamp = Date.parse(start);  //转换时间戳
                        return datetime && (datetime.valueOf() < (timestamp)) || (datetime.valueOf() >= (timestamp + 86400000 * 8));
                    }
                },
                optionsCheckWpFlwinTime: {
                    disabledDate(datetime) {
                        let start = new Date(new Date(new Date().toLocaleDateString())); // 当天0点
                        let timestamp = Date.parse(start);  //转换时间戳
                        return datetime && (datetime.valueOf() < (timestamp)) || (datetime.valueOf() >= (timestamp + 86400000 * 8));
                    }
                },
                optionsCheckWpFlwoutTime: {
                    disabledDate(datetime) {
                        let start = new Date(new Date(new Date().toLocaleDateString())); // 当天0点
                        let timestamp = Date.parse(start);  //转换时间戳
                        return datetime && (datetime.valueOf() < (timestamp)) || (datetime.valueOf() >= (timestamp + 86400000 * 8));
                    }
                },
                rulePro: {
                    wpName: [
                        {required: true, message: '计划值班人不能为空', trigger: 'blur'}
                    ],
                    wpStartTime: [
                        {required: true, message: '值班开始时间不能为空', trigger: 'blur'}
                    ],
                    wpEndTime: [
                        {required: true, message: '值班结束时间不能为空', trigger: 'blur'}
                    ],
                    wpStatus: [
                        {required: true, message: '值班类型不能为空', trigger: 'blur'}
                    ],
                    wpRealName: [
                    ],
                    wpWeather: [
                    ],
                    wpFlwinTime: [
                    ],
                    wpFlwoutTime: [
                    ],
                    wpDesc: [
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
            this.getWpStatusList()
        },
        methods: {
            operateRow(obj) {
                if (obj != null) {
                    this.WorkPlanRecoed = obj;
                    this.updateMark = true
                } else {
                    this.updateMark = false
                }
            },
            handleSubmit() {
                let form = this.$refs['form']
                form.validate((wpId) => {
                    if (wpId != null) {
                        this.save(wpId)
                    } else {
                        this.$Message.error('验证未通过!')
                    }
                })
            },
            async save(wpId) {
                let data = (this.updateMark) ? editWorkPlan(this.WorkPlanRecoed) : addWorkPlan(this.WorkPlanRecoed);
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
            },async getWpStatusList () {
                this.$xy.getParamGroup('0001').then(res => {
                    this.wpStatusList = res
                })
            },

        }
    }
</script>
