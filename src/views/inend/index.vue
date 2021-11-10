<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-card class="box-card">
        输入资源管理
      </el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="UUID" width="340px"> </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="200px"
          :filters="[
            { text: 'MQTT1', value: 'MQTT1' },
            { text: 'MQTT2', value: 'MQTT2' },
            { text: 'MQTT3', value: 'MQTT3' },
            { text: 'MQTT4', value: 'MQTT4' },
            { text: 'MQTT5', value: 'MQTT5' },
          ]"
          :filter-method="filterType"
        >
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="description" label="信息"> </el-table-column>
        <el-table-column
          label="状态"
          :filters="[
            { text: '正常', value: 1 },
            { text: '异常', value: 0 },
          ]"
          :filter-method="filterState"
          width="80px"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.state == 1" type="success">正常</el-tag>
            <el-tag v-else type="danger">异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">详情</el-button>
            <el-button size="mini" type="success">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "InEnd",
  methods: {
    filterType(value, row) {
      return row.type === value;
    },
    filterState(value, row) {
      return row.state === value;
    },
  },
  data() {
    return {
      searchForm: {
        user: "",
        region: "",
      },
      tableData: [
        {
          id: "INEND_5f1b4bb7-7b4c-46fa-b2f2-940d3bd20636",
          state: 0,
          type: "MODBUS_TCP_MASTER",
          name: "ModbusTCPMaster",
          description: "ModbusTCPMaster",
          config: {
            frequency: 3,
            mode: "TCP",
            registerParams: [
              {
                address: 0,
                function: 3,
                quantity: 10,
              },
            ],
            rtuConfig: {
              baudRate: 115200,
              uart: "TCP",
            },
            slaverId: 1,
            tcpConfig: {
              ip: "127.0.0.1",
              port: 502,
            },
            timeout: 10,
          },
        },
      ],
    };
  },
};
</script>
