<template>
  <div>
    <h3>{{ msg }}</h3>
    <div id="btn">
      <a-button type="primary" icon="caret-up" size="large" @click="handleBtnForward"
        >前进</a-button
      >
      <br />
      <br />
      <br />
      <br />
      <a-space size="large" align="end">
        <a-button type="primary" icon="caret-left" ghost size="large" @click="handleBtnLeft"
          >左转</a-button
        >
        <a-button
          type="danger"
          shape="round"
          icon="close-circle"
          size="large"
          @click="handleBtnStop"
          >停车</a-button
        >
        <a-button type="primary" icon="caret-right" ghost size="large" @click="handleBtnRight"
          >右转</a-button
        >
      </a-space>
      <br />
      <br />
      <br />
      <br />
      <a-button type="primary" icon="caret-down" size="large" @click="handleBtnBack">后退</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarController',
  props: {
    msg: String,
  },
  data() {
    return {};
  },
  methods: {
    handleBtnForward() {
      this.$emit('handleBtnForward');
    },
    handleBtnBack() {
      this.$emit('handleBtnBack');
    },
    handleBtnLeft() {
      this.$emit('handleBtnLeft');
    },
    handleBtnRight() {
      this.$emit('handleBtnRight');
    },
    handleBtnStop() {
      this.$emit('handleBtnStop');
    }
  },
};
</script>

<style>
h3 {
  margin: 20px 0 0;
}
#btn {
  margin-top: 20px;
}
</style>
