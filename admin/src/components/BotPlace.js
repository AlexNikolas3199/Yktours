import botdeck from '../img/botdeck.png'
import PlaceBtn from './PlaceBtn'
const BotPlace = ({ routeTur, onTap }) => {
  const GetPlaceBtns = (a, b) => {
    let content = []
    for (let i = a; i <= b; i++) {
      content.push(
        <PlaceBtn
          key={`${i}`}
          number={i}
          onTap={onTap}
          isBorderBt={i === 112 || i === 113 || i === 137 || i === 132}
          isNone={i === 134 || i === 136}
          color={
            routeTur.ship === 2 && (i === 110 || i === 112)
              ? '#27E3C2'
              : i > 105 && i < 114
              ? '#7FFF6A'
              : i > 113
              ? '#ffa500'
              : '#eec1ee'
          }
          routeTur={routeTur}
        />
      )
      if (i === 113) content.push(<div key={'z'} style={{ width: 120, paddingTop: 14 }} />)
    }
    return content
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 180, position: 'relative' }}>
        <img style={{ width: '100%' }} src={botdeck} alt='' />
        <div style={{ position: 'absolute', top: 222, left: 0 }}>
          <div style={{ padding: 5, marginRight: 1 }}>
            <div style={styles.flexWrap}>{GetPlaceBtns(100, 113)}</div>
          </div>
          <div style={styles.flexWrap}>{GetPlaceBtns(114, 137)}</div>
        </div>
      </div>
    </div>
  )
}
const styles = {
  flexWrap: {
    marginLeft: 4,
    padding: 16,
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}
export default BotPlace
