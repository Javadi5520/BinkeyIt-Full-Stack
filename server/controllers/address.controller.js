import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const userId = req.userId; // middleware
    const { address_line, city, state, pinCode, country, mobile } = req.body;

    const createAddress = new AddressModel({
      address_line,
      city,
      state,
      country,
      pinCode,
      mobile,
      userId: userId,
    });
    const saveAddress = await createAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id,
      },
    });

    return res.json({
      message: "Address Created Successfully",
      error: false,
      success: true,
      data: saveAddress,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const getAddressController = async (req, res) => {
  try {
    const userId = req.userId; // middleware auth

    const data = await AddressModel.find({ userId: userId }).sort({ createdAt: -1 });

    return res.json({
      data: data,
      message: "List of address",
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

export const updateAddressController = async (req, res) => {
  try {
    const userId = req.userId; // middleware auth
    const { _id, address_line, city, state, country, pinCode, mobile } = req.body;

    const updateAddress = await AddressModel.updateOne(
      { _id: _id, userId: userId },
      {
        address_line,
        city,
        state,
        country,
        mobile,
        pinCode,
      }
    );

    return res.json({
      message: "Address Updated",
      error: false,
      success: true,
      data: updateAddress,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware
    const { _id } = req.body;

    const disableAddress = await AddressModel.updateOne(
      { _id: _id, userId },
      {
        status: false,
      }
    );

    return res.json({
      message: "Address remove",
      error: false,
      success: true,
      data: disableAddress,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
