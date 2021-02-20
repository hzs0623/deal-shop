<template>
  <el-dialog
    title="出售订单"
    :visible.sync="sellState"
    width="90%"
    :before-close="handleClose"
  >
    <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="title" label="商品名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="商品图">
        <template slot-scope="scope">
          <div class="shop_img" @click="onSkip(scope.row.image)">
            <img :src="scope.row.image" alt="" style="height: 60px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="information" label="详情" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="price" label="商品金额"> </el-table-column>
      <el-table-column prop="buy_uid" label="买家用户名">
        <template slot-scope="scope">
          <div>
            {{ getUsername(scope.row.buy_uid) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="shop_count" label="购买数量"> </el-table-column>
      <el-table-column label="交易状态">
        <template slot-scope="scope">
          <div>
            {{ sellStateMap[scope.row.state] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="buy_method" label="支付方式">
        <template slot-scope="scope">
          <div>
            {{ methodMap[scope.row.buy_method] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state == 1"
            size="mini"
            type="primary"
            @click="handleEdit(scope.row, 2)"
            >发货</el-button
          >
          <el-button v-if="scope.row.state == 3" size="mini" type="success" disabled
            >交易完成</el-button
          >
          <!-- <el-button size="mini" type="warning">取消订单</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getOrderList, orderEdit } from "@/api/order";
import { mapGetters } from "vuex";
import { methodMap, sellStateMap } from "@/constant";

export default {
  name: "buy-shop-list",
  props: {
    sellState: false,
  },
  computed: {
    ...mapGetters("global", ["uid", "username_map"]),
  },
  watch: {
    sellState(newVal) {
      if (newVal) {
        this.getList();
      }
    },
  },
  data() {
    return {
      list: [],
      methodMap,
      sellStateMap,
      pageSize: 5,
      curPage: 1,
    };
  },
  methods: {
    async getList() {
      const res = await getOrderList({
        uid: this.uid,
        pageSize: this.pageSize,
        curPage: this.curPage,
      });
      const { list = [] } = res;
      this.list = list;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state === 1) {
        return "warning-row";
      } else if (row.state === 3) {
        return "success-row";
      }
      return "";
    },
    onSkip(url) {
      window.open(url);
    },
    handleClose() {
      this.$emit("close");
    },
    // 发货
    async handleEdit({ buy_uid: uid, sid }, state) {
      await orderEdit({
        uid,
        sid,
        state,
      });
      this.$message.success("发货成功！");
      this.getList();
    },
    getUsername(uid) {
      let username = "";
      this.username_map.some((item) => {
        if (item.uid == uid) {
          username = item.username;
          return true;
        }
      });
      return username;
    },
  },
};
</script>
<style lang="less"></style>