import React, { useEffect, useState } from "react";
import axios from "axios";
import Teachers from "../Pages/Teachers/Teachers";

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios orqali serverdan ma'lumot olish
        const response = await axios.get(
          "https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel"
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Xatolik:", error);
        setError("Ma'lumotni olishda xatolik yuz berdi.");
      }
    };

    fetchData();
  }, []); // useEffect boshlang'ichda ishga tushishi uchun empty dependency array yuboriladi

  return (
    <div>
      <h1>Serverdan olingan ma'lumotlar:</h1>
      {error ? (
        <p>{error}</p>
      ) : data ? (
        <ul>
          {data.map((item) => (
            <Teachers key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p>Ma'lumotlar yuklanmoqda...</p>
      )}
    </div>
  );
};

export default MyComponent;
