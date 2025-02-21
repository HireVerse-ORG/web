export type TransactionStatus = 'pending' |'completed' |'failed';

export interface ITransaction {
    id: string;
    userId: string;
    userType: string;
    amount: number;
    currency: string;
    paymentIdentifier?: string;
    status: TransactionStatus;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITransactionWithProfile extends ITransaction {
    profile: null | {
        name: string,
        image?: string
    }
}