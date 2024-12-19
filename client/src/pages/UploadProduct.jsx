import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";

import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/UploadImage";
import ViewImage from "../components/ViewImage";
import AxiosToastError from "../utils/AxiosToastError";
import AddFieldComponent from "../components/AddFieldComponent";
import successAlert from "../utils/SuccessAlert";

export default function UploadProduct() {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [moreField, setMoreField] = useState([]);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handelUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;
    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return { ...prev };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return { ...prev };
    });
  };
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return { ...prev };
    });
  };

  const handleAddField = () => {
    setData((prev) => {
      return { ...prev, more_details: { ...prev.more_details, [fieldName]: "" } };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        successAlert(responseData.message);
        setData({ name: "", image: [], category: [], subCategory: [], unit: "", stock: "", price: "", discount: "", description: "", more_details: {} });
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Description */}
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>
          {/* Image */}
          <div>
            <p className="font-medium">Image</p>
            <div>
              <label htmlFor="productImage" className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer">
                <div className="text-center flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input id="productImage" type="file" className="hidden" onChange={handelUploadImage} />
              </label>
              {/* display uploaded image */}
              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div key={img + index} className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group">
                      <img src={img} alt={img} className="w-full h-full object-scale-down cursor-pointer" onClick={() => setViewImageURL(img)} />
                      <div onClick={() => handleDeleteImage(index)} className="absolute bottom-0 right-0 p-1 bg-red-500 rounded text-white hidden group-hover:block cursor-pointer">
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Category */}
          <div className="grid gap-1">
            <label className="font-medium">Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);
                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory.map((c, index) => {
                  return (
                    <option value={c?._id} key={index}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div key={c._id + index + "productSection"} className="text-sm flex items-center gap-1 bg-blue-50 mt-1 ">
                      <p>{c.name}</p>
                      <div onClick={() => handleRemoveCategory(index)}>
                        <IoClose size={20} className="text-red-500 hover:text-red-600 cursor-pointer" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Sub Category */}
          <div className="grid gap-1">
            <label className="font-medium">Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded "
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find((el) => el._id === value);
                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value={""} className="text-neutral-600">
                  Select Sub Category
                </option>
                {allSubCategory.map((c, index) => {
                  return (
                    <option value={c?._id} key={index}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div key={c._id + index + "subCategorySection"} className="text-sm flex items-center gap-1 bg-blue-50 mt-1 ">
                      <p>{c.name}</p>
                      <div onClick={() => handleRemoveSubCategory(index)}>
                        <IoClose size={20} className="text-red-500 hover:text-red-600 cursor-pointer" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Unit */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="unit">
              Unit
            </label>
            <input
              id="unit"
              type="text"
              placeholder="Enter product unit"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Stock */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="stock">
              Number of Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter product stock"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Price */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter product price"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Discount */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="discount">
              Discount
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Enter product discount"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Add more field */}
          {Object?.keys(data.more_details).map((k, index) => {
            return (
              <div key={index} className="grid gap-1">
                <label className="font-medium" htmlFor={k}>
                  {k}
                </label>
                <input
                  id={k}
                  type="text"
                  value={data.more_details[k]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((prev) => {
                      return {
                        ...prev,
                        more_details: {
                          ...prev.more_details,
                          [k]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
            );
          })}

          <div
            onClick={() => setOpenAddField(true)}
            className="inline-block hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-black cursor-pointer rounded"
          >
            Add Fields
          </div>
          <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold">Submit</button>
        </form>
      </div>
      {viewImageURL && <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />}
      {openAddField && <AddFieldComponent close={() => setOpenAddField(false)} value={fieldName} onChange={(e) => setFieldName(e.target.value)} submit={handleAddField} />}
    </section>
  );
}
