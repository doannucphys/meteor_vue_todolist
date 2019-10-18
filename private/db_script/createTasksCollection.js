// collect to local data
db = connect('127.0.0.1:27017/demo')

var BOOLEAN_VALIDATE = {
  bsonType: 'bool',
  description: 'must be a boolean'
}
var STRING_VALIDATE = {
  bsonType: 'string',
  description: 'must be a string'
}
var INT_VALIDATE = {
  bsonType: 'int',
  description: 'must be a int'
}
var DOUBLE_VALIDATE = {
  bsonType: 'double',
  description: 'must be a double'
}
var ARRAY_VALIDATE = {
  bsonType: 'array',
  description: 'must be a object'
}
var OBJECT_VALIDATE = {
  bsonType: 'object',
  description: 'must be a object'
}
var DATE_VALIDATE = {
  bsonType: 'date',
  description: 'must be a date'
}

// function used to prind data
var printObj = (cursor) => {
  while (cursor.hasNext()) {
    print(tojson(cursor.next()))
  }
}

function Task(db) {
  this.db = db;
}
Task.prototype.createTASKCollection = function () {
  print("---------------- CREATED TASKS COLLECTION -------------------");
  this.db.tasks.drop();
  return this.db.createCollection("tasks", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "status"
        ],
        properties: {
          _id: STRING_VALIDATE,
          deadline: DATE_VALIDATE,
          status: STRING_VALIDATE,
          task: STRING_VALIDATE,
          createdAt: DATE_VALIDATE,
          updatedAt: DATE_VALIDATE
        }
      }
    },
    validationAction: "error"
  });
}

var taskObj = new Task(db)
taskObj.createTASKCollection();