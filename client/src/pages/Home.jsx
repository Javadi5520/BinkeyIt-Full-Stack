import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { validURLConvert } from "../utils/validURLConvert";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

export default function Home() {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListPage = (id, cat) => {
    const subCategory = subCategoryData.find((sub) => {
      const filterData = sub.category?.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(subCategory.name)}-${subCategory._id}`;

    navigate(url);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
          <img src={banner} className="w-full h-full hidden lg:block" alt="banner" />
          <img src={bannerMobile} className="w-full h-full lg:hidden" alt="banner" />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div key={index + "loadingCategory"} className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div key={cat._id + "displayCategory"} className="w-full h-full" onClick={() => handleRedirectProductListPage(cat._id, cat.name)}>
                  <div>
                    <img src={cat.image} className="w-full h-full object-scale-down cursor-pointer hover:border hover:border-red-500 transition-all duration-105 rounded" />
                  </div>
                </div>
              );
            })}
      </div>

      {/***display category product */}
      {categoryData?.slice(0, 5).map((c, index) => {
        return <CategoryWiseProductDisplay key={c?._id + "CategoryWiseProduct"} id={c?._id} name={c?.name} />;
      })}
    </section>
  );
}