import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../functions/auth';
import { setAdmin, setLogins } from '../reducers/globalStates';
import { Menu,Icon,Dropdown } from "semantic-ui-react"
import Cookies from "universal-cookie";


export default function Navbar() {

    let cookie = new Cookies();
    let uname = cookie.get("username")
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState("home")
    const destroySession = async () => {
        let flag = await logout();
        if (flag === true) {
            dispatcher(setLogins(false, null), setAdmin(false));
            navigate("/expenses/authenticate");
        } else {
            return false;
        }
    };
    const handleItemClick = (e, { name }) => setActiveItem(name)
    return (
        <div>
            <Menu inverted fixed='top'>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    as={Link}
                    to="/"
                    onClick={handleItemClick}
                >
                    <Icon name="home" /> Home
                    </Menu.Item>   

                <Menu.Item
                    name='Transactions'
                    active={activeItem === 'Transactions'}
                    as={Link}
                    to="/Update"
                    onClick={handleItemClick}
                    > <Icon name="dollar" />
                    Transactions
                  </Menu.Item>
                  <Menu.Menu position="right">
        <Dropdown
          item
          trigger={
            <>
              <Icon name="user circle" />
              {uname}
            </>
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={destroySession}>
              <Icon name="sign-out" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>


                
                {/* <Menu.Item
                    name='Logout'
                    onClick={destroySession}
                    color="red"
                /> */}
            </Menu>
            {/* <Link to="/" className='btn btn-primary'>Add Transactions</Link>
            <Link to="/Update" className='btn btn-secondary  ml-5'>Show Transactions</Link>
            <Link onClick={destroySession} className='btn btn-danger  ml-5'>Logout</Link> */}
        </div>
    )
}
