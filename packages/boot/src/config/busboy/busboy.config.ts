import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { uploadWhiteList, DefaultUploadFileMimeType } from '@midwayjs/busboy'


/**
 * @link https://midwayjs.org/docs/extensions/busboy
 * @link https://github.com/mscdex/busboy/tree/master?tab=readme-ov-file#exports
 */
export const busboy = {
  // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
  mode: 'file',
  limits: {
    // fileSize: number，文件大小限制，默认为 10mb
    fileSize: 10 * 1024 * 1024,
  },
  // whitelist: string[]，文件扩展名白名单
  whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
  // 仅允许下面这些文件类型可以上传
  mimeTypeWhiteList: DefaultUploadFileMimeType,
  // tmpdir: string，上传的文件临时存储路径
  tmpdir: join(tmpdir(), 'midway-upload-files'),
  // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
  cleanTimeout: 5 * 60 * 1000,
  // 仅在路径包含 upload 时去解析 body 中的文件信息
  match: /upload/u,
}

