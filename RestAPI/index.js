const express = require("express");
const app = express();
const PORT = 4000;
const users = require("../MOCK_DATA.json");
const fs = require("fs")
//Routes

app.get("/api/users", (req, res) => {
  return res.json(users);
});

//we can merge these -  get, post, patch and delete methods
//merged code are given below this commented code section -->>
/* 

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id === id)
  return res.json(user)
})

app.post('/api/users', (req, res) => {
 
 //Create new user

    return res.json({status: "Pending"});
});

app.patch('/api/users/:id', (req, res) => {
 
//Edit a existing user

    return res.json({status: "Pending"});
});

app.delete('/api/users/:id', (req, res) => {
 
 //Delete a user

    return res.json({status: "Pending"});
}); */


app.use(express.urlencoded({extended: false}));


app.post('/api/users', (req, res) => {
 
 //Create new user
     const body =  req.body;
     const newUser = {...body,id: users.length + 1 };
    users.push(newUser);

fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data) =>{



    return res.json({status: "Pending"});

})


});

app.route("/api/users/:id")
.get((req, res) => {
 
 const id = Number(req.params.id)
  const user = users.find(user => user.id === id)
  return res.json(user);
})

.patch((req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user data
  users[userIndex] = { ...users[userIndex], ...body };

  // Save to file
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update user" });
    }
    return res.json({ status: "User updated", user: users[userIndex] });
  });
})
.delete((req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex); // Remove the user

  // Save to file
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete user" });
    }
    return res.json({ status: "User deleted" });
  });
});






app.get("/users", (req, res) => {
  // HTML Document -->>>
  const html = `<ul>

${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;

  res.send(html);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
