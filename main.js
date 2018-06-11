window.onload=function(){
    //1 初始化数据
    var hashA=init()
    var keys=hashA['keys']
    var hash=hashA['hash']
    //2 生成键盘
    //以下代码的作用是遍历key，生成kbd标签
    generateKeyboard(keys,hash)
    //3 监听用户动作
    listenToUser(hash)
    //以下是乱七八糟的函数
    function init(){
        //建立一个数组
        var keys={
            '0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
            '1': {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
            '2': {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
            'length': 3
        }   
        //建立一个hash
        var hash={
            'q': 'weibo.com', 'w': 'alpha.wallhaven.cc', 'e': 'sm.ms', 'r': 'www.y3600.com', 't': 'css-tricks.com', 'y': 'youtube.com', 'u': 'www.yahoo.com' , 'i': 'www.imooc.com', 'o': 'www.apple.com', 'p': 'compressjpeg.com', 
            'a': 'acfun.tv','s' :'sohu.com','d' :'dribbble.com','f' :'fanyi.youdao.com','g':'github.com','h' :'st.hujiang.com','j':'js.jirengu.com','k': 'www.vip.com', 'l': 'www.taobao.com', 
            'z': 'www.zcool.com.cn', 'x': 'xiedaimala.com', 'c': 'www.cnblogs.com', 'v': 'tympanus.net', 'b': 'explainshell.com', 'n': 'm.panduoduo.net', 'm': 'developer.mozilla.org',
        }    
        //取出loaclstorage中zzz对应的hash
        var hashInlocalStorage=getFromlocalStorage('aaa')
        if (hashInlocalStorage){
            hash=hashInlocalStorage
        }
        return{
            "keys":keys,
            "hash":hash
        }
    }
    function generateKeyboard(keys,hash){
        for (var index=0;index<keys['length'];index=index+1){
            var div=tag('div')
            main=document.getElementById('main')
            div.className='row';
            main.appendChild(div)
        var row=keys[index]   //row[1]第一个数组 row[2]第二个数组 row[3]第三个数组
        for(var index2=0;index2<row['length'];index2=index2+1){
            var span=createSpan(row[index2])
            var botton=createButton(keys[index][index2])  //直接用row[index2] 为什么不行？
            var img=createImage(hash[row[index2]])
            var kbd=tag('kbd');       //创建kbd
            kbd.className='key';
            kbd.appendChild(span);
            kbd.appendChild(img) 
            kbd.appendChild(botton)          //将botton中放到kbd中
            div.appendChild(kbd)          //将kbd中放到div
        }
        }
    }
    function listenToUser(hash){
        //一下代码的作用的当用户按键时获得点击的按键
        document.onkeypress=function(fdkfj){
            //console.log('我发现你输入了一个值')
            //console.log('你输入的按键的是')
            //console.log(fdkfj['key'])
            var key=fdkfj['key']    //拿到用户摁的键
            var website=hash[key]     //得到键对应的网站
            console.log(website)
            //location.href='http://'+website     //打开页面的方法1，把当前地址变成新的地址（模拟用户输入）
            window.open('http://'+website,'_blank')     //打开页面的方法2，在新的窗口打开网址
        }
    } 
    function createButton(id){
        var botton=tag('botton');      //创建botton
        botton.textContent='编辑';     //在botton中添加数组的内容
        botton.id=id
        //以下函数是用用户点击鼠标按键时获得点击的按钮并将编辑的新网址赋值给hash
        //同时把用户输入的网址存到'aaa'中
        botton.onclick=function(fds){
                var bottontarget=fds['target']
                var img2=bottontarget.previousSibling    //拿到变更的图片的图片
                var key=bottontarget['id']   //拿到用户点击的按钮
                var x=prompt('请输入一个网址')     //放网址的地方
                hash[key]=x            //把这个值赋值给hash[key]
                localStorage.setItem('aaa',JSON.stringify(hash))  
                console.log(x)
                //这个API只能存字符串，但是hash不是字符串，所以可以用JSON.stringify(hash)把它变成字符串
                //在谷歌浏览器的application下的localStorage中可以看到
                //怎么知道hash是怎么变化的？每次使用hash后console.log(hash)把它打出来
                img2.src='http://'+x+'/favicon.ico'
                img2.onerror=function(ran){
                    //console.log('下载失败了')
                    ran.target.src='http://i.loli.net/2018/04/25/5ae07725663e5.png'
                }
        } 
            return botton
    }
    function getFromlocalStorage(name){
        return JSON.parse(localStorage.getItem('name')||'null')
    }
    function createImage(domain){
        var img=tag('img')
            //如果路径存在，则获取页面的图片
            if(domain){
                img.src='http://'+domain+'/favicon.ico';
            }
            //如果按钮没有对应的hash用以下这个图片替代
            else{
                img.src='http://i.loli.net/2018/04/25/5ae07725663e5.png';
            }
            //如果图片下载失败用以下这个图片替代
            img.onerror=function(ran){
                console.log('下载失败了')
                ran.target.src='http://i.loli.net/2018/04/25/5ae07725663e5.png'
            }
            return img
    }
    function createSpan(textContent){
            var span=tag('span');
            span.textContent=textContent    //在kbd中添加span并把数组放到span中
            span.className="text";
            return span
    }
    function tag(tagName){
        return document.createElement(tagName)
    }
    //这个函数有点难
    /*function tag(tagName,attributes){
        return element=document.createElement(tagName)   //element是一个hash，标签是一个hash
        for(var key in attributes){   //key为className,idtextcontent 
            element[key]=attributes[key]
        }
        return element
    }*/
    
}