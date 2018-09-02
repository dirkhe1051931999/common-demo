import {ajaxUrl} from "./config"
import axios from 'axios'

export function getSearchData(key,id){
    var obj = {
        op:"search",
        key,
        id
    }
    return axios.get(ajaxUrl.searcUrl,{
        params: obj
    }).then((res)=>{
        return Promise.resolve(res.data);
    }).catch((err)=>{
        return Promise.resolve(err);
    })
}