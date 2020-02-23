// Init
const gitHub = new GitHub();
const ui = new UI();

// Search input
const searchUser = document.getElementById("searchUser");

// SearchUser event Listener
searchUser.addEventListener("keyup", e => {
  // get Input text
  const userText = e.target.value;

  if (userText !== "") {
    // make Http Call

    gitHub.getUser(userText).then(data => {
      if (data.profile.message === "Not Found") {
        //Show Alert
        ui.showAlert("User Not Found", "alert alert-danger");
      } else {
        // Show profile
        ui.showprofile(data.profile);
        ui.showrepos(data.repos);
      }
    });
  } else {
    // Clear Profile
    ui.clearProfile();
  }
});
