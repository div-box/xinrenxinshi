<template>
  <div class="marquee-warpper" ref="warpperRef" :class="marquee ? 'marquee' : 'normal'">
    <div class="marquee-box" ref="boxRef" v-bind="$attrs">
      {{ props.text }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const warpperRef = ref();
const boxRef = ref();
const marquee = ref(false);
const animationDistance = ref(`translateX(-100%))`);
const computedSpeed = ref(0);
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  speed: {
    type: Number,
    default: 1,
  },
  center: {
    type: Boolean,
    default: true,
  },
});
const runAnimation = () => {
  const warpperWidth = warpperRef.value?.clientWidth;
  const boxWidth = boxRef.value?.clientWidth;
  marquee.value = boxWidth > warpperWidth;
  computedSpeed.value = Math.ceil(boxWidth / warpperWidth) * props.speed;
  animationDistance.value = `translateX(calc(-100% + ${warpperWidth - 5}px))`;
};
onMounted(() => {
  runAnimation();
});
watch(
  () => props.text,
  () => {
    nextTick(() => {
      runAnimation();
    });
  }
);
</script>
<style lang="scss" scoped>
.marquee-warpper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  .marquee-box {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.marquee {
  .marquee-box {
    animation: marquee v-bind("computedSpeed +'s'") infinite ease-in-out;
  }
}
.normal {
  display: flex;
  align-items: center;
  justify-content: center;
  .marquee-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@keyframes marquee {
  0% {
    transform: translateX(5px);
  }
  50% {
    transform: v-bind(animationDistance);
  }
  100% {
    transform: translateX(5px);
  }
}
</style>
