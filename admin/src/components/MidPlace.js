import middeck from '../img/middeck.png'
import PlaceBtn from './PlaceBtn'
const MidPlace = ({ routeTur, onTap }) => {
  const SpecialColor = routeTur.ship === 1 ? '#F1C84C' : '#7FFF6A'
  const GetPlaceBtns = (a, b) => {
    let content = []
    for (let i = a; i <= b; i++) {
      content.push(
        <PlaceBtn
          key={`${i}`}
          onTap={onTap}
          number={i}
          color={
            routeTur.ship === 1 && i === 209
              ? '#8BF8FF'
              : routeTur.ship === 2 && i === 209
              ? '#27E3C2'
              : i > 201 && i < 211
              ? SpecialColor
              : i > 210
              ? '#8BF8FF'
              : '#FF5757'
          }
          isBorderBt={i === 209 || i === 210 || i === 234 || i === 233}
          routeTur={routeTur}
        />
      )
    }
    return content
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 180, position: 'relative' }}>
        <img style={{ width: '100%' }} src={middeck} alt='' />
        <div style={{ position: 'absolute', top: 275, left: 0 }}>
          <div style={styles.flexWrap}>{GetPlaceBtns(200, 210)}</div>
          <div style={styles.flexWrap1}>{GetPlaceBtns(211, 234)}</div>
        </div>
      </div>
    </div>
  )
}
const styles = {
  flexWrap: {
    marginRight: 1,
    padding: 31,
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flexWrap1: {
    marginRight: 1,
    padding: 31,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}
export default MidPlace
