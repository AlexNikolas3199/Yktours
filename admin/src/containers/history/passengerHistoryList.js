import { Checkbox, Table } from 'antd'
import { useQuery } from '@apollo/client'
import Top from '../../components/Top'
import { FIND_MANY_ROUTE } from '../../gqls/tours'

const HistoryList = ({ match }) => {
  const { id } = match.params
  const { data, loading } = useQuery(FIND_MANY_ROUTE, {
    fetchPolicy: 'network-only',
    variables: {
      where: { id: { equals: id } },
    },
  })

  if (loading) return null

  const route = data.findManyRoute[0]
  let tours1 = [],
    tours2 = []
  const addRoom = (item) => {
    for (let passenger of item.passengers) {
      passenger.room = item.room
      passenger.roomId = item.id
    }
  }
  for (let item of route.ticket) {
    addRoom(item)
    tours1 = tours1.concat(item.passengers)
  }
  for (let item of route.bookedRoom) {
    addRoom(item)
    tours2 = tours2.concat(item.passengers)
  }

  return (
    <>
      <Top title='Пассажиры' />
      <Table
        dataSource={tours1}
        loading={loading}
        scroll={{ x: 700 }}
        rowKey={(row) => row.id}
        pagination={false}
        columns={[
          {
            title: 'ФИО',
            key: 'passenger',
            render: (item) => item.name + ' ' + item.surname + ' ' + item.patronymic,
          },
          {
            title: 'Каюта',
            dataIndex: 'room',
            key: 'room',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.room - b.room,
            render: (room) => room,
          },
          {
            title: 'Прибыл',
            key: 'arrived',
            render: (item) => (
              <Checkbox
                disabled={true}
                defaultChecked={item.arrived}
                // onChange={(e) => arrivedHandler(e.target.checked, item.id, 'ticket', item.roomId)}
              />
            ),
          },
        ]}
      />
      <Top style={{ marginTop: 30 }} title='Пассажиры (Бронь)' />
      <Table
        dataSource={tours2}
        loading={loading}
        scroll={{ x: 700 }}
        pagination={false}
        rowKey={(row) => row.id}
        columns={[
          {
            title: 'ФИО',
            key: 'passenger',
            render: (item) => item.name + ' ' + item.surname + ' ' + item.patronymic,
          },
          {
            title: 'Каюта',
            dataIndex: 'room',
            key: 'room',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.room - b.room,
            render: (room) => room,
          },
          {
            title: 'Прибыл',
            key: 'arrived',
            render: (item) => (
              <Checkbox
                disabled={true}
                defaultChecked={item.arrived}
                // onChange={(e) => arrivedHandler(e.target.checked, item.id, 'bookedRoom', item.roomId)}
              />
            ),
          },
        ]}
      />
    </>
  )
}

export default HistoryList
