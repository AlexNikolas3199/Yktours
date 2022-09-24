import { useEffect, useState } from 'react'
import { Button, Form, message, Dropdown, Menu, Input } from 'antd'
import Top from '../../components/Top'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { useUser } from '../../utils/hooks'
import { CREATE_ONE_ADMIN } from '../../gqls/admin'
const roles = ['MODERATOR', 'ADMIN']
const requiredRule = { required: true, message: 'Обязательное поле' }
const emailRule = { type: 'email', message: 'Введите правильный Email' }

const CreateOneFreeTime = ({ history }) => {
  const { user, loading: loadingMe } = useUser()
  useEffect(() => {
    if (user.role !== roles[1]) history.goBack()
  })
  const [role, setRole] = useState(null)
  const roleMenu = (
    <Menu onClick={(e) => setRole(e.key)}>
      {roles.map((item) => (
        <Menu.Item key={item} icon={<UserOutlined />}>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  )
  const [createOneAdmin, { loading }] = useMutation(CREATE_ONE_ADMIN, {
    onCompleted: () => history.push('/freetime'),
    onError: (err) => {
      console.error(err)
      message.error('Не удалось выполнить запрос')
    },
  })
  const handleCreate = (v) => {
    createOneAdmin({
      variables: { data: { name: v.name, surname: v.surname, email: v.email, role, password: v.password } },
    })
  }

  if (loadingMe) return 'Загрузка...'
  if (user.role !== roles[1]) return 'Ошибка'
  return (
    <>
      <Top title='Добавить админа' />
      <div style={{ maxWidth: 500 }}>
        <Form onFinish={handleCreate} layout='vertical'>
          <Form.Item className='max-width' name='name' label='Имя' rules={[requiredRule]}>
            <Input />
          </Form.Item>
          <Form.Item className='max-width' name='surname' label='Фамилия' rules={[requiredRule]}>
            <Input />
          </Form.Item>
          <Form.Item className='max-width' label='Роль' required>
            <Dropdown overlay={roleMenu}>
              <Button>
                {role ? role : 'Выберите роль'} <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item className='max-width' name='email' label='Email' rules={[requiredRule, emailRule]}>
            <Input />
          </Form.Item>
          <Form.Item className='max-width' name='password' label='Пароль' rules={[requiredRule]}>
            <Input.Password />
          </Form.Item>
          <Button loading={loading} htmlType='submit' type='primary'>
            Добавить
          </Button>
        </Form>
      </div>
    </>
  )
}

export default CreateOneFreeTime
