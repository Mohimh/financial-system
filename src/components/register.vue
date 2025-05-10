<template>
    <el-row class="register-container" justify="center" :align="'middle'">
        <el-card class="card-inside">
            <!-- 欢迎注册界面 -->
            <p class="welcome">欢迎注册财务管理系统账号</p>

            <!-- 切换手机注册，账号注册按钮 -->
            <div class="jump-link flex-box">
                <p>
                    <el-link type="primary" class="register" :underline="false" style="font-size: 16px;">
                        账号邮箱注册
                    </el-link>
                </p>
            </div>

            <!-- 邮箱注册 -->
            <el-form 
                ref="registerFormRef" 
                :model="registerForm" 
                style="max-width: 480px" 
                class="ruleForm"
                :rules="rules"
            >
                <el-form-item prop="userName">
                    <el-input v-model="registerForm.userName" placeholder="请设置用户名，4-10个字符" :prefix-icon="UserFilled">
                    </el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="registerForm.passWord" :type="passwordMode === false ? 'password' : 'text'"
                        placeholder="请设置登录密码" :prefix-icon="Lock">
                        <template #append>
                            <el-button :icon="passwordMode === false ? Hide : View" @click="passwordModeChange">
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="registerForm.email" placeholder="请输入邮箱" :prefix-icon="Message">
                        <template #append>
                            <el-select v-model="suffix" style="width: 115px" @change="handleSuffixChange">
                                <el-option v-for="item in EMAIL_OPTIONS" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-input v-model="registerForm.captcha" placeholder="请输入6位验证码">
                        <template #append>
                            <span @click="countdownChange">{{ countdown.validText }}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-checkbox v-model="checkboxButton" size="small">点击开始体验财务管理系统</el-checkbox>
                <el-form-item>
                    <el-button type="primary" class="register-button" @click="submitForm(registerFormRef)">
                        开始体验
                    </el-button>
                </el-form-item>
                <el-text class="backToLogin-link flex-box" style="margin-top: 82px;">
                    已有账号？
                    <el-link type="primary" :underline="false" @click="changeForm">立即登录</el-link>
                </el-text>
            </el-form>
        </el-card>
    </el-row>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { UserFilled, Lock, Hide, View, Message } from '@element-plus/icons-vue'
// import { getCode, userAuthentication, login, menuPermissions } from '../../api'
import { getCode, register } from '@/api'
import { ElCheckboxButton, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

// 切换注册界面 （勿删）
const changeForm = () => {
    store.commit('changeMenu')
}

// 表单数据
const registerForm = reactive({
    userName: '',
    passWord: '',
    email: '',
    captcha: '',
})

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
    const prefix = registerForm.email.split('@')[0]; // 获取当前邮箱前缀
    registerForm.email = prefix + newSuffix; // 拼接完整邮箱
};

// 注册必点按钮
const checkboxButton = ref(false)

// 账号校验
const validateName = (rule, value, callback) => {
    // 账号不为空
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
    // 邮箱不能为空
    if (value === '') {
        callback(new Error('请输入邮箱'))
    }
    else {
        callback()
    }
}

// 验证码校验
const validateCode = (rule, value, callback) => {
    // 验证码不为空
    if (value === '') {
        callback(new Error('请输入验证码'))
    }
    else {
        const reg = /^[0-9]{6}$/
        reg.test(value) ? callback() : callback(new Error('请检查验证码是否正确'))
    }
}

const rules = reactive({
    userName: [{ validator: validateName, trigger: 'blur' }],
    passWord: [{ validator: validatePass, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }],
    captcha: [{ validator: validateCode, trigger: 'blur' }]
})

// 倒计时按钮
const countdown = reactive({
    validText: '获取验证码',
    time: 60
})

// 验证码
let flag = false
const countdownChange = () => {
    // 验证码在规定时间只能被点击1次
    if (flag) return
    // 邮箱校验
    if (registerForm.email === 'value') {
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
    getCode({ target: registerForm.email, vType: 'email' }).then(({ data }) => {
        console.log(data, 'data')
        if (data.code === 0) {
            ElMessage.success('发送成功')
        }
    })
}

const router = useRouter()
const registerFormRef = ref()

// const routerList = computed(() => store.state.menu.routerList)

// 表单提交 
const submitForm = async(formEl) => {
    console.log("通过1")
    if (!formEl) return
    console.log("通过2")
    // 手动触发校验
    await formEl.validate((valid, fields) => {
        console.log("通过3")
        if (valid) {
            register(registerForm).then(({ data }) => {
                if(data.code === 0) {
                    ElMessage.success('注册成功！')
                    console.log('data', data)
                    // 将token和用户信息缓存到浏览器
                    localStorage.setItem('fs_token', data.data.token)
                    localStorage.setItem('fs_user', JSON.stringify(data.data.user))
                    router.push('/')
                    // menuPermissions().then(({ data }) => {
                    //     store.commit('dynamicMenu', data.data)
                    //     console.log(routerList, 'routerList')
                    //     toRaw(routerList.value).forEach(item => {
                    //         router.addRoute('main', item)  
                    //     })
                    //     router.push('/')
                    // })
                }
            })
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

.register-container {
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

        // 点击注册按钮
        .register-button {
            margin-top: 25px;
            height: 40px;
            width: 100%;
        }

        // 手机、账号注册页面跳转按钮
        .jump-link {
            margin-bottom: 20px;

            p {
                text-align: left;

                .register {
                    margin-left: 10px;
                }
            }
        }

        // 回到登录界面按钮
        .backToLogin-link {
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