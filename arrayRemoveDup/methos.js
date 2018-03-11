// 方法一：新建一个数组，遍历原数组，通过indexOf方法判断是否有该值
function removeDup(arr) {
  var n = []
  for(var i=0,len=arr.length;i<len;i++) {
      if(n.indexOf(arr[i]) === -1) {
          n.push(arr[i])
      }
  }
  return n;
}

// 方法二：利用对象的键值对
function removeDup(arr) {
  var o = {}, n = [];
  for(var i=0,len=arr.length;i<len;i++) {
    var v = arr[i]
    if(!o[v]) {
        o[v] = true
        n.push(arr[i])
    }
  }
  return n;
}

// 方法三：利用filter方法,indexOf只返回第一个匹配项
function removeDup(arr) {
  var n = [];
  n = arr.filter(function(value, index, self) {
    return self.indexOf(value) === index
  })
  return n;
}

// 方法四：利用splice方法
function removeDup(arr) {
  var n = arr.slice()
  for(var i=0,len=arr.length;i<len;i++) {
    for(var j=i+1;j<len;j++) {
      if(arr[i] === arr[j]) {
        n.splice(j, 1)
      }
    }
  }
  return n;
}

// 方法五：思路与filter一样，判断当前下标与第一次出现时的下标是否相等
function removeDup(arr) {
  var n = [];
  for(var i=0,len=arr.length;i<len;i++) {
    var v = arr[i]
   if(arr.indexOf(v) === i) {
     n.push(v)
   }
  }
  return n;
}
