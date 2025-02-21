import axios from "@core/lib/axios";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { ITransaction, TransactionStatus } from "@core/types/transaction.interface";
import { apiWrapper } from "@core/utils/helper";

export const listMyTransactions = async (page=1, limit=10, status?: TransactionStatus): Promise<IPaginationResponse<ITransaction>> => {
    const params: { page: number; limit: number; status?: TransactionStatus } = { page, limit };
    if (status) {
      params.status = status;
    }
  
    const response = await apiWrapper(
      axios.get<IPaginationResponse<ITransaction>>("/payment/transactions", { params })
    );
    return response.data;
};
