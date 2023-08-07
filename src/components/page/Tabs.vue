<template>
  <!-- tab选项卡组件 -->
  <div class>
    <div class="crumbs">
      <!-- 面包屑导航 separator 表示分隔符 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-copy"></i> tab选项卡
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 标签页：分割内容上有关联，但属于不同类别的数据集合。v-model/value 绑定值，用于选中选项卡中的 name -->
      <el-tabs v-model="message">
        <!-- 选项卡1 绑定 label 实时统计未读消息数量 -->
        <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
          <!-- 绑定 data 获取 unread 数组中的对象。 绑定 show-header 来动态改变表头的显示状态-->
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column>
              <!-- 通过 v-sort 动态分发数据 -->
              <template v-slot="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="title" class="message-title"></el-table-column> -->

            <!-- el-table 上绑定了 data 对象数组。通过 prop 键入对象中的键名即可填入数据 -->
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column width="120">
              <template v-slot="scope">
                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <!-- 通过 type 改变风格 -->
            <el-button type="primary" @click="handleAllRead">全部标为已读</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="`已读消息(${read.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read" :show-header="false" style="width: 100%">
              <el-table-column>
                <template v-slot="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template v-slot="scope">
                  <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger" @click="handleAllDel">删除全部</el-button>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="recycle" :show-header="false" style="width: 100%">
              <el-table-column>
                <template v-slot="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template v-slot="scope">
                  <el-button @click="handleRestore(scope.$index)">还原</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger" @click="handleAllDelete">清空回收站</el-button>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
    
    <script>
import bus from "../../utils/bus";

export default {
  name: "tabs",
  data() {
    return {
      message: "first",
      showHeader: false,
      unread: [
        {
          date: "2021-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护"
        },
        {
          date: "2021-04-19 21:00:00",
          title: "今晚12点整发大红包，先到先得"
        }
      ],
      read: [
        {
          date: "2021-04-19 19:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护"
        }
      ],
      recycle: [
        {
          date: "2021-04-19 18:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护"
        }
      ]
    };
  },
  methods: {
    handleRead(index) {
      //splice()方法1 数组.splice(a,b)截取这个数组的a-b这一段数组   里面有a,b两个参数
      //splice()方法2 数组.splice(a)截取数组中a-最后这一段数组   只有a一个参数的时候
      const item = this.unread.splice(index,1);
      //concat()方法  将this.read数组添加到item数组中最后面
      this.read = item.concat(this.read);
      //通过bus传数据到头部右边未读消息个数
      bus.$emit("msg", this.unread.length);
    },
    handleDel(index) {
      const item = this.read.splice(index, 1);
      this.recycle = item.concat(this.recycle);
    },
    handleRestore(index) {
      const item = this.recycle.splice(index, 1);
      this.read = item.concat(this.read);
    },
    handleAllRead() {
      const item = this.unread.splice(0, this.unread.length);
      this.read = item.concat(this.read);
      bus.$emit("msg", this.unread.length);
    },
    handleAllDel() {
      const item = this.read.splice(0, this.read.length);
      this.recycle = item.concat(this.recycle);
    },
    handleAllDelete() {
      const item = this.recycle.splice(0, this.recycle.length);
    }
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  }
};
</script>
    
    <style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>
    
    