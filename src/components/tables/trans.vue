<template>
  <div>
    <Row>
      <Col :sm="11" :md="11" :lg="11">
        <Card>
          <Checkbox @on-change="selectAll(listLeft,$event)" v-model="checkAllLeft">{{leftName}}&nbsp;&nbsp;</Checkbox>
          <span>{{leftSelect ? leftSelect : 0}}/{{listLeft.length}}</span>
          <div class="search_parent">
            <Input search v-model="sourceData" placeholder="请输入" clearable/>
          </div>
          <div class="left">
            <li class="listStyle" v-for="(item,index) in listLeft">
              <Checkbox v-model="item.isSelect">
                <span class="text_style">
                  {{item.value}}
                </span>
              </Checkbox>
            </li>
          </div>
        </Card>
      </Col>
      <Col :sm="2" :md="2" :lg="2" style="margin-top: 120px;">
        <div class="middle">
          <div @click="moveItem(listLeft,dataLeft, listRight, 1)" :class="{active: leftSelect  > 0}">
            <Icon type="ios-arrow-forward" size="32"/>
          </div>
          <div @click="moveItem(listRight,dataRight, listLeft, 2)" :class="{active: rightSelect > 0}">
            <Icon type="ios-arrow-back" size="32"/>
          </div>
        </div>
      </Col>
      <Col :sm="11" :md="11" :lg="11">
        <Card>
          <Checkbox @on-change="selectAll(listRight,$event)" v-model="checkAllRight">{{rightName}}&nbsp;&nbsp;
          </Checkbox>
          <span>{{rightSelect ? rightSelect : 0}}/{{listRight.length}}</span>
          <div class="search_parent">
            <Input search v-model="targetData" placeholder="请输入" clearable/>
          </div>
          <div class="right">
            <draggable v-model="listRight">
              <li class="listStyle" v-for="(item,index) in listRight">
                <Checkbox v-model="item.isSelect"> <span class="text_style">
                  {{item.value}}
                </span></Checkbox>
              </li>
            </draggable>
          </div>
        </Card>
      </Col>
    </Row>
    <div class="buttons">
      <Button type="success" style="width: 50px;height:30px" @click="save">保存</Button>
      <Button type="info" style="margin-left:10px; width: 50px;height:30px" @click="cancle">取消</Button>
    </div>
  </div>
</template>
<script>
    import draggable from 'vuedraggable'

    export default {
        name: 'trans',
        components: {draggable},
        props: {
            leftName: {
                type: String,
                default: ''
            },
            rightName: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                sourceData: '',
                targetData: '',
                checkAllLeft: false,
                checkAllRight: false,
                dataRight: [],
                dataLeft: [],
                listLeft: [],
                listRight: [],
            }
        },
        created: function () {
            this.$xy.vector.$on('initLeft', this.initLeft)
            this.$xy.vector.$on('initRight', this.initRight)
        },
        beforeDestroy: function () {
            this.$xy.vector.$off('initLeft', this.initLeft)
            this.$xy.vector.$off('initRight', this.initRight)
        },
        mounted() {

        },
        watch: {
            sourceData(val) {
                this.commonSearch(val, this.dataLeft, 1, this.listRight)
            },
            targetData(val) {
                this.commonSearch(val, this.dataRight, 2, this.listLeft)
            }
        },
        computed: {
            leftSelect() {
                return this.commonSelect(this.listLeft, 1)
            },
            rightSelect() {
                return this.commonSelect(this.listRight, 2)
            }
        },
        methods: {
            initLeft(obj) {
                this.listLeft = obj.leftInfos
                this.dataLeft = this.listLeft
            },
            initRight(obj) {
                this.listRight = obj.rightInfos
                this.dataRight = this.listRight
            },
            moveItem(arr, handle, target, direction) {
                let temp = arr.filter(item => {
                    return item.isSelect == true
                })
                if (temp.length <= 0) return false
                temp.forEach(item => {
                    arr.forEach((v, i) => {
                        if (v.id == item.id) {
                            arr.splice(i, 1)
                        }
                    })
                    item.isSelect = false
                    target.push(item)
                })
            },
            selectAll(data, bool) {
                let isSelectAll = data.every(item => {
                    return item.isSelect == true
                })
                data.forEach(item => {
                    if (isSelectAll) {
                        item.isSelect = false
                    } else {
                        item.isSelect = true
                    }
                })
            },
            commonSelect(data, temp) {
                let boolArr = []
                data.forEach(v => {
                    boolArr.push(v.isSelect)
                })
                if (boolArr.indexOf(false) > -1) {
                    temp == 1 ? this.checkAllLeft = false : this.checkAllRight = false
                } else {
                    temp == 1 ? this.checkAllLeft = true : this.checkAllRight = true
                }
                if (data.length === 0) {
                    temp == 1 ? this.checkAllLeft = false : this.checkAllRight = false
                    return false
                }
                let arr = data.filter(item => {
                    return item.isSelect == true
                })
                return arr.length
            },
            commonSearch(val, arr, temp, otherArr) {
                console.log(arr)
                let emptyArr = []
                if (val) {
                    console.log(val)
                    arr.forEach(v => {
                        console.log(v)
                        if (v.value.indexOf(val) != -1) {
                            emptyArr.push(v)
                        }
                    })
                    temp == 1 ? this.listLeft = emptyArr : this.listRight = emptyArr
                } else {
                    let ids = []
                    otherArr.forEach(v => {
                        ids.push(v.id)
                    })
                    let data = arr.filter(v => {
                        return ids.indexOf(v.id) < 0
                    })
                    temp == 1 ? this.listLeft = data : this.listRight = data
                }
            },
            save() {
                let that = this
                this.$xy.vector.$emit('saveTrans', that.listRight)
            },
            cancle() {
                this.$xy.vector.$emit('closeTrans');
            }
        }
    }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .left, .right {
    height: 240px;
    padding: 5px 0;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: auto;
  }

  .listStyle {
    list-style: none;
    margin: 5px 10px;
  }

  .left > div.active, .right > div.active {
    background-color: #6dfa32;
  }

  .left > div.hover-color:hover, .right > div.hover-color:hover {
    color: rgb(64, 158, 255);
  }

  .middle {
    margin: 0 20px;
  }

  .middle > div {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
    font-size: 12px;
    background-color: #f5f7fa;
    color: #c0c4cc;
  }

  .middle > div.active {
    background-color: #409eff;
    border-color: #409eff;
    color: #ffffff;
  }

  .search_parent {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 10px;
  }

  .text_style {
    font-size: 14px;
  }

  .ivu-col-span-lg-8 {
    display: block;
    width: 44%;
  }

  .buttons {
    text-align: center;
    margin-top: 10px;
    padding-right: 43px;
  }
</style>
