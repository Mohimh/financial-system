<template>
  <div class="asset-add">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="资产名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入资产名称" />
      </el-form-item>
      <el-form-item label="资产编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入资产编号" />
      </el-form-item>
      <el-form-item label="资产类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择资产类型">
          <el-option label="固定资产" value="fixed" />
          <el-option label="无形资产" value="intangible" />
          <el-option label="流动资产" value="current" />
        </el-select>
      </el-form-item>
      <el-form-item label="购置日期" prop="purchaseDate">
        <el-date-picker v-model="form.purchaseDate" type="date" placeholder="请选择购置日期" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="资产价值" prop="value">
        <el-input-number v-model="form.value" :min="0" style="width: 100%;" placeholder="请输入资产价值" />
      </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
const form = reactive({
  name: '',
  code: '',
  type: '',
  purchaseDate: '',
  value: null
})

const rules = {
  name: [{ required: true, message: '请输入资产名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入资产编号', trigger: 'blur' }],
  type: [{ required: true, message: '请选择资产类型', trigger: 'change' }],
  purchaseDate: [{ required: true, message: '请选择购置日期', trigger: 'change' }],
  value: [{ required: true, message: '请输入资产价值', trigger: 'blur' }]
}

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 这里可以调用接口提交表单数据
      ElMessage.success('资产登记成功')
      onReset()
    }
  })
}

const onReset = () => {
  formRef.value.resetFields()
}
</script>

<style lang="less" scoped>
.asset-add {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;
}
</style>