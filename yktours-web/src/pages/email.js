import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UPDATE_USER } from '../gql/checkEmail/mutation'
const Email = () => {
  const { id } = useParams()
  const [orderStatus, setOrderStatus] = useState('Загрузка...')
  // функция создания билета
  const [update_user] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setOrderStatus('Успех!\nВы успешно верифицировали почту!')
    },
    onError: ({ message }) => {
      console.log(message)
      setOrderStatus('Неизвестный статус 1. Попробуйте снова.')
    },
  })
  useEffect(() => {
    update_user({
      variables: {
        where: { id },
        data: {
          emailVerification: { set: true },
        },
      },
    })
  }, [id, update_user])

  return orderStatus
}

export default Email
