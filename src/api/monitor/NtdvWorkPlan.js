import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/**
 * 查询分页数据
 */
export const queryWorkPlanPageList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/WorkPlan/ntdv-work-plan/list',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 添加数据
 */
export const addWorkPlan = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/WorkPlan/ntdv-work-plan',
        method: 'post',
        data: qs.stringify(info)
    })
}


/**
 * 更新数据
 */
export const editWorkPlan = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/WorkPlan/ntdv-work-plan',
        method: 'put',
        data: qs.stringify(info)
    })
}

/**
 * 删除数据
 */
export const deleteWorkPlan = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/WorkPlan/ntdv-work-plan/' + id,
        method: 'delete'
    })
}



