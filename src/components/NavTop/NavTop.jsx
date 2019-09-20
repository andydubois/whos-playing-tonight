import React from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown} from "react-bootstrap";
import LogOutButton from "../LogOutButton/LogOutButton";

const TopNav = props => (
  <Navbar bg='dark' variant='dark' style={{ minWidth: 375 }}>
    <Navbar.Brand href='#home'>WPT?</Navbar.Brand>
    <Nav className='mr-auto'>
      <Nav.Link variant='dark' href='#home'>
        {props.user.id ? "Home" : "Login / Register"}
      </Nav.Link>
      {props.user.id && (
        <>
          {/* <Nav.Link variant='dark' href='#/addShow'>
            Add Show
          </Nav.Link>
          <Nav.Link variant='dark' href='#/bands'>
            View/Add Bands
          </Nav.Link>
          <Nav.Link variant='dark' href='#/profile'>
            Profile
          </Nav.Link>
          {props.user.clearance > 1 ? (
            <Nav.Link variant='dark' href='#/admin'>
              ADMIN
            </Nav.Link>
          ) : (
            ""
          )} */}

          {/* <QueueMusic className='menuMusic' /> */}
          <NavDropdown title='Menu' id='nav-dropdown'>
            <NavDropdown.Item href='#/addShow'>Add Show</NavDropdown.Item>
            <NavDropdown.Item href='#/bands'>View/Add Bands</NavDropdown.Item>
            <NavDropdown.Item href='#/profile'>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            {props.user.clearance > 1 ? (
              <NavDropdown.Item href='#/admin'>Admin</NavDropdown.Item>
            ) : (
              ""
            )}
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
