<template>
  <div>
    <a-button type="primary" @click="handlePrimaryClick"> Primary </a-button>
    <a-button>Default</a-button>
    <a-button type="danger" @click="handleHappyClick"> Happy :) </a-button>
    <a-config-provider :auto-insert-space-in-button="false">
      <a-button type="primary"> Button </a-button>
    </a-config-provider>
    <a-button type="link"> Link </a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleHappyClick() {
      this.$emit("handleBtnHappyClick");
    },
    handlePrimaryClick() {
      this.$emit("handleBtnPrimaryClick");
    },
  },
};
</script>
