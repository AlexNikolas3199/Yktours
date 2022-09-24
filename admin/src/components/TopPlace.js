import sundeck from '../img/sundeck.png'
import PlaceBtn from './PlaceBtn'
const TopPlace = ({ routeTur, onTap }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: 180, position: 'relative' }}>
      <img style={{ width: '100%' }} src={sundeck} alt='' />
      <div style={{ position: 'absolute', top: 378, left: 96 }}>
        <PlaceBtn routeTur={routeTur} number={308} color='#FF5757' onTap={onTap} isBorderBt />
      </div>
    </div>
  </div>
)
export default TopPlace
