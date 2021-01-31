import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import postModule from '../../store/modules/post';
import { useEffect, useState } from 'react';
import Viewer from './components/blogViewer';
import { Button, message, Modal, Skeleton } from 'antd';
import BlogComments from './components/blogComment';

function BlogRead() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const postState = useSelector((store: RootState) => store.post.postReducer);
  const { post, isDoneReadPost, isDoneRemovePost, errorRemovePost } = postState;

  const reqReadPost = (id: string) => {
    dispatch(postModule.actions.READ_POST_REQUEST(id));
  };

  const reqRemovePost = (id: string) => {
    dispatch(postModule.actions.REMOVE_POST_REQUEST(id));
  };

  useEffect(() => {
    reqReadPost(id);
    return () => {
      dispatch(postModule.actions.READ_POST_RESET());
      dispatch(postModule.actions.REMOVE_POST_RESET());
    };
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (isDoneRemovePost) {
      message.success('성공적');
      history.push('/blogs');
    }
    if (errorRemovePost) {
      message.error(errorRemovePost);
    }
    return () => {
      dispatch(postModule.actions.REMOVE_POST_RESET());
    };
  }, [isDoneRemovePost, errorRemovePost]);

  const [content, setContent] = useState<any>();

  useEffect(() => {
    if (isDoneReadPost) {
      const parseContent = JSON.parse(post?.content || '{}');
      setContent(parseContent);
    }
  }, [isDoneReadPost]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    reqRemovePost(id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Link to={`/blogs/update/${id}`}>수정</Link>
      <Button type="primary" onClick={showModal}>
        삭제
      </Button>
      <Modal title="삭제합니다." visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        해당 컨텐츠를 삭제하시겠습니까?
      </Modal>
      {isDoneReadPost && content ? (
        <Viewer editorData={content} />
      ) : (
        // <Blocks
        //   data={content}
        //   config={defaultConfigs}
        //   renderers={{
        //     checklist: Checklist,
        //   }}
        // />
        <Skeleton active />
      )}
      <BlogComments />
    </>
  );
}

export default BlogRead;
