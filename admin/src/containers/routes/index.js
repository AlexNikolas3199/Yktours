import { Table } from 'antd'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import Top from '../../components/Top'
import { FIND_MANY_ROUTE } from '../../gqls/tours'
import { useState } from 'react'
import { useUser } from '../../utils/hooks'
import TodayDate from '../../components/TodayDate'
const limit = 50
const nowDate = new Date()

const Routes = () => {
  const [skip, setSkip] = useState(0)
  const { user, loading: loadingMe } = useUser()

  const { data, loading } = useQuery(FIND_MANY_ROUTE, {
    fetchPolicy: 'network-only',
    variables: {
      take: limit,
      skip,
      where: { date: { gt: nowDate.toISOString() } },
    },
  })
  const onChangeTable = (pagination) => setSkip((pagination.current - 1) * limit)
  const tours = data ? data?.findManyRoute : []
  const total = data ? data?.findManyRoute.length : 0

  return (
    <>
      <Top title='Круизы' action={user.role === 'ADMIN' && <Link to='/routes/create'>Добавить</Link>} />
      <Table
        dataSource={tours}
        loading={loading || loadingMe}
        onChange={onChangeTable}
        pagination={{ total, pageSize: limit }}
        scroll={{ x: 700 }}
        rowKey={(row) => row.id}
        columns={[
          {
            title: 'Маршрут',
            dataIndex: 'route',
            key: 'route',
            render: (route) => route.join(' → '),
          },
          {
            title: 'Дата отплытия',
            dataIndex: 'date',
            key: 'date',
            render: (date) => TodayDate(new Date(date)),
          },
          {
            title: 'Длительность',
            dataIndex: 'duration',
            key: 'duration',
            render: (dur) => dur + 'ч.',
          },
          {
            title: 'Судно',
            dataIndex: 'ship',
            key: 'ship',
            render: (ship) => (ship === 1 ? 'МИХАИЛ СВЕТЛОВ' : 'ДЕМЬЯН БЕДНЫЙ'),
          },
          {
            title: 'Действие',
            align: 'center',
            key: 'operation',
            render: (record) => (
              <div>
                {user.role === 'ADMIN' && (
                  <div>
                    <Link to={`/routes/update/${record.id}`}>Изменить</Link>
                  </div>
                )}
                <div style={{ marginTop: 5, marginBottom: 5 }}>
                  <Link to={`/routes/tickets/${record.id}`}>К каютам</Link>
                </div>
                <div>
                  <Link to={`/routes/passengerList/${record.id}`}>Пассажиры</Link>
                </div>
              </div>
            ),
          },
        ]}
      />
    </>
  )
}

export default Routes
