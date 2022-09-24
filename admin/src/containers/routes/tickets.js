import { useMutation, useQuery } from '@apollo/client'
import Top from '../../components/Top'
import { Button, message, Modal, Spin, Tabs } from 'antd'
import TopPlace from '../../components/TopPlace'
import { FIND_MANY_ROUTE, UPDATE_ONE_ROUTE } from '../../gqls/tours'
import MidPlace from '../../components/MidPlace'
import BotPlace from '../../components/BotPlace'
import LegendWrap from '../../components/Legend'
import { useState } from 'react'
import PassengerItem from '../../components/PassengerItem'
import DeleteBookButton from '../../components/DeleteBookButton'
import FormModal from '../../components/FormModal'
import PassengerButton from '../../components/PassengerButton'
const { TabPane } = Tabs

const Tickets = ({ match }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modVis, setModVis] = useState(false)
  const [passengers, setPassengers] = useState([])
  const [number, setNumber] = useState(null)
  const [isBooked, setIsBooked] = useState(null)
  const [isBookedAdmin, setIsBookedAdmin] = useState(null)

  const modalToggle = () => setIsModalVisible(!isModalVisible)

  const { id } = match.params
  const { data, loading, refetch } = useQuery(FIND_MANY_ROUTE, {
    fetchPolicy: 'network-only',
    variables: { where: { id: { equals: id } } },
  })

  const [updateOneRoute, { loading: loadingRoute }] = useMutation(UPDATE_ONE_ROUTE, {
    onCompleted: refetch,
    onError: (err) => {
      console.error(err)
      message.error('Не удалось выполнить запрос')
    },
  })

  if (loading) return null
  const routeTur = data?.findManyRoute[0]

  const bookRoom = (room, passengers) => {
    if (!loadingRoute) {
      updateOneRoute({
        variables: {
          where: { id },
          data: { bookedRoom: { create: { room, passengers: { createMany: { data: passengers } } } } },
        },
      })
    }
  }

  const deleteBookRoom = (roomId) => {
    if (!loadingRoute) {
      updateOneRoute({
        variables: {
          where: { id },
          data: { bookedRoom: { delete: { id: roomId } } },
        },
      })
    }
  }

  const arrivedHandler = (isArrived, passId) => {
    if (!loadingRoute) {
      updateOneRoute({
        variables: {
          where: { id },
          data: {
            ticket: {
              update: {
                where: { id: isBooked?.id },
                data: { passengers: { update: { where: { id: passId }, data: { arrived: { set: isArrived } } } } },
              },
            },
          },
        },
      })
    }
  }
  const arrivedAdminHandler = (isArrived, passId) => {
    if (!loadingRoute) {
      updateOneRoute({
        variables: {
          where: { id },
          data: {
            bookedRoom: {
              update: {
                where: { id: isBookedAdmin?.id },
                data: { passengers: { update: { where: { id: passId }, data: { arrived: { set: isArrived } } } } },
              },
            },
          },
        },
      })
    }
  }

  const onTapHandler = (number, isBooked, isBookedAdmin) => {
    if (!loadingRoute) {
      setNumber(number)
      setIsBooked(isBooked)
      setIsBookedAdmin(isBookedAdmin)
      modalToggle()
    }
  }

  const bookHandler = () => {
    bookRoom(number.toString(), passengers)
    setPassengers([])
    modalToggle()
  }
  return (
    <>
      <Top title='Каюты' action={<Spin size='large' spinning={loadingRoute} />} />
      <Tabs type='card'>
        <TabPane tab='Нижняя палуба' key='1'>
          <LegendWrap routeTur={routeTur}>
            <BotPlace onTap={onTapHandler} routeTur={routeTur} />
          </LegendWrap>
        </TabPane>
        <TabPane tab='Средняя палуба' key='2'>
          <LegendWrap routeTur={routeTur}>
            <MidPlace onTap={onTapHandler} routeTur={routeTur} />
          </LegendWrap>
        </TabPane>
        <TabPane tab='Солнечная палуба' key='3'>
          <LegendWrap routeTur={routeTur}>
            <TopPlace onTap={onTapHandler} routeTur={routeTur} />
          </LegendWrap>
        </TabPane>
      </Tabs>
      {isBooked ? (
        <Modal
          title={'Каюта ' + number}
          visible={isModalVisible}
          onCancel={modalToggle}
          footer={[
            <Button key='close' type='primary' onClick={modalToggle}>
              Закрыть
            </Button>,
          ]}
        >
          <h3>Пассажиры</h3>
          {isBooked?.passengers.map((item) => (
            <PassengerItem onChange={arrivedHandler} key={item.id} item={item} />
          ))}
        </Modal>
      ) : (
        <Modal
          title={'Каюта ' + number}
          visible={isModalVisible}
          onCancel={modalToggle}
          footer={[
            isBookedAdmin ? (
              <DeleteBookButton
                key='delete'
                title={`Снять броннирование с каюты ${number}?`}
                onConfirm={() => deleteBookRoom(isBookedAdmin.id)}
                closeModal={modalToggle}
              />
            ) : (
              <Button key='save' type='primary' disabled={!passengers[0]} onClick={bookHandler}>
                Забронировать
              </Button>
            ),
          ]}
        >
          <FormModal visible={modVis} setModVis={setModVis} passengers={passengers} setPass={setPassengers} />
          <h3 style={{ marginLeft: 5 }}>
            Пассажиры
            {!isBookedAdmin && (
              <Button type='primary' style={{ marginLeft: 5 }} ghost onClick={() => setModVis(true)}>
                {passengers[0] ? '+' : 'Добавить пассажира'}
              </Button>
            )}
          </h3>
          <div className='flex' style={{ flexWrap: 'wrap', marginBottom: 8 }}>
            {passengers.map((item, index) => (
              <PassengerButton
                key={item.documentNumber}
                name={item.name}
                onConfirm={() => {
                  let arr = [...passengers]
                  arr.splice(index, 1)
                  setPassengers(arr)
                }}
              />
            ))}
          </div>
          {isBookedAdmin?.passengers.map((item) => (
            <PassengerItem key={item.id} onChange={arrivedAdminHandler} item={item} />
          ))}
        </Modal>
      )}
    </>
  )
}
export default Tickets
