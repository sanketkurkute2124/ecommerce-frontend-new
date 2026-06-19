import api from "../api/axiosInstance";

export const getProducts = async () => {
  const response = await api.get(
    "/Product/GetAllProducts"
  );

  return (
    response.data?.Data?.filter(
      (p) => p.IsAvailable
    ) || []
  );
};

export const getCategories = async () => {
  const response = await api.get(
    "/Categories/GetAllCategories"
  );

  return response.data?.Data || [];
};