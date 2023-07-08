import React, { useEffect, useState } from "react";
import styles from "./product.module.scss";
import Card from "../../card/Card";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
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
const AddProduct = () => {
  const { id } = useParams();

  const { products } = useSelector((store) => store["product"]);

  const productEdit = products.filter((item) => item.id === id);
  // console.log(productEdit, typeof productEdit);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);

    return newState;
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const navigate = useNavigate();

  function detectForm(id, functionOne, functionTwo) {
    if (id === "add") {
      return functionOne;
    }
    return functionTwo;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //upload image to firebase bucket
  const handleImageChange = async (e) => {
    var file = e.target?.files[0];
    setSelectedImage(file);
  };


  const addNewProduct = async (e) => {
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
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createAt: Timestamp.now().toDate(),
      });
    } catch (error) {
      toast.error(error.code);
    }
  };

  useEffect(() => {
    if (uploadComplete) {
      addProductToCollection();
      setIsLoading(false);
      toast.success("product updated successfully");
      navigate("/admin/all-products");
    }
  }, [uploadComplete]);
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
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
            <button className="--btn --btn-primary">
              {detectForm(id, "save product", "edit product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
