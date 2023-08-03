import request from "../utils/http";

// 複習解構賦值: 以前的寫法
// let name = restaurant.name
// let chef = restaurant.chef
// 解構賦值的寫法
// let { name, chef } = restaurant
export const loginAPI = ({ account, password }) => {
  return request({
    url: "/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};
