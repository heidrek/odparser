'use strict';


// Import Helper

var remote = require('gzhelpers').remote;


//Import Chai Assertion Library

var expect = require('chai').expect; //BDD
var config = require('chai').config;

//Configure Chai

config.includeStack = false;
config.showDiff = false;


//Configure Tests

var ACCOUNTID = 'accountid';
var SYS_PATH = '/s';
var PASSWORD = 'password';

var options = {
  hostname: 'localhost',
  port: 3000,
  path: '/' + ACCOUNTID + SYS_PATH + '/exec',
  method: 'POST',
  headers: {
    user: ACCOUNTID,
    database: ACCOUNTID, // I DON'T THINK THIS IS USED??
    password: PASSWORD
  }
};


//Test cases

describe("Stored Procedure Call", function(){
    it("should convert odata request to SQL with two numeric parameters", function(done){

        remote.request(options, {procedure: "spMyStoredProcedure", params: [1,2]})
        .then(function(responseString){

            //Response String should be like
            //{"queryType":"exec","schema":"accountid","adminOp":false,"bucketOp":false,"user":"accountid","password":"password"}
            //CALL accountid.spMyStoredProcedure(1,2)

            var responseArray = responseString.split("|");
            var ast = JSON.parse(responseArray[0]);
            var query = responseArray[1];

            expect(ast.queryType, 'topic [ast.queryType]').to.equal('exec');
            expect(ast.schema, 'topic [ast.schema]').to.equal('accountid');
            expect(ast.adminOp, 'topic [ast.adminOp]').to.equal(false);
            expect(ast.bucketOp, 'topic [ast.bucketOp]').to.equal(false);
            expect(ast.user, 'topic [ast.user]').to.equal('accountid');
            expect(ast.password, 'topic [ast.password]').to.equal('password');

            expect(query, 'topic [query]').to.equal('CALL accountid.spMyStoredProcedure(1,2)');
        })
        .done(done, function (errObject) {console.log('ERROR',  errObject.message);});

    });


    it("should convert odata request to SQL with two string parameters", function(done){

        remote.request(options, {procedure: "spMyStringyStoredProcedure", params: ["Hodor","Winterfel"]})
        .then(function(responseString){

            //Response String should be like
            //{"queryType":"exec","schema":"accountid","adminOp":false,"bucketOp":false,"user":"accountid","password":"password"}
            //CALL accountid.spMyStringyStoredProcedure('Hodor','Winterfel')

            var responseArray = responseString.split("|");
            var ast = JSON.parse(responseArray[0]);
            var query = responseArray[1];

            expect(ast.queryType, 'topic [ast.queryType]').to.equal('exec');
            expect(ast.schema, 'topic [ast.schema]').to.equal('accountid');
            expect(ast.adminOp, 'topic [ast.adminOp]').to.equal(false);
            expect(ast.bucketOp, 'topic [ast.bucketOp]').to.equal(false);
            expect(ast.user, 'topic [ast.user]').to.equal('accountid');
            expect(ast.password, 'topic [ast.password]').to.equal('password');

            expect(query, 'topic [query]').to.equal("CALL accountid.spMyStringyStoredProcedure('Hodor','Winterfel')");
        })
        .done(done, function (errObject) {console.log('ERROR',  errObject.message);});

    });


    it("should convert odata request to SQL with multiple mixed parameters", function(done){

        remote.request(options, {procedure: "spMyMixedStoredProcedure", params: [365,"Dragons","Targerian",3,5]})
        .then(function(responseString){

            //Response String should be like
            //{"queryType":"exec","schema":"accountid","adminOp":false,"bucketOp":false,"user":"accountid","password":"password"}
            //CALL accountid.spMyMixedStoredProcedure(365,'Dragons','Targerian',3,5)

            var responseArray = responseString.split("|");
            var ast = JSON.parse(responseArray[0]);
            var query = responseArray[1];

            expect(ast.queryType, 'topic [ast.queryType]').to.equal('exec');
            expect(ast.schema, 'topic [ast.schema]').to.equal('accountid');
            expect(ast.adminOp, 'topic [ast.adminOp]').to.equal(false);
            expect(ast.bucketOp, 'topic [ast.bucketOp]').to.equal(false);
            expect(ast.user, 'topic [ast.user]').to.equal('accountid');
            expect(ast.password, 'topic [ast.password]').to.equal('password');

            expect(query, 'topic [query]').to.equal("CALL accountid.spMyMixedStoredProcedure(365,'Dragons','Targerian',3,5)");
        })
        .done(done, function (errObject) {console.log('ERROR',  errObject.message);});

    });
});
