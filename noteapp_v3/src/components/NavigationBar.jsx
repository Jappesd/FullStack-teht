import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const NavigationBar = ({ user }) => {
  const padding = {
    color: "inherit",
    TextDecoration: "none",
    marginRight: "10px",
  }; // same as your style object

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ textTransform: "none" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/notes"
          sx={{ textTransform: "none" }}
        >
          Notes
        </Button>
        {!user && (
          <Button
            color="inherit"
            component={Link}
            to="/create-user"
            sx={{ textTransform: "none" }}
          >
            Create User
          </Button>
        )}

        <Button
          color="inherit"
          component={Link}
          to={user ? "#" : "/login"}
          sx={{ textTransform: "none", marginLeft: "auto" }}
        >
          {user ? <em>{user.name} logged in</em> : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

{
  /* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as="span">
            <Link style={padding} to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link style={padding} to="/notes">
              Notes
            </Link>
          </Nav.Link>
          {!user && (
            <Nav.Link as="span">
              <Link style={padding} to="/create-user">
                Create User
              </Link>
            </Nav.Link>
          )}
          <Nav.Link as="span">
            {user ? (
              <em>{user.name} logged in</em>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar> */
}
