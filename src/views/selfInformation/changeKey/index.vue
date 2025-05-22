<template>
  <div class="change-key flex-box">
    <!-- 修改密码 -->
    <h1 style="justify-self: center;">修改密码</h1>
    <el-divider border-style="dashed" />
    <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPassword(passwordFormRef)">
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { updateUserInfo } from '@/api'
import { ElMessage } from 'element-plus'

const passwordFormRef = ref()

// 密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const userPwd = reactive({
  passWord: ''
})

const user = JSON.parse(localStorage.getItem('fs_user'))

// 密码验证规则
const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 4, max: 16, message: '长度在4到16个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 提交密码修改
const submitPassword = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userPwd.passWord = passwordForm.newPassword
      updateUserInfo(user.id, userPwd).then(({ data }) => {
        if (data.code === 0) {
          localStorage.setItem('fs_user', JSON.stringify(data.data.user))
          ElMessage.success('密码修改成功')
        }
      })
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    }
    else {
      console.log('Error submit', fields)
    }
  })
}

</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.change-key {
  width: 100%;

}
</style>