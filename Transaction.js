/**
 * Created by vincent on 2017/03/09.
 */

class Transaction
    {
    constructor(customer,date,fromAccountNumber,toAccountNumber,amount)
        {
        this.date = date;
        this.fromAccountNumber = fromAccountNumber;
        this.toAccountNumber = toAccountNumber;
        this.amount = amount;
        this.customerId = customer.id;
        }

    static fromRecord(record)
        {
        let transaction = Transaction();
        transaction.id = record.transactionId;
        transaction.date = record.date;
        transaction.fromAccountNumber = record.fromAccountNumber;
        transaction.toAccountNumber = record.toAccountNumber;
        transaction.amount = record.amount;
        transaction.customerId = record.customerId;
        return(transaction);
        }
    }

console.log("loaded Transaction");

module.exports = Transaction;
