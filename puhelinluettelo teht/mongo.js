//mongo.js

import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("strictQuery", false);

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log("Usage:");
  console.log("  node mongo.js <password>     #lists all persons");
  console.log(
    '  node mongo.js <password> "<name>" "<number>"  # add a new person'
  );
}

const password = args[0];
const uriFromEnv = process.env.MONGODB_URI;

// helper for building the connection string

const buildUri = (pwd) => {
  if (uriFromEnv) return uriFromEnv;

  const username = "ksamppa";
  const cluster = "cluster0.hnxcgr6.mongodb.net";
  const dbName = "Phonebook";

  return `mongodb+srv://${username}:${pwd}@${cluster}/${dbName}?retryWrites=true&w=majority`;
};

const url = buildUri(password);

// connect and define schema + model

try {
  await mongoose.connect(url);
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  const Person = mongoose.model("Person", personSchema);
  // only password == list all
  if (args.length === 1) {
    const persons = await Person.find({});
    console.log("phonebook:");
    persons.forEach((p) => console.log(`${p.name} ${p.number}`));
  }

  // password + name + number --> add person
  else if (args.length === 3) {
    const name = args[1];
    const number = args[2];
    const person = new Person({ name, number });
    await person.save();
    console.log(`added ${name} number ${number} to phonebook`);
  } else {
    console.log("invalid arguments");
  }
  await mongoose.connection.close();
} catch (err) {
  console.error("error", err.message);
  process.exit(1);
}
