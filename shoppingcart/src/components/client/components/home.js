import { Alert, Button, Divider, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import homeStyle from './home.module.css';
import ProductCard from './productCard';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { getUserDetails } from '../../../services/auth';
import ProductForm from '../../client/components/productForm';
import Welcome from '../../client/components/welcome';
import { getAllProducts, getBestProducts, deleteProduct} from '../../../services/product';
import { addToCart } from '../../../services/shoppingCart';
import Sales from '../../client/components/sales';
import SearchIcon from '@mui/icons-material/SearchTwoTone';
import CableIcon from '@mui/icons-material/Cable';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChairIcon from '@mui/icons-material/Chair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [roles, setUserRole] = useState([]);
  const [productList, setProductList] = useState([]);
  const [bestProductList, setBestProductList] = useState([]);
  const [product, setProduct] = useState({ name: "", price: 0, description: "", category: "", image: "" });
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openWel, setOpenWel] = useState(true);
  const [openSales, setOpenSales] = useState(false);
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' });
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getUserDetails({ setUserRole });
    getAllProducts({ setProductList });
    getBestProducts({ setBestProductList });
  }, [refresh]);

  const deleteItem = (itemId) => {
    deleteProduct({ itemId }).then(() => {
      getAllProducts({ setProductList });
      getBestProducts({ setBestProductList });
    });
  };

  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false, status: showProductFeedback.status });
  };

  const addProduct = (productToAdd, amountToAdd) => {
    setProductFeedback({ show: true, status: true, infoText: 'Product added to cart.' });
    addToCart({ amountToAdd, productToAdd });
  };

  const handleSearch = () => {
    const filteredProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleElectronicsSearch = () => {
    const filteredProducts = productList.filter((product) =>
      product.category.toLowerCase().includes('electronics'.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleFashionSearch = () => {
    const filteredProducts = productList.filter((product) =>
      product.category.toLowerCase().includes('fashion'.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleHomeSearch = () => {
    const filteredProducts = productList.filter((product) =>
      product.category.toLowerCase().includes('home'.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const imagesSeller = [
    'https://cf.shopee.sg/file/cce89b9b822809728a4546b028dff8b1',
    'https://cf.shopee.sg/file/4913d0bbee009ed822c8f29b539ab793',
    'https://cf.shopee.sg/file/deaec506c5f80394ae135530f26bfc3c',
    'https://cf.shopee.sg/file/9613665dc3e31c574131a04324ee5d3b',
    'https://cf.shopee.sg/file/cdb62c0cc4cb4f7680c4bb03d687ded0',
    'https://cf.shopee.sg/file/c3db4bd442e1573c8e862c0c3a1809c5',
    'https://cf.shopee.sg/file/7f32e5c1328aaf319c44337a33fe053d',
    'https://cf.shopee.sg/file/1748ea6f2317bcbf30746be5c8a93fd9',

    // Add more image URLs here
  ];

  const imagesBuyer = [
    'https://cf.shopee.ph/file/ph-50009109-0912a87e1a42db1fb45365b150b82155_xxhdpi',
    'https://cf.shopee.ph/file/ph-50009109-9b2d9dffdba347021999720304ff3aa2_xxhdpi',
    'https://sphereagency.com/wp-content/uploads/Shopee-banner-sphere-agency.jpeg',
    'https://cf.shopee.ph/file/ph-50009109-ddf61991cc6a50b06b02edff477e3043_xxhdpi',
    'https://cf.shopee.ph/file/ph-50009109-399dd08dc6fa48542767b9b885fa46da_xxhdpi',
    // Add more image URLs here
  ];

  const settings = {
    dots: true, // Display navigation dots
    infinite: true, // Enable infinite loop
    autoplay: true, // Auto play the carousel
    autoplaySpeed: 3000, // Delay between slides (in milliseconds)
    speed: 400, // Transition speed (in milliseconds)
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll per swipe
  };

  return (
    <div className={homeStyle.container}>
      {roles[0] === 3 ? (
            <div class={homeStyle.combheader}>
            <div className={homeStyle.sellersliderContainer}>
              <Slider {...settings}>
                {imagesSeller.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`${index + 1}`} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className={homeStyle.sellerContainer}>
            <img src='https://blog.boxme.asia/wp-content/uploads/2020/11/shopee-marketing-strategy-05-1.jpeg' alt='logo' height={50} />
            </div>
          </div>
       ) : null}

      {roles[0] === 1 ? (
            <div class={homeStyle.combheader}>
            <div className={homeStyle.sliderContainer}>
              <Slider {...settings}>
                {imagesBuyer.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`${index + 1}`} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className={homeStyle.saleContainer}>
            <img src='https://down-ph.img.susercontent.com/file/ph-50009109-d2134cb83c383bfdc3dbfc41c61823f9' alt='logo' height={50} />
            <img src='https://cf.shopee.ph/file/ph-50009109-29c20bc214f502bd6e8154c2693c255c_xxhdpi' alt='logo' height={50} />
            </div>
          </div>
      ) : null}
    
      <Welcome
        openWel={openWel}
        setOpenWel={setOpenWel}
      />
      {/* <div className={homeStyle.title_container}>
        <div>
          {roles[0] === 3 ? (
            <div><br></br></div>
          ) : null}
          {roles[0] === 3 ? (
            <Button variant="contained" color='success' id="button" className='add-new' onClick={handleOpenModal}>
              Add new product
            </Button>
          ) : null}
          &nbsp; &nbsp;
          {roles[0] === 3 ? (
            <Button variant="contained" color='primary' id="button" onClick={handleOpenSales}>
              View all purchases        
            </Button>
          ) : null}
          {roles[0] === 3 ? (
            <div><br></br></div>
          ) : null}
          
        </div>
      </div> */}
      <br></br>
      <br></br>
      <div className={homeStyle.best_container}>
      <Typography variant="span" fontSize={35} component="h2" ml={1} fontWeight={600}>
           Daily Discover
        </Typography>
        <Typography variant="span" fontSize={20} component="h2" ml={1} fontWeight={400}>
           Products with the best price!
        </Typography>
        <br></br>
      <Grid container spacing={3} className={homeStyle.grid} mb={2}>
        {bestProductList.map(productItem =>
          <Grid item xs={12} md={3} style={{ position: 'relative' }} key={productItem.id}>
            {roles[0] === 1  ? 
            <IconButton sx={{ color: "#D0011B", }} onClick={() => {
              addProduct(productItem, 1)
            }}
              className={homeStyle.add__button}>
              <AddShoppingCartIcon />
            </IconButton>
            : null
          }
            {roles[0] === 3  ? 
              <IconButton sx={{ color: "#D0011B", }} onClick={() => {
                deleteItem(productItem.id)
              }}
                className={homeStyle.add__button}>
                <DeleteIcon color='error' />
              </IconButton>
              : null
            }
            <ProductCard product={productItem} />
          </Grid>
        )}
      </Grid>
      </div>
      <Divider></Divider>
      <div className={homeStyle.title_container}>
      <div class={homeStyle.wrapper}>
        <div className={homeStyle.button_container}>
        <Typography variant="span" fontSize={30} component="h2" ml={1} fontWeight={600}>
          All products
        </Typography>
          
        </div>
        <div className={homeStyle.search_container}>
        <Typography variant="span" fontSize={25} component="h2" ml={1} fontWeight={600}>
          <input
            className='searchBar'
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products..."
            style={{ width: '400px' }} // Adjust the width as needed
          />
          &nbsp;
          <Button variant="contained" className='searchIcon' onClick={handleSearch}>
            <SearchIcon sx={{ color: "white" }} />
          </Button>
        </Typography>
        </div>
        </div>
        <style>
        {`
        .custom-button {
          background-color: white;
          color: black;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          box-shadow: none;
          border-radius: none;
          transition: background-color 0.3s;
        }
        
        .custom-button:hover {
          background-color: lightgray;
        }
        `}
      </style>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          <Button
            variant="contained"
            color="secondary"
            id="button"
            onClick={handleElectronicsSearch}
            className="custom-button"
          >
            <CableIcon sx={{ color: 'black' }} />
            <span style={{ marginTop: '0.5rem' }}>Electronics</span>
          </Button>
        </div>
        <div style={{ flex: '1' }}>
          <Button
            variant="contained"
            color="secondary"
            id="button"
            onClick={handleFashionSearch}
            className="custom-button"
          >
            <CheckroomIcon sx={{ color: 'black' }} />
            <span style={{ marginTop: '0.5rem' }}>Fashion</span>
          </Button>
        </div>
        <div style={{ flex: '1' }}>
          <Button
            variant="contained"
            color="secondary"
            id="button"
            onClick={handleHomeSearch}
            className="custom-button"
          >
            <ChairIcon sx={{ color: 'black' }} />
            <span style={{ marginTop: '0.5rem' }}>Home</span>
          </Button>
        </div>
        <div style={{ flex: '1' }}>
          <Button
            variant="contained"
            color="secondary"
            id="button"
            onClick={handleSearch}
            className="custom-button"
          >
            <InventoryIcon sx={{ color: 'black' }} />
            <span style={{ marginTop: '0.5rem' }}>All</span>
          </Button>
        </div>
      </div>

        <br></br>
      <Grid container spacing={3} className={homeStyle.grid}>
        {(searchResults.length > 0 ? searchResults : productList).map((productItem) => (
          <Grid item xs={12} md={3} style={{ position: 'relative' }} key={productItem.id}>
          {roles[0] === 1  ? 
          <IconButton aria-label="add to shopping cart" sx={{ color: "#D0011B", }} onClick={() => {
            addProduct(productItem, 1)
          }}
            className={homeStyle.add__button}>
            <AddShoppingCartIcon />
          </IconButton>
          : null
        }
          {roles[0] === 3  ? 
            <IconButton aria-label="delete" sx={{ color: "#D0011B", }} onClick={() => {
              deleteItem(productItem.id)
            }}
              className={homeStyle.add__button}>
              <DeleteIcon color='error' />
            </IconButton>
            : null
          }
          <ProductCard product={productItem} style={{backgroundColor: "#D0011B"}}/>
        </Grid>
        ))}
      </Grid>
      </div>
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
  );
}

export default Home;
