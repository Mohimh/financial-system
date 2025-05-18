<template>
  <el-table 
    :data="data.rows"
    stripe
    style="width: 100%"
  >
    <el-table-column
      v-for="col in data.columns"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
    />
  </el-table>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>