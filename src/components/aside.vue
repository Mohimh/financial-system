<template>
    <el-scrollbar>
        <el-menu 
            class="asider-container"
            :default-active="activeIndex" 

            @open="handleOpen"
            @close="handleClose"
        >
            <p class="logo-lg flex-box">logo</p>
            <TreeMenu :index="0" :menuData="menuData" />
        </el-menu>
    </el-scrollbar>
    
</template>

<script setup>
import TreeMenu from './treeMenu.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore()
// const route = useRoute()

// 获取 activeIndex
const activeIndex = computed(() => store.state.menu.activeIndex);

// 查找当前路径对应的组合 index
// const findMenuItemIndexByPath = (menuData, path, parentIndex = '') => {
//   for (const item of menuData) {
//     const currentIndex = parentIndex ? `${parentIndex}-${item.meta.id}` : `${item.meta.id}`;
//     if (item.meta.path === path) return currentIndex;
//     if (item.children?.length) {
//       const found = findMenuItemIndexByPath(item.children, path, currentIndex);
//       if (found) return found;
//     }
//   }
//   return null;
// };

// watch(() => route.path, (newPath) => {
//     const index = findMenuItemIndexByPath(menuData.value, newPath, '');
//     if (index) store.commit('updateMenuActive', index);
// });

// 菜单列表
const menuData = computed(() => store.state.menu.routerList)

const handleOpen = () => {}
const handleClose = () => {}
</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.asider-container {
    width: 200px;
    height: 100%;
    .logo-lg {
        height: 60px;
        width: 100%;
        pointer-events: none;
    }
}


</style>