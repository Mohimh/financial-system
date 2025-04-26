<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card class="card-inside">
            <!-- 欢迎登录界面 -->
            <p class="welcome">欢迎来到财务管理系统</p>

            <!-- 切换账号登录，手机登录按钮 -->
            <div class="jump-link flex-box">
                <p>
                    <el-link :type="formPage === 0 ? 'primary' : 'default'" class="id-login" :underline="false"
                        @click="idLogin" style="font-size: 16px;">
                        账号登录
                    </el-link>
                </p>
                <p>
                    <el-link :type="formPage === 1 ? 'primary' : 'default'" class="phone-login" :underline="false"
                        @click="phoneLogin" style="font-size: 16px;">
                        手机号登录
                    </el-link>
                </p>
            </div>

            <!-- 账号登录 -->
            <div v-if="formPage === 0">
                <el-form ref="loginFormRef" 
                    :model="idLoginForm" 
                    class="id-ruleForm" 
                    :rules="idRules"
                    >
                    <el-form-item prop="userId">
                        <el-input v-model="idLoginForm.userId" placeholder="请输入账号名/账号ID" :prefix-icon="UserFilled">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="passWord">
                        <el-input v-model="idLoginForm.passWord" :type="passwordMode === false ? 'password' : 'text'"
                            placeholder="请输入登录密码" :prefix-icon="Lock">
                            <template #append>
                                <el-button :icon="passwordMode === false ? Hide : View" @click="passwordModeChange">
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>

                <el-button type="primary" class="login-button" @click="submitForm(loginFormRef)">
                    登录
                </el-button>

                <el-text class="flex-box" justify="center">
                    <div class="login-help flex-box" style="width: 40%;">
                        <el-link :underline="false">忘记密码</el-link>
                        <el-link :underline="false">忘记账号</el-link>
                    </div>
                    <div class="login-help flex-box" style="width: 60%;">
                        <el-link :underline="false">企业级登录</el-link>
                        <div><el-divider direction="vertical" /></div>
                        <el-link :underline="false">超级管理员</el-link>
                    </div>
                </el-text>

                <el-divider content-position="center" style="margin-top: 90px;">
                    <div style="font-size: 12px; font-weight: 400; color: rgb(128, 131, 138);">
                        其他登录方式
                    </div>
                </el-divider>
                <div class="other-login">
                    <ul class="flex-box">
                        <li><el-link>login1</el-link></li>
                        <li><el-link>login2</el-link></li>
                        <li><el-link>login3</el-link></li>
                        <li><el-link>login4</el-link></li>
                        <li><el-link>login5</el-link></li>
                        <li><el-link>login6</el-link></li>
                    </ul>
                </div>
                <el-text class="backToRegister-link flex-box"  style="margin-top: 30px;">
                    没有账号？
                    <el-link type="primary" :underline="false" @click="changeForm">现在就注册</el-link>
                </el-text>
            </div>
            

            <!-- 手机登录 -->
            <div v-else="formPage">
                <el-form ref="loginFormRef" 
                    :model="phoneLoginForm" 
                    style="max-width: 480px" 
                    class="phone-ruleForm"
                    :rules="phoneRules"
                >
                    <el-form-item prop="userPhone">
                        <el-input v-model="phoneLoginForm.userPhone" placeholder="请设置用户名，5-20个字符">
                            <template #prepend>
                                <el-select v-model="phonePrefix" placeholder="+86" style="width: 75px">
                                    <el-option label="+86" value="+86" />
                                    <el-option label="+852" value="+852" />
                                    <el-option label="+853" value="+853" />
                                    <el-option label="+886" value="+886" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="validCode">
                        <el-input v-model="phoneLoginForm.validCode" placeholder="请输入验证码">
                            <template #append>
                                <span @click="countdownChange">{{ countdown.validText }}</span>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="login-button" @click="submitForm(loginFormRef)">
                    登录&nbsp;/&nbsp;注册
                </el-button>
                <el-text class="login-help flex-box">
                    <el-link :underline="false">企业级登录</el-link>
                    <div><el-divider direction="vertical" /></div>
                    <el-link :underline="false">超级管理员</el-link>
                </el-text>
                <el-divider content-position="center" style="margin-top: 90px;">
                    <div style="font-size: 12px; font-weight: 400; color: rgb(128, 131, 138);">
                        其他登录方式
                    </div>
                </el-divider>
                <div class="other-login">
                    <ul class="flex-box">
                        <li><el-link>login1</el-link></li>
                        <li><el-link>login2</el-link></li>
                        <li><el-link>login3</el-link></li>
                        <li><el-link>login4</el-link></li>
                        <li><el-link>login5</el-link></li>
                        <li><el-link>login6</el-link></li>
                    </ul>
                </div>
            </div>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive, computed, toRaw } from 'vue'
