<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-row :gutter="24" style="width: 100%; margin-top: 10px">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span>当前版本</span>
              </div>
              <h2>{{ this.systemInfo.version }}</h2>
            </el-card>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span>操作系统</span>
              </div>
              <h2>{{ this.systemInfo.osArch }}</h2>
            </el-card>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span>内存使用</span>
              </div>
              <h2>
                系统:{{ this.systemInfo.system }}-MB/当前: {{ this.systemInfo.alloc }}-MB
              </h2>
            </el-card>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span>磁盘使用</span>
              </div>
              <h2>{{ this.systemInfo.diskInfo }}%</h2>
            </el-card>
          </div></el-col
        >
      </el-row>
      <!-- --------------------------------- -->

      <el-row :gutter="24" style="width: 100%; margin-top: 10px">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span>入口总数</span>
              </div>
              <h2>{{ resourceCount.inends }}</h2>
            </el-card>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span>规则总数</span>
              </div>
              <h2>{{ resourceCount.rules }}</h2>
            </el-card>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span>出口总数</span>
              </div>
              <h2>{{ resourceCount.outends }}</h2>
            </el-card>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span>插件总数</span>
              </div>
              <h2>{{ resourceCount.plugins }}</h2>
            </el-card>
          </div></el-col
        >
      </el-row>

      <el-table :data="logs" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="content" label="近期日志"> </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { system } from "@/api/system";
import { statistics } from "@/api/system";
import { resourceCount } from "@/api/system";
import { logs } from "@/api/system";

export default {
  name: "Dashboard",
  created() {
    let thiz = this;
    thiz.getSystem();
    thiz.getStatistics();
    thiz.getResourceCount();
    thiz.getLogs();
    setInterval(() => {
      thiz.getSystem();
      thiz.getStatistics();
      thiz.getResourceCount();
      thiz.getLogs();
    }, 3000);
  },
  destroyed() {
    for (let i = 0; i <= 3; i++) {
      clearInterval(i);
    }
  },
  methods: {
    getSystem() {
      system().then((response) => {
        this.systemInfo = response.data;
      });
    },
    getStatistics() {
      statistics().then((response) => {
        this.statistics = response.data;
      });
    },
    getResourceCount() {
      resourceCount().then((response) => {
        this.resourceCount = response.data;
      });
    },
    getLogs() {
      logs().then((response) => {
        this.logs = response.data;
      });
    },
  },
  data() {
    return {
      resourceCount: {
        inends: 0,
        outends: 0,
        rules: 0,
        plugins: 0,
      },
      statistics: {
        inFailed: 0,
        inSuccess: 0,
        outFailed: 0,
        outSuccess: 0,
      },
      systemInfo: {
        alloc: 0,
        cpuPercent: [],
        diskInfo: 0,
        osArch: "",
        system: 0,
        total: 0,
        version: "",
      },
      logs: [],
    };
  },
};
</script>
