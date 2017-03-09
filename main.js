/**
 * Created by vincent on 2017/03/09.
 */

var Models = require("./Models")
let repository = new Models.Repository("localhost","shnapped","root","password");
let customer = Customer("Joseph","Saxonovis","joe.sax@mail.com","8502095166080");
repository.createCustomer(customer)
    .then(function(customer)
        {
        return(repository.customerAtId(customer.id));
        }).then(function(customer)
        {
        return()
        return(repository.transactionsForCustomer(customer));
        }).then(function(list)
        {
        console.log("Found")
        })
        error(function(error)
        {

        }).done();