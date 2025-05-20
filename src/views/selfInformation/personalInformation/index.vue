<template>
    <!-- 个人信息 -->
    <div class="personal-information">
        <el-form label-width="100px" class="flex-box">
            <h1 style="padding-bottom: 20px;">个人基本信息</h1>
            <el-form-item label="头像" style="align-items: center;">
                <el-upload
                    action="http://localhost:8000/api/v1/user/update/{id}"
                    :show-file-list="false" 
                    :on-success="handleAvatarSuccess"
                >
                    <el-avatar v-if="user.headerImg" :src="user.headerImg" :size="75" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户id">
                <el-input v-model="user.authorityId" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="真实名称">
                <el-input v-model="user.real_name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="user.sex"></el-input>
            </el-form-item>
            <el-form-item label="所在部门">
                <el-input v-model="user.department" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="绑定邮箱">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="创建用户时间">
                <el-input v-model="created_at" disabled></el-input>
            </el-form-item>
            <el-button @click="submitForm">
                修改
            </el-button>
        </el-form>
    </div>
    
</template>

<script setup>
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
import { updateUserInfo } from '@/api'
import { ElMessage } from 'element-plus'

// 用户信息
const user = JSON.parse(localStorage.getItem('fs_user'))
const created_at = dayjs(user.created_at).format('YYYY-MM-DD')

const submitForm = () => {
    updateUserInfo(user.authorityId).then(() => {
        ElMessage.success('修改成功')
    })
}

// 头像上传成功
const handleAvatarSuccess = (res) => {
  user.headerImg = URL.createObjectURL(res.raw)
}

</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.personal-information {
    width: 100%;
}
</style>