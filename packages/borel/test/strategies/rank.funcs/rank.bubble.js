// 冒泡排序
const bubble = arr => {
  arr = arr.slice()
  let { length } = arr
  for (let i = 0; i < length; i++)
    for (let j = 0; j < length - 1 - i; j++)
      if (arr[j] > arr[j + 1])
        swap(j, j + 1, arr)
  return arr
}