<template>
  <div>
    <Searchbar>
      <el-input @change="getList" v-model="search.name" placeholder="请输入名称"></el-input>

      <el-button class="search-btn" @click="getList" type="primary">查询</el-button>
    </Searchbar>

    <TableBar>
      <el-button @click="onShowCreate" type="primary" icon="el-icon-plus">新建</el-button>
    </TableBar>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>

      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-button @click="goSign(scope.row.id)" type="text" class="text-warning">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="sign_from" label="签到开始"></el-table-column>

      <el-table-column prop="sign_to" label="签到结束"></el-table-column>

      <el-table-column prop="sign_count" label="签到人数"></el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="onDel(scope.row)" size="small" class="text-warning">删除</el-button>
          <el-button type="text" @click="onShowEdit(scope.row)" size="small">编辑</el-button>
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
    <EditActivity @onClose="onHideEdit" :obj="editRow" @getList="getList" :show="showEdit" />
  </div>
</template>
<script>
import EditActivity from "@/modals/EditActivity";
import pageMixin from "@/mixins/pageMixin";
import showEditMixin from '@/mixins/showEditMixin.js'
import { activityModel } from "@/api/models";
import Searchbar from "@/components/Searchbar";
import TableBar from "@/components/TableBar";
export default {
  mixins: [pageMixin, showEditMixin],
  components: { EditActivity, Searchbar, TableBar },
  data() {
    return {
      tableData: [],
      total: 0,
      search: {
        name: null,
        page: 1,
        page_size: 10,
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    onDel(row) {
      activityModel.del({
        id: row.id
      }, () => {
        this.getList()
      })
    },
    goSign(id){
      this.$router.push('sign/' + id);
    },
    getList() {
      console.log("getList");
      activityModel.list(
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