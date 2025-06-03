<template>
    <el-form :model="form" label-width="120px" class="reimbursement-form">
        <!-- 基本信息 -->
        <el-form-item label="申请人ID">
            <el-input v-model="user.real_name" type="text" disabled placeholder="请输入申请人ID" />
        </el-form-item>

        <el-form-item label="报销描述">
            <el-input v-model="form.description" :rows="3" type="textarea" placeholder="请输入报销事由" />
        </el-form-item>

        <!-- 报销明细 -->
        <div class="items-container">
            <h3 style="padding-bottom: 30px;">报销明细</h3>
            <el-button type="primary" style="margin-bottom: 10px;" @click="addItem">+ 添加明细项</el-button>

            <el-row v-for="(item, index) in form.items" :key="index" class="item-row">
                <el-col :span="6">
                    <el-form-item label="金额" :prop="`items[${index}].amount`">
                        <el-input v-model.number="item.amount" type="number" placeholder="请输入金额" />
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
        </div>

        <!-- 总金额 -->
        <el-form-item label="总金额">
            <el-input v-model.number="form.total_amount" type="number" disabled />
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交报销</el-button>
            <el-button @click="onReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reimburseCreate } from '@/api';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const user = JSON.parse(localStorage.getItem('fs_user'))

const form = ref({
    applicant_id: null,
    description: '',
    apply_date: '',
    items: [
        {
            amount: 0,
            description: '',
            type: 1,
        }
    ],
    total_amount: 0,
});

// 添加明细项
const addItem = () => {
    form.value.items.push({
        amount: 0,
        description: '',
        type: 1
    });
};

// 删除明细项
const removeItem = (index) => {
    form.value.items.splice(index, 1);
};

// 提交逻辑（需对接API）
const onSubmit = async () => {
    console.log('表单form:', form.value);
    
    // 计算总金额
    form.value.total_amount = form.value.items.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
    );
    await reimburseCreate(form.value).then(({ data }) => {
        if (data.code === 0) {
            ElMessage.success('报销单添加成功')
        }
        else {
            ElMessage.warning('报错')
        }
    })
    console.log('提交的数据:', form.value);
};

// 重置表单
const onReset = () => {
    form.value = {
        applicant_id: null,
        description: '',
        items: [{ amount: 0, description: '', type: 1 }],
        total_amount: 0
    };
};
</script>

<style scoped lang="less">
.reimbursement-form {
    background-color: #fff;
    max-width: 1000px;
    margin: 20px auto;

    .items-container {
        margin: 20px 0;
        padding: 15px;
        // background: #f5f7fa;
        border-radius: 4px;
    }

    .item-row {
        margin-bottom: 15px;
        background: #fff;
        padding: 10px 15px;
        border-radius: 4px;
    }

    .action-col {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>