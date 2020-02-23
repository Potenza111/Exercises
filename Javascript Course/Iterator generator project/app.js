const data = [
  {
    name: "John Doe",
    age: 32,
    gender: "male",
    lookingfor: "female",
    location: "Boston MA",
    image: "https://randomuser.me/api/portraits/men/82.jpg"
  },
  {
    name: "Jen Smith",
    age: 32,
    gender: "female",
    lookingfor: "male",
    location: "SAn Fransisko MA",
    image: "https://randomuser.me/api/portraits/women/82.jpg"
  },
  {
    name: "Piet Nel",
    age: 32,
    gender: "male",
    lookingfor: "female",
    location: "Kaapstad MA",
    image: "https://randomuser.me/api/portraits/men/20.jpg"
  }
];

const profiles = profileIterator(data);

// Call First Profile
nextProfile();

// Next Event
document.getElementById("next").addEventListener("click", nextProfile);

// Next Profile Display
function nextProfile() {
  const currentProfile = profiles.next().value;

  if (currentProfile !== undefined) {
    document.getElementById("profileDisplay").innerHTML = `
    <ul class="list-group">
      <li class = "list-group-item">Name: ${currentProfile.name} </li>
      <li class = "list-group-item">Age: ${currentProfile.age} </li>
      <li class = "list-group-item">Gender: ${currentProfile.gender} </li>
      <li class = "list-group-item">Looking For: ${currentProfile.lookingfor} </li>
      <li class = "list-group-item">Location: ${currentProfile.location} </li>
    </ul>
  `;

    document.getElementById(
      "imageDisplay"
    ).innerHTML = `<img src=" ${currentProfile.image}">`;
  } else {
    // No More Profiles
    window.location.reload();
  }
}

// Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true };
    }
  };
}
