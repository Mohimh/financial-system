<template>

    <template v-for="(item, index) in props.menuData">
            <el-menu-item 
                v-if="!item.children || item.children.length == 0" 
                :index="`${props.index}-${item.meta.id}`" 
                @click="handleClick(item, `${props.index}-${item.meta.id}`)"
                :key="`${props.index}-${item.meta.id}`"
            >
            <!-- <el-icon v-if="item.meta.icon" size="20">
                <component :is="item.meta.icon"></component>
            </el-icon> -->
            <span>{{ item.meta.name }}</span>
            </el-menu-item>

            <el-sub-menu 
                v-else :index="`${props.index}-${item.meta.id}`"
            >
                <template #title>
                    <!-- <el-icon size="20">
                        <component :is="item.meta.icon"></component>
                    </el-icon> -->
                    <span>{{ item.meta.name }}</span>
                </template>
                <tree-menu :index="`${props.index}-${item.meta.id}`" :menuData="item.children" />
                </el-sub-menu>
            </template>
    
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
const props = defineProps(['index', 'menuData'])

// 菜单点击事件
const handleClick = (item, activeIndex) => {
    store.commit('addMenu', item.meta);
    store.commit('updateMenuActive', activeIndex); // 提交组合 index
    router.push(item.meta.path);
}

// 监听路由变换
// watch(() => route.path, (newPath) => {
//     activePath.value = newPath
// })

</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.el-menu-item {
    height: 60px;
}
:deep(.el-sub-menu__title) {
    padding-right: 60px;
}
</style>