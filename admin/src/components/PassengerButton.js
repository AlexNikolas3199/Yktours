import { Button, Popconfirm } from 'antd'
import { useState } from 'react'

const PassengerButton = ({ onConfirm, name }) => {
  const [vis, setVis] = useState(false)
  const visToggle = () => setVis(!vis)
  return (
    <Popconfirm
      title='Удалить пассажира?'
      visible={vis}
      onCancel={visToggle}
      onConfirm={() => {
        onConfirm()
        visToggle()
      }}
    >
      <Button style={{ margin: 5 }} type='primary' ghost onClick={visToggle}>
        {name}
      </Button>
    </Popconfirm>
  )
}
export default PassengerButton
