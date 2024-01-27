import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { saveProduct } from '../../../services/product';

function ProductForm(props) {
  const { openModal, setOpenModal, edit, setProductFeedback, setProduct, product: initialProduct, setRefresh } = props;
  const [product, setFormProduct] = useState(initialProduct);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleProductForm = e => {
    const { id, value } = e.target;
    setFormProduct(prevProduct => ({ ...prevProduct, [id]: value }));

    // Reset error state
    switch (e.target.id) {
      case 'name':
        setNameError(false);
        break;
      case 'category':
        setCategoryError(false);
        break;
      case 'description':
        setDescriptionError(false);
        break;
      case 'image':
        setImageError(false);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormProduct(initialProduct);

    setNameError(false);
    setCategoryError(false);
    setDescriptionError(false);
    setImageError(false);

  };

  const saveModalProduct = () => {
    // Perform validation before saving
    let isValid = true;

    if (product.name.trim() === '') {
      setNameError(true);
      isValid = false;
    }

    if (product.category.trim() === '') {
      setCategoryError(true);
      isValid = false;
    }

    if (product.description.trim() === '') {
      setDescriptionError(true);
      isValid = false;
    }

    if (product.image.trim() === '') {
      setImageError(true);
      isValid = false;
    }

    if (!isValid) {
      return; // Return early if there are validation errors
    }

    setRefresh(false);
    saveProduct({ product, edit })
      .then(response => {
        setProduct(edit ? product : { name: "", price: 0, description: "", category: "", image: "" });
        setProductFeedback({ show: true, status: true, infoText: response.data.infoMessage });
        setRefresh(true);
      })
      .catch(error => {
        setProductFeedback({ show: true, status: false, infoText: error.response.data.infoMessage });
      });
  };

  return (
    <Modal
      open={openModal}
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
          width: 300,
          bgcolor: 'background.paper',
          border: '0px solid #000',
          borderRadius: '5px',
          boxShadow: 24,
          p: 2,
        }}
      >
        <Stack spacing={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {edit ? "Edit Product" : "New Product"}
          </Typography>
          <TextField
            autoComplete="off"
            required
            id="name"
            label="Name"
            onChange={handleProductForm}
            value={product.name}
            error={nameError}
            helperText={nameError && "Name cannot be empty"}
          />
          <TextField
            autoComplete="off"
            required
            id="price"
            label="Price"
            type="number"
            onChange={handleProductForm}
            value={product.price}
          />
          <TextField
            autoComplete="off"
            required
            id="category"
            label="Category"
            onChange={handleProductForm}
            value={product.category}
            error={categoryError}
            helperText={categoryError && "Category cannot be empty"}
          />
          <TextField
            autoComplete="off"
            required
            id="description"
            label="Description"
            onChange={handleProductForm}
            value={product.description}
            error={descriptionError}
            helperText={descriptionError && "Description cannot be empty"}
          />
          <TextField
            autoComplete="off"
            required
            id="image"
            label="Image"
            onChange={handleProductForm}
            value={product.image}
            error={imageError}
            helperText={imageError && "Image cannot be empty"}
          />

          <Button
            color="success"
            onClick={saveModalProduct}
            variant="contained"
            id="button"
            sx={{
              backgroundColor: "#EE4D2D",
              "&:hover": {
                backgroundColor: "#EE4D2D",
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            id="button"
            color="error"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ProductForm;
