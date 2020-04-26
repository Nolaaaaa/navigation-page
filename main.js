window.onload = function () {
  // loading
  setTimeout(function(){
      siteWelcome.classList.remove('active');
  },1000)

  // 1 初始化数据
  var hashA = init()
  var keys = hashA['keys']
  var hash = hashA['hash']

  // 2 生成键盘
  // 以下代码的作用是遍历key，生成kbd标签
  generateKeyboard(keys, hash)

  // 3 监听用户动作
  listenToUser(hash)



  /********************* 大函数 *************************/
  function init() {
    // 建立一个数组
    var keys = {
      '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
      '1': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
      '2': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
      'length': 3
    }
    // 建立一个hash
    var hash = {
      'q': 'weibo.com', 'w': 'alpha.wallhaven.cc', 'e': 'sm.ms', 'r': 'www.y3600.com', 't': 'css-tricks.com', 'y': 'youtube.com', 'u': 'www.yahoo.com', 'i': 'www.imooc.com', 'o': 'www.apple.com', 'p': 'compressjpeg.com',
      'a': 'acfun.tv', 's': 'sohu.com', 'd': 'dribbble.com', 'f': 'fanyi.youdao.com', 'g': 'github.com', 'h': 'st.hujiang.com', 'j': 'js.jirengu.com', 'k': 'www.vip.com', 'l': 'www.taobao.com',
      'z': 'www.zcool.com.cn', 'x': 'google.com', 'c': 'www.cnblogs.com', 'v': 'tympanus.net', 'b': 'explainshell.com', 'n': 'm.panduoduo.net', 'm': 'developer.mozilla.org',
    }
    // 取出loaclstorage中对应的hash
    var hashInlocalStorage = getFromlocalStorage('website')
    if (hashInlocalStorage) {
      hash = hashInlocalStorage
    }
    return {
      "keys": keys,
      "hash": hash
    }
  }

  // 初始化键盘
  function generateKeyboard(keys, hash) {
    for (var index = 0; index < keys['length']; index = index + 1) {
      var div = tag('div')
      main = document.getElementById('main')
      div.className = 'row';
      main.appendChild(div)
      var row = keys[index]   // row[1]第一个数组 row[2]第二个数组 row[3]第三个数组
      for (var index2 = 0; index2 < row['length']; index2 = index2 + 1) {
        var span = createSpan(row[index2])
        var botton = createButton(keys[index][index2])  
        var img = createImage(hash[row[index2]])
        var kbd = tag('kbd');      
        kbd.className = 'key';
        kbd.appendChild(span);
        kbd.appendChild(img)
        kbd.appendChild(botton)         
        div.appendChild(kbd)         
      }
    }
  }

  // 监听键盘事件
  function listenToUser(hash) {
    document.onkeypress = function (e) {
      let  key = e['key']    
      if(key in hash) {
        var website = hash[key]  
        window.open('http://' + website, '_blank')    // 新的窗口打开网址。location.href='http://'+website 是当前页打开
      }
      if (key == 'Enter') search.focus()
    }
    search.onkeypress = function (e) { 
      let  key = e['key'] 
      if (key == 'Enter' && this.value) { window.open('https://www.google.com/search?q=' + this.value, '_blank') }

      // 阻止冒泡
      window.event?window.event.cancelBubble=true:event.stopPropagation()
    }
  }



  /********************* 为大函数服务的小小函数 *************************/
  // 创建一个编辑网址的按钮
  function createButton(id) {
    var botton = tag('botton');      
    botton.textContent = '编辑';    
    botton.id = id
    // 用户点击鼠标按键时获得点击的按钮并将编辑的新网址赋值给hash
    // 同时把用户输入的网址存到'website'中
    botton.onclick = function (e) {
      var bottontarget = e['target']
      var img2 = bottontarget.previousSibling    // 拿到变更的图片的图片
      var key = bottontarget['id']    // 拿到用户点击的按钮
      var newKey = prompt('请输入一个网址，例如weibo.com')     // 放网址的地方
      if(!newKey) return
      hash[key] = newKey            // 把这个值赋值给hash[key]
      localStorage.setItem('website', window.JSON.stringify(hash))
      // 这个API只能存字符串，但是hash不是字符串，所以可以用JSON.stringify(hash)把它变成字符串
      // 在谷歌浏览器的application下的localStorage中可以看到
      img2.src = 'http://' + newKey + '/favicon.ico'
      img2.onerror = function (e) { e.target.src = 'http://i.loli.net/2018/04/25/5ae07725663e5.png' }
    }
    return botton
  }

  // 从本地储存中拿数据
  function getFromlocalStorage(name) {
    return window.JSON.parse(localStorage.getItem(name) || 'null')
  }

  // 网站的ico图片
  function createImage(domain) {
    var img = tag('img')

    if (domain) { img.src = 'http://' + domain + '/favicon.ico' } 
    else { img.src = 'http://i.loli.net/2018/04/25/5ae07725663e5.png'}

    img.onerror = function (e) { e.target.src = 'http://i.loli.net/2018/04/25/5ae07725663e5.png'}
    return img
  }

  // 创建一个span
  function createSpan(textContent) {
    var span = tag('span');
    span.textContent = textContent   
    span.className = "text";
    return span
  }

  // 创建一个tag
  function tag(tagName) {
    return document.createElement(tagName)
  }
}