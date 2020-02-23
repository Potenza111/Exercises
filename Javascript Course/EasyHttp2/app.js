const http = new EASYHTTP2();

// Get Users
// const users = http
//   .get("https://jsonplaceholder.typicode.com/users")
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

const userData = {
  name: "Pieter",
  userName: "Lekker",
  email: "aa@a.com"
};

// // Make Post
// const users = http
//   .post("https://jsonplaceholder.typicode.com/users", userData)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// Make PUT (update)
// const users = http
//   .put("https://jsonplaceholder.typicode.com/users/2", userData)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// Make delete
const users = http
  .delete("https://jsonplaceholder.typicode.com/users/2")
  .then(data => console.log(data))
  .catch(err => console.log(err));
