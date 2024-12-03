import request from "/@/utils/request";

export const getUserName = () => {
  return request({
    url: "/user/GetUserName",
    method: "post",
  });
};
