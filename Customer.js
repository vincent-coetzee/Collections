/**
 * Created by vincent on 2017/03/09.
 */

class Customer
    {
    constructor(firstName,lastName,userName,identityNumber)
        {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.identityNumber = identityNumber;
        this.id = null;
        }

    constructor()
        {
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.identityNumber = "";
        this.id = null;
        }

    static fromRecord(record)
        {
        let customer = new Customer();
        customer.id = record.id;
        customer.firstName = record.firstName;
        customer.lastName = record.lastName;
        customer.userName = record.userName;
        customer.identityNumber = record.identityNumber;
        return(customer);
        }
    };

console.log("loaded Customer");

module.exports = Customer;