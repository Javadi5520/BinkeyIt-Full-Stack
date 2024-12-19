import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import Axios from "../utils/Axios";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { validURLConvert } from "../utils/validURLConvert";

export default function CategoryWiseProductDisplay({ id, name }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);

  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleRedirectProductListPage = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subcategory?.name)}-${subcategory?._id}`;

    return url;
  };

  const redirectURL = handleRedirectProductListPage();

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to={redirectURL} className="text-green-600 hover:text-green-400">
          See All
        </Link>
      </div>
      <div className="relative flex items-center ">
        <div ref={containerRef} className=" flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth">
          {loading &&
            loadingCardNumber.map((_, index) => {
              return <CardLoading key={"CategoryWiseProductDisplay123" + index} />;
            })}

          {data.map((p, index) => {
            return <CardProduct data={p} key={p._id + "CategoryWiseProductDisplay" + index} />;
          })}
        </div>
        <div className="w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between">
          <button onClick={handleScrollLeft} className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full">
            <FaAngleLeft />
          </button>
          <button onClick={handleScrollRight} className="z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full">
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}
