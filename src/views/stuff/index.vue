<template>
    
    <div class="stuff-table">
        <el-button type="primary" round size="small">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe="true" style="width: auto">
            <el-table-column prop="department" label="部门" width="75px"/>
            <el-table-column prop="account" label="账号" width="80px"/>
            <el-table-column prop="name" label="姓名" width="80px"/>
            <el-table-column label="性别" width="75px">
                <template #default="scoped">  
                    <el-tag type="success">
                        {{ scoped.row.gender === '0' ? '男' : '女' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="birth" label="生日"/>
            <el-table-column prop="tel" label="电话"/>
            <el-table-column prop="email" label="邮箱" width="150px"/>
            <el-table-column prop="entry" label="入职"/>
            <el-table-column prop="address" label="地址"/>
            <el-table-column prop="state" label="状态">
                <template #default="scoped">
                    <el-switch
                        v-model="scoped.row.state"
                        disabled
                        :style="scoped.row.state === true ? '--el-switch-on-color: #13ce66' : '--el-switch-off-color: #ff4949'"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="enter" label="录入时间" width="175px"/>
            <el-table-column label="操作">
                <el-link :underline="false" type="primary">
                    <el-icon><EditPen /></el-icon>
                    编辑
                </el-link>
                <el-link :underline="false" type="danger">
                    <el-icon><Delete /></el-icon>
                    删除
                </el-link>
            </el-table-column>
        </el-table>
        <div class="pagination-info">
            <el-pagination
                v-model:current-page="paginationData.pageNum"
                v-model:page-size="paginationData.pageSize"
                :page-sizes="[5, 10]"
                size="small"
                :background="false"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
    
</template>

<script setup>
import { ref, reactive } from 'vue'

// 分页
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

// 测试数据
const tableData = reactive({
    list: 
    [
        {
            department: '研发部',
            account: '2024001',
            name: '张小斐',
            gender: '1',
            birth: '1996-07-11',
            tel: '11111111',
            email: '111@qq.com',
            entry: '2020-08-01',
            address: '广东深圳',
            state: true,
            enter: '2024-11-16 21:13:04'
        },
        {
            department: '研发部',
            account: '2024002',
            name: '张亮',
            gender: '0',
            birth: '1990-08-16',
            tel: '11111112',
            email: '111324@qq.com',
            entry: '2020-08-01',
            address: '广东深圳',
            state: true,
            enter: '2024-11-16 21:13:04'
        }
    ],
    total: 10
})

const handleSizeChange = () => {

}
const handleCurrentChange = () => {
    
}

</script>

<style lang="less" scoped>

.stuff-table {
    background-color: #fff;
    .el-button {
        margin: 15px 20px;
    }
    .el-table {
        margin: 0 20px;
        .el-link {
            margin: 0 3px;
        }
    }
}
</style>