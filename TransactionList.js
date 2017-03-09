/**
 * Created by vincent on 2017/03/09.
 */

let Transaction = require("./Transaction");

class TransactionList
    {
    constructor()
        {
        this.transactionsById = {};
        }

    get count()
        {
        return(count(this.transactionsById));
        }

    append(transaction)
        {
        this.transactionsById[transaction.id] = transaction;
        }

    transactionAtId(id)
        {
        return(this.transactionsById[id]);
        }
    }

console.log("loaded TransactionList");

module.exports = TransactionList;