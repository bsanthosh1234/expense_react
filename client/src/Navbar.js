import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar =()=>
{
    return(
        <Menu secondary style={{backgroundColor:"grey"}}>
            <Menu.Item as={Link} to="/">
                Home
            </Menu.Item>
            <Menu.Item as={Link} to="/av">
                AddTransaction
            </Menu.Item>
            <Menu.Item as={Link} to="/xss">
                showTransactions
            </Menu.Item>
        </Menu>
        
    )
}

export default Navbar;