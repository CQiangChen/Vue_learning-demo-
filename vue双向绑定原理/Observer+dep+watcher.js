function observer(data){
    if(!data || typeof data !== 'object'){
        return;
    }
    Object.keys(data).forEach(function(key){
        defineReactive(data,key,data[key])
    })
}
/**
 * 分析：需要创建一个可以容纳订阅者的消息订阅器Dep，
 * 订阅器Dep主要负责收集订阅者，
 * 然后再属性变化的时候执行对应订阅者的更新函数。
 * 所以显然订阅器需要有一个容器，这个容器就是list，
 * 将上面的Observer稍微改造下，植入消息订阅器
 */

function defineReactive(data,key,val){
    //data,key:属性名,val:该data对象下的对象？
    observer(val) //递归遍历所有子属性
    // var dep = nen Dep();
    Object.defineProperty(data,key,{
        enumerable:true, //当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。
        configurable:true,//当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除
        //存取描述符
        get:function(){
            if(是否需要添加订阅者){
                dep.addSub(watcher);
            }
            return val;
        },
        set:function(newVal){
            val = newVal;
            console.log('属性' + key + '已监听，值为：' + newVal.toString());
            dep.notify(); //数据变动，通知所有订阅者
        }
    })
}

// 订阅器
function Dep(){
    this.subs = [];
}

Dep.prototype = {
    addSub:function(sub){
        this.subs.push(sub);
    },
    notify:function(){
        this.subs.forEach(function(sub){
            sub.updated();
        });
    }
};