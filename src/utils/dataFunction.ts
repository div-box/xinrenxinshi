export function findRoute(router: any[], path: string) {
  let res = "";
  router.forEach((item) => {
    if (item.children?.length) {
      item.children.forEach((subItem: any) => {
        if (subItem.path === path) {
          res = subItem;
        }
      });
    } else {
      if (item.path === path) {
        res = item;
      }
    }
  });
  return res;
}

import dayjs from "dayjs";

export const exportJSON = (data: any) => {
  const jsonData = JSON.stringify(data);
  // 创建一个Blob对象，类型为JSON
  const blob = new Blob([jsonData], { type: "application/json" });

  // 创建一个指向该Blob的URL
  const url = URL.createObjectURL(blob);

  // 创建一个a标签用于触发下载
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  const fileName = dayjs().format("MM-DD HH_mm_ss");
  downloadLink.download = `${fileName}.json`; // 指定下载文件名

  // 添加链接到DOM并模拟点击，进行下载
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 清理并移除元素和对象引用
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
};
