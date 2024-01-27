import { Alert, Button, Chip, Grid, IconButton, Snackbar, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import detailStyle from './detail.module.css'
import cartStyle from './cart.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductCard from './productCard'
import { useParams } from 'react-router-dom';
import { getProductById, getRelatedProducts, getAllSale } from '../../../services/product'
import { getUserDetails } from '../../../services/auth'
import { addToCart } from '../../../services/shoppingCart'
import ProductForm from '../../client/components/productForm'

function Detail() {
  const [amountToAdd, setAmount] = useState(1)
  const { id, category } = useParams()
  const [product, setProduct] = useState(null)
  let [editProduct, setEditProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [roles, setUserRole] = useState([])
  const [allSale, setAllSale] = useState([])
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' })
  const [refresh, setRefresh] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [totalQuantitySold, setTotalQuantitySold] = useState(0) // New state for total quantity sold

  useEffect(() => {
    let shouldUpdate = true
    getUserDetails({ setUserRole })
    if (shouldUpdate) {
      Promise.all([
        getProductById(id.toString()),
        getAllSale(id.toString())
      ]).then(results => {
        const [first, second] = results
        setProduct(first)
        setEditProduct(first)
        setAllSale(second)

        // Calculate total quantity sold
        const totalQuantity = second.reduce((total, sale) => total + sale.amount, 0)
        setTotalQuantitySold(totalQuantity)
      })
    }
  }, [id, refresh])

  useEffect(() => {
    getRelatedProducts({ category, id }).then(third => {
      setRelatedProducts(third)
    })
  }, [category, id])

  const getDate = date => {
    return new Date(date).toLocaleDateString()
  }

  const add = () => {
    setAmount(amountToAdd + 1)
  }

  const subtract = () => {
    setAmount(amountToAdd - 1)
  }

  const addProduct = (productToAdd) => {
    setProductFeedback({ show: true, status: true, infoText: 'Adding product...' })
    addToCart({ amountToAdd, productToAdd })
  }

  const handleOpenModal = () => setOpenModal(true)

  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false });
  };

  return (
    <div className={detailStyle.container}>
      <Grid container spacing={1} pt={1}>
        <Grid item xs={12} md={6}>
          <Stack direction="column" alignItems="flex-start" className={detailStyle.stack} spacing={1}>
            <br></br>
            <Typography variant="span" fontSize={40} component="h2" fontWeight={600}>
              {product && product.name}
            </Typography>
            <Typography variant="span" fontSize={20} component="h2" fontWeight={400}>
              {product && product.description}
            </Typography>
            <br></br>
            <Typography variant="span" fontSize={30} component="h2" fontWeight={600}>
              ${product && product.price.toFixed(2)}
            </Typography>
            <br></br>
            {roles[0] === 3 ?
              <Button variant="contained" color='secondary' id="button" onClick={handleOpenModal}>
                Edit Product Details
              </Button>
              : null
            }
            <div className={detailStyle.img_container}>
              <img src={product && product.image} alt='product' className={detailStyle.img} />
            </div>
            <div className={detailStyle.info}>
              {roles[0] === 1 ?
                <div>
                  <div className={detailStyle.action}>
                    <IconButton sx={{ color: "#D0011B", }} aria-label="subtract from quantity" onClick={subtract} disabled={amountToAdd === 1}>
                      <RemoveIcon />
                    </IconButton>
                    <span className={detailStyle.amount_input}>{amountToAdd}</span>
                    <IconButton sx={{ color: "#D0011B", }} aria-label="add to quantity" onClick={add}>
                      <AddIcon />
                    </IconButton>
                  </div>
                  <Button variant="contained" className='add-to-cart' onClick={() => { addProduct(product) }}>
                    Add to Cart
                  </Button>
                </div>
                : null
              }
            </div>
          </Stack>
        </Grid>

        {roles[0] === 1 ?
          <Grid item xs={12} md={6} className={detailStyle.related_grid}>
            <br></br>
            <Chip sx={{ background: "#113366", color: "white" }} label="Related" className={detailStyle.chip} />
            <div className={detailStyle.related_container}>
              {relatedProducts.map(related =>
                <ProductCard product={related} key={related.id} />
              )}
            </div>
          </Grid>
          : null
        }
        {roles[0] === 3 ?
          <Grid item xs={12} md={6} justifyContent='center'>
            <div className={cartStyle.sale_container}>
              <br></br>
              <Typography variant="span" color={'#1976d2'} fontSize={30} component="h2" fontWeight={500}>
                All {product && product.name} Purchases
              </Typography>
              <Typography variant="span" fontSize={20} component="h2" fontWeight={500}>
                Total Quantity Sold: {totalQuantitySold} {/* Display the total quantity sold */}
              </Typography>
              {allSale.map(purchase =>
                <div className={cartStyle.prev_sales} key={purchase.amount}>
                  <Typography variant="span" fontSize={20} component="h2" fontWeight={500}>
                    Username: {(purchase.sale.client.username)}
                  </Typography>
                  <Typography variant="span" fontSize={20} component="h2" fontWeight={500}>
                    Quantity: {(purchase.amount)}
                  </Typography>
                  <Typography variant="span" fontSize={15} component="h2" fontWeight={550}>
                    Date: {getDate(purchase.sale.date)}
                  </Typography>
                </div>
              )}
            </div>
          </Grid>
          : null
        }
      </Grid>
      {showProductFeedback.show &&
        <Snackbar open={showProductFeedback.show} autoHideDuration={2000} onClose={closeProductFeedback}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
            {showProductFeedback.infoText}
          </Alert>
        </Snackbar>
      }
      {product &&
        <ProductForm
          setRefresh={setRefresh}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setProductFeedback={setProductFeedback}
          edit={true}
          setProduct={setEditProduct}
          product={editProduct}
        />
      }
    </div>
  )
}

export default Detail
