import { lazy } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

const BlogList = lazy(() => import('./blogList'));
const BlogCreate = lazy(() => import('./blogCreate'));
const BlogUpdate = lazy(() => import('./blogUpdate'));
const BlogRead = lazy(() => import('./blogRead'));

function Blog() {
  return (
    <>
      <div>블로그 컨테이너</div>
      <div>
        <Link to={`/blogs`}>리스트</Link>
        &nbsp;&nbsp;
        <Link to={`/blogs/create`}>작성</Link>
      </div>
      <div>
        <Switch>
          <Route exact path="/blogs" component={BlogList} />
          <Route path="/blogs/create" component={BlogCreate} />
          <Route path="/blogs/update/:id" component={BlogUpdate} />
          <Route path="/blogs/read/:id" component={BlogRead} />
        </Switch>
      </div>
    </>
  );
}

export default Blog;
