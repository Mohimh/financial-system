<template>
    <el-form :model="form" label-width="120px" class="reimbursement-form">
        <!-- 基本信息 -->
        <el-row class="base-info" justify="center" align="middle">
            <el-col :span="12">
                <el-form-item label="资产编码">
                    <el-input v-model="form.asset_code" type="text" placeholder="请输入资产编码" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="资产名称" align="middle">
                    <el-input v-model="form.asset_name" type="text" placeholder="请输入资产名称" />
                </el-form-item>
            </el-col>
        </el-row>

        <!-- 报销明细 -->
        <div class="items-container">
            <h3 style="padding: 20px; padding-bottom: 0;">固定资产内容</h3>
            <el-divider />

            <el-row class="item-row">
                <el-col :span="12">
                    <el-form-item label="使用人">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门">
                        <el-select placeholder="请选择类型">
                            
                        </el-select>
                    </el-form-item>
    
                    <el-form-item label="购买日期">
                        <el-input placeholder="请输入明细描述" />
                    </el-form-item>
    
                    <el-form-item label="购买价格" >
                        <el-input>
    
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注">
                        <el-input type="textarea" style="width: 500px;" :rows="8"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
    
            <!-- 操作按钮 -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交报销</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup>
import { assetList, assetCreate } from '@/api';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';

const user = JSON.parse(localStorage.getItem('fs_user'))

const form = reactive({
    asset_code: '',
    asset_name: '',
    department_id: '',
    location: '',
    purchase_date: '',
    purchase_price: '',
    remark: '',
    user_id: '',
})

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
    // console.log('totalSalary', totalSalary.value);
    // form.total_amount = totalSalary.value
    console.log('表单form:', form)

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