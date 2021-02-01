import { useEffect, useState } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import {
  Card,
  Form,
  Input,
  Button,
  Collapse,
  Select,
  Upload,
  InputNumber,
  message,
  Skeleton,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { RootState } from '../../store/configureStore';
import postModule from '../../store/modules/post';
import { IPostRequest } from '../../store/modules/post/post.interface';
import Editor from './components/blogEditor';
import { CATEGORY_ITEMS, CATEGORY_NAMES } from '../../utils/constant';

function BlogUpdate() {
  const { url } = useRouteMatch();
  const { id } = useParams<{ id: string }>();

  const postState = useSelector((store: RootState) => store.post.postReducer);
  const {
    post,
    isLoadingReadPost,
    isDoneReadPost,
    errorReadPost,
    isLoadingUpdatePost,
    isDoneUpdatePost,
    errorUpdatePost,
  } = postState;

  const reqReadPost = (id: string) => {
    dispatch(postModule.actions.READ_POST_REQUEST(id));
  };

  useEffect(() => {
    reqReadPost(id);
    return () => {
      dispatch(postModule.actions.READ_POST_RESET());
    };
  }, []);

  const [content, setContent] = useState<any>();

  useEffect(() => {
    if (isDoneReadPost) {
      const parseContent = JSON.parse(post?.content || '');
      console.log('parseContent : ', parseContent);
      setContent(parseContent);

      if (post?.attachment) {
        const fileTemp = {
          uid: post?.attachment.id,
          name: post?.attachment.originalname,
          status: 'done',
          url: post?.attachment.download,
          response: post?.attachment,
        };
        updateFileList([fileTemp]);
      }
    }
  }, [isDoneReadPost]);

  const history = useHistory();

  useEffect(() => {
    if (isDoneUpdatePost) {
      message.success('성공적');
      history.push(`/blogs/read/${id}`);
    }
    if (errorUpdatePost) {
      message.error(errorUpdatePost);
    }
    return () => {
      dispatch(postModule.actions.UPDATE_POST_RESET());
    };
  }, [isDoneUpdatePost, errorUpdatePost]);

  const dispatch = useDispatch();
  const [editor, setEditor] = useState<any>();

  const onReadyEditor_ = (editor_: any): void => {
    console.log('onReadyEditor_ data : ', editor_);
    setEditor(editor_);
  };

  useEffect(() => {
    return () => {
      setEditor(null);
    };
  }, []);

  const fetchPostData = async (values: any) => {
    const content = await editor.saver.save();
    const contentStr = JSON.stringify(content);

    const reqPostData: IPostRequest = {
      id: post?.id,
      title: values.title,
      desc: values.desc,
      subject: values.subject || values.title,
      subjectTitle: values.subjectTitle || values.title,
      subjectOrder: values.subjectOrder || 1,
      content: contentStr,
      contentHtml: contentStr,
    };
    if (fileList.length > 0) {
      reqPostData.attachment = fileList[0].response.data;
    }
    if (categories.length > 0) {
      const categories_ = [];

      for (let i = 0; i < categories.length; i++) {
        const cateName = categories[i];
        const item = _.find(CATEGORY_ITEMS, { name: cateName });
        if (item !== undefined) {
          categories_.push(item);
        }
      }
      reqPostData.categories = categories_;
    } else {
      reqPostData.categories = [CATEGORY_ITEMS[0]];
    }
    dispatch(postModule.actions.UPDATE_POST_REQUEST(reqPostData));
  };

  const onFinish = (values: any) => {
    console.log('onFinish Success:', values);
    fetchPostData(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error(errorInfo);
  };

  const [fileList, updateFileList] = useState<any[]>([]);

  const uploadUrl = `${
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL_PROD
  }/attachments/image`;
  const authorization = 'Bearer ' + localStorage.getItem('MALRANG_TOKEN') || '';
  const uploadProps = {
    name: 'file',
    action: uploadUrl,
    headers: {
      authorization: authorization,
    },
    accept: 'image/png, image/jpeg',
    defaultFileList: fileList,
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        updateFileList(info.fileList.filter((file: any) => !!file.status));
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [categories, updateCategories] = useState<string[]>([]);
  const filteredOptions = CATEGORY_NAMES.filter((o) => !categories.includes(o));
  const handleChangeSelect = (selectedItems: string[]) => {
    updateCategories(selectedItems);
  };

  return (
    <>
      {isDoneReadPost && content ? (
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Card
            title="블로그 수정"
            style={{ width: '100%' }}
            actions={[
              <Button type="primary" htmlType="submit" loading={isLoadingUpdatePost}>
                Submit
              </Button>,
            ]}
          >
            <Form.Item
              label="제목 (Title)"
              name="title"
              initialValue={post?.title}
              rules={[{ required: true, message: 'Please input Title!' }]}
            >
              <Input placeholder="input Title" />
            </Form.Item>
            <Form.Item
              label="설명 (Desc)"
              name="desc"
              initialValue={post?.desc}
              rules={[{ required: true, message: 'Please input desc!' }]}
            >
              <Input.TextArea placeholder="input Desc" autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
            <Collapse ghost>
              <Collapse.Panel header="주제 그룹 (Subject)" key="1">
                <Form.Item label="주제 (Subject)" name="subject" initialValue={post?.subject}>
                  <Input placeholder="input Subject. 미입력시 제목" />
                </Form.Item>
                <Form.Item
                  label="소 제목 (Subject Title)"
                  name="subjectTitle"
                  initialValue={post?.subjectTitle}
                >
                  <Input placeholder="input Subject Title" />
                </Form.Item>
                <Form.Item
                  label="순번 (Subject Order)"
                  name="subjectOrder"
                  rules={[{ type: 'number', message: 'Please input type number!' }]}
                  initialValue={post?.subjectOrder}
                >
                  <InputNumber min={1} />
                </Form.Item>
              </Collapse.Panel>
              <Collapse.Panel header="추가 항목 (Extra Item)" key="2">
                <Form.Item label="카테고리 (Category)">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    onChange={handleChangeSelect}
                    defaultValue={
                      post?.categories ? post?.categories.map((item: any) => item.name) : undefined
                    }
                  >
                    {filteredOptions.map((item) => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="대표 이미지 (Image)">
                  <Upload {...uploadProps} listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
            ,
            <Card title="본문 (Content)" style={{ width: '100%' }}>
              <Editor onReadyEditor={onReadyEditor_} data={content} />
            </Card>
          </Card>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}

export default BlogUpdate;
