<template>
    <el-menu 
        :style="{ width: !isCollapse ? '200px' : '64px' }"
        class="asider-container" 
        :default-active="activePath"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :collapse-transition="false"
    >
        <p class="logo-lg flex-box">{{isCollapse ? 'logo' : 'LOGO'}}</p>
        <el-menu-item 
            v-for="(item, index) in menuData"
            @click="handleClick(item, `${item.meta.id}`)"
            :index="item.path"
            :key="item.meta.id"
            :class="{ 'is-active': activePath === item.meta.path }" 
            class="flex-box"
        >
        <el-icon v-if="item.meta.icon" size="20">
            <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.name }}</span>
        </el-menu-item>

    </el-menu>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore()
const route = useRoute()
const router = useRouter()
const activePath = ref(route.path)

// 菜单列表
const menuData = computed(() => store.state.menu.routerList)

// 菜单收折
const isCollapse = computed(() => store.state.menu.isCollapse)

// 菜单点击事件
const handleClick = (item, active) => {
    store.commit('addMenu', item.meta)
    store.commit('updateMenuActive', active)
    router.push(item.meta.path)
}

// 监听路由变换
watch(() => route.path, (newPath) => {
    activePath.value = newPath
})

const handleOpen = () => {
}
const handleClose = () => {
}
</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.asider-container {
    height: 100%;
    .logo-lg {
        height: 60px;
        width: 100%;
        pointer-events: none;
    }

    :deep(.el-menu-item) {
        height: 60px;
        transition: background-color 0.4s;
        &.is-active {
            color: #409eff;  // 设置激活文字颜色
            &:hover {
                color: #66b1ff !important;  // 悬停时文字颜色微调
                background-color: rgba(123, 246, 246, 0.393) !important;
            }
        }

    }

}
</style>