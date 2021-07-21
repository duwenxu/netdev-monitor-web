<template>
  <div class="content-box">
    <Form ref="form" :model="WorkPlan" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="计划值班人员" prop="wpName">
            <Input clearable placeholder="请输入计划值班人员" v-model="WorkPlan.wpName">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="值班开始时间" prop="wpStartTime">
            <Date-picker type="datetime" :options="optionsCheckWpStartTime" :value="WorkPlan.wpStartTime"
                          placeholder="请输入值班开始时间" @on-change="WorkPlan.wpStartTime=$event"></Date-picker>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="值班结束时间" prop="wpEndTime">
            <Date-picker type="datetime" :options="optionsCheckWpEndTime" :value="WorkPlan.wpEndTime"
                          placeholder="请输入值班结束时间" @on-change="WorkPlan.wpEndTime=$event"></Date-picker>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="状态" prop="wpStatus">
            <Select clearable placeholder="请选择状态" v-model="WorkPlan.wpStatus">
              <Option :key="choose.id" :value='choose.value' v-for='choose in wpStatusList'>{{choose.name}}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
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
                WorkPlan: {
                    wpName:'',
                    wpStartTime:'',
                    wpEndTime:'',
                    wpStatus:''

                },
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
                rulePro: {
                    wpName: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    wpStartTime: [
                        {required: true, message: '必填', select: 'blur'}
                    ],
                    wpEndTime: [
                        {required: true, message: '必填', select: 'blur'}
                    ],
                    wpStatus: [
                        {required: true, message: '必填', select: 'blur'}
                    ]
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
                    this.WorkPlan = obj;
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
            async save(wpId) {
                let data = (this.updateMark) ? editWorkPlan(this.WorkPlan) : addWorkPlan(this.WorkPlan);
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
            },
            async getWpStatusList () {
                this.$xy.getParamGroup('0001').then(res => {
                    this.wpStatusList = res
                })
            }

        }
    }
</script>
