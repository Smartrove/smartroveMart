import React, { useState } from "react";
import styles from "./product.module.scss";
import Card from "../../card/Card";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";
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
const AddProduct = () => {
  const [product, setProduct] = useState({
    ...initialState,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //upload image to firebase bucket
  const handleImageChange = (e) => {
    var file = e.target?.files[0];
    setSelectedImage(file);
  };

  const addNewProduct = (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const storageRef = ref(
        storage,
        `/smartroveMart/${Date.now()}_${selectedImage?.name}`
      );
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct({ ...product, imageUrl: downloadURL });
            setUrl(downloadURL);
            console.log("downloadURL data", downloadURL);

            toast.success("image uploaded successfully");
            setProduct("");
          });
        }
      );
    } catch (err) {
      toast.error(err.code);
    }

    // console.log(product);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: progressBar === 100 && product.imageUrl,
        price: product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      setProgressBar(0);
      setProduct({ ...initialState });
      toast.success("product updated successfully");
      navigate("/admin/all-products");
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>Add New Product</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={addNewProduct}>
            <label htmlFor="">Product Name:</label>
            <input
              type="text"
              placeholder="product name"
              name="name"
              defaultValue={product.name}
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
                  defaultValue={url}
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
              defaultValue={product.price}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="">Product Category:</label>
            <select
              name="category"
              id="category"
              defaultValue={product.category}
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
              defaultValue={product.brand}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="">Product Description:</label>
            <textarea
              name="desc"
              onChange={(e) => handleInputChange(e)}
              required
              id=""
              cols="30"
              rows="10"
              defaultValue={product.desc}
            ></textarea>
            <button className="--btn --btn-primary">Save Product</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
