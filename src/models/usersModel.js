const mongooose = require("mongoose");
const usersSchema = new mongooose.Schema({
  gender: "string",
  name: {
    title: { type: "string" },
    first: { type: "string" },
    last: { type: "string" },
  },
  location: {
    street: {
      number: { type: "number" },
      name: { type: "string" },
    },
    city: { type: "string" },
    state: { type: "string" },
    postcode: { type: "mixed" },
    coordinates: {
      latitude: { type: "string" },
      longitude: { type: "string" },
    },
    timezone: {
      offset: { type: "string" },
      description: { type: "string" },
    },
  },
  email: "string",
  login: {
    uuid: { type: "string" },
    username: { type: "string" },
    password: { type: "string" },
    salt: { type: "string" },
    md5: { type: "string" },
    sha1: { type: "string" },
    sha256: { type: "string" },
  },
  dob: {
    date: "string",
    age: "number",
  },
  registered: {
    date: "string",
    age: "number",
  },
  phone: "string",
  cell: "string",

  picture: {
    large: "string",
    medium: "string",
    thumbnail: "string",
  },
  nat: "string",
  imported_t: {
    type: Date,
    default: Date.now,
  },
});

const usersModel = mongooose.model("users", usersSchema);
class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async register() {
    this.cleanUp();
    const number = await usersModel.find().count();
    if (number > 2000) {
      this.errors.push("The number of users is greater than 99");
      return;
    }
    const user = await usersModel.create(this.body);
    return user;
  }
  async searchUsers() {
    const user = await usersModel.find().sort({ imported_t: -1 });
    return user;
  }
  async searchUserBydId(id) {
    if (typeof id !== "string") return;
    const user = await usersModel.findById(id);
    return user;
  }
  async deleteUser(id) {
    if (typeof id !== "string") return;
    const user = await usersModel.findByIdAndDelete(id);
    return user;
  }
  async updateUser(id) {
    this.cleanUp();
    if (typeof id !== "string") return;
    const user = await usersModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
    return user;
  }
  cleanUp() {
    for (let key in this.body) {
      if (
        typeof key !== "string" &&
        typeof key !== "number" &&
        typeof key !== "object" &&
        typeof key !== "boolean"
      ) {
        this.body[key] = "";
      }
    }
    this.body = {
      gender: this.body.gender,
      name: this.body.name,
      title: this.body.name.title,
      first: this.body.name.first,
      last: this.body.name.last,
      location: this.body.location,
      number: this.body.location.street.number,
      nameLocation: this.body.location.street.name,
      city: this.body.location.city,
      state: this.body.location.state,
      postcode: this.body.location.postcode,
      latitude: this.body.location.coordinates.latitude,
      longitude: this.body.location.coordinates.longitude,
      offset: this.body.location.timezone.offset,
      description: this.body.location.timezone.description,
      email: this.body.email,
      login: this.body.login,
      uuid: this.body.login.uuid,
      username: this.body.login.username,
      password: this.body.login.password,
      salt: this.body.login.salt,
      md5: this.body.login.md5,
      sha1: this.body.login.sha1,
      sha256: this.body.login.sha256,
      dob: this.body.dob,
      dateDob: this.body.dob.date,
      ageDob: this.body.dob.age,
      registered: this.body.registered,
      dateRegistered: this.body.registered.date,
      ageRegistered: this.body.registered.age,
      phone: this.body.phone,
      cell: this.body.cell,
      picture: this.body.picture,
      large: this.body.picture.large,
      medium: this.body.picture.medium,
      thumbnail: this.body.picture.thumbnail,
      nat: this.body.nat,
    };
  }
}
module.exports = User;
