<template>
    
    <div class="stuff-table">
        <el-button type="primary" round icon="CirclePlus" size="small">
            新增
        </el-button>
        <el-table :data="tableData" border stripe="true" style="width: auto">
            <el-table-column prop="department" label="部门"/>
            <el-table-column prop="account" label="账号"/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column label="性别">
                <el-tag type="success">
                    {{ scoped.row.gender ? '男' : '女' }}
                </el-tag>
            </el-table-column>
            <el-table-column prop="birth" label="生日"/>
            <el-table-column prop="tel" label="电话"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="entry" label="入职"/>
            <el-table-column prop="address" label="地址"/>
            <el-table-column prop="state" label="状态">

            </el-table-column>
            <el-table-column prop="enter" label="录入时间"/>
            <el-table-column prop="operation" label="操作">

            </el-table-column>
        </el-table>
    </div>
    
</template>

<script setup>
import { ref, reactive } from 'vue'


// const tableData = reactive({
//     list: 
//     [
//         {
//             department: '研发部',
//             account: '2024001',
//             name: '张小斐',
//             gender: '男',
//             birth: '1996-07-11',
//             tel: '11111111',
//             email: '111@qq.com',
//             entry: '2020-08-01',
//             address: '广东深圳',
//             state: '0',
//             enter: '2024-11-16 21:13:04'
//         }
//     ],
//     total: 0
// })




</script>

<style lang="less" scoped>

.stuff-table {
    background-color: #fff;
    .el-button {
        margin: 15px 20px;
    }
    .el-table {
        margin: 0 20px
    }
}
</style>