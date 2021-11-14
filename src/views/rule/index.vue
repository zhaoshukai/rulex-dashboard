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
          width="1000px"
          top="2%"
          :show-close="false"
          :before-close="() => {}"
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
              <!-- --- -->
              <el-input v-model="createForm.name"></el-input>
              <!-- --- -->
            </el-form-item>
            <el-form-item
              label="输入资源"
              label-width="90px"
              label-position="left"
              prop="from"
            >
              <el-select
                v-model="createForm.from"
                multiple
                placeholder="请选择"
                style="width: 800px"
              >
                <el-option
                  v-for="item in [{ label: 'k', value: 'v' }]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-form-item>
            <el-form-item
              label="规则回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror
                v-model="createForm.actions"
                :options="options"
                style="line-height: 1"
              />
              <!-- --- -->
            </el-form-item>

            <el-form-item
              label="成功回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror
                v-model="createForm.success"
                :options="options"
                style="line-height: 1"
              />
              <!-- --- -->
            </el-form-item>

            <el-form-item
              label="失败回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror
                v-model="createForm.failed"
                :options="options"
                style="line-height: 1"
              />
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
            <el-button type="warning" @click="() => {}">语法验证</el-button>
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
import "codemirror/theme/darcula.css";
import "codemirror/mode/lua/lua.js";

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
        theme: "darcula",
        lineNumbers: true,
        line: true,
        lint: true,
        styleActiveLine: true,
        lineNumbers: true,
        foldGutter: true,
        styleSelectedText: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        gutters: ["CodeMirror-lint-markers"],
        hintOptions: {
          completeSingle: true,
        },
        extraKeys: {
          Tab: function (cm) {
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
          },
        },
        showHint: true,
      },
      //
      createDialogVisible: false,
      createForm: {
        name: "",
        description: "",
        from: [],
        actions:
          "--\n--规则回调，高级功能请查看文档:https://wwhai.github.io/rulex_doc_html/index.html\n--\nActions = {\n\tfunction(data)\n\t\tprint(data)\n\t\treturn true, data\n\tend\n}",
        failed:
          '--\n--失败回调，高级功能请查看文档:https://wwhai.github.io/rulex_doc_html/index.html\n--\nfunction Failed(error)\n\tprint("error)\nend\n',
        success:
          '--\n--成功回调，高级功能请查看文档:https://wwhai.github.io/rulex_doc_html/index.html\n--\nfunction Success()\n\tprint("success")\nend\n',
      },

      createFormRules: {
        name: [{ required: true, message: "输入名称", trigger: ["blur", "change"] }],
        description: [
          { required: true, message: "输入描述", trigger: ["blur", "change"] },
        ],
        from: [{ required: true, message: "输入资源入口", trigger: ["blur", "change"] }],
        actions: [
          { required: true, message: "输入规则回调", trigger: ["blur", "change"] },
        ],
        failed: [
          { required: true, message: "输入成功回调", trigger: ["blur", "change"] },
        ],
        success: [
          { required: true, message: "输入失败回调", trigger: ["blur", "change"] },
        ],
      },

      tableData: [],
    };
  },
};
</script>
