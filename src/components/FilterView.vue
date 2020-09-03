<template>
  <div class="filter-view" v-if="filterData">
    <!-- 遮罩层 -->
    <div :class="{ open: isSort || isScreen }" @click="closeModal"></div>
    <!-- 导航 -->
    <aside class="filter" :class="{ fixedFilterView: isSort || isScreen }">
      <div
        class="filter-nav"
        v-for="(item, index) in filterData.navTab"
        :key="index"
        :class="{ 'filter-bold': currentFilter === index }"
        @click="filterSort(index)"
      >
        <span>{{ item.name }}</span>
        <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
      </div>
    </aside>
    <!-- 排序 -->
    <section class="filter-extend" v-show="isSort">
      <ul>
        <li
          v-for="(item, index) in filterData.sortBy"
          :key="index"
          class="sort-item"
          @click="selectSort(item, index)"
          :class="{ 'is-check': currentSort === index }"
        >
          <span>{{ item.name }}</span>
          <i class="fa fa-check" v-show="currentSort === index"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter-extend" v-show="isScreen">
      <div class="filter-sort">
        <div
          v-for="item in filterData.screenBy"
          :key="item.id"
          class="filter-item"
        >
          <p class="title">{{ item.title }}</p>
          <ul>
            <li
              v-for="(filter, index) in item.data"
              :key="index"
              :class="{ selected: filter.select }"
              @click="selectScreen(filter, item)"
            >
              <img v-if="filter.icon" :src="filter.icon" alt="" />
              <span>{{ filter.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn" :disabled="!edit" @click="clearFilter">清空</button>
        <button class="btn is-ok" @click="filterOk">确定</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'filter-view',
  props: {
    filterData: Object
  },
  data() {
    return {
      currentFilter: 0,
      isSort: false,
      currentSort: 0,
      isScreen: false
    }
  },
  computed: {
    edit() {
      let edit = false
      this.filterData.screenBy.forEach(screen =>
        screen.data.forEach(item => {
          if (item.select) {
            edit = true
          }
        })
      )
      return edit
    }
  },
  methods: {
    filterSort(index) {
      this.currentFilter = index
      switch (index) {
        case 0:
          this.isScreen = false
          this.isSort = true
          this.$emit('searchFiexd', true)
          break
        case 1:
          this.$emit('updata', {
            condition: this.filterData.navTab[index].condition
          })
          this.closeModal()
          break
        case 2:
          this.$emit('updata', {
            condition: this.filterData.navTab[index].condition
          })
          this.closeModal()
          break
        case 3:
          this.isSort = false
          this.isScreen = true
          this.$emit('searchFiexd', true)
          break
        default:
          this.closeModal()
          break
      }
    },
    closeModal() {
      this.isSort = false
      this.isScreen = false
      this.$emit('searchFiexd', false)
    },
    selectSort(item, index) {
      this.currentSort = index
      this.filterData.navTab[0].name = item.name
      this.closeModal()

      // ? 更新数据
      this.$emit('updata', { condition: item.code })
    },
    selectScreen(item, screen) {
      // ? 单选
      if (screen.id !== 'MPI') {
        screen.data.forEach(el => {
          el.select = false
        })
      }
      item.select = !item.select
    },
    clearFilter() {
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(el => {
          el.select = false
        })
      })
    },
    filterOk() {
      let mpiStr = ''
      const screenData = {
        MPI: '',
        offer: '',
        per: ''
      }
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach((item, index) => {
          if (item.select) {
            if (screen.id !== 'MPI') {
              // ? 单选
              screenData[screen.id] = item.code
            } else {
              // ? 多选
              mpiStr += item.code + ','
              screenData[screen.id] = mpiStr
            }
          }
        })
      })
      this.$emit('updata', { condition: screenData })
      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.filter-view {
  position: sticky;
  top: 54px;
  .filter {
    display: flex;
    text-align: center;
    background-color: #fff;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    .filter-nav {
      flex: 1;
      color: #666;
      font-size: 0.8333rem;
      &:first-child {
        flex: 1.2;
      }
    }
    .filter-bold {
      font-weight: 600;
      color: #333;
    }
  }
  .open {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
  }
  .fixedFilterView {
    position: fixed;
    top: 54px;
    width: 100%;
    z-index: 999;
  }
  .filter-extend {
    position: fixed;
    top: 89px;
    width: 100%;
    background-color: #fff;
    .sort-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }
    .is-check {
      color: #009eef;
    }
    .filter-sort {
      width: 100%;
      padding: 10px;
      .filter-item {
        width: 100%;
        .title {
          color: #666;
          margin-bottom: 8px;
        }
        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          font-size: 0.8rem;
          margin-left: 10px;
          text-align: center;
          li {
            margin-right: 10px;
            width: 95px;
            padding: 10px 5px;
            background: #fafafa;
            margin-bottom: 10px;
            img {
              width: 10px;
              height: 10px;
            }
          }
          .selected {
            color: #3190e8;
            background-color: #edf5ff;
          }
        }
        &:nth-of-type(1) {
          ul {
            text-align: left;
            img {
              margin-left: 15px;
              margin-right: 5px;
            }
          }
        }
      }
    }
    .btn-group {
      width: 100%;
      display: flex;
      border-top: 1px solid #eee;
      .btn {
        flex: 1;
        @include inputInit();
        padding: 15px 0;
        letter-spacing: 0.2rem;
        font-size: 16px;
        background-color: #fff;
        color: #333;
        &[disabled] {
          color: #aaa;
        }
      }
      .is-ok {
        background-color: #48ca38;
        color: #fff;
      }
    }
  }
}
</style>
