import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogPageHeader from './components/blogPageHeader';

const BlogList = lazy(() => import('./blogList'));
const BlogCreate = lazy(() => import('./blogCreate'));
const BlogUpdate = lazy(() => import('./blogUpdate'));
const BlogRead = lazy(() => import('./blogRead'));

function Blog() {
  return (
    <>
      {BlogPageHeader()}
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
