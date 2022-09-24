import { useEffect, useState } from 'react'
import { Button, Form, message, Dropdown, Menu, Input } from 'antd'
import Top from '../../components/Top'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { useUser } from '../../utils/hooks'
import { DELETE_ONE_ADMIN, FIND_MANY_ADMIN, UPDATE_ONE_ADMIN } from '../../gqls/admin'
const roles = ['MODERATOR', 'ADMIN']

const UpdateFreetime = ({ match, history }) => {
  const { id } = match.params
  const { user, loading: loadingMe } = useUser()
  useEffect(() => {
    if (user.role !== roles[1]) history.goBack()
  })
  const [role, setRole] = useState(null)
  const { data, loading: loadingAdmin } = useQuery(FIND_MANY_ADMIN, {
    onCompleted: (data) => {
      setRole(data?.findManyAdmin[0].role)
    },
    fetchPolicy: 'network-only',
    variables: {
      where: { id: { equals: id } },
    },
  })
  const roleMenu = (
    <Menu onClick={(e) => setRole(e.key)}>
      {roles.map((item) => (
        <Menu.Item key={item} icon={<UserOutlined />}>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  )
  const goBack = () => history.goBack()
  const onError = (err) => {
    console.error(err)
    message.error('Не удалось выполнить запрос')
  }
  const [updateOneAdmin, { loading }] = useMutation(UPDATE_ONE_ADMIN, {
    onCompleted: goBack,
    onError,
  })
  const [deleteOneAdmin, { loading: loadingDel }] = useMutation(DELETE_ONE_ADMIN, {
    onCompleted: goBack,
    onError,
  })
  const handleCreate = (v) => {
    updateOneAdmin({
      variables: {
        where: { id },
        data: {
          name: { set: v.name ? v.name : ad.name },
          surname: { set: v.surname ? v.surname : ad.surname },
          role: { set: role },
        },
      },
    })
  }
  const deleteAdmin = () => {
    let isRight = window.confirm('Вы уверены, что хотите удалить данные?')
    if (isRight) deleteOneAdmin({ variables: { where: { id } } })
  }

  if (loadingMe || loadingAdmin) return 'Загрузка...'
  const ad = data?.findManyAdmin[0]
  if (user.role !== roles[1] || !ad) return 'Ошибка'
  return (
    <>
      <Top title='Изменить данные' />
      <div style={{ maxWidth: 500 }}>
        <Form
          initialValues={{ name: ad.name, surname: ad.surname, email: ad.email }}
          onFinish={handleCreate}
          layout='vertical'
        >
          <Form.Item name='name' label='Имя'>
            <Input />
          </Form.Item>
          <Form.Item name='surname' label='Фамилия'>
            <Input />
          </Form.Item>
          <Form.Item label='Роль'>
            <Dropdown overlay={roleMenu}>
              <Button>
                {role ? role : 'Выберите роль'} <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input disabled />
          </Form.Item>
          <Button loading={loading || loadingDel} htmlType='submit' type='primary'>
            Изменить
          </Button>
        </Form>
        <div style={{ paddingTop: 30 }}>
          <hr />
          <Button danger ghost loading={loading || loadingDel} onClick={deleteAdmin} type='primary'>
            Удалить
          </Button>
        </div>
      </div>
    </>
  )
}

export default UpdateFreetime
