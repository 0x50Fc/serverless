import { int32 } from "./less";


export enum ErrCode {
    OK = 100000
}

export interface BaseResponse {
    /**
     * 错误码
     */
    errcode: int32
    /**
     * 错误信息
     */
    errmsg?: string
}
