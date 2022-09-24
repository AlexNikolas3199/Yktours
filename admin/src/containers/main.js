import Top from '../components/Top'
import LabeledValue from '../components/LabeledValue'
import { useUser } from '../utils/hooks'

const Main = () => {
  const { user } = useUser()
  return (
    <>
      <Top title="Главная" helpText={'Панель управления'} />
      <LabeledValue label="Электронный адрес" value={user?.email} />
    </>
  )
}

export default Main
