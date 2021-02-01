import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Breadcrumb, Button, Layout, Menu, Tooltip } from 'antd';
import {
  HomeOutlined,
  CoffeeOutlined,
  BulbOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import userModule from '../store/modules/user';
import Breadcrumbs from './components/breadcrumb';

const Home = lazy(() => import('./home'));
const About = lazy(() => import('./about'));
const SignIn = lazy(() => import('./signin'));
const Blog = lazy(() => import('./blog/_blog.container'));
const SignUp = lazy(() => import('./signup'));

/*
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/sign-up',
    component: SignUp,
  },
  {
    path: '/sign-in',
    component: SignIn,
  },
  {
    path: '/blog',
    component: Blog,
    routes: [
      {
        path: '/blog/1',
        component: Blog,
      },
      {
        path: '/blog/2',
        component: Blog,
      },
    ],
  },
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
*/

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Container() {
  const dispatch = useDispatch();
  const getUserInfo = () => {
    dispatch(userModule.actions.GET_USER_REQUEST());
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const userState = useSelector((store: RootState) => store.user.userReducer);
  const { user, token } = userState;

  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onCollapse = (collapsed_: boolean) => {
    setCollapsed(collapsed_);
  };

  const onClickBtnSignout = () => {
    dispatch(userModule.actions.SIGN_OUT());
  };

  const renderBtnLogout = () => {
    return (
      <div className="site-layout-sub-header-background-sign-btn">
        <Tooltip title="sign-out">
          <Button
            type="link"
            shape="circle"
            icon={<LogoutOutlined />}
            size="small"
            onClick={onClickBtnSignout}
          />
        </Tooltip>
      </div>
    );
  };

  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-sub-header-background"
          style={{ position: 'fixed', zIndex: 1, width: '100%' }}
        >
          {
            <div className="logo">
              <span>Hello. </span>
              {<span>{token ? `${user.name} 님` : '손님'}</span>}
              {token ? renderBtnLogout() : ''}
            </div>
          }
          <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/" icon={<HomeOutlined style={{ fontSize: '18px' }} />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/blogs" icon={<CoffeeOutlined style={{ fontSize: '18px' }} />}>
              <Link to="/blogs">Blog</Link>
            </Menu.Item>
            <Menu.Item key="/about" icon={<BulbOutlined style={{ fontSize: '18px' }} />}>
              <Link to="/about">About</Link>
            </Menu.Item>
            <SubMenu
              key="admin"
              icon={<SettingOutlined style={{ fontSize: '18px' }} />}
              title="Admin"
            >
              <Menu.Item key="/sign-in">
                <Link to="/sign-in">sign-in</Link>
              </Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumbs />
          <div
            className="site-layout-main-content site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {/* <div>메인 컨테이너</div> */}
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/blogs" component={Blog} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/sign-in" component={SignIn} />
              </Switch>
            </Suspense>
          </div>
        </Content>
        <Footer className="site-layout" style={{ textAlign: 'center' }}>
          Made By Malrang
        </Footer>
      </Layout>
      ,
    </>
  );
}

export default Container;
