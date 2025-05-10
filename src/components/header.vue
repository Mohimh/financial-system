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
            <el-button
                :class="{ 'active': activePath === '/home' }" 
                @click="homeClick"
            >首页</el-button>
            <el-button 
                v-for="(item, index) in selectMenu" 
                :key="item.path" 
                :class="{ 'active': activePath === item.path }" 
                @click="pageClick(item.path)"
            >
                <!-- <router-link class="text flex-box" :to="{ path: item.path }"> -->
                {{ item.name }}
                <!-- </router-link> -->
                <el-icon class='close' size="12" @click="closeTab(item, index)"><Close /></el-icon>
            </el-button>
        </div>
    </div>
    
</template>


<script setup>
import { Fold } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';


const imgUrl = new URL('../../public/sparkle.jpg', import.meta.url).href

const store = useStore()
const route = useRoute()
const router = useRouter()
const selectMenu = computed(() => store.state.menu.selectMenu)
const activePath = ref(route.path)

// 监听路由变换
watch(() => route.path, (newPath) => {
    activePath.value = newPath
})

// 首页按钮
const homeClick = () => {
    activePath.value = '/home'
    router.push('/home')
}

const pageClick = (path) => {
    activePath.value = path
    router.push(path)
}

// 点击关闭tag
const closeTab = (item, index) => {
    // 删除的非当前行tag
    store.commit('closeMenu', item)
    if (route.path !== item.path) {
        return
    }
    const selectMenuData = selectMenu.value
    if (index === selectMenuData.length) {
        if (!selectMenuData.length) {
            router.push('/')
        } else {
            router.push({
                path: selectMenuData[index - 1].path
            })
        }
    } else {
        router.push({
            path: selectMenuData[index].path
        })
    }
}

const handleClick = (command) => {
    // 个人信息按钮
    if (command === "infomation") {
        
    }
    
    // 修改密码按钮
    if (command === "changeKey") {
        
    }

    // 退出登录按钮
    if (command === "cancel") {
        // localStorage.removeItem('pz_token')
        // localStorage.removeItem('pz_userInfo')
        // localStorage.removeItem('pz_v3pz')
        // window.location.href = window.location.origin
    }
}

</script>


<style lang="less" scoped>
:deep(.el-button) {
    &.active {
        background-color: #409eff;
        color: white;
        &:hover {
            background-color: #79bbff;
        }
        &:active {
            background-color: #337ecc;
        }
    }
}

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