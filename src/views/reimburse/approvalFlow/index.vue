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
                v-for="item in processList.list" 
                :key="item.reimbursement.id" 
                :timestamp="item.reimbursement.apply_date"
                placement="top" 
                :type="statusMap[item.reimbursement.status - 1].type" 
                :color="statusMap[item.reimbursement.status - 1].color"
            >
                <el-card shadow="hover">
                    
                    <div>
                        <h3 style="padding-bottom: 10px;">{{ item.reimbursement.description }}</h3>
                        <div>
                            <div style="padding: 5px 0;">
                                申请人：{{ item.applicant_name }}
                            </div>
                            <div style="padding: 5px 0;">
                                总金额：¥{{ item.reimbursement.total_amount }}
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-tag style="margin: 5px 0;" :type="statusMap[item.reimbursement.status - 1].tagType">
                            {{ statusMap[item.reimbursement.status - 1].text }}
                        </el-tag>
                        <el-row v-if="item.processes && item.processes.length > 0" style="padding: 5px 0;" justify="space-between">
                            <el-col :span="12">管理员审批：{{ item.processes[0].approver_id }}</el-col>
                            <el-col :span="6"><el-button size="small">查看管理员建议</el-button></el-col>
                        </el-row>
                        <el-row v-if="item.processes && item.processes.length > 1" style="padding: 5px 0;" justify="space-between">
                            <el-col :span="12">领导审批：{{ item.processes[1].approver_id }}</el-col>
                            <el-col :span="6"><el-button size="small">查看领导建议</el-button></el-col>
                        </el-row>
                    </div>

                    <el-collapse>
                        <el-collapse-item title="审批进度详情">
                            <el-steps :active="item.processes" align-center>
                                <el-step
                                    v-if="!item.processes"
                                    title="待审核"
                                    description="待审核"
                                />
                                <el-step 
                                    v-for="step in item.processes" 
                                    :key="step.id" 
                                    :title="step" 
                                    :description="step.process_time || '待审核'" 
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
import { ref, computed, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { reimburseList } from '@/api'
import { ElMessage } from 'element-plus'

const searchKey = ref('')
const filterStatus = ref('all')

onMounted(() => {
    getListData()
})

const statusOptions = [
    { label: '全部', value: 'all' },
    { label: '审批中', value: 'processing' },
    { label: '已通过', value: 'approved' },
    { label: '已驳回', value: 'rejected' }
]

const statusMap = [
    { text: '审批中', type: 'primary', tagType: 'warning', color: '#e6a23c' },
    { text: '审批中', type: 'primary', tagType: 'warning', color: '#e6a23c' },
    { text: '已驳回', type: 'danger', tagType: 'danger', color: '#f56c6c' },
    { text: '已通过', type: 'success', tagType: 'success', color: '#67c23a' },
    { text: '已驳回', type: 'danger', tagType: 'danger', color: '#f56c6c' },
]

const STEPS = [
    { name: '待审核', value: 1 },
    { name: '已通过', value: 2 },
    { name: '已驳回', value: 3 },
]

console.log('statusMap', statusMap);

const processList = reactive({
    list: [],
    total: 0,
})

const user = JSON.parse(localStorage.getItem('fs_user'))

const getListData = () => {
    reimburseList({userId: user.id}).then(({data}) => {
        if (data.code === 0) {
            const { processes, total } = data.data
            processList.list = processes
            processList.total = total
            try {
                processList.list.forEach(item => {
                    item.approve_time = dayjs(item.approve_time).format('YYYY-MM-DD')
                    item.apply_date = dayjs(item.apply_date).format('YYYY-MM-DD')
                    if (item.approve_time === '2006-01-02') {
                        item.approve_time = '--'
                    }
                })
            } catch {
                console.log('暂无报销单');
            }
            ElMessage.success('成功')
            console.log('processList:', processList)
        }
        else {
            console.log('失败');
        }
    })
}

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