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

const plugins = [
  {
    beforeDraw: function (chart) {
      const ctx = chart.ctx;
      const canvas = chart.canvas;
      const chartArea = chart.chartArea;

      // Chart background
      var gradientBack = canvas
        .getContext("2d")
        .createLinearGradient(0, 250, 0, 0);
      gradientBack.addColorStop(0, "rgba(213,235,248,1)");
      gradientBack.addColorStop(0.16, "rgba(213,235,248,1)");
      gradientBack.addColorStop(0.17, "rgba(226,245,234,1)");
      gradientBack.addColorStop(0.25, "rgba(226,245,234,1)");
      gradientBack.addColorStop(0.26, "rgba(252,244,219,1)");
      gradientBack.addColorStop(0.5, "rgba(252,244,219,1)");
      gradientBack.addColorStop(0.51, "rgba(251,221,221,1)");
      gradientBack.addColorStop(1, "rgba(251,221,221,1)");

      ctx.fillStyle = gradientBack;
      ctx.fillRect(
        chartArea.left,
        chartArea.bottom,
        chartArea.right - chartArea.left,
        chartArea.top - chartArea.bottom
      );
    },
  },
];

export const options = {
  responsive: true,
  tension: 0.4,
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
        data: [placed, processing, shipped, delivered],
        borderColor: "rgb(255, 99, 132)",
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} plugins={plugins} />;
};

export default Chart;
