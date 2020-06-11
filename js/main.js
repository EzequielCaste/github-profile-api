const profileImage = document.querySelector("#profile img");
const profileLogin = document.querySelector("#login");
const profileName = document.querySelector("#profile h3");
const profileBio = document.querySelector("#bio");

const repoList = document.querySelector("#repo-list");

const resultDisplay = document.querySelector("#results");
const searchBtn = document.querySelector("#input button");

searchBtn.addEventListener("click", getUserProfile);

function getUserProfile() {  
  
  fetch("https://api.github.com/users/ezzep66")
  .then( resp => resp.json())
  .then( data => {
    
    let userData = {       
      avatar_url: data.avatar_url,
      bio: data.bio, 
      html_url: data.html_url, 
      location: data.location,      
      login: data.login,
      name: data.name
    };
    profileImage.setAttribute("src", userData.avatar_url);
    profileLogin.innerText = "@" + userData.login;
    profileName.innerText = userData.name;
    profileBio.innerText = userData.bio;   
    
    getRepos();
    showResults();

  })
}

function showResults() {  
  resultDisplay.setAttribute("style", "display:block")
}
/*
<li>
          <div>shopping-cart</div>  
          <span>
            <i class="fas fa-code-branch"></i> 0 
            <i class="far fa-star"></i> 0
          </span>
        </li>
         */

function getRepos() {
  fetch("https://api.github.com/users/ezzep66/repos")
  .then(resp => resp.json())
  .then(data => {
    for (let repo of data) {
      // create node li
      let newLi = document.createElement("li");
      let div = document.createElement("div");
      div.innerText = repo.name;
      newLi.appendChild(div);

      let span = document.createElement("span");

      let fork = document.createElement("i");
      fork.setAttribute("class", "fas fa-code-branch")
      let star = document.createElement("i")
      star.setAttribute("class", "far fa-star")

      fork.innerText = " " + repo.forks_count
      span.appendChild(fork)

      star.innerText = " " + repo.stargazers_count
      span.appendChild(star)

      newLi.appendChild(span)

      // append node
      repoList.appendChild(newLi)
    }
   }
  )
}





/*
REPOS array

url
name
forks_count
stargazers_count


*/

/*
avatar_url: "https://avatars1.githubusercontent.com/u/51804994?v=4"
bio: "Full Stack Web Developer"

html_url: "https://github.com/ezzep66"
id: 51804994
location: "Argentina"
login: "ezzep66"
name: "Ezequiel Castellanos"
public_repos: 22
received_events_url: "https://api.github.com/users/ezzep66/received_events"
repos_url: "https://api.github.com/users/ezzep66/repos"
site_admin: false
starred_url: "https://api.github.com/users/ezzep66/starred{/owner}{/repo}"
subscriptions_url: "https://api.github.com/users/ezzep66/subscriptions"
twitter_username: null
type: "User"
updated_at: "2020-06-10T20:59:48Z"
url: "https://api.github.com/users/ezzep66"
__proto__: Object
*/

