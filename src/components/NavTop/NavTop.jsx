import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown, NavItem } from "react-bootstrap";
import LogOutButton from "../LogOutButton/LogOutButton";
import MenuIcon from "./menu-icon.png";
import QueueMusic from "@material-ui/icons/QueueMusic";

const TopNav = props => (
  <Navbar bg='dark' variant='dark' style={{ minWidth: 700 }}>
    <Navbar.Brand href='#home'>WPT?</Navbar.Brand>
    <Nav className='mr-auto'>
      <Nav.Link variant='dark' href='#home'>
        {props.user.id ? "Home" : "Login / Register"}
      </Nav.Link>
      {props.user.id && (
        <>
          <Nav.Link variant='dark' href='#/addShow'>
            Add Show
          </Nav.Link>
          <Nav.Link variant='dark' href='#/bands'>
            View/Add Bands
          </Nav.Link>
          <Nav.Link variant='dark' href='#/profile'>
            Profile
          </Nav.Link>
          <Nav.Link variant='dark' href='#/admin'>
            ADMIN
          </Nav.Link>
          <QueueMusic className='menuMusic' />
          <NavDropdown title='' id='nav-dropdown'>
            <NavDropdown.Item href='#/addShow'>Add Show</NavDropdown.Item>
            <NavDropdown.Item href='#/bands'>View/Add Bands</NavDropdown.Item>
            <NavDropdown.Item href='#/profile'>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#/admin'>Admin</NavDropdown.Item>
          </NavDropdown>
          <LogOutButton />
        </>
      )}
    </Nav>
  </Navbar>
);
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(TopNav);
