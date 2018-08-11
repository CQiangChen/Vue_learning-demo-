function observer(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function(key){
        console.log(key,data,data[key])
        defineReactive(data,key,data[key])
    });
}

function defineReactive(data,key,val) {
    observer(val); //递归遍历所有子属性
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get: function(){
            return val;
        },
        // 对应属性的值变动执行set
        set:function(newVal){
            val = newVal;
            console.log('属性' + key + '已监听，值为：' + newVal.toString());
        }
    })
}
// 测试
var library = {
    book1:{
         name:''
    },
    book2:"",
}

observer(library);
library.book1.name = 'vue权威指南';
library.book2 = '没有此书籍'