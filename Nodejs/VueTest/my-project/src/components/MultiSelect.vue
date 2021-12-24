<template>
  <a-select
    mode="multiple"
    :default-value="['a1', 'z26']"
    style="width: 50%"
    placeholder="Please select"
    @change="handleChange"
  >
    <a-select-option v-for="i in 26" :key="(i + 9).toString(36) + i">
      {{ (i + 9).toString(36).toUpperCase() + '-' + i }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>
