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