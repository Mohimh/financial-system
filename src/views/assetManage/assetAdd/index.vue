<template>
测试

<el-button @click="getListData">
    测试接口
</el-button>
</template>

<script setup>
import { ref, reactive } from 'vue';
// import { assetRead } from '@/api';


const paginationData = reactive({
    page: 1,
    page_size: 10
})

const getListData = () => {
    // assetRead(paginationData).then(({ data }) => {
    //     console.log(data, 'assetRead')
    //     const { stuffs, total } = data.data
    //     tableData.list = stuffs
    //     tableData.total = total
    // })
}

</script>

<style lang="less" scoped>

</style>