import axios from "@core/lib/axios";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { ITransactionWithProfile, TransactionStatus } from "@core/types/transaction.interface";
import { apiWrapper } from "@core/utils/helper";

export const listTransactions = async (page=1, limit=10, status?: TransactionStatus): Promise<IPaginationResponse<ITransactionWithProfile>> => {
    const params: { page: number; limit: number; status?: TransactionStatus } = { page, limit };
    if (status) {
      params.status = status;
    }
  
    const response = await apiWrapper(
      axios.get<IPaginationResponse<ITransactionWithProfile>>("/payment/transactions/list", { params })
    );
    return response.data;
};
