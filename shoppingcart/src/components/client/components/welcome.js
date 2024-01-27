import { Box, IconButton, Modal, Stack, Grid, Typography } from '@mui/material';
import React from 'react';
import cartStyle from './cart.module.css';
import CloseIcon from '@mui/icons-material/Close';

function Welcome(props) {
  const { openWel, setOpenWel } = props;

  const handleCloseModal = () => {
    setOpenWel(false);
  };

  return (
    <Modal
      open={openWel}
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
          width: 380,
          height: 350,
          bgcolor: 'rgba(255, 255, 255, 0.85)', // Update the bgcolor to include opacity (e.g., rgba(255, 255, 255, 0.8))
          border: '1px solid white', // Update the border to 'none' to remove it
          borderRadius: '50%', // Update the borderRadius to '50%' to make it circular
          boxShadow: 'none', // Update the boxShadow to 'none' to remove it
          p: 2,
        }}
      >
        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
          <Stack spacing={1}>
            <Grid item xs={12} md={3} justifyContent="center">
              <IconButton sx={{ color: '#D0011B' }} onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
              <br />
              <br />
              <div className={cartStyle.prev_container}>
                <Typography variant="span" color={'#1976d2'} fontSize={30} component="h2" fontWeight={500}>
                  Welcome to
                </Typography>
                <img
                  src="https://www.freepnglogos.com/uploads/shopee-logo/logo-shopee-png-images-download-shopee-1.png"
                  alt="logo"
                  height={100}
                />
                <br />
                <br />
              </div>
            </Grid>
          </Stack>
        </div>
      </Box>
    </Modal>
  );
}

export default Welcome;
