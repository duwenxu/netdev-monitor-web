<template>
  <!--<Form ref="formInline" :model="formInline" :rules="ruleInline" inline   method="get">-->
  <div class="login">
    <head>
      xingyi
    </head>
    <div class="login-con">
      <div class="login-header">
        <Row>
         <!-- <Col :xs="3" :sm="3" :lg="3" :md="3">
            <img class="img_pic" src="../../../assets/images/login/logo.png" width="32" height="35"/>
          </Col>-->
          <Col :xs="21" :sm="21" :lg="21" :md="21">
            <span class="pre_name">中国电科</span>
            <span class="middle_name"> | </span>
            <span class="last_name"> 网络设备监控</span>
          </Col>
        </Row>
        <Row style="margin-left: 12px">
          <Col :xs="24" :sm="24" :lg="24" :md="24">

            <div class="box">
              <i class="icon-user"></i>

              <input class="user_input" type="text" v-model="formInline.userName" placeholder="用户名"/>

            </div>

          </Col>
          <Col :xs="24" :sm="24" :lg="24" :md="24">
            <div class="box">
              <i class="icon-pass"></i>

              <input class="pass_input" type="password" v-model="formInline.password" placeholder="密码"/>

            </div>
          </Col>
        </Row>
        <Row style="margin-left: 12px">
          <Col :xs="12" :sm="12" :lg="12" :md="12">
            <Checkbox class="check_class">&nbsp;&nbsp;记住密码</Checkbox>
          </Col>
          <Col :xs="12" :sm="12" :lg="12" :md="12">
            <a class="a_class" href="javascript:;">忘记密码</a>
          </Col>
        </Row>
        <Row style="margin-left: 12px">
          <Col :xs="24" :sm="24" :lg="24" :md="24">

            <button class="btn_class" type="primary" @click="login">登录</button>

          </Col>
        </Row>

      </div>
    </div>
    <div class="footer">
   <!-- <p>陕西星邑空间技术有限公司©版权所有</p>-->
    </div>
  </div>
  <!--</Form>-->
</template>


<script>
    import {loginData} from '@/api/data.js'
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                formInline: {
                  userName:'',
                  password:''
                },
                ruleInline: {
                  userName: [
                    {required: true, message: '用户名', trigger: 'blur'}
                  ],
                  password: [
                    {required: true, message: '密码', trigger: 'blur'},
                    {
                      type: 'string',
                      min: 6,
                      message: '密码不能少于6位',
                      trigger: 'blur'
                    }
                  ]
                }
            }
        },
        created(){

            this.keyupSubmit();

        },
        methods: {
          ...mapActions([
            'handleLogin',
            'getUserInfo',
            'getRouters'
          ]),
          login() {
              this.handleLogin(this.formInline).then(data => {
                //this.getUserInfo(this.formInline).then(res => {
                  this.$router.push({
                    name: this.$config.homeName
                  })
                //})
              })
            },
            keyupSubmit(){    //回车事件

                document.onkeydown=e=>{

                    let _key=window.event.keyCode;

                    if(_key===13){           //key=13即指示回车键

                        this.login();

                    }

                }

            },
          /*async login() {
            await loginData(this.formInline).then((res) => {
              if (res.success) {
                this.$router.push({
                  name: this.$config.homeName
                })
              } else {

              }
            })
          }*/

        }
    }
</script>


<style>
  * {
    margin: 0;
  }


  .login {
    width: 100%;
    height: 100%;
    background-image: url('../../../assets/images/login/bg.jpg');
    background-size: cover;
    background-position: center;
  }

  .login-con {
    -webkit-display: flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    min-height: 100vh;
  }

  .login-header {
    width: 280px;
    height: 440px;
  }

  .pre_name {
    font-family: "Arial";
    font-size: 25px;
    color: #fff;
  }

  .last_name {
    font-family: "Arial";
    font-size: 19px;
    color: #fff;
  }

  .middle_name {
    font-family: "Arial";
    font-size: 25px;
    color: #fff;
  }

  .img_pic {
    top: 320px;
  }

  .user_input {
    width: 258px;
    height: 45px;
    border-radius: 4px;
    opacity: 0.85;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 1);
    margin-top: 42px;
    font-size: 16px;
  }

  .pass_input {
    width: 258px;
    height: 45px;
    border-radius: 4px;
    opacity: 0.85;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 1);
    margin-top: 24px;
    font-size: 16px;
  }

  .check_class {
    margin-top: 28px;
    font-size: 14px !important;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.45);
  }

  .a_class {
    float: right;
    margin-right: 8px;
    display: block;
    margin-top: 28px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(52, 114, 255, 1);
  }

  .btn_class {
    width: 258px;
    height: 45px;
    margin-top: 29px;
    background: rgba(52, 114, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(52, 114, 255, 1);
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    /*font-family: "loginTTF";*/
    font-size: 16px;
    letter-spacing: 4px;
    cursor: pointer;
  }

  .box input {
    padding-left: 35px;
  }

  .user_input::-webkit-input-placeholder {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
  }

  .pass_input::-webkit-input-placeholder {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
  }

  .box {
    width: 100px;
    position: relative;
  }

  .box .icon-user {
    background: url(../../../assets/images/login/user.png) no-repeat;
    width: 20px;
    height: 14px;
    position: absolute;
    top: 53px;
    left: 15px;
    z-index: 1;
  }

  .box .icon-pass {
    background: url(../../../assets/images/login/password.png) no-repeat;
    width: 20px;
    height: 16px;
    position: absolute;
    top: 34px;
    left: 15px;
    z-index: 1;
  }

  .footer {
    position: absolute;
    width: 100%;
    bottom: 110px;
  }

  .footer p {
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    opacity: 0.45;
    letter-spacing: 2px;
  }
</style>
