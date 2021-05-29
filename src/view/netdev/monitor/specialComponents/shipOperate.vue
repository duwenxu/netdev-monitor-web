<template>
  <div>
    <RadioGroup v-model="btnCheck">
      <template v-for="(info,index) in topBtns">
        <Radio style="width: 100px;margin-bottom: 5px" :label="info.id" border>{{ info.name }}</Radio>
        <span v-if="index == 3"><Br/></span>
      </template>
    </RadioGroup>
    <Row style="margin-top: 15px">
      <Col :xs="24" :lg="12" :md="12">
        <Card v-if="btnCheck == 2">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-17">
              <div class="title-text">手动</div>
              <Form :model="handmic" :label-width="100">
                <Row>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="方位" prop="menuTitle">
                      <InputNumber style="width: 95%" v-model.trim="handmic.menuTitle" placeholder="方位"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button>执行</Button>
                    <Button>停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="俯仰" prop="menuName">
                      <InputNumber  style="width: 95%" v-model.trim="handmic.menuName" placeholder="俯仰"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button>执行</Button>
                    <Button>停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="交叉" prop="menuName">
                      <InputNumber  style="width: 95%" v-model.trim="handmic.menuName" placeholder="交叉"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button>执行</Button>
                    <Button>停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="极化" prop="menuName">
                      <InputNumber  style="width: 95%" v-model.trim="handmic.menuName" placeholder="极化"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button>执行</Button>
                    <Button>停止</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == 4">
          <Row>
            <Col :xs="24" :lg="24" :md="24" class="col-17">
              <div class="title-text">指向</div>
              <Form :model="automic" :label-width="100">
                <Row>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="方位" prop="menuTitle">
                      <InputNumber style="width: 95%" v-model.trim="automic.menuTitle" placeholder="方位"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button>执行</Button>
                    <Button>停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="俯仰" prop="menuName">
                      <InputNumber  style="width: 95%" v-model.trim="automic.menuName" placeholder="俯仰"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button>执行</Button>
                    <Button>停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="交叉" prop="menuName">
                      <InputNumber  style="width: 95%" v-model.trim="automic.menuName" placeholder="交叉"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button>执行</Button>
                    <Button>停止</Button>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem label="极化" prop="menuName">
                      <InputNumber  style="width: 95%" v-model.trim="automic.menuName" placeholder="极化"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <Button>执行</Button>
                    <Button>停止</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == 5">
          <Row>
            <Col :xs="17" :lg="17" :md="17" class="col-17">
              <div class="title-text">星下点</div>
              <Form :model="starModel" :label-width="80">
                <Row style="padding: 0 10px">
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="卫星经度" prop="menuTitle">
                      <Select v-model="starModel.menuTitle">
                        <Option v-for="item in selects" :value="item.code" :key="item.code">{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="卫星纬度" prop="menuName">
                      <Input v-model.trim="starModel.menuName" placeholder="卫星纬度"></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="极化形式" prop="menuName">
                      <Input v-model.trim="starModel.menuName" placeholder="极化形式"></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="12" :md="12">
                    <FormItem label="频率" prop="menuName">
                      <Input v-model.trim="starModel.menuName" placeholder="频率">
                        <span slot="suffix">MHs</span>
                      </Input>
                    </FormItem>
                  </Col>
                  <Col :xs="16" :lg="16" :md="16">
                    <FormItem>
                      <Button  style="margin-right: 20px;background: #009688;color: white">手动</Button>
                      <Button  style="background: #009688;color: white" >自动</Button>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :lg="24" :md="24"></Col>



                  <Col :xs="8" :lg="8" :md="8">
                    <FormItem label="方位：" prop="menuName">
                      111111111111
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <FormItem label="俯仰：" prop="menuName">
                      111111111111
                    </FormItem>
                  </Col>
                  <Col :xs="8" :lg="8" :md="8">
                    <FormItem label="极化：" prop="menuName">
                      111111111111
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col :xs="6" :lg="6" :md="6" class="col-6">
              <div class="title-text">姿态控制</div>
              <Row style="padding:0 10px">
                <Col :xs="24" :lg="24" :md="24">
                  <Form :model="gestureData" :label-width="40">
                    <Row>
                      <Col :xs="24" :lg="24" :md="24">
                        <FormItem label="经度" prop="menuTitle">
                          <Input v-model.trim="starModel.menuTitle" placeholder="经度"></Input>
                        </FormItem>
                      </Col>
                      <Col :xs="24" :lg="24" :md="24">
                        <FormItem label="纬度" prop="menuName">
                          <Input v-model.trim="gestureData.menuName" placeholder="纬度"></Input>
                        </FormItem>
                      </Col>
                      <FormItem>
                        <Button  style="background: #009688;color: white">确定</Button>
                      </FormItem>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card v-if="btnCheck == 8" style="height: 340px">
          <Row>
            <Col :xs="17" :lg="17" :md="17" class="col-17">
              <div class="title-text">空间指向</div>
              <div style="padding:0 10px">
                <div class="zone-title">
                  <Form :model="zoneDirect" :label-width="70">
                    <Row>
                      <Col :xs="14" :lg="14" :md="14" push="4">
                        <FormItem label="卫星预置" prop="menuTitle">
                          <Select v-model="zoneDirect.menuTitle">
                            <Option v-for="item in selects" :value="item.code" :key="item.code">{{ item.name }}</Option>
                          </Select>
                        </FormItem>
                      </Col>
                      <Col :xs="24" :lg="24" :md="24"></Col>
                      <Col :xs="17" :lg="17" :md="17" push="2">
                        <RadioGroup v-model="zoneDirect.btnCheck">
                          <Radio label="">水平极化</Radio>
                          <Radio label="">垂直极化</Radio>
                        </RadioGroup>
                      </Col>
                      <Col :xs="3" :lg="3" :md="3">
                        <Button style="margin-top: 4px;background: #009688;color: white" type="primary" icon="md-checkmark" size="small">确认
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
                <Form :model="zoneData" :label-width="60">
                  <Row>
                    <Col :xs="24" :lg="12" :md="12">
                      <FormItem label="方位" prop="menuTitle">
                        <Input v-model.trim="zoneData.menuTitle" placeholder="方位"></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :lg="12" :md="12">
                      <FormItem label="俯仰" prop="menuName">
                        <Input v-model.trim="zoneData.menuName" placeholder="俯仰"></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :lg="12" :md="12">
                      <FormItem label="极化" prop="menuName">
                        <Input v-model.trim="zoneData.menuName" placeholder="极化"></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :lg="12" :md="12">
                      <FormItem label="频率" prop="menuName">
                        <Input v-model.trim="zoneData.menuName" placeholder="频率">
                          <span slot="suffix">MHs</span>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col :xs="16" :lg="16" :md="16">
                      <FormItem>
                        <Button  style="margin-right: 20px;background: #009688;color: white">手动</Button>
                        <Button  style="background: #009688;color: white" >自动</Button>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>

            </Col>
            <Col :xs="6" :lg="6" :md="6"  class="col-6">
              <div class="title-text">姿态控制</div>
              <Row style="padding:0 10px">
                <Col :xs="24" :lg="24" :md="24">
                  <Form :model="gestureData" :label-width="40">
                    <Row>
                      <Col :xs="24" :lg="24" :md="24">
                        <FormItem label="经度" prop="menuTitle">
                          <Input v-model.trim="starModel.menuTitle" placeholder="经度"></Input>
                        </FormItem>
                      </Col>
                      <Col :xs="24" :lg="24" :md="24">
                        <FormItem label="纬度" prop="menuName">
                          <Input v-model.trim="gestureData.menuName" placeholder="纬度"></Input>
                        </FormItem>
                      </Col>
                      <FormItem>
                        <Button  style="background: #009688;color: white">确定</Button>
                      </FormItem>
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
export default {
  name: "shipOperate",
  data() {
    return {
      btnCheck: 1,
      handmic:{},//手动
      automic:{},//自动
      starModel: {},
      zoneDirect: {},//卫星预置
      zoneData: {},//空间指向
      gestureData:{},//姿态控制
      topBtns: [
        {id: 1, name: '待机'},
        {id: 2, name: '手动'},
        {id: 3, name: '步进'},
        {id: 4, name: '指向'},
        {id: 5, name: '星下点'},
        {id: 6, name: '扫描跟踪'},
        {id: 7, name: '自跟踪'},
        {id: 8, name: '空间指向'}
      ],
      selects: [
        {code: 1, name: '亚太6C', long: 134.0, vertical: 12250, horizon: 12749.8},
        {code: 2, name: '中兴10号', long: 110.5, vertical: 12741, horizon: 12745}
      ]
    }
  }
}
</script>

<style scoped>
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
