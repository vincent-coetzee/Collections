/**
 * Created by vincent on 2017/03/09.
 */

let MySQL = require("mysql");
let Q = require("q");

var TransactionList = require("./TransactionList");

class Repository
    {
    constructor(hostName,databaseName,userName,password)
        {
        this.hostName = hostName;
        this.databaseName = databaseName;
        this.userName = userName;
        this.password = password;
        this.connection = null;
        this.connect();
        }

    connect()
        {
        const connectionParameters =
            {
                host: this.hostName,
                user: this.userName,
                database: this.databaseName,
                password: this.password
            };
        this.connection = MySQL.createConnection(connectionParameters);
        this.connection.connect(function (error)
        {
        if (!error)
            {
            console.log("connected to database");
            }
        else
            {
            console.log("connection to database failed");
            console.log(error);
            throw(error);
            }
        });
        }

    createTransaction(transaction)
        {
        let deferred = Q.defer();
        let values = [transaction.customerId,transaction.date,transaction.fromAccountNumber,transaction.toAccountNumber,transaction.amount];
        let handler = function(error,results)
            {
            if (error)
                {
                deferred.reject(error);
                }
            else
                {
                transaction.id = results.insertId;
                deferred.resolve(transaction);
                }
            };
        this.connection.query("INSERT INTO Transaction(customerId,date,fromAccountNumber,toAccountNumber,amount) VALUES(?,?,?,?,?)",value,handler);
        return(deferred.promise);
        }

    transactionsForCustomer(customer)
        {
        let deferred = Q.defer();
        let values = [customer.id];
        let handler = function(error,results)
            {
            if (error)
                {
                deferred.reject(error);
                }
            else
                {
                let list = new TransactionList();
                for (record in results)
                    {
                    list.append(Transaction.fromRecord(record));
                    }
                deferred.resolve(list);
                }
            };
        this.connection.query("SELECT * FROM Transaction WHERE customerId = ?",values,handler);
        return(deferred.promise);
        }

    createCustomer(customer)
        {
        let deferred = Q.defer();
        let values = [customer.firstName,customer.lastName,customer.userName,customer.identityNumber];
        let handler = function(error,results)
            {
            if (error)
                {
                deferred.reject(error);
                }
            else
                {
                customer.id = results.insertId;
                deferred.resolve(customer);
                }
            };
        this.connection.query("INSERT INTO Customer(firstName,lastName,userName,identityNumber) VALUES(?,?,?,?)",values,handler);
        return(deferred.promise);
        }

    customerAtId(id)
        {
        let deferred = Q.defer();
        let values = [id];
        let handler = function(error,results)
            {
            if (error)
                {
                deferred.reject(error);
                }
            else
                {
                if (results.length > 0)
                    {
                    deferred.resolve(Customer.fromRecord(results[0]));
                    }
                else
                    {
                    deferred.resolve(null);
                    }
                }
            }
        }
    }

console.log("loaded Repository");

module.exports = Repository;