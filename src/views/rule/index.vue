<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span> 规则管理</span>
        </div>
        <el-button
          type="primary"
          icon="el-icon-help"
          @click="
            () => {
              this.createDialogVisible = true;
            }
          "
          >新 建</el-button
        >
        <el-button type="success" @click="refreshList" icon="el-icon-refresh"
          >刷 新</el-button
        >

        <el-dialog
          title="新建规则"
          :visible.sync="createDialogVisible"
          width="800px"
          top="2%"
        >
          <el-form
            :model="createForm"
            status-icon
            :rules="createFormRules"
            ref="createForm"
          >
            <el-form-item
              label="规则名称"
              label-width="90px"
              label-position="left"
              prop="name"
            >
              <el-input v-model="createForm.name"></el-input>
            </el-form-item>

            <el-form-item
              label="成功回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror v-model="luaScript" :options="options" />
              <!-- --- -->
            </el-form-item>

            <el-form-item
              label="失败回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror v-model="luaScript" :options="options" />
              <!-- --- -->
            </el-form-item>

            <el-form-item
              label="规则回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror v-model="luaScript" :options="options" />
              <!-- --- -->
            </el-form-item>

            <el-form-item
              label="备注信息"
              label-width="90px"
              label-position="left"
              prop="description"
            >
              <el-input v-model="createForm.description" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              @click="
                () => {
                  this.createDialogVisible = false;
                  this.createForm = {};
                }
              "
              >取 消</el-button
            >
            <el-button type="primary" @click="createRule">提 交</el-button>
          </div>
        </el-dialog>
      </el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="UUID" width="340px"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="description" label="信息"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="details(scope.row)"
              >详情</el-button
            >
            <el-button size="mini" type="danger" @click="removeRule(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

import { Message } from "element-ui";

export default {
  components: {
    codemirror,
  },
  name: "Rule",
  methods: {
    onSelectChange(v) {},
    removeRule(row) {},
    details(row) {},
    refreshList() {},
    createRule() {
      let thiz = this;
      this.$refs["createForm"].validate((valid) => {
        if (valid) {
          create(this.createForm).then((_response) => {
            Message({
              message: "创建成功",
              type: "success",
              duration: 5 * 1000,
            });
            this.createDialogVisible = false;
            this.createForm = {};
            thiz.getList();
          });
          return true;
        } else {
          return false;
        }
      });
    },
    //
    getList() {},
  },
  created() {
    this.getList();
  },
  data() {
    return {
      options: {
        tabSize: 4,
        mode: "text/x-lua",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
      luaScript: "",

      createDialogVisible: false,
      createForm: {
        name: "just_a_test",
        description: "",
        from: ["INEND_9042483a-d5f4-436b-92bd-cc6e7773c5cc"],
        actions: 'Actions = {function(data) print("[lua] ------------->",data)end}',
        failed: 'function Failed(error) print("[lua] call error:",error)end',
        success: 'function Success() print("[lua] call success")end',
      },

      createFormRules: {
        type: [{ required: true, message: "输入类型", trigger: ["blur", "change"] }],
        name: [{ required: true, message: "输入名称", trigger: ["blur", "change"] }],
        description: [
          { required: true, message: "输入描述", trigger: ["blur", "change"] },
        ],
        config: [{ required: true, message: "输入配置", trigger: ["blur", "change"] }],
      },

      tableData: [],
    };
  },
};
</script>
