<template>
    <div class="common-layout">
        <el-container>
        <Aside />
        <el-container>
            <el-header> <Header /> </el-header>
            <el-main> <RouterView /> </el-main>
        </el-container>
        </el-container>

        <el-dialog 
            v-model="dialogFormVisible" 
            title="请填写详情信息" 
            width="400" 
            :before-close="beforeClose"
            :modal="true"
            modal-class="dialog-modal"
        >
            <el-form 
                :model="form" 
                ref="formRef" 
                label-width="auto" 
                :rules="dialogRules"
            >
                <el-form-item prop="real_name" label="真实姓名">
                    <el-input v-model="form.real_name" placeholder="请填写真实姓名" />
                </el-form-item>
                <el-form-item prop="sex" label="性别">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="phone" label="电话">
                    <el-input v-model="form.phone" placeholder="请填写电话" />
                </el-form-item>
            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitDialogForm(formRef)">提交</el-button>
            </div>
            </template>
        </el-dialog>
    </div>  
</template>


<script setup>
import { updateUserInfo } from '@/api'
import Aside from '../components/aside.vue'
import Header from '../components/header.vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('fs_token')
const user = JSON.parse(localStorage.getItem('fs_user'))
const dialogFormVisible = ref(false)
const router = useRouter()

if (token && !user.real_name) {
    dialogFormVisible.value = true
}

const form = reactive({
    id: user.id,
    real_name: '',
    sex: '',
    phone: '',
})
const formRef = ref()

const dialogRules = reactive({
    real_name: [{ required: true, trigger: 'blur', message: '请填写真实姓名'}],
    sex: [{ required: true, trigger: 'blur', message: '请选择性别'}],
})

const beforeClose = () => {}

const submitDialogForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            updateUserInfo(user.id, form).then(({ data }) => {
                if (data.code === 0) {
                    ElMessage.success('填写成功，欢迎进入财务管理系统')
                    dialogFormVisible.value = false
                    localStorage.setItem('fs_user', JSON.stringify(data.data.user))
                    router.push('/home')
                }
            })
        }
        else {
            console.log('Error submit', fields)
        }
    })
}

</script>


<style lang="less" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {  
      height: 100px;
    }
    .el-main {
      background-color: #f1f4f6; 
    }
  }
}
</style>