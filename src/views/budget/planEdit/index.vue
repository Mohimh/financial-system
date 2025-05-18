<template>
    <div class="budget-preparation">
        <el-form :model="form" label-width="120px">
            <el-form-item label="预算名称">
                <el-input v-model="form.name" placeholder="请输入预算名称" style="width: 350px;"/>
            </el-form-item>
            <el-form-item label="预算期间">
                <el-date-picker v-model="form.period" type="month" placeholder="选择月份" value-format="YYYY-MM" />
            </el-form-item>
            <el-form-item label="预算金额">
                <el-input-number v-model="form.amount" :min="0"  controls-position="right" style="width: 200px;"/>
            </el-form-item>
            <el-form-item label="责任部门">
                <el-select v-model="form.department" placeholder="请选择部门" style="width: 200px;">
                    <el-option 
                        v-for="item in DEPARTMENT_OPTIONS" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value" 
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
    name: '',
    period: '',
    amount: 0,
    department: ''
})

const DEPARTMENT_OPTIONS = [
    { value: 'dept1', label: '财务部' },
    { value: 'dept2', label: '市场部' },
    { value: 'dept3', label: '研发部' }
]

const submitForm = () => {}

const resetForm = () => {
    Object.assign(form, {
        name: '',
        period: '',
        amount: 0,
        department: ''
    })
}
</script>

<style lang="less" scoped>
.budget-preparation {
    background-color: #fff;
    .el-form {
        padding: 15px 20px;
    }
}
</style>