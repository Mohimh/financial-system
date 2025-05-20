<template>
  <div class="personal-center">
    <el-container class="flex-box">
      <el-header class="header flex-box">
        <h1>个人信息中心</h1>
      </el-header>
      <el-container class="body">
        <el-menu
          class="aside"
          active-text-color="#ffd04b"
          background-color="#545c64"
          default-active="1"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item
            v-for="(item, index) in listData"
            class="menu-item" 
            :index="item.meta.id"
            :key="item.meta.id" 
            @click="handleClick(item, item.meta.id)"
          >
            <span>{{ item.meta.name }}</span>
          </el-menu-item>
        </el-menu>
          
        <el-main class="flex-box"> <RouterView /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
// 侧边栏
const listData = computed(() => store.state.selfInformation.routerList)
const activeIndex = computed(() => store.state.selfInformation.activeIndex);

const handleClick = (item, activeIndex) => {
    store.commit('addMenu', item.meta);
    store.commit('updateMenuActive', activeIndex); // 提交组合 index
    router.push(item.meta.path);
}

const handleOpen = () => {}
const handleClose = () => {}

</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
  height: 100%;
}

.personal-center {
  .header {
    background-color: #ffffff;
    border-bottom: 1px solid #e7e7e7;
    height: 120px;
  } 
  
  .body {
    width: 60%;
    background-color: #f1f1f1;
    height: 100%;
    .aside {
      width: 20%;
      .menu-item {
        height: 80px;
      }
    }
    .content {
      height: 100%;
    }
  }

}

</style>