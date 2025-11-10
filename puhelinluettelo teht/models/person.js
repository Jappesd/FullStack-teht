import mongoose from "mongoose";

const url = process.env.MONGODB_URI;
console.log("Connecting to MongoDB");

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("error connecting", err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        const parts = v.split("-");
        if (parts.length !== 2) return false; // must have exactly one hyphen

        const [first, second] = parts;

        if (first.length < 2 || first.length > 3) return false; // first part 2-3 digits
        if (!/^\d+$/.test(first)) return false; // ensure first part is only numbers

        if (second.length < 5) return false; // second part should be long enough
        if (!/^\d+$/.test(second)) return false; // ensure second part is only numbers

        return true; // passed all checks
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
