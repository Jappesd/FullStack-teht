//mongo.js
import mongoose from "mongoose";
import "dotenv/config";
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

//Run with node mongo.js list OR node mongo.js add "Name" "12345"

const command = process.argv[2];

if (command === "add") {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({ name, number });
  person.save().then(() => {
    console.log("person saved!");
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((p) => console.log(p.name, p.number));
    mongoose.connection.close();
  });
}
