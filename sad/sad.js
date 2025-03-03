const jokeBox = document.getElementById("joke");
const btn = document.getElementById("GenerateJoke");
const url = "https://v2.jokeapi.dev/joke/Any?type=single";
        
let  getJoke = () => {
      jokeBox.classList.remove("fade");
         fetch(url)
        .then(response => response.json())
        .then(item => {
                jokeBox.textContent = item.joke; 
                jokeBox.classList.add("fade");
            })
     }

btn.addEventListener("click", getJoke);
getJoke(); 