import styled from 'styled-components'
import { rooms } from '../utils/rooms'
import TodayDate from './TodayDate'

const Legend = ({ children, routeTur }) => {
  return (
    <Flex>
      {children}
      <div style={{ marginLeft: 40, marginTop: 20 }}>
        <div>
          Судно: <b>{routeTur.ship === 1 ? 'МИХАИЛ СВЕТЛОВ' : 'ДЕМЬЯН БЕДНЫЙ'}</b>
        </div>
        <div>
          Маршрут: <b>{routeTur.route.join(' → ')}</b>
        </div>
        <div>
          Дата отплытия: <b>{TodayDate(new Date(routeTur.date))}</b>
        </div>
        <div>
          Длительность: <b>{routeTur.duration + 'ч.'}</b>
        </div>
        <div style={{ paddingTop: 10, maxWidth: 410 }}>
          {rooms.map((item) =>
            (routeTur.ship === 1 && item.color !== '#27E3C2') || (routeTur.ship === 2 && item.color !== '#F1C84C') ? (
              <Wrapper key={item.color}>
                <Round style={{ backgroundColor: item.color }} />
                <div style={{ flex: 1 }}>
                  <H>{item.h}</H>
                  <H>{item.indx >= 0 ? routeTur.Pricing[item.indx] + ' ₽' : null}</H>
                  {item.p ? <div>*{item.p}</div> : null}
                  {item.p1 ? <div>*{item.p1}</div> : null}
                </div>
              </Wrapper>
            ) : null
          )}
        </div>
      </div>
    </Flex>
  )
}
const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 15px;
`
const Round = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 15px;
  background-color: gray;
`
const H = styled.div`
  font-weight: bold;
  font-size: 16px;
`

export default Legend
