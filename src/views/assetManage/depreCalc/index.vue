<template>
  <div class="depre-calc">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="资产原值" prop="originalValue">
        <el-input-number v-model="form.originalValue" :min="0" style="width: 100%;" placeholder="请输入资产原值" />
      </el-form-item>
      <el-form-item label="残值率(%)" prop="salvageRate">
        <el-input-number v-model="form.salvageRate" :min="0" :max="100" style="width: 100%;" placeholder="请输入残值率" />
      </el-form-item>
      <el-form-item label="使用年限(年)" prop="usefulLife">
        <el-input-number v-model="form.usefulLife" :min="1" style="width: 100%;" placeholder="请输入使用年限" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCalc">计算折旧</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="result !== null" class="result">
      <el-alert
        title="每年折旧额"
        :description="`每年折旧额为：${result} 元`"
        type="success"
        show-icon
        @close="result = null"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
const form = reactive({
  originalValue: null,
  salvageRate: null,
  usefulLife: null
})

const rules = {
  originalValue: [{ required: true, message: '请输入资产原值', trigger: 'blur' }],
  salvageRate: [{ required: true, message: '请输入残值率', trigger: 'blur' }],
  usefulLife: [{ required: true, message: '请输入使用年限', trigger: 'blur' }]
}

const result = ref(null)

const onCalc = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 计算年折旧额 = (原值 - 原值 * 残值率/100) / 使用年限
      const annualDepre = (
        form.originalValue -
        form.originalValue * (form.salvageRate / 100)
      ) / form.usefulLife
      result.value = annualDepre.toFixed(2)
      ElMessage.success('计算成功')
    }
  })
}

const onReset = () => {
  formRef.value.resetFields()
  result.value = null
}
</script>

<style lang="less" scoped>
.depre-calc {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;
  .result {
    margin-top: 24px;
  }
}
</style>