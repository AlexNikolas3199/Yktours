import { useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { FIND_MANY_PURCHASE, FIND_STATUS_PURCHASE } from '../gql/checkPayment/query'
import { CREATE_ONE_TICKET } from '../gql/checkPayment/mutation'
const Ticket = () => {
  const [orderStatus, setOrderStatus] = useState('Загрузка...')

  //Получение параметра orderId
  const getParams = () => {
    let result = null
    let tmp = []
    window.location.search
      .substring(1)
      .split('&')
      .forEach((item) => {
        tmp = item.split('=')
        if (tmp[0] === 'orderId') result = decodeURIComponent(tmp[1])
      })
    return result
  }
  const orderId = getParams()

  // функция создания билета
  const [create_ticket] = useMutation(CREATE_ONE_TICKET, {
    onCompleted: () => {
      setOrderStatus('Успех!\nВы успешно приобрели билет!')
    },
    onError: ({ message }) => {
      console.log(message)
      setOrderStatus('Неизвестный статус 4. Попробуйте снова.')
    },
  })

  // загрузка данных о билете
  const [getTicketInfo] = useLazyQuery(FIND_MANY_PURCHASE, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const ticketInfo = data?.findManyPurchase[0]?.ticketInfo
      create_ticket({
        variables: {
          data: {
            room: ticketInfo.room,
            passengers: { createMany: { data: ticketInfo.passengers } },
            user: { connect: { id: ticketInfo.userId } },
            route: { connect: { id: ticketInfo.routeId } },
            orderId: orderId,
            amount: parseInt(data?.findManyPurchase[0]?.amount),
          },
        },
      })
    },
    onError: (er) => {
      console.log(er)
      setOrderStatus('Неизвестный статус 3. Попробуйте снова.')
    },
    variables: { where: { orderId: { equals: orderId } } },
  })

  //функция вывода статуса и создание билета при успехе
  const showStatus = (status) => {
    switch (status) {
      case 2:
        getTicketInfo()
        break
      case 6:
        setOrderStatus('Платеж отклонен')
        break
      case 0:
        setOrderStatus('Ожидается оплата.')
        break
      case 3:
        setOrderStatus('Вы уже приобрели билет!')
        break
      default:
        setOrderStatus('Неизвестный статус 2. Попробуйте снова.')
    }
  }

  // загрузка статуса
  useQuery(FIND_STATUS_PURCHASE, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      showStatus(data?.findStatusPurchase?.OrderStatus)
    },
    onError: () => setOrderStatus('Неизвестный статус 1. Попробуйте снова.'),
    variables: { where: { orderId } },
  })

  return orderStatus
}

export default Ticket
