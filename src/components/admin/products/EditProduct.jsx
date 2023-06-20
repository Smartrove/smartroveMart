import React, { useEffect, useState, useRef } from "react";
import styles from "./product.module.scss";
import Card from "../../card/Card";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, db } from "../../../firebase/config";
import { toast } from "react-toastify";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import Loader from "../../loader/Loader";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageUrl: "",
  price: null,
  category: "",
  brand: "",
  desc: "",
};
const EditProduct = () => {
  const { id } = useParams();

  const { products } = useSelector((store) => store["product"]);

  const productEdit = products.filter((item) => item.id === id);
  // console.log(productEdit, typeof productEdit);

  const [product, setProduct] = useState({
    ...initialState,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const navigate = useNavigate();

  const { state } = useLocation();
  // console.log(state.data.imageUrl);

  const nameRef = useRef();
  const priceRef = useRef();
  const brandRef = useRef();
  const categoryRef = useRef();
  const descRef = useRef();
  const imageUrlRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //upload image to firebase bucket
  const handleImageChange = async (e) => {
    var file = e.target?.files[0];
    setSelectedImage(file);
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const storageRef = ref(
      storage,
      `/smartroveMart/${Date.now()}_${selectedImage?.name}`
    );

    try {
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressBar(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          toast.error(error.code);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setProduct({ ...product, imageUrl: downloadURL });
              setUploadComplete(true);
              toast.success("image uploaded successfully");
            })
            .catch((error) => {
              toast.error(error.code);
            });
        }
      );
    } catch (error) {
      toast.error(error.code);
    }
  };

  const addProductToCollection = async () => {
    try {
      // if (product.imageUrl !== state.data.imageUrl) {
      //   const storageRef = ref(storage, state.data.imageUrl);

      //   await deleteObject(storageRef);
      // }
      const docRef = await setDoc(doc(db, "products", state.data.id), {
        name: nameRef.current.value,
        imageUrl: imageUrlRef.current.value,
        price: priceRef.current.value,
        category: categoryRef.current.value,
        brand: brandRef.current.value,
        desc: descRef.current.value,
        createAt: state.data.createAt,
        editedAt: Timestamp.now().toDate(),
      });
      console.log(state.data.id);
    } catch (error) {
      toast.error(error.code);
    }
  };

  useEffect(() => {
    if (uploadComplete) {
      addProductToCollection();
      toast.success("product updated successfully");
      navigate("/admin/all-products");
    }
  }, [uploadComplete]);
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>Edit Product</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={updateProduct}>
            <label htmlFor="">Product Name:</label>
            <input
              type="text"
              placeholder="product name"
              name="name"
              ref={nameRef}
              defaultValue={state.data.name}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="">Product Image:</label>
            <Card cardClass={styles.group}>
              {progressBar === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${progressBar}%` }}
                  >
                    {progressBar <= 99
                      ? `uploading ${progressBar}`
                      : `uploading ${progressBar}% completed`}
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                placeholder="product image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {progressBar === 100 && (
                <input
                  type="text"
                  name="imageUrl"
                  ref={imageUrlRef}
                  defaultValue={product.imageUrl}
                  disabled
                  // required
                />
              )}
            </Card>
            <label htmlFor="">Product Price:</label>
            <input
              type="text"
              placeholder="product price"
              name="price"
              ref={priceRef}
              defaultValue={state.data.price}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="">Product Category:</label>
            <select
              name="category"
              ref={categoryRef}
              id="category"
              defaultValue={state.data.category}
              required
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                Choose Product Category
              </option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
            </select>

            <label htmlFor="">Product Brand:</label>
            <input
              type="text"
              placeholder="product brand"
              name="brand"
              ref={brandRef}
              defaultValue={state.data.brand}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="">Product Description:</label>
            <textarea
              name="desc"
              ref={descRef}
              onChange={(e) => handleInputChange(e)}
              required
              id=""
              cols="30"
              rows="10"
              defaultValue={state.data.desc}
            ></textarea>
            <button className="--btn --btn-primary">edit product</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditProduct;
