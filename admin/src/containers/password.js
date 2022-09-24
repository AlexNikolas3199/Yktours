import styled from 'styled-components'
import { Form as AntForm, Input, Button, message } from 'antd'
import { useMutation } from '@apollo/client'

import { UPDATE_PASSWORD_ADMIN } from '../gqls/admin'
import Top from '../components/Top'

const rules = {
    required: {
        required: true,
        message: 'Обязательное поле'
    }   
}

const Form = styled(AntForm)`
    max-width: 400px;
`

const Password = ({ history }) => {
    const [updatePasswordAdmin, { loading }] = useMutation(UPDATE_PASSWORD_ADMIN, {
        onCompleted: () => {
            history.goBack()
            message.success('Пароль успешно изменен')
        },
        onError: (e) => {
            console.error(e)
            message.error('Не удалось выполнить запрос')
        }
    })

    const onSubmitForm = (values) => {
        updatePasswordAdmin({
            variables: {
                data: {
                    newPassword: values.newPassword,
                    currentPassword: values.currentPassword
                }
            }
        })
    }

    return (
        <>
            <Top title="Изменить пароль" />
            <Form onFinish={onSubmitForm} layout="vertical" name="change-password">
                <Form.Item label="Текущий пароль" name="currentPassword" rules={[rules.required]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Новый пароль" name="newPassword" rules={[rules.required]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    rules={[
                        rules.required,
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject('Новый пароль не совпадает')
                            }
                        })
                    ]}
                    dependencies={['newPassword']}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} htmlType="submit" type="primary">
                        Изменить
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Password
