<template>
  <div>
    <a-space size="large">
      <a-button type="danger" @click="handleHappyClick"> Happy :) </a-button>
    </a-space>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleHappyClick() {
      this.$emit('handleBtnHappyClick');
    },
  },
};
</script>
