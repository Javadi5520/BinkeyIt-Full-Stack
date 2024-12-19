import ProductModel from "../models/product.model.js";

export const createProductController = async (req, res) => {
  try {
    const { name, image, category, subCategory, unit, stock, price, discount, description, more_details } = req.body;
    if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price || !description) {
      return res.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }
    const product = new ProductModel({ name, image, category, subCategory, unit, stock, price, discount, description, more_details });
    const saveProduct = await product.save();
    return res.json({
      message: "Product Create Successfully",
      data: saveProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    let { page, limit, search } = req.body;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const query = search
      ? {
          name: { $regex: search, $options: "i" },
          description: { $regex: search, $options: "i" },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([ProductModel.find(query).sort({ name: 1 }).skip(skip).limit(limit).populate("category subCategory"), ProductModel.countDocuments(query)]);

    return res.json({
      message: "Product data",
      error: false,
      success: true,
      totalCount: totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Provide category id",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.find({
      category: { $in: id },
    }).limit(15);

    return res.json({
      message: "Category Product List",
      data: product,
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const getProductByCategoryAndSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId, page, limit } = req.body;

    if (!categoryId || !subCategoryId) {
      return res.status(400).json({
        message: "Provide categoryId and subCategoryId",
        error: true,
        success: false,
      });
    }

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subCategoryId },
    };

    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([ProductModel.find(query).sort({ name: 1 }).skip(skip).limit(limit), ProductModel.countDocuments(query)]);

    return res.json({
      message: "Product list",
      data: data,
      totalCount: dataCount,
      page: page,
      limit: limit,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findOne({ _id: productId });

    return res.json({
      message: "product details",
      data: product,
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

//update product
export const updateProductDetails = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "provide product _id",
        error: true,
        success: false,
      });
    }

    const updateProduct = await ProductModel.updateOne(
      { _id: _id },
      {
        ...req.body,
      }
    );

    return res.json({
      message: "updated successfully",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

//delete product
export const deleteProductDetails = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "provide _id ",
        error: true,
        success: false,
      });
    }

    const deleteProduct = await ProductModel.deleteOne({ _id: _id });

    return res.json({
      message: "Delete successfully",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

//search product
export const searchProduct = async (req, res) => {
  try {
    let { search, page, limit } = req.body;

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }

    const query = search
      ? {
          name: { $regex: search, $options: "i" },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([ProductModel.find(query).sort({ name: 1 }).skip(skip).limit(limit).populate("category subCategory"), ProductModel.countDocuments(query)]);

    return res.json({
      message: "Product data",
      error: false,
      success: true,
      data: data,
      totalCount: dataCount,
      totalPage: Math.ceil(dataCount / limit),
      page: page,
      limit: limit,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};