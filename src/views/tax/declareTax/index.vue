<template>
  <div class="tax-declaration">
    <h1>税务申报准备</h1>
    
    <!-- 税务申报说明 -->
    <el-card class="instruction-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span><strong>税务申报</strong>使用说明</span>
        </div>
      </template>
      <div class="instruction-content">
        <p>1、增值税申报：企业每月/季度需进行增值税申报，提交进销项发票、缴纳税款；</p>
        <p>2、企业所得税：按季度预缴、年度汇算清缴，核算利润并计算应纳税所得额；</p>
        <p>3、个人所得税：为员工代扣代缴，每月按时申报，避免滞纳金。</p>
      </div>
    </el-card>

    <!-- 申报项目列表 -->
    <div class="declaration-section">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="declaration-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>增值税申报</span>
                <el-tag type="danger" size="small" v-if="taxData.vat.dueDate">{{ taxData.vat.daysLeft }}天后到期</el-tag>
              </div>
            </template>
            <div class="card-content">
              <p><strong>申报截止日期:</strong> {{ taxData.vat.dueDate }}</p>
              <p><strong>应纳税额:</strong> {{ taxData.vat.amount }}</p>
              <p><strong>完成状态:</strong> 
                <el-tag :type="taxData.vat.completed ? 'success' : 'warning'">
                  {{ taxData.vat.completed ? '已完成' : '未完成' }}
                </el-tag>
              </p>
              <div class="action-buttons">
                <el-button type="primary" size="small">开始准备</el-button>
                <el-button type="info" size="small">查看历史</el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="declaration-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>企业所得税申报</span>
                <el-tag type="warning" size="small" v-if="taxData.incomeTax.dueDate">{{ taxData.incomeTax.daysLeft }}天后到期</el-tag>
              </div>
            </template>
            <div class="card-content">
              <p><strong>申报截止日期:</strong> {{ taxData.incomeTax.dueDate }}</p>
              <p><strong>应纳税额:</strong> {{ taxData.incomeTax.amount }}</p>
              <p><strong>完成状态:</strong> 
                <el-tag :type="taxData.incomeTax.completed ? 'success' : 'warning'">
                  {{ taxData.incomeTax.completed ? '已完成' : '未完成' }}
                </el-tag>
              </p>
              <div class="action-buttons">
                <el-button type="primary" size="small">开始准备</el-button>
                <el-button type="info" size="small">查看历史</el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="declaration-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>个人所得税申报</span>
                <el-tag type="success" size="small" v-if="taxData.personalTax.dueDate">{{ taxData.personalTax.daysLeft }}天后到期</el-tag>
              </div>
            </template>
            <div class="card-content">
              <p><strong>申报截止日期:</strong> {{ taxData.personalTax.dueDate }}</p>
              <p><strong>应代扣代缴金额:</strong> {{ taxData.personalTax.amount }}</p>
              <p><strong>完成状态:</strong> 
                <el-tag :type="taxData.personalTax.completed ? 'success' : 'warning'">
                  {{ taxData.personalTax.completed ? '已完成' : '未完成' }}
                </el-tag>
              </p>
              <div class="action-buttons">
                <el-button type="primary" size="small">开始准备</el-button>
                <el-button type="info" size="small">查看历史</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 申报材料准备清单 -->
    <div class="document-section">
      <h2>申报材料准备清单</h2>
      <el-card class="checklist-card" shadow="hover">
        <el-table :data="documentsList" style="width: 100%">
          <el-table-column prop="name" label="材料名称" width="250"></el-table-column>
          <el-table-column prop="description" label="说明"></el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已准备' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button size="small" @click="uploadDocument(scope.row)">
                上传
              </el-button>
              <el-button size="small" type="primary" v-if="scope.row.status === '已准备'">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 申报进度 -->
    <div class="progress-section">
      <h2>申报进度</h2>
      <el-card shadow="hover">
        <el-steps :active="2" finish-status="success">
          <el-step title="准备材料" description="收集整理申报所需材料"></el-step>
          <el-step title="数据核对" description="验证财务数据准确性"></el-step>
          <el-step title="填写申报表" description="根据数据填写税务申报表"></el-step>
          <el-step title="提交申报" description="向税务部门提交申报材料"></el-step>
          <el-step title="税款缴纳" description="按时缴纳税款"></el-step>
        </el-steps>
      </el-card>
    </div>

    <!-- 申报日历 -->
    <div class="calendar-section">
      <h2>申报日历</h2>
      <el-card shadow="hover">
        <el-calendar>
          <template #dateCell="{ data }">
            <div class="calendar-cell">
              <p :class="{ 'is-today': data.isToday, 'is-deadline': isDeadlineDate(data.day) }">
                {{ data.day.split('-').slice(2).join('') }}
                <el-badge value="!" class="deadline-badge" v-if="isDeadlineDate(data.day)" />
              </p>
            </div>
          </template>
        </el-calendar>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

// 税务数据
const taxData = reactive({
  vat: {
    dueDate: '2025-06-15',
    amount: '58,320.00',
    completed: false,
    daysLeft: 25
  },
  incomeTax: {
    dueDate: '2025-07-15',
    amount: '135,680.00',
    completed: false,
    daysLeft: 55
  },
  personalTax: {
    dueDate: '2025-06-10',
    amount: '28,450.00',
    completed: true,
    daysLeft: 20
  }
})

// 申报材料清单
const documentsList = reactive([
  { name: '增值税进项发票清单', description: '本期所有可抵扣进项发票及汇总表', status: '已准备' },
  { name: '增值税销项发票清单', description: '本期所有销售发票及汇总表', status: '已准备' },
  { name: '企业所得税纳税申报表', description: '季度/年度企业所得税申报表', status: '未准备' },
  { name: '资产负债表', description: '反映企业财务状况的会计报表', status: '已准备' },
  { name: '利润表', description: '反映企业经营成果的会计报表', status: '未准备' },
  { name: '个人所得税扣缴明细表', description: '员工薪资个税扣缴明细', status: '已准备' }
])

// 检查是否为截止日期
const isDeadlineDate = (date) => {
  const formattedDate = date.substring(0, 10)
  return formattedDate === taxData.vat.dueDate || 
         formattedDate === taxData.incomeTax.dueDate || 
         formattedDate === taxData.personalTax.dueDate
}

// 上传文档方法
const uploadDocument = (document) => {
  // 这里可以实现上传功能
  console.log('上传文档:', document.name)
}
</script>

<style lang="less" scoped>
.tax-declaration {
  padding: 20px;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: normal;
    color: #303133;
  }

  h2 {
    margin: 25px 0 15px;
    font-size: 18px;
    font-weight: normal;
  }
  
  .instruction-card {
    margin-bottom: 25px;
    border-radius: 8px;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .instruction-content {
      p {
        margin: 8px 0;
        line-height: 1.5;
      }
    }
  }

  .declaration-section {
    margin-bottom: 20px;
    
    .declaration-card {
      height: 100%;
      border-radius: 8px;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .card-content {
        p {
          margin: 12px 0;
          line-height: 1.5;
        }
        
        .action-buttons {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .document-section,
  .progress-section,
  .calendar-section {
    margin-top: 30px;
    
    :deep(.el-card) {
      border-radius: 8px;
    }
  }

  .calendar-cell {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    p {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      
      &.is-today {
        background-color: #409eff;
        color: #fff;
        border-radius: 50%;
      }
      
      &.is-deadline {
        background-color: #f56c6c;
        color: #fff;
        border-radius: 50%;
      }
    }
    
    .deadline-badge {
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
}
</style>