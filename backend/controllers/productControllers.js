const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

// Create new product => api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  // console.log(req);
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products => api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
  const productCount = await Product.countDocuments(); //When we have to give all those products for the pagination in the frontend
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query.clone();
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
});

// Get all products (Admin) => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Get single product => api/v1/product/:id
exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));

    // return res.status(404).json({
    //   success: false,
    //   message: "Product not found",
    // });
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product => api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // return res.status(404).json({
    //   success: false,
    //   message: "Product not found",
    // });
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    // Delete the previous images
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }
    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product => api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // return res.status(404).json({
    //   success: false,
    //   message: "Product not found",
    // });
  }
  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }
  await Product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});

// Create new review => api/v1/review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Updating the existing review
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    // Add new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

// Get All the reviews for specific product => /api/v1/reviews

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviewas: product.reviews,
  });
});

// Delete the review of the product => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review.id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
