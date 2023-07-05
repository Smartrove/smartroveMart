import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProductsCollection = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);

      const allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(allData);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.code);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductsCollection();
  }, []);
  return { data, isLoading, setIsLoading };
};

export default useFetchCollection;
