import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { Form, Card as AntCard, Input, Button as AntButton, message } from 'antd'

import { SIGN_IN_ADMIN } from '../gqls/admin'

const requiredRule = {
  required: true,
  message: 'Обязательное поле',
}

const emailRule = {
  type: 'email',
  message: 'Введите правильный Email',
}

const Login = () => {
  const [signInAdmin, { loading }] = useMutation(SIGN_IN_ADMIN, {
    onCompleted: ({ signInAdmin: payload }) => {
      localStorage.setItem('token', payload.token)
      window.location.href = `/`
    },
    onError: (err) => {
      message.error('Неправильный Email или пароль')
    },
  })

  const handleSubmitForm = (values) => {
    signInAdmin({
      variables: {
        data: {
          email: values.email,
          password: values.password,
        },
      },
    })
  }

  return (
    <Wrapper>
      <Card title='Вход в панель администратора'>
        <Form onFinish={handleSubmitForm} layout='vertical'>
          <Form.Item label='Email' name='email' rules={[requiredRule, emailRule]}>
            <Input placeholder='Введите электронный адрес...' />
          </Form.Item>
          <Form.Item label='Пароль' name='password' rules={[requiredRule]}>
            <Input.Password placeholder='Введите пароль...' />
          </Form.Item>
          <Button loading={loading} type='primary' htmlType='submit'>
            Войти
          </Button>
        </Form>
      </Card>
    </Wrapper>
  )
}

const Card = styled(AntCard)`
  width: 400px;

  @media only screen and (max-width: 420px) {
    width: 95%;
  }
`

const Button = styled(AntButton)``

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;

  @media only screen and (max-width: 420px) {
    justify-content: flex-start;
    padding-top: 30px;
  }
`

export default Login
