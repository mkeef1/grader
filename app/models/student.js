'use strict';

var _ = require('lodash');
var Mongo = require('mongodb');

function Student(s){
  this.name           = s.name;
  this.GPA            = s.GPA;
  this.suspended      = s.suspended;
  this.honorRoll      = s.honorRoll;
  this.tests          = [];
}

Object.defineProperty(Student, 'collection', {
  get: function(){return global.mongodb.collection('students');}
});

Student.prototype.save = function(cb){
  Student.collection.save(this, cb);
};


Student.all = function(cb){
  Student.collection.find().toArray(function(err, objects){
    var students = objects.map(function(s){
      return changePrototype(s);
    });

    cb(students);
  });
};

Student.prototype.addTest = function(){
  var tests = this.tests.push();
      return tests;
    };


Student.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Student.collection.findOne({_id:_id}, function(err, obj){
    var student = changePrototype(obj);

    cb(student);
  });
};

module.exports = Student;

// PRIVATE FUNCTIONS ///

function changePrototype(obj){
  var student = _.create(Student.prototype, obj);
  return student;
}

