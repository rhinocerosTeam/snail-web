/**
 * Created by Cray on 2016/11/7.
 */

const localStorage  = window.localStorage || {};

class Local {
    static setItem(key, data){
        if(Object.prototype.toString.apply(data) == "[object Object]"){
            data =  JSON.stringify(data);
        }
        localStorage[key] = data;
    }

    static getItem(key){
        let value = localStorage[key] || null;
        if(value){
            try{
                value = JSON.parse(value);
            }catch(e){}
        }
        return value;
    }
}

export default Local;