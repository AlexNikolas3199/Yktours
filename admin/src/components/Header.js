import styled from 'styled-components'
import { Layout, Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

const { Header: AntHeader } = Layout

const HeaderContainer = styled(AntHeader)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 16px;
    padding-left: 0;
    background: #fff;

    .name {
        font-size: 14px;
        margin-right: 15px;
    }
`

const Header = ({ user }) => {
    const handleLogout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <HeaderContainer>
            <div className="name">{user.name +" " + user.surname}</div>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                Выйти
            </Button>
        </HeaderContainer>
    )
}

export default Header
