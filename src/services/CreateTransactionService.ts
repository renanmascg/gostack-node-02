import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (data.type === 'outcome' && balance.total - data.value < 0) {
      throw Error('You do not have money in your wallet.');
    }

    const transaction = new Transaction({
      title: data.title,
      value: data.value,
      type: data.type,
    });

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
