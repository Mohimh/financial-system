<template>
    <div class="change-avatar">
        <h1 style="justify-self: center;">修改头像</h1>
        <el-divider border-style="dashed" />
        <el-row style="align-items: center; height: 300px;">
            <el-col :span="7" class="flex-box">
                <el-upload
                    ref="uploadRef"
                    show-file-list="false"
                    :auto-upload="true"
                    action="http://localhost:8000/api/v1/user/update/${id}"
                    :headers="{'x-token': token}"
                    :on-success="uploadSuccess"
                >
                </el-upload>
                <div class="choose-avatar flex-box" @click="uploadRef.$el.querySelector('input').click()">
                    <el-icon><Picture /></el-icon>
                    <span>选择本地图片</span>
                </div>
                <el-divider border-style="dashed" />
                <el-button @click="updataAvatar">
                    <el-icon><Picture /></el-icon>
                    <span>上传图片</span>
                </el-button>
            </el-col>
            <el-col :span="7">
                <div class="origin-avatar flex-box">
                    <el-avatar shape="circle" :size="100" :src="originAvatar" />
                    <span>当前头像</span>
                </div>
            </el-col>
        </el-row>
        <el-row style="padding-bottom: 20px;">
            <span>请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</span>
        </el-row>
        <el-row>
            <el-button>更新!</el-button>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Picture } from '@element-plus/icons-vue'

const token = localStorage.getItem('fs_token')
const user = JSON.parse(localStorage.getItem('fs_user'))

const uploadRef = ref()

const originAvatar = ref(user.headerImg)

const uploadSuccess = (result) => {
    originAvatar.value = result.data
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

.change-avatar {
    width: 100%;
    .el-row{
        justify-content: center;
        .choose-avatar {
            width: 200px;
            height: 100px;
            border: 1px solid var(--el-border-color); 
        }
        .choose-avatar:hover {
            background-color: #f2f2f2;
            cursor: pointer;
        }
        .origin-avatar {
            flex-direction: column;
        }
    }
}
</style>