import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import postModule from '../../store/modules/post';

import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

type TIconText = {
  icon: any;
  text: any;
};

const IconText = ({ icon, text }: TIconText) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function blogList() {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const postState = useSelector((store: RootState) => store.post.postReducer);
  const { isLoadingReadPosts, posts } = postState;

  const fetchPosts = () => {
    dispatch(postModule.actions.READ_POSTS_REQUEST());
  };

  useEffect(() => {
    fetchPosts();
    return () => {
      dispatch(postModule.actions.READ_POSTS_RESET());
    };
  }, []);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        loading={isLoadingReadPosts}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={posts}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.avatar} />}
              // description={item.description}
              title={<Link to={`${url}/read/${item.id}`}>{item.title}</Link>}
            />
            {item.desc}
          </List.Item>
        )}
      />
      ,
    </>
  );
}

export default blogList;
