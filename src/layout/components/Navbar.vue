<template>
  <div class="navbar">
    <div class="left-breadcrumb">
      <!--菜单栏伸缩组件-->
      <hamburger class="hamburger-container" />
      <!--面包屑组件-->
      <breadcrumb class="breadcrumb-container" />
    </div>

    <div class="right-menu">
      <div class="icon-box">
        <!-- 引导组件-->
        <guide class="right-menu-item hover-effect" />
        <!--页面搜索组件-->
        <header-search class="right-menu-item hover-effect"></header-search>
        <!--全屏组件-->
        <screenfull class="right-menu-item hover-effect" />
      </div>
      <!-- 登录账号信息 -->
      <el-dropdown class="avatar-container" trigger="click" size="large">
        <div class="avatar-wrapper">
          <el-image
            class="avatar"
            :src="$store.getters.userInfo.avatar"
          ></el-image>
          <div >{{ $store.getters.userInfo.username }}</div>
          <CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
        </div>

        <!-- 个人资料下拉 -->
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="editCropper($store.getters.userInfo.id)">
              修改头像
            </el-dropdown-item>
            <el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 头像修改 dialog -->
    <el-dialog
      :title="title"
      align-center
      v-model="open"
      width="800px"
      append-to-body
      @opened="modalOpened"
      @close="closeDialog"
    >
      <el-row>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <!-- vue-cropper 图片裁剪 -->
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true" 
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            :outputType="options.outputType"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>

        <!-- 图片预览 -->
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="options.previews.url" :style="options.previews.img" />
          </div>
        </el-col>
      </el-row>

      <br />

      <el-row>
        <!-- 上传按钮 -->
        <el-col :lg="2" :md="2">
          <el-upload
            action="#"
            :http-request="requestUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button>
              选择
              <el-icon class="el-icon--right">
                <Upload />
              </el-icon>
            </el-button>
          </el-upload>
        </el-col>
        <!-- 图片放大 -->
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <el-button icon="Plus" @click="changeScale(1)"></el-button>
        </el-col>
        <!-- 图片缩小 -->
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button icon="Minus" @click="changeScale(-1)"></el-button>
        </el-col>
        <!-- 图片正转 -->
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button icon="RefreshLeft" @click="rotateLeft()"></el-button>
        </el-col>
        <!-- 图片倒转 -->
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button icon="RefreshRight" @click="rotateRight()"></el-button>
        </el-col>
        <!-- 提交修改 -->
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <el-button v-if="!loading" type="primary" @click="uploadImg()">提 交</el-button>
          <el-button v-else type="primary" loading>提 交 中</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup>
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { CaretBottom } from "@element-plus/icons";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
import Screenfull from "@/components/Screenfull";
import Guide from "@/components/Guide";
import HeaderSearch from "@/components/HeaderSearch";
import { ElMessage } from "element-plus";
import { api } from "@/api";

const store = useStore();
const loading = ref(false)
const open = ref(false); // 打开编辑头像
const visible = ref(false);
const title = ref("修改头像");
const cropper = ref(null);

//图片裁剪数据
const options = reactive({
  img: store.getters.userInfo.avatar, // 裁剪图片的地址
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 200, // 默认生成截图框宽度
  autoCropHeight: 200, // 默认生成截图框高度
  fixedBox: true, // 固定截图框大小 不允许改变
  outputType: "png", // 默认生成截图为PNG格式
  previews: {}, //预览数据
});

/** 编辑头像 */
function editCropper(id) {
  open.value = true;
}
/** 打开弹出层结束时的回调 */
function modalOpened() {
  visible.value = true;
}
/** 覆盖默认上传行为 */
function requestUpload() {
  console.log("覆盖默认上传行为");
}
/** 向左旋转 */
function rotateLeft() {
  cropper.value.rotateLeft();
}
/** 向右旋转 */
function rotateRight() {
  cropper.value.rotateRight();
}
/** 图片缩放 */
function changeScale(num) {
  num = num || 1;
  cropper.value.changeScale(num);
}
/** 上传预处理 */
function beforeUpload(file) {
  if (file.type.indexOf("image/") == -1) {
    ElMessage.error("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      options.img = reader.result
    }
  }
}
/** 上传图片 */
function uploadImg() {
  loading.value = true
  cropper.value.getCropBlob(async (blob) => {
    if (!(blob instanceof Blob)) {
      // 如果不是Blob类型，创建一个Blob对象
      blob = new Blob([blob], { type: 'image/png' });
    }
    let formData = new FormData();
    formData.append("avatar", blob, 'avatar.png');
    formData.append("id", store.getters.userInfo.id);
    const [err,res] = await api.userAvatarUpdate(formData)
    open.value = false
    loading.value = false    
    options.img = res.data.avatar
    console.log(options.img)
    console.log(res.data.avatar)
    if (res.data.avatar) {
      store.dispatch('user/updateUserInfo', res.data.avatar);
      ElMessage.success("修改成功");
    } else {
      loading.value = false    
      ElMessage.error("头像更新失败，请重试。");
    }
    visible.value = false;
  });
}
/** 实时预览 */
function realTime(data) {
  // 实时预览事件
  options.previews = data;
}
/** 关闭窗口 */
function closeDialog() {
  options.img = store.getters.userInfo.avatar;
  options.visible = false;
}

const logout = () => {
  store.dispatch("user/logout")
};
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-breadcrumb {
    display: flex;
    padding: 0 16px;
    line-height: 50px;
    align-items: center;
    .breadcrumb-container {
      font-size: 14px;
      margin-left: 8px;
    }
    .hamburger-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      // hover 动画
      transition: background 0.5s;
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    .icon-box {
      // border: 1px solid red;
      display: flex;
      align-items: center;
    }
    :deep(.right-menu-item) {
      padding: 0 15px 0 0;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
      }
    }

    :deep(.avatar-container) {
      display: flex;
      align-items: center;
      line-height: 50px;
      cursor: pointer;
      .avatar-wrapper {
        display: flex;
        align-items: center;
      }
    }
  }

  :deep(.avatar) {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
