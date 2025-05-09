<template>
    <div class="salary-table">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe style="width: auto">
            <el-table-column prop="month" label="月份"/>
            <el-table-column prop="department" label="部门"/>
            <el-table-column prop="stuff" label="员工"/>
            <el-table-column prop="basicSalary" label="基本工资"/>
            <el-table-column prop="meritSalary" label="绩效工资"/>
            <el-table-column prop="insurance" label="五险一金"/>
            <el-table-column prop="extra" label="额外奖励"/>
            <el-table-column prop="deduct" label="其他扣除"/>
            <el-table-column prop="total" label="工资合计"/>
            <el-table-column label="状态">
                <template #default="scoped">
                    <el-tag :type="scoped.row.state === '0' ? 'info' : 'success'">
                        {{ scoped.row.state === '0' ? '待发放' : '已发放' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="notes" label="备注"/>
            <el-table-column prop="submitDate" label="提交日期"/>
            <el-table-column label="操作" width="200px">
                <template #default="scoped">
                    <el-link :underline="false" type="primary" @click="edit(scoped.row)">
                        <el-icon><EditPen /></el-icon>
                        编辑
                    </el-link>
                    <el-link :underline="false" type="warning">
                        <el-icon><CircleCheck /></el-icon>
                        发放
                    </el-link>
                    <el-link :underline="false" type="danger">
                        <el-icon><Delete /></el-icon>
                        删除
                    </el-link>
                </template>
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
        <el-dialog
            v-model="dialogFormVisable"
            :before-close="beforeClose"
            title="工资信息添加"
            width="400"
        >
            <el-form
                ref="formRef"
                label-width="100px"
                label-position="left"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="month" label="月份">
                    <el-date-picker
                        v-model="form.month"
                        type="month"
                        placeholder="选择月份"
                        value-format="YYYY-MM"
                        size="default"
                    />
                </el-form-item>
                <el-form-item prop="department" label="部门">
                    <el-select
                        v-model="form.department"
                        placeholder="请选择部门"
                        size="default"
                        style="width: 240px"
                    >
                        <el-option
                            v-for="item in DEPARTMENT_OPTIONS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item prop="stuff" label="员工名称">
                    <el-input v-model="form.stuff" placeholder="请输入员工名称"/>
                </el-form-item>
                <el-form-item prop="basicSalary" label="基本工资">
                    <el-input 
                        v-model.number="form.basicSalary"
                        type="text"
                        placeholder="请输入基本工资"
                    />
                </el-form-item>
                <el-form-item prop="meritSalary" label="绩效工资">
                    <el-input 
                        v-model.number="form.meritSalary"
                        type="text"
                        placeholder="请输入绩效工资"
                    />
                </el-form-item>
                <el-form-item prop="insurance" label="五险一金">
                    <el-input 
                        v-model.number="form.insurance"
                        type="text"
                        placeholder="请输入五险一金"
                    />
                </el-form-item>
                <el-form-item prop="extra" label="额外奖励">
                    <el-input 
                        v-model.number="form.extra"
                        type="text"
                        placeholder="请输入额外奖励"
                    />
                </el-form-item>
                <el-form-item prop="deduct" label="其他扣除">
                    <el-input 
                        v-model.number="form.deduct"
                        type="text"
                        placeholder="请输入其他扣除"
                    />
                </el-form-item>
                <el-form-item label="工资合计">
                    <el-input 
                        :value="calculateTotal"
                        disabled
                    />
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="form.notes"/>
                </el-form-item>
                <el-form-item prop="submitDate" label="提交日期">
                    <el-input v-model="form.submitDate" disabled/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisable=false">取消</el-button>
                    <el-button type="primary" @click="confirm(formRef)">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick, computed } from 'vue'

// 分页
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

// 测试数据
const tableData = ({
    list: [
        {
            month: '2024-10',
            department: '研发部',
            stuff: '王小二',
            basicSalary: 10000,
            meritSalary: 2000,
            insurance: 500,
            extra: 200,
            deduct: 0,
            total: 11700,
            state: '0',
            notes: '无',
            submitDate: 2024-9-10
        },
        {
            month: '2024-10',
            department: '销售部',
            stuff: '李思思',
            basicSalary: 8000,
            meritSalary: 1000,
            insurance: 500,
            extra: 200,
            deduct: 0,
            total: 8700,
            state: '1',
            notes: '无',
            submitDate: 2024-9-10
        }
    ],
    total: 10
})

const open = (rowData = {}) => {
    dialogFormVisable.value = true
    nextTick(() => {
        if (rowData) {
            console.log('ok')
            Object.assign(form, JSON.parse(JSON.stringify(rowData)))
        } else {
            form.enter = new Date().toLocaleString();
        }   
    })
} 

const DEPARTMENT_OPTIONS = [
    { value: '研发部', label: '研发部' },
    { value: '销售部', label: '销售部' }
]

const edit = (rowData) => {
    dialogFormVisable.value = true
    open(rowData)
}

const cancel = (rowData) => {

}

const dialogFormVisable = ref(false)

const beforeClose = () => {
    dialogFormVisable.value = false
    formRef.value.resetFields()
}

const rules = reactive({
    month: [{ required: true, message: '请选择月份' }],
    department: [{ required: true, message: '请选择部门' }],
    stuff: [{ required: true, trigger: 'blur', message: '请填写姓名' }],
    basicSalary: [
        { required: true, message: '必填项' },
        { 
            validator: (_, value, callback) => {
                if (value === null || value === '') return callback()
                if (!Number.isInteger(Number(value))) {
                    callback(new Error('必须为整数'))
                } else {
                    callback()
                }
            }
        }
    ],
    meritSalary: [
        { required: true, message: '必填项' },
        { 
            validator: (_, value, callback) => {
                if (value === null || value === '') return callback()
                if (!Number.isInteger(Number(value))) {
                    callback(new Error('必须为整数'))
                } else {
                    callback()
                }
            }
        }
    ],
    insurance: [
        { required: true, message: '必填项' },
        { 
            validator: (_, value, callback) => {
                if (value === null || value === '') return callback()
                if (!Number.isInteger(Number(value))) {
                    callback(new Error('必须为整数'))
                } else {
                    callback()
                }
            }
        }
    ],
    extra: [
        { required: true, message: '必填项' },
        { 
            validator: (_, value, callback) => {
                if (value === null || value === '') return callback()
                if (!Number.isInteger(Number(value))) {
                    callback(new Error('必须为整数'))
                } else {
                    callback()
                }
            }
        }
    ],
    deduct: [
        { required: true, message: '必填项' },
        { 
            validator: (_, value, callback) => {
                if (value === null || value === '') return callback()
                if (!Number.isInteger(Number(value))) {
                    callback(new Error('必须为整数'))
                } else {
                    callback()
                }
            }
        }
    ],
    total: [
        { required: true, message: '必填项' },
        { 
            validator: (_, value, callback) => {
                if (value === null || value === '') return callback()
                if (!Number.isInteger(Number(value))) {
                    callback(new Error('必须为整数'))
                } else {
                    callback()
                }
            }
        }
    ],
})


const formRef = ref()

const form = reactive({
    month: null,
    department: null,
    stuff: '',
    basicSalary: null,
    meritSalary: null,
    insurance: null,
    extra: null,
    deduct: null,
    notes: '',
    submitDate: new Date().toISOString().split('T')[0] // 自动填充提交日期
})

const calculateTotal = computed(() => {
    return (
        (form.basicSalary || 0) +
        (form.meritSalary || 0) +
        (form.extra || 0) -
        (form.insurance || 0) -
        (form.deduct || 0)
    )
})

const confirm = async (formEl) => {
    if (!formEl) return
    // await formEl.validate((valid, fields) => {
    //     if (valid) {
    //         companion(form).then(({ data }) => {
    //             if (data.code === 10000) {
    //                 ElMessage.success('成功')
    //                 beforeClose()
    //                 getListData()
    //             }
    //             else {
    //                 ElMessage.error(data.message)
    //             }
    //         })
    //     }
    //     else {
    //         console.log('Error submit', fields)
    //     }
    // })
}

const handleSizeChange = () => {

}
const handleCurrentChange = () => {
    
}
</script>

<style lang="less" scoped>

.salary-table {
    background-color: #fff;
    .el-button {
        margin: 15px 20px;
    }
    .el-table {
        margin: 0 20px;
        .el-link {
            margin: 0 5px;
        }
    }
}
</style>