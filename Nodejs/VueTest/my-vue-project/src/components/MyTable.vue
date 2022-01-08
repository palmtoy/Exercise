<template>
  <a-table :columns="columns" :data-source="tblData" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>

<script>
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    align: 'center',
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Address",
    dataIndex: "address",
    align: 'center',
  },
];

const tblData = [
  {
    key: "1",
    name: "John Brown",
    address: "New York No. 1 Lake Park",
  }
];

export default {
  data() {
    return {
      tblData,
      columns,
    };
  },
};
</script>
