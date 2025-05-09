<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card class="card-inside">
            <!-- 欢迎登录界面 -->
            <p class="welcome">欢迎来到财务管理系统</p>

            <!-- 切换账号登录，邮箱登录按钮 -->
            <div class="jump-link flex-box">
                <p>
                    <el-link :type="formPage === 0 ? 'primary' : 'default'" class="id-login" :underline="false"
                        @click="idLogin" style="font-size: 16px;">
                        用户名登录
                    </el-link>
                </p>
                <p>
                    <el-link :type="formPage === 1 ? 'primary' : 'default'" class="email-login" :underline="false"
                        @click="emailLogin" style="font-size: 16px;">
                        邮箱登录
                    </el-link>
                </p>
            </div>

            <!-- 用户名登录 -->
            <div v-if="formPage === 0">
                <el-form 
                    ref="idFormRef" 
                    :model="idLoginForm" 
                    class="id-ruleForm" 
                    :rules="idRules"
                    >
                    <el-form-item prop="userName">
                        <el-input v-model="idLoginForm.userName" placeholder="请输入用户名" :prefix-icon="UserFilled">
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

                <el-button type="primary" class="login-button" @click="submitForm(idFormRef)">
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
            </div>
            

            <!-- 邮箱登录 -->
            <div v-else="formPage">
                <el-form 
                    ref="emailFormRef" 
                    :model="emailLoginForm" 
                    style="max-width: 480px" 
                    class="email-ruleForm"
                    :rules="emailRules"
                >
                    <el-form-item prop="userEmail">
                        <el-input v-model="emailLoginForm.userEmail" placeholder="请输入用户邮箱" :prefix-icon="Message">
                            <template #append>
                                <el-select v-model="suffix" style="width: 115px">
                                    <el-option 
                                        v-for="item in EMAIL_OPTIONS"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"    
                                        @click="suffixChange(emailLoginForm.userEmail, suffix)"
                                    />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="validCode">
                        <el-input v-model="emailLoginForm.validCode" placeholder="请输入验证码">
                            <template #append>
                                <span @click="countdownChange">{{ countdown.validText }}</span>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="login-button" @click="submitForm(emailFormRef)">
                    登录&nbsp;/&nbsp;注册
                </el-button>
                <el-text class="login-help flex-box">
                    <el-link :underline="false">企业级登录</el-link>
                    <div><el-divider direction="vertical" /></div>
                    <el-link :underline="false">超级管理员</el-link>
                </el-text>
            </div>
            <el-divider content-position="center" style="margin-top: 90px;">
                <div style="font-size: 12px; font-weight: 400; color: rgb(128, 131, 138);">
                    其他登录方式
                </div>
            </el-divider>
            <div class="other-login">
                <ul class="flex-box">
                    <li><el-link :underline="false">login1</el-link></li>
                    <li><el-link :underline="false">login2</el-link></li>
                    <li><el-link :underline="false">login3</el-link></li>
                    <li><el-link :underline="false">login4</el-link></li>
                    <li><el-link :underline="false">login5</el-link></li>
                    <li><el-link :underline="false">login6</el-link></li>
                </ul>
            </div>
            <el-text class="backToRegister-link flex-box"  style="margin-top: 30px;">
                没有账号？
                <el-link type="primary" :underline="false" @click="changeForm">现在就注册</el-link>
            </el-text>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive, computed, toRaw } from 'vue'
import { UserFilled, Lock, Hide, View, Message } from '@element-plus/icons-vue'
// import { getCode, userAuthentication, login, menuPermissions } from '../../api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

// 表单切换变量（0账号登录，1手机登录）
const formPage = ref(0)
const idFormRef = ref(null);
const emailFormRef = ref(null);

// 账号登录界面
const idLogin = () => {
    formPage.value = 0
    emailFormRef.value?.resetFields()
}

// 邮箱登录界面
const emailLogin = () => {
    formPage.value = 1
    idFormRef.value?.resetFields()
}

// 切换登录注册界面
const changeForm = () => {
    formPage.value = 0
    idFormRef.value?.resetFields()
    emailFormRef.value?.resetFields()
    store.commit('changeMenu')
}

// 密码可见度(false不可见，true可见)
const passwordMode = ref(false)

// 改变密码可见度
const passwordModeChange = () => {
    passwordMode.value = !passwordMode.value
}

// 邮箱后缀
const suffix = ref('@qq.com')

// 邮箱后缀格式
const EMAIL_OPTIONS = [
    { value: '@qq.com', label: '@qq.com' },
    { value: '@163.com', label: '@163.com' }
]

// 确认邮箱格式（一并添加到email中）
const suffixChange = (email, suffix) => {
    email = email + suffix
}

// 账号登录表单数据
const idLoginForm = reactive({
    userName: '',
    passWord: ''
})

// 手机号登录表单数据
const emailLoginForm = reactive({
    userEmail: '',
    validCode: ''
})

// 账号校验
const validateName = (rule, value, callback) => {
    // 用户名不为空
    if (value === '') {
        callback(new Error('用户名必填'))
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

// 邮箱校验
const validateEmail = (rule, value, callback) => {
    // 邮箱不为空
    if (value === '') {
        callback(new Error('请输入邮箱'))
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
    userName: [{ validator: validateName, trigger: 'blur' }],
    passWord: [{ validator: validatePass, trigger: 'blur' }]
})

// 邮箱表单校验
const emailRules = reactive({
    userEmail: [{ validator: validateEmail, trigger: 'blur' }],
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
    // 校验邮箱

    // 验证码校验账号信息
    // if (!phoneLoginForm.userPhone || !phoneReg.test(phoneLoginForm.userPhone)) {
    //     return ElMessage({
    //         message: '请检查手机号是否正确',
    //         type: 'warning',
    //     })
    // }

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
// const submitForm = async(formEl) => {
//     console.log('formEl', formEl)
//     if (!formEl) return
//     // 手动触发校验
//     await formEl.validate((valid, fields) => {
//         if (valid) {
//             if (formPage.value === 0) {

//                 ElMessage({
//                     message: '登录成功',
//                     type: 'success',
//                 })
//                 router.push('/')
//             } 
//             else if (formPage.value === 1) {
                
//                 ElMessage({
//                     message: '登录成功',
//                     type: 'success',
//                 })
//                 router.push('/')
//             }
            
//         } else {
//             console.log('error submit!', fields)
//         }
//     })
// }

const submitForm = async (formEl) => {
    console.log('formEl', formEl)
    if (!formEl) return
    try {
        await formEl.validate()
        if (formPage.value === 0) {
        ElMessage({
            message: '用户名登录成功',
            type: 'success',
        })
        router.push('/')
        } else {
        ElMessage({
            message: '邮箱登录成功',
            type: 'success',
        })
        router.push('/')
        }
    } catch (error) {
        console.log('验证失败', error)
    }
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

                .email-login {
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