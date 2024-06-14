import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";

const useAppwrite = (func) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await func();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //   console.log(data);
  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
