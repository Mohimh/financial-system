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
                    <el-form-item prop="email">
                        <el-input 
                            v-model="emailLoginForm.email" 
                            placeholder="请输入用户邮箱" 
                            :prefix-icon="Message"
                        >
                            <template #append>
                                <el-select 
                                    v-model="suffix" 
                                    style="width: 115px"
                                    @change="handleSuffixChange"
                                >
                                    <el-option 
                                        v-for="item in EMAIL_OPTIONS"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"    
                                    />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <el-input v-model="emailLoginForm.captcha" placeholder="请输入6位验证码">
                            <template #append>
                                <span @click="countdownChange">{{ countdown.validText }}</span>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="login-button" @click="submitForm(emailFormRef)">
                    登录
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
import { ref, reactive } from 'vue'
import { UserFilled, Lock, Hide, View, Message } from '@element-plus/icons-vue'
// import { getCode, userAuthentication, login, menuPermissions } from '../../api'
import { getCode, login } from '@/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

// 表单切换变量（0用户名登录，1邮箱登录）
const formPage = ref(0)

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
const suffix = ref('请选择邮箱')

// 邮箱后缀格式
const EMAIL_OPTIONS = [
    { value: '@qq.com', label: '@qq.com' },
    { value: '@163.com', label: '@163.com' }
]

// 确认邮箱格式（一并添加到email中）
const handleSuffixChange = (newSuffix) => {
    const prefix = emailLoginForm.email.split('@')[0]; // 获取当前邮箱前缀
    emailLoginForm.email = prefix + newSuffix; // 拼接完整邮箱
};

// 账号登录表单数据
const idLoginForm = reactive({
    userName: '',
    passWord: '',
    type: 'username'
})

// 手机号登录表单数据
const emailLoginForm = reactive({
    email: '',
    captcha: '',
    type: 'email'
})

// 账号校验
const validateName = (rule, value, callback) => {
    // 用户名不为空
    if (value === '') {
        callback(new Error('用户名必填'))
    }
    else {
        const reg = /^[A-Za-z0-9]{4,10}$/
        reg.test(value) ? callback() : callback(new Error('请输入4-10位字符（不能有特殊字符）'))
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
    else {
        callback()
    }
}

// 验证码校验
const validataCode = (rule, value, callback) => {
    // 验证码不为空
    if (value === '') {
        callback(new Error('请输入验证码'))
    }
    else {
        const reg = /^[0-9]{6}$/
        reg.test(value) ? callback() : callback(new Error('请检查验证码是否正确'))
    }
}

// 账号表单校验
const idRules = reactive({
    userName: [{ validator: validateName, trigger: 'blur' }],
    passWord: [{ validator: validatePass, trigger: 'blur' }]
})

// 邮箱表单校验
const emailRules = reactive({
    email: [{ validator: validateEmail, trigger: 'blur' }],
    captcha: [{ validator: validataCode, trigger: 'blur' }]
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
    if (emailLoginForm.email === 'value') {
        return ElMessage({
            message: '请完整填写您的邮箱信息',
            type: 'warning',
        })
    }
    else if (suffix.value === '请选择邮箱') {
        return ElMessage({
            message: '请选择邮箱类型',
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
    getCode({ target: emailLoginForm.email, vType: 'email' }).then(({ data }) => {
        console.log(data, 'data')
        if (data.code === 0) {
            ElMessage.success('发送成功')
        }
    })
}

const router = useRouter()
const idFormRef = ref();
const emailFormRef = ref();

// const routerList = computed(() => store.state.menu.routerList)
// 表单提交 
const submitForm = async(formEl) => {
    if (!formEl) return
    // 手动触发校验
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 用户名登录
            if (formPage.value === 0) {
                console.log(idLoginForm.userName)
                login(idLoginForm).then(({ data }) => {
                    if(data.code === 0) {
                        ElMessage.success('登录成功')
                        console.log('data', data)
                        // 将token和用户信息缓存到浏览器
                        localStorage.setItem('fs_token', data.data.token)
                        localStorage.setItem('fs_user', JSON.stringify(data.data.user))
                        router.push('/')
                    }
                })
            } else {
            // 邮箱登录
                console.log(emailLoginForm.email)
                login(emailLoginForm).then(({ data }) => {
                    console.log('登陆前邮箱', emailLoginForm.email)
                    if(data.code === 0) {
                        ElMessage.success('登录成功！')
                        console.log(data)
                        // 将token和用户信息缓存到浏览器
                        localStorage.setItem('fs_token', data.data.token)
                        localStorage.setItem('fs_user', JSON.stringify(data.data.user))
                        // menuPermissions().then(({ data }) => {
                        //     store.commit('dynamicMenu', data.data)
                        //     console.log(routerList, 'routerList')
                        //     toRaw(routerList.value).forEach(item => {
                        //         router.addRoute('main', item)  
                        //     })
                        //     router.push('/')
                        // })
                        router.push('/')
                    }
                })
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