class UI {
  constructor() {
    this.profile = document.getElementById("profile");
  }

  showprofile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class = "row">
        <div class = "col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target = "_blank" class = "btn
          btn-primary btn-block mb-4"> View Profile</a>
        </div>
        <div class = "col-md-9">
          <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following ${user.following}</span>
          <br><br>
          <ul class = "list-group">
            <li class="list-group-item">Company: ${user.company}</li>
            <li class="list-group-item">Website: ${user.blog}</li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Member Since: ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3"> Latest Repos</h3>
    <div id="repos"></div>   
    `;
  }

  showrepos(repos) {
    let output = "";

    repos.forEach(function(repo) {
      output += `
        <div class="card card-body mb-2"> 
          <div class="row">
            <div class="col-md-6">
              <a href=" ${repo.html_url}" target="_blank">${repo.name} </a> 
            </div>
            <span class="badge badge-primary">Start: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers}</span>
            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
          </div>

        </div>  
      `;
    });

    document.getElementById("repos").innerHTML = output;
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }

  // Show alert Message
  showAlert(msg, className) {
    // clear alerts
    this.clearAlert();

    // create Div
    const div = document.createElement("div");

    // assign classname
    div.className = className;

    // add text
    div.appendChild(document.createTextNode(msg));

    // Get parent
    const container = document.querySelector(".searchContainer");

    // Get Search Box
    const search = document.querySelector(".search");

    // insert Alret
    container.insertBefore(div, search);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }
}
