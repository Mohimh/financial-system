<template>
    <el-menu 
        :style="{ width: !isCollapse ? '200px' : '64px' }"
        class="asider-container" 
        active-text-color="#ffd04b" 
        text-color="#000" 
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
    >
        <el-menu-item 
            v-for="(item, index) in menuData"
            @click="handleClick(item, `${item.meta.id}`)"
            :index="`${item.meta.id}`"
            :key="`${item.meta.id}`"
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
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const menuData = computed(() => store.state.menu.routerList)

const isCollapse = computed(() => store.state.menu.isCollapse)

const handleClick = (item, active) => {
    store.commit('addMenu', item.meta)
    store.commit('updateMenuActive', active)
    router.push(item.meta.path)
}

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

    .el-menu-item {
        height: 60px;
    }
}
</style>