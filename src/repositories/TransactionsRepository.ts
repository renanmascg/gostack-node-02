import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.acumulateValue('income');
    const outcome = this.acumulateValue('outcome');
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  private acumulateValue(type: 'income' | 'outcome'): number {
    return this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === type) {
        return accumulator + currentValue.value;
      }
      return accumulator;
    }, 0);
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
