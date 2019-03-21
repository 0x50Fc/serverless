import { int64, int32 } from "../lib/less";

/**
 * 用户
 */
export interface User {
    /**
     * 用户ID
     */
    id: int64
    /**
     * 账号
     */
    account?: string
    /**
     * 昵称
     */
    nick?: string
    /**
     * 创建时间（秒）
     */
    ctime: int32
}

