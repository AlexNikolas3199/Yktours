import { useEffect, useState } from 'react'
import { Button, Form, Input, message, Dropdown, Menu, DatePicker, InputNumber } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import Top from '../../components/Top'
import { DELETE_ONE_ROUTE, FIND_MANY_ROUTE, UPDATE_ONE_ROUTE } from '../../gqls/tours'
import { UPLOAD } from '../../gqls/upload'
import moment from 'moment'
import { useUser } from '../../utils/hooks'
const { TextArea } = Input
const ships = [
  { id: 1, title: 'МИХАИЛ СВЕТЛОВ' },
  { id: 2, title: 'ДЕМЬЯН БЕДНЫЙ' },
]
const UpdateRoute = ({ match, history }) => {
  const { user, loading: loadingMe } = useUser()
  useEffect(() => {
    if (user.role !== 'ADMIN') history.goBack()
  })
  const { id } = match.params
  const [ship, setShip] = useState(null)
  const [uploadFile, setUploadFile] = useState(null)

  const { data, loading: loadingRoute } = useQuery(FIND_MANY_ROUTE, {
    fetchPolicy: 'network-only',
    variables: {
      where: { id: { equals: id } },
    },
    onCompleted: (data) => {
      setShip(data?.findManyRoute[0]?.ship)
    },
  })

  const goBack = () => history.goBack()
  const onError = (err) => {
    console.error(err)
    message.error('Не удалось выполнить запрос')
  }

  const [updateOneRoute, { loading }] = useMutation(UPDATE_ONE_ROUTE, {
    onCompleted: goBack,
    onError,
  })

  const [deleteOneRoute, { loading: loadingDel }] = useMutation(DELETE_ONE_ROUTE, {
    onCompleted: goBack,
    onError,
  })

  const [upload, { loading: loading1 }] = useMutation(UPLOAD)
  const getUpload = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) setUploadFile(file)
  }

  const handleUpdate = (v) => {
    const doUpdate = (upload) => {
      let routes = [v.route1 ? v.route1.trim() : r.route[0], v.route2 ? v.route2.trim() : r.route[1]]
      let routesEng = [
        v.route1Eng ? v.route1Eng.trim() : r.routeEng[0],
        v.route2Eng ? v.route2Eng.trim() : r.routeEng[1],
      ]
      const route3Trim = v.route3?.trim()
      const route3TrimEng = v.route3Eng?.trim()
      const getLastRoute = (routeTrim, myRoutes, rRoute) => {
        if (routeTrim) {
          const lastRoute = routeTrim !== '' ? routeTrim : r[rRoute][2]
          myRoutes.push(lastRoute)
        }
      }
      getLastRoute(route3Trim, routes, 'route')
      getLastRoute(route3TrimEng, routesEng, 'routeEng')
      const getVOrR = (val) => (v[val] ? v[val] : r[val])
      updateOneRoute({
        variables: {
          where: { id },
          data: {
            date: { set: getVOrR('date') },
            duration: { set: getVOrR('duration') },
            Desc: { set: getVOrR('Desc') },
            DescEng: { set: getVOrR('DescEng') },
            //window.location.origin + '/static/'
            image: { set: upload },
            ship: { set: ship },
            route: routes,
            routeEng: routesEng,
            food: [getVOrR('food1'), getVOrR('food2'), getVOrR('food3'), getVOrR('food4')],
            foodKids: [getVOrR('foodKids1'), getVOrR('foodKids2'), getVOrR('foodKids3'), getVOrR('foodKids4')],
            Pricing: [
              getVOrR('cabin4'),
              getVOrR('cabin3'),
              getVOrR('cabin2'),
              getVOrR('cabin1'),
              getVOrR('halflux'),
              getVOrR('lux'),
            ],
          },
        },
      })
    }
    if (uploadFile) {
      upload({
        variables: { upload: uploadFile },
        onCompleted: (data) => doUpdate('https://yaktors.ru/static/' + data.singleUpload),
        onError: (er) => {
          console.log(er)
        },
      })
    } else {
      doUpdate(r.image)
    }
  }

  const deleteRoute = () => {
    let isRight = window.confirm('Вы уверены, что хотите удалить данные?')
    if (isRight) deleteOneRoute({ variables: { where: { id } } })
  }

  const menu = (
    <Menu onClick={(e) => setShip(ships.find((i) => i.title === e?.key))}>
      {ships.map((item) => (
        <Menu.Item key={item?.title}>{item.title}</Menu.Item>
      ))}
    </Menu>
  )

  if (loadingRoute || loadingMe) return 'Загрузка...'
  const r = data?.findManyRoute[0]
  if (user.role !== 'ADMIN' || !r) return 'Ошибка'

  return (
    <>
      <Top title='Изменить круиз' />
      <div style={{ maxWidth: 500 }}>
        <Form
          initialValues={{
            route1: r.route[0],
            route2: r.route[1],
            route3: r.route[2],
            route1Eng: r.routeEng[0],
            route2Eng: r.routeEng[1],
            route3Eng: r.routeEng[2],
            date: moment(r.date),
            duration: r.duration,
            Desc: r.Desc,
            DescEng: r.DescEng,
            food1: r.food[0],
            food2: r.food[1],
            food3: r.food[2],
            food4: r.food[3],
            foodKids1: r.foodKids[0],
            foodKids2: r.foodKids[1],
            foodKids3: r.foodKids[2],
            foodKids4: r.foodKids[3],
            cabin4: r.Pricing[0],
            cabin3: r.Pricing[1],
            cabin2: r.Pricing[2],
            cabin1: r.Pricing[3],
            halflux: r.Pricing[4],
            lux: r.Pricing[5],
          }}
          onFinish={handleUpdate}
          layout='horizontal'
        >
          <div className='flex'>
            <Form.Item name='route1' label='Маршрут'>
              <Input />
            </Form.Item>
            <Form.Item name='route2'>
              <Input />
            </Form.Item>
            <Form.Item name='route3'>
              <Input />
            </Form.Item>
          </div>
          <div className='flex'>
            <Form.Item name='route1Eng' label='Маршрут (Eng)'>
              <Input />
            </Form.Item>
            <Form.Item name='route2Eng'>
              <Input />
            </Form.Item>
            <Form.Item name='route3Eng'>
              <Input />
            </Form.Item>
          </div>
          <Form.Item name='date' label='Дата отплытия'>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name='duration' label='Длительность'>
            <InputNumber min={1} max={2000} />
          </Form.Item>
          <Form.Item label='Судно'>
            <Dropdown disabled overlay={menu}>
              <Button>
                {ship ? ships[ship - 1].title : 'Выберите судно'} <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item name='Desc' label='Описание'>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name='DescEng' label='Описание (Eng)'>
            <TextArea rows={4} />
          </Form.Item>
          <h3>Цены на еду</h3>
          <Form.Item name='food1' label='Шведский стол'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='food2' label='Завтрак'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='food3' label='Обед'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='food4' label='Ужин'>
            <InputNumber min={1} />
          </Form.Item>
          <h3>Цены на еду для детей с 2-11 лет</h3>
          <Form.Item name='foodKids1' label='Шведский стол'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='foodKids2' label='Завтрак'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='foodKids3' label='Обед'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='foodKids4' label='Ужин'>
            <InputNumber min={1} />
          </Form.Item>
          <h3>Цены на каюты</h3>
          <Form.Item name='cabin4' label='4-местная каюта'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='cabin3' label='3-местная каюта'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='cabin2' label='2-местная каюта'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='cabin1' label='1-местная каюта'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='halflux' label='Полулюкс'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='lux' label='Люкс'>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label='Изображение'>
            <input onChange={getUpload} accept='.png, .jpg, .jpeg' name='myFile' type='file' />
          </Form.Item>
          <div style={{ marginBottom: 20 }}>
            <img src={r.image} style={{ width: '100%' }} alt='Изображение' />
            <div>
              <i>Текущее изображение</i>
            </div>
          </div>
          <Button htmlType='submit' loading={loading || loadingDel || loading1} type='primary'>
            Изменить
          </Button>
        </Form>
        <div style={{ paddingTop: 30 }}>
          <hr />
          <Button danger ghost loading={loading || loadingDel || loading1} onClick={deleteRoute} type='primary'>
            Удалить
          </Button>
        </div>
      </div>
    </>
  )
}

export default UpdateRoute
