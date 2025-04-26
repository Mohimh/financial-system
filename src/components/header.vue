<template>
    <div class="head-box">
        <div class="top flex-box">
            <el-icon class="icon" size="20" @click="store.commit('collapseMenu')"><Fold /></el-icon>
        </div>
        <div class="footer flex-box">
            <el-button @click="homeClick">首页</el-button>
        </div>
    </div>
    
</template>


<script setup>
import { Fold } from '@element-plus/icons-vue';
import { useStore } from 'vuex';

const store = useStore()

const homeClick = () => {

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
        .icon {
            padding: 0 15px;
            height: 100%;
        }
        .icon:hover {
            background-color: #f5f5f5;
            cursor: pointer;
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