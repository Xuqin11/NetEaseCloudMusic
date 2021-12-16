// 把毫秒数转换为分秒格式
export function formDuration(time) {
  let duration = parseInt(time / 1000);
  let mintues = parseInt(duration / 60);
  while (mintues >= 0 && mintues < 10) {
    mintues = "0" + mintues;
    break;
  }
  let seconds = duration % 60;
  while (seconds >= 0 && seconds < 10) {
    seconds = "0" + seconds;
    break;
  }
  return mintues + ":" + seconds;
}

// 把时间戳转换为标准时间
export function formatDate(time, flag) {
  let date = new Date(parseInt(time));
  let year = date.getFullYear();
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let mintues = date.getMinutes();
  let seconds = date.getSeconds();
  if (flag == "onlyDate") {
    return year + "-" + mon + "-" + day;
  } else {
    return (
      year + "-" + mon + "-" + day + " " + hours + ":" + mintues + ":" + seconds
    );
  }
}

export function formatSeconds(time) {
  let mintues = parseInt(time / 60);
  let seconds = parseInt(time % 60);
  if (mintues < 10) {
    mintues = "0" + mintues;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return mintues + ":" + seconds;
}

// export function getImage(image) {
//   return image
// }

// 提取主题颜色
export function getMainColor(image) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const img = new Image(); // 创建img元素
      img.src = image; // 设置图片源地址
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        let color = getImageColor(canvas, img);
        console.log(color);
        resolve(color);
      };
    } catch (e) {
      reject(e);
    }
  });
}

function getImageColor(canvas, img) {
  // console.log(canvas.getContext);
  const context = canvas.getContext("2d");
  context.drawImage(img, 0, 0);

  // 获取像素数据
  let pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  // console.log("pixelData", pixelData);
  return getCountsArr(pixelData);
}

function getCountsArr(pixelData) {
  let colorList = [];
  let rgba = [];
  let rgbaStr = "";
  // 分组循环
  for (let i = 0; i < pixelData.length; i += 4) {
    rgba[0] = pixelData[i];
    rgba[1] = pixelData[i + 1];
    rgba[2] = pixelData[i + 2];
    rgba[3] = pixelData[i + 3];

    if (rgba.indexOf(undefined) !== -1 || pixelData[i + 3] === 0) {
      continue;
    }
    // console.log("rgba", rgba);
    rgbaStr = rgba.join(",");
    if (rgbaStr in colorList) {
      ++colorList[rgbaStr];
    } else {
      colorList[rgbaStr] = 1;
    }
  }
  // console.log("colorList", colorList);

  let arr = [];
  for (let prop in colorList) {
    arr.push({
      // 如果只获取rgb,则为`rgb(${prop})`
      color: `rgba(${prop})`,
      count: colorList[prop],
    });
  }
  // 数组排序
  arr.sort((a, b) => {
    return b.count - a.count;
  });

  // console.log('22');
  // console.log("arr", arr);

  return arr;
}
