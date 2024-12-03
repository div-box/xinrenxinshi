<template>
  <div ref="BarChart" style="width: 100%; height: 100%"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
let option = ref<any>({});
let barElement: echarts.ECharts | null = null;
const BarChart = ref(null);
const props = defineProps(["graph", "node"]);
onMounted(() => {
  option.value = {
    title: {
      text: props.node?.data.label,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "0%",
      top: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
  barElement = echarts.init(BarChart.value, null, {
    renderer: "svg",
  });
  barElement.setOption(option.value);
  props.graph?.on("node:resized", ({ node }: any) => {
    if (node.store.data.shape === "custom-vue-node") {
      resizeChart();
    }
  });
  props.node?.on("change:data", ({ cell }: any) => {
    // if (node.store.data.shape === "custom-vue-node") {
    //   resizeChart()
    // }
    resizeChart();
    barElement?.setOption({
      title: {
        text: props.node?.data.label,
      },
    });
  });
});
// const resized = computed(() => store.state.resized.resized)
// watch(() => resized, (newValue, oldValue) => {
//   resizeChart()
// })
onBeforeUnmount(() => {
  if (barElement) {
    barElement.dispose();
  }
});
const resizeChart = () => {
  barElement?.resize();
};

defineExpose({
  resizeChart,
});
</script>
<style></style>
