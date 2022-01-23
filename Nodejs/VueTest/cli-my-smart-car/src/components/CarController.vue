<template>
  <div>
    <img id="img" alt="Vue logo" src="../assets/F1.jpg" width="160" height="76" />
    <h3>{{ msg }}</h3>
    <div id="btns">
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
#img {
  margin: 60px 0 0;
}
#btns {
  margin-top: 100px;
}
</style>

