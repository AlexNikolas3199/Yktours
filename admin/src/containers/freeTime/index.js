import { Table } from 'antd'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import Top from '../../components/Top'
import { useState } from 'react'
import { FIND_MANY_ADMIN } from '../../gqls/admin'
import { useUser } from '../../utils/hooks'
const limit = 50
const FreeTime = () => {
  const { user } = useUser()
  const [skip, setSkip] = useState(0)

  const { data, loading } = useQuery(FIND_MANY_ADMIN, {
    fetchPolicy: 'network-only',
    variables: {
      take: limit,
      skip,
    },
  })
  const onChangeTable = (pagination) => {
    setSkip((pagination.current - 1) * limit)
  }
  const record = data ? data?.findManyAdmin : []
  const total = data ? data?.findManyAdminCount : 0
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
    },
  ]
  if (user.role === 'ADMIN') {
    columns.push({
      title: 'Действие',
      key: 'operation',
      align: 'center',
      render: (record) => <Link to={`/freeTime/update/${record.id}`}>Изменить</Link>,
    })
  }
  return (
    <>
      <Top title='Права' action={user.role === 'ADMIN' && <Link to={`/freeTime/create`}>Добавить</Link>} />
      <Table
        dataSource={record}
        loading={loading}
        onChange={onChangeTable}
        pagination={{
          total,
          pageSize: limit,
        }}
        scroll={{ x: 600 }}
        rowKey={(row) => row.id}
        columns={columns}
      />
    </>
  )
}

export default FreeTime