import { UserFilled, Lock, Hide, View } from '@element-plus/icons-vue'
// import { getCode, userAuthentication, login, menuPermissions } from '../../api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// const imgUrl = new URL('../../../public/291cbd1565c3b7928389850d8e2990b928762a4561a8a5bea.jpg', import.meta.url).href

const store = useStore()

// 表单切换变量（0账号登录，1手机登录）
const formPage = ref(0)

// 账号登录界面
const idLogin = () => {
    formPage.value = 0
}

// 手机登录界面
const phoneLogin = () => {
    formPage.value = 1
}

// 切换登录注册界面
const changeForm = () => {
    store.commit('changeMenu')
}

// 密码可见度(false不可见，true可见)
const passwordMode = ref(false)

// 改变密码可见度
const passwordModeChange = () => {
    passwordMode.value = !passwordMode.value
}

// 手机号区域显示
const phonePrefix = ref('+86')

// 账号登录表单数据
const idLoginForm = reactive({
    userId: '',
    passWord: ''
})

// 手机号登录表单数据
const phoneLoginForm = reactive({
    userPhone: '',
    validCode: ''
})

// 账号校验
const validateId = (rule, value, callback) => {
    // 账号不为空
    if (value === '') {
        callback(new Error('账号名/账号ID/电子邮箱必填'))
    }
    // 账号信息异常 
    else {
        const phoneReg = /^[a-zA-Z0-9@#$%^&+=]{6,12}$/
        phoneReg.test(value) ? callback() : callback(new Error('输入格式错误'))
    }
}

// 密码校验
const validatePass = (rule, value, callback) => {
    // 密码不为空
    if (value === '') {
        callback(new Error('访问密码必填'))
    } 
    // 密码信息异常
    else {
        const reg = /^[a-zA-Z0-9_-]{4,16}$/
        reg.test(value) ? callback() : callback(new Error('密码格式不对，需要4到16为字符，请确认格式是否正确'))
    }
}

// 手机号校验
const validatePhone = (rule, value, callback) => {
    // 手机号不为空
    if (value === '') {
        callback(new Error('请输入手机号'))
    }
    // 手机号信息异常 
    else {
        const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        phoneReg.test(value) ? callback() : callback(new Error('手机号格式不对，请输入正确手机号'))
    }
}

// 验证码校验
const validataCode = (rule, value, callback) => {
    // 验证码不为空
    if (value === '') {
        callback(new Error('请输入验证码'))
    }
}

// 账号表单校验
const idRules = reactive({
    userId: [{ validator: validateId, trigger: 'blur' }],
    passWord: [{ validator: validatePass, trigger: 'blur' }]
})

// 手机号表单校验
const phoneRules = reactive({
    userPhone: [{ validator: validatePhone, trigger: 'blur' }],
    validCode: [{ validator: validataCode, trigger: 'blur' }]
})

// 倒计时按钮
const countdown = reactive({
    validText: '获取验证码',
    time: 60
})

let flag = false
// 验证码
const countdownChange = () => {
    // 验证码在规定时间只能被点击1次
    if (flag) return
    // 正则表达式 用于校验账号
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    // 验证码校验账号信息
    if (!phoneLoginForm.userPhone || !phoneReg.test(phoneLoginForm.userPhone)) {
        return ElMessage({
            message: '请检查手机号是否正确',
            type: 'warning',
        })
    }

    // 设置验证码倒计时时间
    const time = setInterval(() => {
        if (countdown.time <= 0) {
            countdown.validText = '获取验证码'
            countdown.time = 60
            flag = false
            clearInterval(time)     // 清除倒计时！！！
        } else {
            countdown.time -= 1
            countdown.validText = `剩余${countdown.time}s`
        }
    }, 1000);
    // 设置验证码状态（不可点击）
    flag = true

    // 发送验证码
    // getCode({ tel: loginForm.userName }).then(({data})=>{
    //     if (data.code === 10000) {
    //         ElMessage.success('发送成功')
    //     }
    // })
}

const router = useRouter()
const loginFormRef = ref()
console.log('loginform', loginFormRef)

// const routerList = computed(() => store.state.menu.routerList)
// 表单提交 
// const submitForm = async(formEl) => {
//     if (!formEl) return
//     // 手动触发校验
//     await formEl.validate((valid, fields) => {
//         if (valid) {
//             // 注册页面
//             if (formType.value) {
//                 userAuthentication(loginForm).then(({ data }) => {
//                     if(data.code === 10000) {
//                         ElMessage.success('注册成功，请登录')
//                         formType.value = 0
//                     }
//                 })
//             } else {
//             // 登录页面
//                 login(loginForm).then(({ data }) => {
//                     if(data.code === 10000) {
//                         ElMessage.success('登录成功！')
//                         console.log(data)
//                         // 将token和用户信息缓存到浏览器
//                         localStorage.setItem('pz_token', data.data.token)
//                         localStorage.setItem('pz_userInfo', JSON.stringify(data.data.userInfo))
//                         menuPermissions().then(({ data }) => {
//                             store.commit('dynamicMenu', data.data)
//                             console.log(routerList, 'routerList')
//                             toRaw(routerList.value).forEach(item => {
//                                 router.addRoute('main', item)  
//                             })
//                             router.push('/')
//                         })
//                     }
//                 })
//             }
//         } else {
//             console.log('error submit!', fields)
//         }
//     })
// }


// 登录
const submitForm = async(formEl) => {
    if (!formEl) return
    // 手动触发校验
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (formPage.value === 0) {

                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                router.push('/')
            } 
            else if (formPage === 1) {
                
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                router.push('/')
            }
            
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;
    // height: 100%;
}

.login-container {
    height: 100%;

    .card-inside {
        min-width: 400px;
        border-radius: 20px;
        height: 525px;
        padding: 25px 43px 43px 32px;

        // 表单开头欢迎语
        .welcome {
            color: #0c0d0e;
            font-size: 24px;
            font-weight: 500;
            letter-spacing: .003em;
            line-height: 32px;
            padding-bottom: 40px;
        }

        // 账号、手机登录界面切换按钮
        .jump-link {
            margin-bottom: 10px;

            p {
                text-align: left;

                .id-login {
                    margin-right: 15px;
                    margin-bottom: 15px;
                }

                .phone-login {
                    margin-left: 15px;
                    margin-bottom: 15px;
                }
            }
        }
        
        // 点击登录按钮
        .login-button {
            margin-top: 30px;
            height: 40px;
            width: 100%;
        }
        
        // 忘记密码等其他登录
        .login-help{
            width: 100%;
            justify-content: center;
            margin-top: 10px;
            .el-link{
                padding-left: 3px;
                padding-right: 3px;
            }
        }
        
        // 其他登录
        .other-login {
            width: 100%;
            li {
                margin-left: 10px;
                margin-right: 10px;
            }
        }

        // 回到注册界面的按钮
        .backToRegister-link {
            width: 100%;
            justify-content: center;
            font-size: 14px;
            .el-link {
                font-size: 14px;
            }
        }
    }
}

</style>