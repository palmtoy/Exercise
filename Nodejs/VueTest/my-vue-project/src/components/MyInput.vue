<template>
  <!-- <a-input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" @change="handleChange" /> -->
  <a-input v-model="inputValue" />
</template>

<script>
export default {
  props: ['value'],
  computed: {
    inputValue: {
      get() {
        this.$emit("handleMyInputChange", this.value);
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }

  },
  data() {
    return {};
  },
  methods: {
    handleChange() {
      this.$emit("handleMyInputChange", this.value);
    }
  }
};
</script>
