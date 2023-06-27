import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const useFetchDoc = ({ collectionName, documentId }) => {
  const [document, setDocument] = useState(null);

  const getDocument = async () => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        const productObject = {
          id: documentId,
          ...docSnap.data(),
        };

        setDocument(productObject);
      } else {
        toast.error("No document found");
      }
    } catch (error) {
      toast.error(error.code);
    }
  };

  useEffect(() => {
    getDocument();
  }, [collectionName, documentId]);

  return { document };
};

export default useFetchDoc;
