/**
 * Created by vincent on 2017/03/09.
 */
/**
 * Created by vincent on 2017/03/07.
 */

var MySQL = require('mysql');
var Q = require('q');

class DatabaseSeeder
    {
    constructor(hostName,databaseName,userName,password)
        {
        this.hostName = hostName;
        // this.databaseName = databaseName;
        this.userName = userName;
        this.password = password;
        this.connect();
        }

     connect()
        {
        let parameters =
            {
            host: this.hostName,
            user: this.userName,
            password: this.password
            };
        this.connection = MySQL.createConnection(parameters);
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

    static seed()
        {
        let seeder = DatabaseSeeder("localhost","","root","password")
        seeder.drop().then(seeder.createDatabase()).then(seeder.createCustomerTable()).then(seeder.createTransactionTable()).done();
        }

    drop()
        {
        let deferred = Q.defer();
        let handler = function(error)
            {
            if (error)
                {
                deferred.reject(error);
                }
            else
                {
                deferred.resolve();
                }
            };
        this.connection.query("DROP DATABASE IF EXISTS shnapped",[],handler);
        return(deferred.promise);
        }

    createDatabase()
        {
        let deferred = Q.defer();
        let handler = function(error)
            {
            if (error)
                {
                deferred.reject(error);
                }
            else
                {
                deferred.resolve();
                }
            };
        this.connection.query("CREATE DATABASE 'shnapped'",[],handler);
        return(deferred.promise);
        }

    createCustomerTable()
        {
        let deferred = Q.defer();
        let query = "CREATE TABLE `shnapped`.`Customers` (`customerId` int(11) NOT NULL AUTO_INCREMENT,`firstName` varchar(45) NOT NULL,`lastName` varchar(45) NOT NULL,`userName` varchar(128) NOT NULL,`identityNumber` varchar(13) NOT NULL,PRIMARY KEY (`customerId`)) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1";
        let handler = function(error)
            {
            if (error)
                {
                deferred.reject(error);
                }
            else
                {
                deferred.resolve();
                }
            };
        this.connection.query(query,[],handler);
        return(deferred.promise);
        }

    createTransactionTable()
        {
        let deferred = Q.defer();
        let query = "CREATE TABLE `shnapped`.`Transaction` (`transactionId` INT NOT NULL AUTO_INCREMENT,`date` DATE NOT NULL,`fromAccountNumber` varchar(45) NOT NULL,`toAccountNumber` varchar(45) NOT NULL,`amount` FLOAT NOT NULL,`customerId` INT NOT NULL,PRIMARY KEY (`transactionId`)) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1";
        let handler = function(error)
            {
            if (error)
                {
                deferred.reject(error);
                }
            else
                {
                deferred.resolve();
                }
            };
        this.connection.query(query,[],handler);
        return(deferred.promise);
        }
    }

module.exports = DatabaseSeeder;