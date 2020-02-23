const http = new easyHttp();

// Get Posts
// http.get("https://jsonplaceholder.typicode.com/posts", function(err, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// Get Single Post
// http.get("https://jsonplaceholder.typicode.com/posts/1", function(
//   err,
//   response
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

//  Create POST

// Create Data
const data = {
  title: "Custom Post",
  body: "This is a custom post"
};

// http.post("https://jsonplaceholder.typicode.com/posts", data, function(
//   err,
//   post
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// PUT Request
// http.put("https://jsonplaceholder.typicode.com/posts/1", data, function(
//   err,
//   post
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// Delete Request
http.delete("https://jsonplaceholder.typicode.com/posts/2", function(
  err,
  response
) {
  if (err) {
    console.log(err);
  } else {
    console.log(response);
  }
});
