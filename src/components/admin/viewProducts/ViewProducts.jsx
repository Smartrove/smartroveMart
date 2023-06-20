import React, { useEffect, useState } from "react";
import styles from "./viewProducts.module.scss";
import { toast } from "react-toastify";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch } from "react-redux";

import Notiflix from "notiflix";
import { storeProducts } from "../../../redux/features/productSlice";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      setIsLoading(true);
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
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const collectionRef = collection(db, "products");
        const snapshot = await getDocs(collectionRef);

        // console.log("snapshot data:", snapshot);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(allProducts);
        dispatch(
          storeProducts({
            products: allProducts,
          })
        );
        setIsLoading(false);
      } catch (error) {
        toast.error(error.code);
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
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
              {products &&
                products?.map((product, index) => {
                  const { id, name, price, imageUrl, category } = product;

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
                        <Link
                          to="/admin/edit-product"
                          state={{ data: product }}
                        >
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
      </div>
    </>
  );
};

export default ViewProducts;
