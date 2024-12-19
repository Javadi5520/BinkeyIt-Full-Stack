import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import ProductCardAdmin from "../components/ProductCardAdmin";

export default function ProductAdmin () {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200">
          <IoSearchOutline size={25} />
          <input type="text" placeholder="Search product here ..." className="h-full w-full  outline-none bg-transparent" value={search} onChange={handleOnChange} />
        </div>
      </div>

      {loading && <Loading />}

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => {
              return <ProductCardAdmin data={p} fetchProductData={fetchProductData} key={index} />;
            })}
          </div>
        </div>

        <div className="flex justify-between my-4">
          <button onClick={handlePrevious} className={`${page !== 1 ? `enabled:true border-primary-200 hover:bg-primary-200 cursor-pointer` : `enabled:false cursor-default`} border  px-4 py-1 `}>
            Previous
          </button>
          <button className="w-full cursor-default">
            {page}/{totalPageCount}
          </button>
          <button
            onClick={handleNext}
            className={`${page !== totalPageCount ? `enabled:true border-primary-200 hover:bg-primary-200 cursor-pointer` : `enabled:false cursor-default`} border  px-4 py-1 `}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};