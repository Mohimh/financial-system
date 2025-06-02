<template>
    <div class="approval-flow">
        <div class="flex-box search">
            <el-input v-model="searchKey" placeholder="搜索审批单" clearable>
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <el-select v-model="filterStatus" placeholder="筛选状态">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>

        <el-timeline class="time-line">
            <el-timeline-item 
                v-for="(item, index) in filteredList" 
                :key="index" 
                :timestamp="item.createTime"
                placement="top" 
                :type="statusMap[item.status].type" 
                :color="statusMap[item.status].color"
            >
                <el-card shadow="hover">
                    <div>
                        <h3 style="padding-bottom: 10px;">{{ item.title }}</h3>
                        <div>
                            <div style="padding: 5px 0;">
                                申请人：{{ item.applicant }}
                            </div>
                            <div style="padding: 5px 0;">
                                金额：¥{{ item.amount }}
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-tag :type="statusMap[item.status].tagType">
                            {{ statusMap[item.status].text }}
                        </el-tag>
                        <div style="padding: 5px 0;">
                            当前审批人：{{ item.currentApprover }}
                        </div>
                    </div>

                    <el-collapse>
                        <el-collapse-item title="审批进度详情">
                            <el-steps :active="item.stepActive" align-center>
                                <el-step 
                                    v-for="(step, i) in item.steps" 
                                    :key="i" 
                                    :title="step.name" 
                                    :description="step.time || '待处理'" 
                                />
                            </el-steps>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchKey = ref('')
const filterStatus = ref('all')

const statusOptions = [
    { label: '全部', value: 'all' },
    { label: '审批中', value: 'processing' },
    { label: '已通过', value: 'approved' },
    { label: '已驳回', value: 'rejected' }
]

const statusMap = {
    processing: { text: '审批中', type: 'primary', tagType: 'warning', color: '#e6a23c' },
    approved: { text: '已通过', type: 'success', tagType: 'success', color: '#67c23a' },
    rejected: { text: '已驳回', type: 'danger', tagType: 'danger', color: '#f56c6c' },
}

const STEPS = reactive([
    { name: '提交申请', time: '' },
    { name: '部门审批', time: '' },
    { name: '财务审批', time: '' },
])

const processList = ref([
    {
        id: '202307001',
        title: '北京出差费用报销',
        applicant: '张三',
        amount: 2560.5,
        createTime: '2023-07-01 14:30',
        status: 'processing',
        currentApprover: '李四（财务部）',
        steps: STEPS,
        stepActive: 2
    },
    {
        id: '202307001',
        title: '北京出差费用报销',
        applicant: '张三',
        amount: 2560.5,
        createTime: '2023-07-01 14:30',
        status: 'approved',
        currentApprover: '李四（财务部）',
        steps: STEPS,
        stepActive: 2
    },
    {
        id: '202307001',
        title: '北京出差费用报销',
        applicant: '张三',
        amount: 2560.5,
        createTime: '2023-07-01 14:30',
        status: 'rejected',
        currentApprover: '李四（财务部）',
        steps: STEPS,
        stepActive: 2
    }
    // 更多数据...
])

const filteredList = computed(() => {
    return processList.value.filter(item => {
        const matchSearch = item.title.includes(searchKey.value) || item.id.includes(searchKey.value)
        const matchStatus = filterStatus.value === 'all' || item.status === filterStatus.value
        return matchSearch && matchStatus
    })
})
</script>

<style scoped lang="less">
.flex-box {
    display: flex;
    height: 100%;
    align-items: center;
}

.approval-flow {
    background-color: #fff;
    padding: 20px;
    .search {
        .el-input {
            padding: 10px;
            width: 25%;
        }
        .el-select {
            padding: 10px;
            width: 25%;
        }
    }
}
</style>