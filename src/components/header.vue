<template>
    <div class="head-box">
        <div class="top flex-box">
            <div class="top-left">
                <el-icon class="icon" size="20" @click="store.commit('collapseMenu')"><Fold /></el-icon>
            </div>
            <div class="top-right">
                <el-dropdown @command=handleClick>
                    <div class="el-dropdown-link flex-box">
                        <el-avatar :size="60" :src="imgUrl" />
                    </div>
                    <template #dropdown>
                        <el-dropdown-item command="infomation">
                            <el-icon><Edit /></el-icon>
                            个人信息
                        </el-dropdown-item>
                        <el-dropdown-item command="changeKey">
                            <el-icon><Lock /></el-icon>
                            修改密码
                        </el-dropdown-item>
                        <el-dropdown-item command="cancel">
                            <el-icon><Warning /></el-icon>
                            退出系统
                        </el-dropdown-item>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="footer flex-box">
            <el-button @click="homeClick">首页</el-button>
        </div>
    </div>
    
</template>


<script setup>
import { Fold } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const imgUrl = new URL('../../public/sparkle.jpg', import.meta.url).href

const store = useStore()
const router = useRouter()

const homeClick = () => {
    router.push('/home')
}


</script>


<style lang="less" scoped>
.flex-box {
    display: flex;
    height: 100%;
    align-items: center;
}

.head-box {
    height: 100%;
    width: 100%;
    box-shadow: 15px 15px 15px rgba(4, 4, 4, 0.05);
    .top {
        height: 60%;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
        border-bottom: 1px solid transparent;
        justify-content: space-between;
        .top-left {
            height: 100%;
            .icon {
                padding: 0 15px;
                height: 100%;
            }
            .icon:hover {
                background-color: #f5f5f5;
                cursor: pointer;
            }
        }
        .top-right {
            height: 100%;
            padding-right: 20px;
        }
    }
    .footer {
        height: 40%;
        .el-button {
            margin: 0 5px;
        }
    }
}

</style>