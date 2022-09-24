import styled from 'styled-components'
import TodayDate from './TodayDate'

const PassengerItem = ({ item }) => {
  return (
    <Item>
      <div>ФИО: {`${item.surname} ${item.name} ${item.patronymic}`}</div>
      <div>Дата рождения: {TodayDate(new Date(item.dateOfBirth), true)}</div>
      <div>
        {item.documentType}: {item.documentNumber}
      </div>
      <div>Питание: {item.food}</div>
    </Item>
  )
}
const Item = styled.div`
  border-top: 1px solid #959595;
  padding: 5px 0;
`
export default PassengerItem
