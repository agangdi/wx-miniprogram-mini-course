<template>
  <div>
    <Searchbar>
      <el-input @change="getList" v-model="search.nickName" placeholder="请输入昵称"></el-input>

      <el-button class="search-btn" @click="getList" type="primary">查询</el-button>
    </Searchbar>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>

      <el-table-column prop="nickName" label="昵称"></el-table-column>

      <el-table-column prop="avatarUrl" label="头像"></el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="onForbidden(scope.row)"
            size="small"
            :class="scope.row.status == 1 ? 'text-warning' : 'text-button'"
          >{{scope.row.status == 1 ? '封停' : '启用'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page.sync="search.page"
      :page-size="search.page_size"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import pageMixin from "@/mixins/pageMixin";
import { userModel } from "@/api/models";
import Searchbar from "@/components/Searchbar";
export default {
  mixins: [pageMixin],
  components: { Searchbar },
  data() {
    return {
      tableData: [],
      total: 0,
      search: {
        nickName: null,
        page: 1,
        page_size: 10,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      console.log("getList");
      userModel.list(
        this.search,
        (res) => {
          this.total = res.count;
          this.tableData = res.list.map((v) => {
            return v;
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
<style lang="scss">
</style>