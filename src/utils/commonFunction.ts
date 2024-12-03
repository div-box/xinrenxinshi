// 通用函数
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
import { formatDate } from "/@/utils/formatTime";
import { useI18n } from "vue-i18n";

export default function () {
  const { t } = useI18n();
  const { toClipboard } = useClipboard();

  // 百分比格式化
  const percentFormat = (row: EmptyArrayType, column: number, cellValue: string) => {
    return cellValue ? `${cellValue}%` : "-";
  };
  // 列表日期时间格式化
  const dateFormatYMD = (row: EmptyArrayType, column: number, cellValue: string) => {
    if (!cellValue) return "-";
    return formatDate(new Date(cellValue), "YYYY-mm-dd");
  };
  // 列表日期时间格式化
  const dateFormatYMDHMS = (row: EmptyArrayType, column: number, cellValue: string) => {
    if (!cellValue) return "-";
    return formatDate(new Date(cellValue), "YYYY-mm-dd HH:MM:SS");
  };
  // 列表日期时间格式化
  const dateFormatHMS = (row: EmptyArrayType, column: number, cellValue: string) => {
    if (!cellValue) return "-";
    let time = 0;
    if (typeof row === "number") time = row;
    if (typeof cellValue === "number") time = cellValue;
    return formatDate(new Date(time * 1000), "HH:MM:SS");
  };
  // 小数格式化
  const scaleFormat = (value: string = "0", scale: number = 4) => {
    return Number.parseFloat(value).toFixed(scale);
  };
  // 小数格式化
  const scale2Format = (value: string = "0") => {
    return Number.parseFloat(value).toFixed(2);
  };
  // 点击复制文本
  const copyText = (text: string) => {
    return new Promise((resolve, reject) => {
      try {
        //复制
        toClipboard(text);
        //下面可以设置复制成功的提示框等操作
        ElMessage.success(t("message.layout.copyTextSuccess"));
        resolve(text);
      } catch (e) {
        //复制失败
        ElMessage.error(t("message.layout.copyTextError"));
        reject(e);
      }
    });
  };
  return {
    percentFormat,
    dateFormatYMD,
    dateFormatYMDHMS,
    dateFormatHMS,
    scaleFormat,
    scale2Format,
    copyText,
  };
}

import * as XLSX from "xlsx";
export const handleImport = async (file: any) => {
  if (file.raw.type === "application/json") {
    const url = URL.createObjectURL(file.raw);
    try {
      const response = await fetch(url);
      const data = await response.text();
      URL.revokeObjectURL(url); // 释放这个URL
      const JSONData = JSON.parse(data);
      return JSONData; // 返回处理后的数据
    } catch (error) {
      console.error(error);
    }
  } else if (
    file.raw.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.raw.type === "application/vnd.ms-excel" ||
    file.raw.type === "application/excel" ||
    file.raw.type === "text/csv"
  ) {
    let JSONData: any[] = [];
    const realFile = file.raw;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result: any = e.target && e.target.result;
      const data = new Uint8Array(result);
      const workbook = XLSX.read(data, { type: "array" });
      for (let i = 0; i < workbook.SheetNames.length; i++) {
        const sheetName = workbook.SheetNames[i];
        const worksheet = workbook.Sheets[sheetName];
        JSONData[i] = XLSX.utils.sheet_to_json(worksheet);
      }
    };
    reader.readAsArrayBuffer(realFile);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(JSONData);
      reader.onerror = (error) => reject(error);
    });
  }
};