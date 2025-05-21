<template>
  <div>
    <div class="tax-calc">
      <h3>含税、不含税金额 --> <strong>税率</strong></h3>
      <el-form :model="formData" label-position="left" label-width="100px">
        <el-form-item label="含税金额:">
          <el-input v-model="formData.inclusiveTax" placeholder="请输入含税金额"></el-input>
        </el-form-item>

        <el-form-item label="未含税金额:">
          <el-input v-model="formData.inclusiveTax" placeholder="请输入未含税金额"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="calculateTaxRate">计算税率</el-button>
        </el-form-item>

        <el-form-item label="税率:">
          <el-input v-model="formData.taxRate" readonly>
            <template #append>
              <el-button @click="copyToClipboard(formData.taxRate)">
                <el-icon>
                  <Document />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="税额:">
          <el-input v-model="formData.taxAmount" readonly>
            <template #append>
              <el-button @click="copyToClipboard(formData.taxAmount)">
                <el-icon>
                  <Document />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

      </el-form>
    </div>
  </div>

  <div>
    <div class="tax-calc">
      <h3>含税金额 --> <strong>不含税税率</strong></h3>
      <el-form :model="formData" label-position="left" label-width="100px">
        <el-form-item label="含税金额:">
          <el-input v-model="formData.inclusiveTax" placeholder="请输入含税金额"></el-input>
        </el-form-item>

        <el-form-item label="税率（点）:">
          <el-input v-model="formData.taxPercent" placeholder="请输入税率">
            <template #append>%</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="calculateTaxRate">计算税率</el-button>
        </el-form-item>

        <el-form-item label="不含税金额:">
          <el-input v-model="formData.taxRate" readonly>
            <template #append>
              <el-button @click="copyToClipboard(formData.taxRate)">
                <el-icon>
                  <Document />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="税额:">
          <el-input v-model="formData.taxAmount" readonly>
            <template #append>
              <el-button @click="copyToClipboard(formData.taxAmount)">
                <el-icon>
                  <Document />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

      </el-form>
    </div>
  </div>

  <div>
    <div class="tax-calc">
      <h3>不含税金额 --> <strong>含税金额</strong></h3>
      <el-form :model="formData" label-position="left" label-width="100px">
        <el-form-item label="税额:">
          <el-input v-model="formData.inclusiveTax" placeholder="请输入金额"></el-input>
        </el-form-item>

        <el-form-item label="税率（点）:">
          <el-input v-model="formData.taxPercent" placeholder="请输入税率">
            <template #append>%</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="calculateTaxRate">计算税率</el-button>
        </el-form-item>

        <el-form-item label="含税金额:">
          <el-input v-model="formData.taxRate" readonly>
            <template #append>
              <el-button @click="copyToClipboard(formData.taxRate)">
                <el-icon>
                  <Document />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="税额:">
          <el-input v-model="formData.taxAmount" readonly>
            <template #append>
              <el-button @click="copyToClipboard(formData.taxAmount)">
                <el-icon>
                  <Document />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

      </el-form>
    </div>
  </div>

  <div>
    <div class="tax-calc">
      <h3>税额 --> <strong>含税金额、不含税金额</strong></h3>
      <el-form :model="formData" label-position="left" label-width="100px">
        <el-form-item label="税额：">
          <el-input v-model="formData.inclusiveTax" placeholder="税额"></el-input>
        </el-form-item>

        <el-form-item label="税率（点）:">
          <el-input v-model="formData.taxPercent" placeholder="请输入税率">
            <template #append>%</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="calculateTaxRate">计算税率</el-button>
        </el-form-item>

        <el-form-item label="含税金额:">
          <el-input v-model="formData.taxRate" readonly>
            <template #append>
              <el-button @click="copyToClipboard(formData.taxRate)">
                <el-icon>
                  <Document />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="不含税金额:">
          <el-input v-model="formData.taxAmount" readonly>
            <template #append>
              <el-button @click="copyToClipboard(formData.taxAmount)">
                <el-icon>
                  <Document />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

      </el-form>
    </div>
  </div>

  <div id="app">
    <el-card class="instruction-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span><strong>税务计算器</strong>使用说明</span>
      </div>
      <div>
        <p>1. 税率：输入含税金额、未含税金额，即可计算税率、税额；</p>
        <p>2. 不含税金额：输入含税金额、税率（税点），即可计算不含税金额、税额；</p>
        <p>3. 含税金额：输入不含税金额、税率（税点），即可计算含税金额、税额。</p>
      </div>
    </el-card>
  </div>

</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'

const formData = reactive({
  includeTax: '', // 含税金额
  excludeTax: '', // 未含税金额
  taxRate: '', // 税率
  taxAmount: '' // 税额
})

// 计算税率和税额
const calculateTaxRate = () => {
  if (!formData.includeTax || !formData.excludeTax) {
    ElMessage.warning('请输入含税金额和未含税金额')
    return
  }

  if (Number(formData.includeTax) <= Number(formData.excludeTax)) {
    ElMessage.warning('含税金额必须大于未含税金额')
    return
  }

  // 计算税额
  const taxAmount = Number(formData.includeTax) - Number(formData.excludeTax)
  // 计算税率
  const taxRate = (taxAmount / Number(formData.excludeTax) * 100).toFixed(2)

  formData.taxRate = taxRate + '%'
  formData.taxAmount = taxAmount.toFixed(2)
}

// 复制到剪贴板
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      ElMessage.success('复制成功')
    })
    .catch(() => {
      ElMessage.error('复制失败')
    })
}
</script>

<style lang="less" scoped>
.tax-calc {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    font-weight: normal;
  }

  .instruction-card {
    border-radius: 8px;
    margin: 20px;
  }
}
</style>