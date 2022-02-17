
export type CalcProps = {
    initial?: number;
    payment?: number;
    paymentFrequency?: 'monthly' | 'yearly';
    interest?: number;
    compoundFrequency?: 'monthly' | 'yearly';
    years?: number;
};

export type GraphProps = {
    values?: GraphItem[];
};

export type GraphItem = {
    year: number;
    totalPayment: number;
    totalInterest: number;
    totalMoney: number;
};

