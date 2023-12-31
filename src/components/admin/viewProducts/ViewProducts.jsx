import React, { useEffect, useState } from "react";
import styles from "./viewProducts.module.scss";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useSelector } from "react-redux";
import Notiflix from "notiflix";
import { storeProducts } from "../../../redux/features/productSlice";
import Search from "../../search/Search";
import { filterBySearch } from "../../../redux/features/filterSlice";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const { data, isLoading, setIsLoading } = useFetchCollection("products");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const dispatch = useDispatch();
  const { filteredProduct } = useSelector((store) => store["filter"]);

  //get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const confirmDeleteProduct = (id, imageUrl) => {
    Notiflix.Confirm.show(
      "Delete Product?",
      "Do you want to delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageUrl);
      },
      function cancelCb() {
        toast.success("delete cancelled");
      },
      {
        width: "500px",
        borderRadius: "8px",
        titleColor: "orangered ",
        okButtonBackground: "orangered ",
        cssAnimationStyle: "zoom",
        // etc...
      }
    );
  };

  const deleteProduct = async (id, imageUrl) => {
    try {
      // setIsLoading(true);
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageUrl);

      await deleteObject(storageRef);

      toast.success("product deleted successfully");
      setIsLoading(false);
    } catch (error) {
      toast.error(error.code);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(
      filterBySearch({
        data,
        search,
      })
    );
  }, [search, dispatch, data]);

  useEffect(() => {
    dispatch(
      storeProducts({
        products: data,
      })
    );
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p>
            {" "}
            <b>{currentProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {data.length === 0 ? (
          <p>No product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts &&
                currentProducts?.map((item, index) => {
                  const { id, name, price, imageUrl, category } = item;

                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={imageUrl}
                          alt="name"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td>{`$${price}`}</td>
                      <td className={styles.icons}>
                        <Link to="/admin/edit-product" state={{ data: item }}>
                          <EditIcon
                            style={{ fontSize: "28px", color: "green" }}
                            // onClick={() => console.log(product)}
                          />
                        </Link>
                        &nbsp;
                        <DeleteIcon
                          style={{ fontSize: "28px", color: "red" }}
                          onClick={() => confirmDeleteProduct(id, imageUrl)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        <Pagination
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setProductsPerPage={setProductsPerPage}
          totalProducts={data.length}
        />
      </div>
    </>
  );
};

export default ViewProducts;
