<!--
 * @Author: fengchengji 1078709740@qq.com
 * @Date: 2024-03-18 11:40:03
 * @LastEditors: fengchengji 1078709740@qq.com
 * @LastEditTime: 2024-03-27 09:07:08
 * @FilePath: \ilab04_ui\src\components\common\hc-model.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="hc-model" @click="handleClose">
    <div class="model-box" v-bind="$attrs">
      <div v-if="!props.noHeader" class="header">
        <slot name="header">
          <div>{{ props.title }}</div>
        </slot>
        <div style="cursor: pointer" @click="emit('close')">
          <el-icon>
            <CloseBold />
          </el-icon>
        </div>
      </div>
      <el-scrollbar class="content">
        <slot></slot>
      </el-scrollbar>
      <div v-if="!props.noFooter" class="footer">
        <slot name="footer">
          <el-button @click="emit('close')" type="primary">取消</el-button>
          <el-button @click="emit('ok')" type="primary">确认</el-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * hc-model 弹窗组件
 *
 * @props {
 *   title: String         标题         
 *   noHeader: Boolean     是否隐藏头部  @default false
 *   noFooter: Boolean     是否隐藏底部  @default false
 * }
 * @emits {
 *   close        关闭弹窗方法  
 *   ok           确认弹窗方法
 }
 */
import { CloseBold } from "@element-plus/icons-vue";
defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  noHeader: {
    type: Boolean,
    default: false,
  },
  noFooter: {
    type: Boolean,
    default: false,
  },
});
const contentHeight = computed(() => {
  const hHeight = props.noHeader ? "0px" : "50px";
  const fHeight = props.noFooter ? "0px" : "50px";
  return `calc(100% - ${hHeight} - ${fHeight})`;
});
const emit = defineEmits(["close", "ok"]);
const handleClose = (e: any) => {
  if (e.target.className === "hc-model") {
    emit("close", e);
  }
};
</script>
<style lang="scss" scoped>
.hc-model {
  width: var(--hc-content-width);
  height: var(--hc-content-height);
  position: fixed;
  top: var(--hc-header-height);
  left: var(--hc-menu-width);
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .model-box {
    height: 50%;
    width: 50%;
    min-height: 25%;
    max-height: 90%;
    min-width: 25%;
    max-width: 80%;
    box-sizing: border-box;
    background: #fff;
    .header {
      padding: 0 10px;
      box-sizing: border-box;
      height: 50px;
      width: 100%;
      background: var(--hc-model-bg-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer {
      padding: 0 10px;
      box-sizing: border-box;
      height: 50px;
      width: 100%;
      background: var(--hc-model-bg-color);
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .content {
      height: v-bind(contentHeight);
      box-sizing: border-box;
      background: #fff;
      padding: 10px;
    }
  }
}
</style>
