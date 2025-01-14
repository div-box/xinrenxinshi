<template>
  <div class="box" @paste="handlePaste">
    <div class="content">
      <el-calendar ref="calendar">
        <template #header="{ date }">
          <span>日历</span>
          <span>{{ date }}</span>
          <el-button-group>
            <el-upload
              :auto-upload="false"
              style="display: inline-block"
              accept="application/json, .xlsx, .xls, .csv"
              :on-change="importData"
              :show-file-list="false"
            >
              <template #trigger>
                <el-button type="primary">导入数据</el-button>
              </template>
            </el-upload>
            <el-button type="primary" @click="openOptions">配置项</el-button>
            <el-button @click="selectDate('prev-month')"> 上个月 </el-button>
            <el-button @click="selectDate('today')">本月</el-button>
            <el-button @click="selectDate('next-month')"> 下个月 </el-button>
          </el-button-group>
        </template>
        <template #date-cell="{ data }">
          <!-- <p :class="data.isSelected ? 'is-selected' : ''" @click="handleClick(data)">
            
            <el-input v-model="data.day" placeholder=""></el-input>
          </p> -->
          <!-- 当日期不在当月时  暂时无数据 -->
          <template v-if="workDate[currTime] && Object.keys(workDate[currTime] || {}).length > 0">
            <div
              :key="renderKey"
              v-if="moment(data.date).valueOf() > moment(firstDay).valueOf() && moment(data.date).valueOf() < moment(lastDay).valueOf()"
              class="date-item"
              :class="workDate[currTime][data.day].workDay ? 'work-day' : ''"
            >
              <div style="width: 100%; display: flex; align-items: center; justify-content: space-around">
                <span>{{ data.day }}</span>
                <el-checkbox v-model="workDate[currTime][data.day].workDay" label="工作日"></el-checkbox>
              </div>
              <el-time-picker
                :default-value="[moment(`${data.day} ${options.signin || '09:00'}`), moment(`${data.day} ${options.signout || '18:00'}`)]"
                value-format="HH:mm"
                format="HH:mm"
                style="width: 80%"
                v-model="workDate[currTime][data.day].time"
                is-range
                @focus="handleFocus(data.day)"
              ></el-time-picker>
              <div style="margin-top: 4px" v-if="workDate[currTime][data.day].time?.length">
                {{ (getMinute(workDate[currTime][data.day].time, data.day) / 60).toFixed(2) }}h
              </div>
            </div>
            <div v-else>{{ data.day }}</div>
          </template>
        </template>
      </el-calendar>
    </div>
    <div class="footer">
      <span>工作日:{{ Object.keys(workDate[currTime]).filter((item) => workDate[currTime][item].workDay).length }}天</span>
      <span>加班:{{ add() }}天</span>
      <span>总小时:{{ getResult("h") }}h</span>
      <span>平均时长:{{ getAvg() }}h</span>
      <span
        >剩余时长:{{
          (
            options.targetTime * Object.keys(workDate[currTime]).filter((item) => workDate[currTime][item].workDay).length -
            Number(getResult("h"))
          ).toFixed(2)
        }}h</span
      >
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="默认配置" width="50%">
    <el-form ref="optionsFormRef" :model="optionsForm" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="默认签到">
            <el-input v-model="optionsForm.signin" placeholder="请输入默认签到时间 09:00" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="默认签退">
            <el-input v-model="optionsForm.signout" placeholder="请输入默认签退时间 18:30" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="目标时长">
            <el-input-number v-model="optionsForm.targetTime" placeholder="请输入目标时长" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-button type="primary" @click="saveOptions">保存</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import moment from "moment";
