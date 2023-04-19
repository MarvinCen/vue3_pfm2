<template>
  <a-divider orientation="left">快速入口</a-divider>
  <div style="display: flex; justify-content: space-around">
    <a-image
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      title="录入成果"
      description="Present by Arco Design"
      width="260"
      style="vertical-align: top"
      :preview-visible="visible1"
      @preview-visible-change="
        () => {
          visible1 = false;
        }
      "
    >
      <template #extra>
        <div class="actions">
          <span
            class="action"
            @click="
              () => {
                visible1 = true;
              }
            "
            ><icon-eye
          /></span>
          <span class="action" @click="onDownLoad"><icon-download /></span>
          <a-tooltip content="A user’s avatar">
            <span class="action"><icon-export /></span>
          </a-tooltip>
        </div>
      </template>
    </a-image>

    <a-image
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      title="审核成果"
      description="Present by Arco Design"
      width="260"
      style="vertical-align: top"
      :preview-visible="visible1"
      @preview-visible-change="
        () => {
          visible1 = false;
        }
      "
    >
      <template #extra>
        <div class="actions">
          <span
            class="action"
            @click="
              () => {
                visible1 = true;
              }
            "
            ><icon-eye
          /></span>
          <span class="action" @click="onDownLoad"><icon-download /></span>
          <a-tooltip content="A user’s avatar">
            <span class="action"><icon-export /></span>
          </a-tooltip>
        </div>
      </template>
    </a-image>

    <a-image
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      title="我的成果"
      width="260"
      style="vertical-align: top"
      :preview-visible="visible1"
      @preview-visible-change="
        () => {
          visible1 = false;
        }
      "
    >
      <template #extra>
        <div class="actions">
          <span
            class="action"
            @click="
              () => {
                visible1 = true;
              }
            "
            ><icon-eye
          /></span>
          <span class="action" @click="onDownLoad"><icon-download /></span>
          <a-tooltip content="A user’s avatar">
            <span class="action"><icon-export /></span>
          </a-tooltip>
        </div>
      </template>
    </a-image>

    <a-image
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      title="绩效考核"
      description="Present by Arco Design"
      width="260"
      style="vertical-align: top"
      :preview-visible="visible1"
      @preview-visible-change="
        () => {
          visible1 = false;
        }
      "
    >
      <template #extra>
        <div class="actions">
          <span
            class="action"
            @click="
              () => {
                visible1 = true;
              }
            "
            ><icon-eye
          /></span>
          <span class="action" @click="onDownLoad"><icon-download /></span>
          <a-tooltip content="A user’s avatar">
            <span class="action"><icon-export /></span>
          </a-tooltip>
        </div>
      </template>
    </a-image>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { IconEye, IconDownload } from '@arco-design/web-vue/es/icon';

export default {
  name: 'Index',

  components: {
    IconEye,
    IconDownload,
  },
  setup() {
    const visible1 = ref(false);
    const visible2 = ref(false);

    return {
      visible1,
      visible2,
      onDownLoad() {
        console.log('download');
      },
    };
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  align-items: center;
}
.action {
  padding: 5px 4px;
  font-size: 14px;
  margin-left: 12px;
  border-radius: 2px;
  line-height: 1;
  cursor: pointer;
}
.action:first-child {
  margin-left: 0;
}

.action:hover {
  background: rgba(0, 0, 0, 0.5);
}
.actions-outer {
  .action {
    &:hover {
      color: #ffffff;
    }
  }
}
</style>
