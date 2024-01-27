import { Alert, Snackbar, Button, Box, List, IconButton, Badge, Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import React, { useEffect, useState } from 'react'
import headerStyles from './header.module.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductForm from '../../client/components/productForm';
import Sales from '../../client/components/sales';
import { useNavigate } from 'react-router-dom';
import { logout, getUserDetails } from '../../../services/auth'


function Header() {
  let navigate = useNavigate()
  const [roles, setUserRole] = useState([]);
  let [number, setNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [product, setProduct] = useState({ name: "", price: 0, description: "", category: "", image: "" });
  const [refresh, setRefresh] = useState(false);
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' });
  const [state, setState] = React.useState({
    left: false
  });


  useEffect(() => {
    getUserDetails({ setUserRole });
    let shouldUpdate = true
    const getUserCart = () => {
      const item = localStorage.getItem('number')
      if (item) {
        setNumber(parseInt(item))
      }
    }
    if (shouldUpdate) {
      getUserCart()
    }
    window.addEventListener('storage', getUserCart)
    return () => {
      shouldUpdate = false;
    }
  }, [number, refresh])
  const closeSession = () => {
    logout({ navigate })
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleOpenSales = () => setOpenSales(true);

  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false, status: showProductFeedback.status });
  };
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        // width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        backgroundColor: '#EE4D2D', // Set background color to orange
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="Add new product" disablePadding>
        <ListItemButton onClick={handleOpenModal}>
            <ListItemIcon>
            <IconButton aria-label="delete" href='/store/cart' sx={{ color: "white", }} size="large">
              <Badge badgeContent={number} sx={{"& .MuiBadge-badge": {color: "#EE4D2D", backgroundColor: "white"}}}>
                <AddBusinessIcon />
              </Badge>
            </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white', // Set text color to white
                    fontWeight: 'bold', // Set font weight to bold
                  }}
                >
                  Add new product
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem key="View All Purchases" disablePadding>
          <ListItemButton onClick={handleOpenSales}>
            <ListItemIcon>
            <IconButton aria-label="delete" href='/store/cart' sx={{ color: "white", }} size="large">
              <Badge badgeContent={number} sx={{"& .MuiBadge-badge": {color: "#EE4D2D", backgroundColor: "white"}}}>
                  <StoreIcon />
              </Badge>
            </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white', // Set text color to white
                    fontWeight: 'bold', // Set font weight to bold
                  }}
                >
                  View All Purchases
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  
  
  
  return (
    <div className={headerStyles.header_container}>
      <a className={headerStyles.logo_container} href="/store">
        <img src='https://freelogopng.com/images/all_img/1656181621shopee-logo-white.png' alt='logo' height={50} />
      </a>
      {roles[0] === 3 ? (
          <Typography variant="span" fontSize={30} sx={{ color: "white", }} component="h2" ml={1} fontWeight={300}>
            Seller Center
          </Typography>
          ) : null}
      <nav className={headerStyles.actions}>

        {roles[0] === 1  ?
        <IconButton aria-label="delete" href='/store/cart' sx={{ color: "white", }} size="large">
        <Badge badgeContent={number} sx={{"& .MuiBadge-badge": {color: "#EE4D2D", backgroundColor: "white"}}}>
          <ShoppingCartOutlinedIcon  />
        </Badge>
      </IconButton> : null}

      {roles[0] === 3 ?
        <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} sx={{color: 'white',  fontWeight: 'bold', }}>
                Menu
              </Button>
              <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: '#EE4D2D', // Set background color to orange
              },
            }}
          >
            {list(anchor)}
          </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
      : null}

        <IconButton aria-label="delete" size="large" sx={{ color: "white", }}onClick={closeSession}>
        <Typography variant="span" fontSize={20} sx={{ color: "white", }} component="h2" ml={1} fontWeight={500}>
            Log Out
          </Typography>&nbsp;&nbsp;<LogoutIcon />
        </IconButton>
      </nav>
      <Snackbar
        open={showProductFeedback.show}
        autoHideDuration={2000}
        onClose={closeProductFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
          {showProductFeedback.infoText}
        </Alert>
      </Snackbar>
      <ProductForm
        setRefresh={setRefresh}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setProductFeedback={setProductFeedback}
        edit={false}
        setProduct={setProduct}
        product={product}
      />
      <Sales
        setRefresh={setRefresh}
        openSales={openSales}
        setOpenSales={setOpenSales}
        edit={false}
        setProduct={setProduct}
        product={product}
      />
    </div>
  )
}

export default Header