import { Form, Input, Button, Checkbox } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store/configureStore';
import userModule from '../store/modules/user';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userState = useSelector((store: RootState) => store.user.userReducer);
  //const { isLoading, isDone: isSigninDone, error: isSigninError, user, token } = userState;
  const { isLoading, token } = userState;

  const fetchSignin = (values: any) => {
    // console.log('fetchSignin signinSlice : ', signinSlice);
    dispatch(
      userModule.actions.SIGN_IN_REQUEST({
        email: values.email,
        password: values.password,
      }),
    );
  };

  const onFinish = (values: any) => {
    console.log('onFinish Success:', values);
    fetchSignin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token]);

  // useEffect(() => {
  //   if (isSigninDone) {
  //     history.push('/');
  //   }
  // }, [isSigninDone]);
  // const isLoading = false;
  return (
    <>
      {/* 
      <div>        
        <p>isLoading: {isLoading ? 'true' : 'false'}</p>
        <p>isDone: {isSigninDone ? 'true' : 'false'}</p>
        <p>error: {isSigninError}</p>
        <p>name: {user.name}</p>
        <p>token: {token}</p>
      </div>
      */}
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="id"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your username!' }]}
        >
          <Input disabled={isLoading} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={isLoading} />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignIn;
