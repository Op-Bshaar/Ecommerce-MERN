import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/photo_2024-07-29_16-15-07.jpg";
import { useAuth } from "../context/Auth/AuthContext";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "../context/Auth/cartContext";

const settings = ["Profile", "Dashboard"];

function Navbar() {
  const navigate = useNavigate();
  const{CartItems} = useCart()
  const { username, isAuthenticated, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlelogin = () => {
    navigate("/login");
  };

  const handlelogout = () => {
    logout();
    handleCloseUserMenu();
    navigate("/");
  };
  const handleorders = () => {
    handleCloseUserMenu();
    navigate("/order");
  };
  const handelCart = () => {
    navigate("/cart");
  };
  const any = ()=>{
    navigate('/')
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: "#FFDC2E" }}>
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1,cursor:"pointer" }} onClick = {any}>
            <img src={logo} style={{ width: 70, height: 40 }} alt="Logo" />
            <Typography
              sx={{ color: "white", ml: 2, fontSize: 60, fontWeight: "700" }}
            >
              S
            </Typography>
            <span style={{ color: "gray", fontSize: 30, fontWeight: "700" }}>
              tore
            </span>
          </Box>
          <IconButton
            aria-label="cart"
            sx={{ marginRight: 30 }}
            onClick={handelCart}
          >
            <Badge badgeContent={CartItems.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <>
                  <Typography>{username}</Typography>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar
                        alt={username || ""}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                </>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                   <MenuItem>
                    <Typography textAlign="center" onClick={handleorders}>
                       Orders
                    </Typography>
                  </MenuItem>
                  
                  <MenuItem>
                    <Typography textAlign="center" onClick={handlelogout}>
                      logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#030450" }}
                onClick={handlelogin}
              >
                login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
