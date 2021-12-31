<template>
  <div>
    <a-space size="large">
      <a-button type="primary" @click="handlePrimaryClick"> Primary </a-button>
      <a-button @click="handleEvtWithEvtBus">Default</a-button>
      <a-button type="danger" @click="handleHappyClick"> Happy :) </a-button>
      <a-config-provider :auto-insert-space-in-button="false">
        <a-button type="primary"> Button </a-button>
      </a-config-provider>
      <a-button type="link" @click="handleLinkClick"> GenerateImage </a-button>
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
      this.$emit("handleBtnHappyClick");
    },
    handlePrimaryClick() {
      this.$emit("handleBtnPrimaryClick");
    },
    handleEvtWithEvtBus() {
      const now = new Date().toString();
      console.log(`${now} ~ MultiButton: _handleEvtWithEvtBus is running ...`);
      this.$root.$emit("defaultBtnEvtWithEvtBus", { now, popNum: 2 });
    },
    handleLinkClick() {
      this.$emit("handleGenerateImage");
    },
  },
};
</script>
