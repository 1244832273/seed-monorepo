/*
 * @Author: 鲁田文
 * @Date: 2021-04-24 17:06:59
 * @LastEditTime: 2022-03-29 20:25:30
 * @LastEditors: 鲁田文
 * @Description:
 */

import React, { useState, useEffect } from 'react';
import { Upload, Modal, message, Space, Image as ImageAntd } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile, UploadChangeParam, UploadProps } from 'antd/lib/upload/interface';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

interface previewImg {
  previewVisible: boolean;
  previewImage: string;
  previewTitle: string;
}

export interface CustomizeUploadProps<T = any> extends UploadProps<T> {
  action: string; // 上传文件Url
  accept?: string; // 上传格式限制
  fileLength?: number; // 上传文件最大个数
  fileSize?: number; // 限制文件最大size
  maxWidth?: number | undefined; //限制最大宽度
  maxHeight?: number | undefined; // 限制最大高度
  initFiles?: UploadFile<any>[]; // 初始化文件列表
  maxRuleFun?: (file: any) => Promise<any>; // 限制最大宽高规则 函数 权重最高
  onChange?: (value: UploadChangeParam<UploadFile<any>>) => void; // 提供form表单事件
}

function CustomizeUpload(props: CustomizeUploadProps) {
  const {
    action,
    accept = 'image/png, image/jpeg',
    fileLength = 1,
    fileSize = 100,
    maxWidth = undefined,
    maxHeight = undefined,
    initFiles = [],
    maxRuleFun,
    onChange,
    ...uploadProps
  } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]); // 上传文件list（受控）
  const [preview, setPreview] = useState<previewImg>({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  }); // 预览状态控制

  // 设置初始化文件
  useEffect(() => {
    initFiles.length && setFileList(initFiles);
  }, [initFiles.length]);

  // 预览处理
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreview({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // 判断最大高度和宽度限制条件
  const isSize = (file: any) => {
    return new Promise((resolve, reject) => {
      const _URL = window.URL || window.webkitURL;
      const img = new Image();
      img.onload = function () {
        if (maxWidth && maxHeight) {
          const valid = img.width == maxWidth && img.height == maxHeight;
          valid ? resolve(file) : reject(false);
        } else {
          resolve(file);
        }
      };
      img.src = _URL.createObjectURL(file);
    }).then(
      () => {
        return file;
      },
      () => {
        message.error(`请上传尺寸为${maxWidth}*${maxHeight}的图片 !`);
        return Promise.reject();
      }
    );
  };

  // 上传格式限制
  const beforeUpload = (file: any) => {
    const limitImgList = accept.split(',').map((x) => x.split('/')[1]);
    const isJpgOrPng = accept.split(',').some((x) => {
      return x.replace(/\s*/g, '') === file.type.replace(/\s*/g, '');
    });
    if (!isJpgOrPng) {
      message.error(`仅支持 ${limitImgList.join('/')}文件!`);
      return Promise.reject();
    }
    const isLt2M = file.size / 1024 / 1024 < fileSize;
    if (!isLt2M) {
      message.error(`图片不能大于 ${fileSize}MB!`);
      return Promise.reject();
    }
    return isJpgOrPng && isLt2M && maxRuleFun ? maxRuleFun(file) : isSize(file);
  };

  // 处理onchange事件
  const handleChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
    if (fileList.every((x) => x?.status)) {
      setFileList(fileList);
      const responseList = fileList.map((x) => x.response?.data);
      // 只有一张图片返回string 多个图片返回string[]
      onChange?.(fileLength === 1 ? responseList[0] : responseList);
    }
  };

  return (
    <>
      <Upload
        // style={{ minHeight: 100 }}
        {...uploadProps}
        action={action}
        accept={accept}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {fileList.length >= fileLength ? null : (
          <Space>
            {/* <PlusOutlined /> */}
            <div style={{ marginTop: 8 }}>上传</div>
          </Space>
        )}
      </Upload>
      <Modal
        visible={preview.previewVisible}
        title={preview.previewTitle}
        footer={null}
        onCancel={() =>
          setPreview((pre) => {
            return {
              ...pre,
              previewVisible: false,
            };
          })
        }
      >
        <ImageAntd
          width={'100%'}
          src={preview.previewImage}
          fallback="data:image/png;base64,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"
        />
      </Modal>
    </>
  );
}

export default CustomizeUpload;
