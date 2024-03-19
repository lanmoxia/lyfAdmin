import store from '@/store'
import {
  ACCESS_TOKEN,
  VERSION,
  MODEL_TEST_VERSION,
  SERVER_TYPE,
  TEST_URL,
  MO_URL,
  YFB_URL,
  PRO_URL,
  DEV_URL
} from '@/constant'

import {getItem} from '@/utils/storage'


// 将字符串的字符全部转换为小写字符
export function lowerCase(str) {
  let arr = str.split("");
  let newStr = "";
  //通过for循环遍历数组
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 'A' && arr[i] <= 'Z')
      newStr += arr[i].toLowerCase();
    else
      newStr += arr[i];
  }
  return newStr;
}




//数据导出（要求接口是get方法）
export function exportDataFormatUrl(request_url, request_params, is_new) {

  let server_url = switchServerUrl()

  let url = server_url + request_url;


  if (SERVER_TYPE == 3) {
    url = url + '/version/' + VERSION
  } else {
    url = url + '/version/' + MODEL_TEST_VERSION
  }


  let params = JSON.parse(JSON.stringify(request_params));

  if (getItem(ACCESS_TOKEN)) {
    params[ACCESS_TOKEN] = getItem(ACCESS_TOKEN)
  }
  let data = "?";
  for (let key in params) {
    data = data + "&" + key + "=" + params[key];
  }

  url = url + data

  // console.log(url)

  if (is_new) {
    //打开新窗口
    window.open(url);
  } else {
    //在本窗口打开
    window.location.href = url;
  }

}



// 获取当前服务器的请求url
export function switchServerUrl() {
  let server_url = ""
  switch (SERVER_TYPE) {
    case 0:
      server_url = TEST_URL
      break
    case 1:
      server_url = MO_URL
      break
    case 2:
      server_url = YFB_URL
      break
    case 3:
      server_url = PRO_URL
      break
    case 4:
      server_url = DEV_URL
      break

  }
  return server_url;

}

/**
 * 格式换权限菜单返回数据
 * @param data
 */
export function formatPermissionList(data) {
  let list = data;
  let role_arr = []//菜单权限
  let button_arr = []//button权限
  //循环一级列表
  for (let i in list) {
    var i_item = list[i].children // 二级菜单
    //循环2级列表
    for (let j in i_item) {
      var j_item = i_item[j]
      if (j_item.url) {
        if (j == 0) {
          role_arr.push({  // 这样在访问一级路由的时候就会默认为子路由第一项
            url: '/' + list[i].url.split('/')[1],
            icon: list[i].icon
          })
        }
        role_arr.push({
          url: j_item.url,
          icon: j_item.icon

        })
        //button权限赋值存起来
        var k_item = j_item.buttonList
        for (let k in k_item) {
          if (k_item[k].url) {
            button_arr.push(lowerCase(k_item[k].url));
          }
        }
      }
      var i_item_c = j_item.children
      //循环3级列表
      for (let z in i_item_c) {
        var z_item = i_item_c[z]
        if (z_item.url) {
          role_arr.push({
            url: z_item.url,
            icon: z_item.icon
          })
        }
      }
    }

  }
  return { role_arr: role_arr, button_arr: button_arr }
}
