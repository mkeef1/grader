/* jshint expr: true */
/* global describe, it, before, beforeEach*/

'use strict';

var expect = require('chai').expect;
var Student = require('../../app/models/student');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var i1, i2, i3;

describe('Student', function(){
  before(function(done){
    dbConnect('students', function(){
      done();
    });
  });

  beforeEach(function(done){
    Student.collection.remove(function(){
      var s1 = {name:'bob', GPA:'3.0', suspended:false, honorRoll:false};
      var s2 = {name:'sally', GPA:'3.9', suspended:false, honorRoll:true};
      var s3 = {name:'rob', GPA:'2.5', suspended:true, honorRoll:false};

      i1 = new Student(s1);
      i2 = new Student(s2);
      i3 = new Student(s3);

      i1.save(function(){
        i2.save(function(){
          i3.save(function(){
            done();
          });
        });
      });
    });
  });
  
  describe('constructor', function(){
    it('should create a new Student object', function(){
      var s = {name:'bob', GPA:'3.0', suspended:false, honorRoll:false};
      var bob = new Student(s);

      expect(bob).to.be.instanceof(Student);
      expect(bob.name).to.equal('bob');
      expect(bob.GPA).to.equal('3.0');
      expect(bob.suspended).to.be.false;
      expect(bob.honorRoll).to.be.false;
      expect(bob.tests).to.have.length(0);
    });
  });

 describe('#save', function(){
    it('should save a student to the database', function(done){
      var s = {name:'bob', GPA:'3.0', suspended:false, honorRoll:false};
      var bob = new Student(s);
      bob.save(function(){
        expect(bob._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
 
 describe('#addTest', function(){
    it('should save a test to the database', function(done){
      var s = {name:'bob', GPA:'3.0', suspended:false, honorRoll:false};
      var bob = new Student(s);
      bob.addTest(function(){
        expect(bob._id).to.be.instanceof(Mongo.ObjectID);
        expect(bob.addTest).to.have.length(1);
        done();
      });
    });
  });
 
 
  describe('.all', function(){
    it('should get all students from database', function(done){
      Student.all(function(students){
        expect(students).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a student by id', function(done){
      Student.findById(i1._id.toString(), function(student){
        expect(student.name).to.equal('bob');
        done();
      });
    });
  });
});
