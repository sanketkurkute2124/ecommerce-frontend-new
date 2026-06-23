import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useMyOrders = (customerId) => {
  return useQuery({
    queryKey: ["my-orders", customerId],

    queryFn: async () => {
      const res = await api.get(
        `/Orders/GetOrdersByCustomer/${customerId}`
      );

      return res.data?.Data || [];
    },

    enabled: !!customerId,

    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};