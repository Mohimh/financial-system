<template>
    <div class="home-box">
        <el-container>
            <el-header style="height: 85px;">
                <div class="flex-box">
                    Welcome to Financial System
                </div>
                <div class="flex-box">
                    欢迎来到财务管理系统
                </div>
            </el-header>
            <el-main></el-main>
        </el-container>

        <!-- <el-dialog 
                v-model="dialogFormVisible" 
                title="请填写详情信息" 
                width="500" 
                :before-close="beforeClose"
            >
                <el-form 
                    :model="registerForm" 
                    ref="registerDialogRef" 
                    label-width="auto" 
                    :rules="dialogRules"
                >
                    <el-form-item prop="real_name" label="真实姓名">
                        <el-input v-model="registerForm.real_name" placeholder="请填写真实姓名" />
                    </el-form-item>
                    <el-form-item prop="sex" label="性别">
                        <el-select v-model="registerForm.sex" placeholder="请选择性别">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" label="电话">
                        <el-input v-model="registerForm.phone" placeholder="请填写电话" />
                    </el-form-item>
                    <el-form-item prop="position" label="地址">
                        <el-input v-model="registerForm.position" type="textarea" placeholder="请填写地址" :rows="4" />
                    </el-form-item>
                </el-form>
                <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitDialogForm(registerDialogRef)">提交</el-button>
                </div>
                </template>
            </el-dialog> -->
    </div>
</template>

<script setup>
</script>


<style scoped>
.flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
}
.home-box {
    height: 100%;
    width: 100%;
    /* background-image: url('../../../布吉岛532189743.png'); */
    background-repeat: no-repeat;
    background-size: cover;
    .el-container {
        .el-header {
            font-size: 28px;
            /* color: #fff; */
            color: #000;
        }
    }
}
</style>