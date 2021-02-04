import { Button, Modal, PageHeader, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { RootState } from '../../../store/configureStore';
import postModule from '../../../store/modules/post';
function BlogPageHeader() {
  const { location } = useReactRouter<any>();
  // console.log({ history, location, match });
  const { pathname } = location;
  // console.log('pathname : ', pathname);
  // console.log('pathname.indexOf /blogs/read : ', pathname.indexOf('/blogs/read'));

  const renderPageHeader = () => {
    const dispatch = useDispatch();
    const postState = useSelector((store: RootState) => store.post.postReducer);
    const userState = useSelector((store: RootState) => store.user.userReducer);
    const { isDoneRemovePost, errorRemovePost } = postState;
    const { token } = userState;
    console.log('BlogPageHeader token : ', token);

    const reqRemovePost = (id: string) => {
      dispatch(postModule.actions.REMOVE_POST_REQUEST(id));
    };

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

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      const pathnameSplit = pathname.split('/');
      const id = pathnameSplit[pathnameSplit.length - 1];
      setIsModalVisible(false);
      reqRemovePost(id);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    if (pathname === '/blogs') {
      return (
        <PageHeader
          ghost={false}
          title="Blog"
          subTitle="목록 페이지"
          extra={[
            <Button key="/blogs/create" type="primary" disabled={!token}>
              <Link to={`/blogs/create`}>작성</Link>
            </Button>,
          ]}
        ></PageHeader>
      );
    } else if (pathname === '/blogs/create') {
      return (
        <PageHeader
          ghost={false}
          title="Blog"
          subTitle="작성 페이지"
          extra={[
            <Button key="/blogs">
              <Link to={`/blogs`}>리스트</Link>
            </Button>,
          ]}
        ></PageHeader>
      );
    } else if (pathname.indexOf('/blogs/read') > -1) {
      const pathnameSplit = pathname.split('/');
      const id = pathnameSplit[pathnameSplit.length - 1];
      return (
        <>
          <PageHeader
            ghost={false}
            title="Blog"
            subTitle="상세 페이지"
            extra={[
              <Button key="/blogs">
                <Link to={`/blogs`}>리스트</Link>
              </Button>,
              <Button key="/blogs/update" type="primary" disabled={!token}>
                <Link to={`/blogs/update/${id}`}>수정</Link>
              </Button>,
              <Button
                key="/blogs/delete"
                type="primary"
                danger
                onClick={showModal}
                disabled={!token}
              >
                삭제
              </Button>,
            ]}
          ></PageHeader>
          <Modal
            title="삭제합니다."
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            해당 컨텐츠를 삭제하시겠습니까?
          </Modal>
        </>
      );
    } else if (pathname.indexOf('/blogs/update') > -1) {
      const pathnameSplit = pathname.split('/');
      const id = pathnameSplit[pathnameSplit.length - 1];
      return (
        <>
          <PageHeader
            ghost={false}
            title="Blog"
            subTitle="수정 페이지"
            extra={[
              <Button key="/blogs">
                <Link to={`/blogs`}>리스트</Link>
              </Button>,
              <Button key="/blogs/read">
                <Link to={`/blogs/read/${id}`}>상세</Link>
              </Button>,
            ]}
          ></PageHeader>
        </>
      );
    }
  };

  return <>{renderPageHeader()}</>;
}

export default BlogPageHeader;
