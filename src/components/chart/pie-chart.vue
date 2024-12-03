<template>
  <div ref="pieChart" style="width: 100%; height: 100%"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
let option = {};
let pieElement: echarts.ECharts | null = null;
const pieChart = ref(null);
const props = defineProps(["graph", "node"]);
onBeforeMount(() => {
  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["55%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };
});
onMounted(() => {
  pieElement = echarts.init(pieChart.value, null, {
    renderer: "svg",
  });
  pieElement.setOption(option);
  props.graph?.on("node:resized", ({ node }: any) => {
    if (node.store.data.shape === "custom-vue-node") {
      resizeChart();
    }
  });
  props.node?.on("change:data", () => {
    // if (node.store.data.shape === "custom-vue-node") {
    //   resizeChart()
    // }
    pieElement?.setOption({
      title: {
        text: props.node?.data.label,
      },
    });
  });
});
onBeforeUnmount(() => {
  if (pieElement) {
    pieElement.dispose();
  }
});
const resizeChart = () => {
  pieElement?.resize();
};
defineExpose({
  resizeChart,
});
</script>
<style></style>
