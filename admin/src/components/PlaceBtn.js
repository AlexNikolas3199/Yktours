import styled from 'styled-components'

const PlaceBtn = ({ color, number, isBorderBt, isNone, onTap, routeTur }) => {
  const isBooked = routeTur.ticket.find((item) => item.room === `${number}`)
  const isBookedAdmin = routeTur.bookedRoom.find((item) => item.room === `${number}`)

  const styles = {
    wrapper: {
      backgroundColor: isBooked ? 'gray' : isBookedAdmin ? 'black' : color,
      borderBottomWidth: isBorderBt ? 1 : 0,
      zIndex: isNone ? -1 : 1,
    },
  }
  const handler = () => onTap(number, isBooked, isBookedAdmin)
  return (
    <Wrapper onClick={handler} style={styles.wrapper}>
      <Text>{number}</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 30.4px;
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  cursor: pointer;
`
const Text = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
`
export default PlaceBtn
