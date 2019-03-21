
import { BaseResponse, ErrCode } from "../lib/BaseResponse";
import { User } from "./User";
import { int64 } from "../lib/less";

/**
 * 获取用户信息
 * @method GET
 */
export class Request {
    /**
     * 用户ID
     */
    id: int64

    /**
     * 用户昵称
     */
    nick?: string

    /**
     * 好友ID
     */
    fuids?: int64[]

}

export interface Response extends BaseResponse {
    /**
     * 用户
     */
    user?: User
}

export function handle(req: Request): Response {
    return {
        errcode: ErrCode.OK
    }
}