import { getUserName } from "/@/api/setting";
import { useWorkDateStore } from "/@/stores/workDateStore";
import { useAppStore } from "/@/stores/appStore";
import { storeToRefs } from "pinia";
import { handleImport } from "/@/utils/commonFunction";
import type { CalendarDateType, CalendarInstance } from "element-plus";
import logo from "/@/assets/img/homeLogo.png";
import { ElMessage } from "element-plus";
const optionsForm = ref({
  signin: "08:58",
  signout: "18:30",
  targetTime: 9,
});
const currTime = ref<any>(moment().format("YYYY-MM"));
const renderKey = ref(0);
const dialogVisible = ref(false);
const store = useWorkDateStore();
const { workDate } = storeToRefs(store);
const appStore = useAppStore();
const { globalConfig } = storeToRefs(appStore);
// 获取当月第一天的时间
const firstDay = ref(moment(currTime.value).startOf("month"));
// 获取当月最后一天的时间
const lastDay = ref(moment(currTime.value).endOf("month"));

const isWorkDay = (date: Date) => {
  const week = date.getDay();
  return week === 0 || week === 6 ? false : true;
};
const importData = async (file: any) => {
  const res = await handleImport(file);
  const month = moment(res[0].date).format("YYYY-MM");
  res.forEach((item: any) => {
    const day = moment(item.date).format("YYYY-MM-DD");
    if (!workDate.value[month]) {
      workDate.value[month] = {};
    }
    workDate.value[month][day] = {
      workDay: isWorkDay(new Date(day)),
      time: [item.clockIn, item.clockOut],
    };
  });
};

const getMinute = (time: any, day: string) => {
  try {
    const start = time[0];
    const end = time[1];
    const startMinute = Number(start.split(":")[0]) * 60 + Number(start.split(":")[1]);
    const endMinute = Number(end.split(":")[0]) * 60 + Number(end.split(":")[1]);
    const isThisWorkDay = workDate.value[currTime.value][day].workDay;
    if (start.split(":")[0] < 12 && end.split(":")[0] > 13) {
      if (isThisWorkDay) {
        return endMinute - startMinute - 60;
      } else {
        return endMinute - startMinute;
      }
      // return Math.floor((endMinute - startMinute) / 60) - 1 + "小时" + ((endMinute - startMinute) % 60) + "分钟";
    } else {
      return endMinute - startMinute;
      // return Math.floor((endMinute - startMinute) / 60) + "小时" + ((endMinute - startMinute) % 60) + "分钟";
    }
  } catch (error) {
    return 0;
  }
};
const calendar = ref<CalendarInstance>();
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return;
  let time = "";
  if (val === "today") {
    time = moment().format("YYYY-MM");
  } else if (val === "prev-month") {
    time = moment(currTime.value).subtract(1, "month").format("YYYY-MM");
  } else if (val === "next-month") {
    time = moment(currTime.value).add(1, "month").format("YYYY-MM");
  }
  currTime.value = time;
  firstDay.value = moment(time).startOf("month");
  lastDay.value = moment(time).endOf("month");
  getWorkDate(time);
  setTimeout(() => {
    calendar.value?.selectDate(val);
  }, 0);
};
const getWorkDate = async (currTime: string) => {
  if (workDate.value[currTime] && Object.keys(workDate.value[currTime]).length > 0) return;
  workDate.value[currTime] = {};
  const holidayDay = await getHolidayDay(currTime);
  const length = moment(currTime).daysInMonth();
  for (let index = 0; index < length; index++) {
    const day = moment(currTime).startOf("month").add(index, "days").format("YYYY-MM-DD");
    workDate.value[currTime][day] = {
      workDay: isWorkDay(new Date(day)),
      time: [],
    };
  }
  Object.keys(holidayDay).forEach((item: any) => {
    workDate.value[currTime][holidayDay[item].date].workDay = !holidayDay[item].holiday;
  });
};
const updateData = async () => {
  const res = await getUserName();
};
async function getHolidayDay(formatDate: any) {
  try {
    const response = await fetch(`http://timor.tech/api/holiday/year/${formatDate}`);
    const data = await response.json();

    if (data.code === 0) {
      // type: 0 - 工作日, 1 - 周末, 2 - 节假日, 3 - 调休工作日
      return data.holiday;
    }

    throw new Error("API 请求失败");
  } catch (error) {
    console.error("获取节假日信息失败:", error);
    // API 失败时使用基础判断（只判断周末）
    return {};
  }
}

