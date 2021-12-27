<template>
  <a-select
    mode="multiple"
    v-model="selectedItemList"
    style="width: 50%"
    placeholder="Please select"
    @change="handleChange"
  >
    <a-select-option v-for="i in 26" :key="(i + 9).toString(36) + i">
      {{ String.fromCharCode(i + 64) + "-" + i }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  data() {
    return {
      selectedItemList: ["a1", "b2", "c3"],
    };
  },
  methods: {
    handleChange(itemList) {
      this.selectedItemList = itemList;
      this.$emit("handleMultiSelectChange", itemList);
    },

    delItemFromSelectedField() {
      this.selectedItemList.pop();
      console.log(
        `MultiSelect.vue ~ _delItemFromSelectedField: selectedItemList = ${JSON.stringify(
          this.selectedItemList
        )}`
      );
    },
  },
  mounted() {
    this.handleChange(this.selectedItemList);
  },
};
</script>
