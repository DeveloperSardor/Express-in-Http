const validator = require("./validation");

let users = validator.read("users");

module.exports = {
  GETPAGE: (req, res) => {
    try {
      res.sendFile("index.html");
    } catch (error) {
      res.send(error.message).status(400);
    }
  },
  GET: (req, res) => {
    try {
      let id = req.params?.id;

      if (id) {
        if (!users.map((u) => u.id).includes(+id)) {
          throw new Error("Not found " + id + "-user");
        } else {
          res.json(users.find((u) => u.id == id));
        }
      } else res.send(users).status(200);
    } catch (err) {
      res.send(err.message);
    }
  },
  POST: (req, res) => {
    try {
      const { name, username, email, phone } = req.body;
      let user = req.body;
      user.id = users.length ? users[users.length - 1].id + 1 : 1;
      users.push(user);
      validator.write("users", users);
      res.send(JSON.stringify(users));
    } catch (error) {
      res.send(error.message);
    }
  },
  PUT: (req, res) => {
    try {
      const id = req.params?.id;
      let user = users.find((u) => u.id == id);
      if (!user) throw new Error("Not found " + id + "-user");
      const { name, username, email, phone } = req.body;
      console.log(req.body);
      if (!name && !username && !email && !phone){
        throw new Error("Not found maqsad!");
      }
      user.name = name ? name : user.name;
      user.username = username ? username : user.username;
      user.email = email ? email : user.email;
      user.phone = phone ? phone : user.phone; 
      validator.write("users", users);
      res.send("User " + id + " updated!");
    } catch (error) {
      res.send(error.message);
    }
  },
  DELETE: (req, res) => {
    try {
      const id = req.params?.id;
      if (!users.map((u) => u.id).includes(+id))
        throw new Error("Not found " + id + "-user");
      validator.write(
        "users",
        users.filter((u) => u.id != id)
      );

      res.send("User " + id + " deleted!");
    } catch (error) {
      res.send(error.message);
    }
  },
};
