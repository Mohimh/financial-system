<template>
    <el-form :model="form" label-width="120px" class="reimbursement-form">
        <!-- 基本信息 -->
        <el-row class="base-info" justify="center" align="middle">
            <el-col :span="12">
                <el-form-item label="申请人ID">
                    <el-input v-model="user.real_name" type="text" disabled placeholder="请输入申请人ID" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="报销描述" align="middle">
                    <el-input v-model="form.description" :rows="3" type="textarea" placeholder="请输入报销事由" />
                </el-form-item>
            </el-col>
        </el-row>

        <!-- 报销明细 -->
        <div class="items-container">
            <h3 style="padding: 20px; padding-bottom: 0;">报销明细</h3>
            <el-divider />
            <el-button type="primary" style="margin-bottom: 10px;" @click="addItem">+ 添加明细项</el-button>

            <el-row v-for="(item, index) in form.items" :key="index" class="item-row">
                <el-col :span="6">
                    <el-form-item label="金额" :prop="`items[${index}].amount`">
                        <el-input-number v-model.number="item.amount" type="number" :precision="2" :max="10000" placeholder="请输入金额" :controls="false" />
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="明细描述" :prop="`items[${index}].description`">
                        <el-input v-model="item.description" placeholder="请输入明细描述" />
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="费用类型" :prop="`items[${index}].type`">
                        <el-select v-model.number="item.type" placeholder="请选择类型">
                            <el-option label="差旅" :value="1" />
                            <el-option label="办公" :value="2" />
                            <el-option label="其他" :value="3" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4" class="action-col">
                    <el-button type="danger" @click="removeItem(index)">删除</el-button>
                </el-col>
            </el-row>
            <!-- 总金额 -->
            <el-form-item label="总金额">
                <el-input :value="totalSalary" type="number" disabled />
            </el-form-item>
    
            <!-- 操作按钮 -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交报销</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup>
import { reimburseCreate } from '@/api';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';

const user = JSON.parse(localStorage.getItem('fs_user'))

const form = reactive({
    applicant_id: null,
    description: '',
    apply_date: '',
    items: [
        {
            amount: null,
            description: '',
            type: 1,
        }
    ],
    total_amount: 0
});


const totalSalary = computed(() => {
    let sum = 0
    form.items.forEach(item => {
        sum += item.amount 
    });
    return sum.toFixed(2)
})

// 添加明细项
const addItem = () => {
    form.items.push({
        amount: null,
        description: '',
        type: 1
    });
};

// 删除明细项
const removeItem = (index) => {
    form.items.splice(index, 1);
};

// 调整为本地时间(+08:00)表示，使用toISOString会先转换为UTC时间，所以我们需要调整
// 可以通过手动添加时区偏移
function getISOLocalDateTime(date) {
    let offset = -date.getTimezoneOffset();
    let sign = offset < 0 ? '-' : '+';
    let absOff = Math.abs(offset);
    let hoursOff = Math.floor(absOff / 60);
    let minsOff = absOff % 60;
    let localISOTime = date.toISOString().substring(0,23);
    return `${localISOTime}${sign}${String(hoursOff).padStart(2, '0')}:${String(minsOff).padStart(2, '0')}`;
}

// 提交逻辑（需对接API）
const onSubmit = () => {
    form.applicant_id = user.id
    let date = new Date()
    form.apply_date = getISOLocalDateTime(date)
    form.total_amount = totalSalary.value
    console.log('表单form:', form);
    
    reimburseCreate(form).then(({ data }) => {
        if (data.code === 0) {
            ElMessage.success('报销单添加成功')
        }
        else {
            ElMessage.warning('报错')
        }
    })
    console.log('提交的数据:', form);
};

// 重置表单
const onReset = () => {
    Object.assign(form, 
        {
            description: '',
            apply_date: '',
            items: [{ amount: null, description: '', type: 1 }],
            total_amount: null
        }
    )

};
</script>

<style scoped lang="less">
.reimbursement-form {
    background-color: #fff;
    padding: 10px;
    height: 100%;
    .base-info {
        padding: 10px;
        border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow);
        background-color: #f8f8ff;
    }
    .items-container {
        margin: 20px 0;
        padding: 15px;
        border-radius: 4px;
        border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow);
        background-color: #f8f8ff;
        .item-row {
            margin-bottom: 15px;
            padding: 10px 15px;
            border-radius: 4px;
        }
    
        .action-col {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }

}
</style>