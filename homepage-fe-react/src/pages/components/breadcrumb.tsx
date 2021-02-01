import { Breadcrumb } from 'antd';
import useReactRouter from 'use-react-router';

function Breadcrumbs() {
  const { history, location, match } = useReactRouter<any>();
  console.log({ history, location, match });
  const { pathname } = location;
  console.log('pathname : ', pathname);

  const renderBreadHome = () => {
    if (pathname === '/') {
      return <Breadcrumb.Item>Home</Breadcrumb.Item>;
    } else if (pathname === '/blogs') {
      return (
        <>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Blog</Breadcrumb.Item>
        </>
      );
    } else if (pathname === '/about') {
      return (
        <>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>About</Breadcrumb.Item>
        </>
      );
    } else if (pathname.indexOf('/blogs/read') > -1) {
      const pathnameSplit = pathname.split('/');
      const id = pathnameSplit[pathnameSplit.length - 1];
      return (
        <>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Blog</Breadcrumb.Item>
          <Breadcrumb.Item>{id}</Breadcrumb.Item>
        </>
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>{renderBreadHome()}</Breadcrumb>
    </>
  );
}

export default Breadcrumbs;
