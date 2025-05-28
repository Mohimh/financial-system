<template>
    <!-- 个人信息 -->
    <div class="personal-information">
        <el-form label-width="100px" class="flex-box">
            <h1>请补全完整信息</h1>
              <el-divider border-style="dashed" />
            <el-form-item label="用户名">
                <el-input v-model="form.username" @change="handleInputChange"></el-input>
            </el-form-item>
            <el-form-item label="真实名称">
                <el-input v-model="form.real_name" @change="handleInputChange"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select 
                    style="width: 196px;"
                    v-model="form.sex" 
                >
                    <el-option 
                        v-for="item in SEXOPTIONS"
                        :key="item.value"
                        :label="item.sex"
                        :value="item.sex"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="所在部门">
                <el-input v-model="form.department" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="form.phone" @change="handleInputChange"></el-input>
            </el-form-item>
            <el-form-item label="绑定邮箱">
                <el-input v-model="form.email" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建用户时间">
                <el-input v-model="form.created_at" disabled></el-input>
            </el-form-item>
            <el-button @click="submitForm" :disable="!formChanged">
                提交
            </el-button>
        </el-form>
    </div>
    
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import dayjs from 'dayjs'
import { updateUserInfo } from '@/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

// 用户信息
const user = JSON.parse(localStorage.getItem('fs_user'))

const form = reactive({
    authorityId: '',
    username: '',
    real_name: '',
    sex: '',
    department: '',
    phone: '',
    email: '',
    created_at: '',
})

const SEXOPTIONS = [
    { value: '1', sex: '男' },
    { value: '2', sex: '女' },
]

onMounted(() => {
    Object.assign(form, user)
    form.created_at = dayjs(form.created_at).format('YYYY-MM-DD')
    
})

// 跟踪表单是否被修改
const formChanged = ref(false)
const originalValues = JSON.parse(JSON.stringify(user))

// 处理输入变化
const handleInputChange = () => {
    formChanged.value = JSON.stringify(user) !== JSON.stringify(originalValues)
}

const submitForm = () => {
    console.log(form)
    updateUserInfo(user.id, form).then(({ data }) => {
        if (data.code === 0) {
            localStorage.setItem('fs_user', JSON.stringify(data.data.user))
            ElMessage.success('修改成功')
        }
    })
}

// 跳转修改头像页面
const avatarClick = () => {
    store.commit('updateInformationActive', '3'); // 提交组合 index
    router.push('/selfInformation/changeAvatar');
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
    .avatar {
        transform: scale(1);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .avatar-box {
        cursor: pointer;
    }

    .avatar-box:hover .avatar {
        transform: scale(1.05);
    }
}
</style>