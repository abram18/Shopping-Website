import { Box, IconButton, Modal, Stack, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import cartStyle from './cart.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { getAllSale } from '../../../services/shoppingCart'
function Sales(props) {
    const { openSales, setOpenSales, refresh} = props;
    const [allSale, setAllSale] = useState([])
    const getAllsale = () => {
      getAllSale({ setAllSale })
    }
    

    // getAllsale()
    useEffect(() => {
      getAllsale()
      // let shouldUpdate = true
      //   if (shouldUpdate) {
      //     Promise.all([
      //       getAllSale()
      //     ])
      //   }
    }, [refresh])

    const handleCloseModal = () => {
        setOpenSales(false)
    };

    const getDate = date => {
      // console.log(allSale)
      // console.log(allSale.map(({ id }) => id))
      return new Date(date).toLocaleDateString()
  }
    return (
        <Modal
          open={openSales}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'background.paper',
              border: '0px solid #000',
              borderRadius: '5px',
              boxShadow: 24,
              p: 2,
            }}
          >
            <div style={{ maxHeight: '500px', overflow: 'auto' }}>
              <Stack spacing={1}>
                <Grid item xs={12} md={3} justifyContent='center'>
                  <IconButton sx={{ color: "#D0011B", }} onClick={handleCloseModal}>
                    <CloseIcon />
                  </IconButton>
                  <div className={cartStyle.prev_container}>
                    <Typography variant="span" color={'#1976d2'} fontSize={30} component="h2" fontWeight={500}>
                      All Purchases
                    </Typography>
                    <br></br>
                    {allSale.map(sale =>
                      <div className={cartStyle.prev_sales} key={sale.total}>
                        <Typography variant="span" fontSize={20} component="h2" fontWeight={500}>
                          Username: {(sale.client.username)}
                        </Typography>
                        <Typography variant="span" fontSize={23} component="h2" fontWeight={550}>
                          Date: {getDate(sale.date)}
                        </Typography>
                        <Typography mt={2} variant="span" fontSize={25} component="h2" fontWeight={600}>
                          Total:  ${sale.total.toFixed(2)}
                        </Typography>
                      </div>
                    )}
                    <br></br>
                    <br></br>
                  </div>
                </Grid>
              </Stack>
            </div>
          </Box>


        </Modal>
      )
}

export default Sales