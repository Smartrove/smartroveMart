import React from "react";
import styles from "./chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Order Status Counts",
    },
  },
};

const Chart = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrdersCollection = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, "orders");
      const snapshot = await getDocs(collectionRef);

      let allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrder(allData);
    } catch (error) {
      toast.error(error.code);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOrdersCollection();
    setIsLoading(false);
  }, []);

  const newOrderArray = [];
  order.map((order) => {
    const { orderStatus } = order;
    newOrderArray.push(orderStatus);
  });

  const orderStatusCounts = (newOrderArr, value) => {
    return newOrderArr.filter((item) => item === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];
  const placed = orderStatusCounts(newOrderArray, q1);
  const processing = orderStatusCounts(newOrderArray, q2);
  const shipped = orderStatusCounts(newOrderArray, q3);
  const delivered = orderStatusCounts(newOrderArray, q4);
  const labels = ["Placed Order", "Processing", "Shipped", "Delivered"];
  const data = {
    labels,
    datasets: [
      {
        label: "Order counts",
        data: [placed, processing, delivered, shipped],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default Chart;