const getResult = (flag: string = "h") => {
  const totalMinute = Object.keys(workDate.value[currTime.value]).reduce((total, day) => {
    return total + getMinute(workDate.value[currTime.value][day].time, day);
  }, 0);
  return flag === "h" ? (totalMinute / 60).toFixed(2) : Math.floor(totalMinute);
};
const getAvg = () => {
  try {
    const days = Object.keys(workDate.value[currTime.value]).filter((item) => {
      const minute = getMinute(workDate.value[currTime.value][item].time, item);
      return minute > 0 && workDate.value[currTime.value][item].workDay;
    }).length;
    return days ? (Number(getResult("h")) / days).toFixed(2) : 0;
  } catch (error) {
    return 0;
  }
};
const add = () => {
  return Object.keys(workDate.value[currTime.value]).filter((item) => {
    const minute = getMinute(workDate.value[currTime.value][item].time, item);
    return minute > 0 && !workDate.value[currTime.value][item].workDay;
  }).length;
};
const openOptions = () => {
  dialogVisible.value = true;
  optionsForm.value = { ...globalConfig.value.options } as any;
};
const options = ref({
  ...globalConfig.value.options,
});
const saveOptions = () => {
  renderKey.value++;
  options.value = optionsForm.value;
  appStore.setGlobalConfig({ options: { ...optionsForm.value } });
  dialogVisible.value = false;
};
const currentDay = ref();
const handleFocus = (day: any) => {
  console.log("day", day);
  currentDay.value = day;
};
const handlePaste = async (event: ClipboardEvent) => {
  event.preventDefault();
  const clipboardData = event.clipboardData;
  if (!clipboardData) return;

  const text = clipboardData.getData("text");
  console.log("text", text);

  if (!text) return;

  try {
    // 尝试解析粘贴的文本内容
    // 假设格式为: "09:00-18:00" 或 "09:00~18:00"
    // const timeMatch = text.match(/(\d{1,2}:\d{2})\s*[-~]\s*(\d{1,2}:\d{2})/);
    const [startTimeStr, endTime] = text.split("下班");
    let startTime = "";
    if (startTimeStr.indexOf("上班") !== -1) {
      startTime = startTimeStr.split("上班")[1];
    } else {
      startTime = startTimeStr;
    }
    console.log("startTime", startTime);
    console.log("endTime", endTime);
    if (startTime && endTime) {
      // 获取当前选中的日期

      // 更新数据
      if (!workDate.value[currTime.value][currentDay.value]) {
        workDate.value[currTime.value][currentDay.value] = {
          workDay: isWorkDay(new Date(currentDay.value)),
          time: [],
        };
      }

      workDate.value[currTime.value][currentDay.value].time = [startTime, endTime];
    } else {
      ElMessage.warning("无法识别的时间格式，请使用 HH:mm-HH:mm 格式");
    }
  } catch (error) {
    console.error("解析剪切板内容失败:", error);
    ElMessage.error("解析剪切板内容失败");
  }
};
onMounted(() => {
  getWorkDate(currTime.value);
});
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    height: calc(100% - 60px);
    background: #f0f2f5;
    .date-item {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 0 10px 10px;
      box-sizing: border-box;
    }
    .work-day {
      background: #ecf8f9;
    }
  }
  .footer {
    height: 60px;
    background: #93d1ca;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.el-calendar {
  width: 100%;
  height: 100%;
  :deep(.el-calendar__body) {
    height: calc(100% - 96px);
    padding: 20px;
  }
}
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
:deep(.is-selected) {
  background: transparent !important;
}
:deep(.el-calendar-day) {
  height: 105px;
}
</style>
