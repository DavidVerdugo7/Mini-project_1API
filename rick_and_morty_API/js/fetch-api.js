const charsContainer = document.querySelector(".chars-container");
//search name
const searchInput = document.querySelector("#search");
//species
const speciesFilter = document.querySelector("#species");
//gender
const genderFilter = document.querySelector("#gender");
//status
const statusFilter = document.querySelector("#status");
//Load more Button
const loadMoreButton = document.querySelector("#load-more");

const API = "https://rickandmortyapi.com/api";
const defaultFilters = {
  name: "",
  species: "",
  gender: "",
  status: "",
  page: 1,
};

async function getCharacters({ name, species, gender, status, page = 1 }) {
  const response = await fetch(
    `${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`
  );
  const characters = await response.json();
  //   console.log(character.results);
  return characters.results;
}
// charecters in cards format
async function render({ characters }) {
  characters.forEach((character) => {
    const locationName = character.location.name;
    return (charsContainer.innerHTML += `
<div class=" char">
  <img src="${character.image}" alt="" />
  <div class="char-info">
   <h3 >${character.name}</h3>
   <span class = "fs-4 text">${character.species}</span>
   <span class = "fs-5 text">Location: ${locationName}</span>
 </div>
</div>
`);
  });
}
//===============
// async function render({ characters }) {
//   characters.forEach((character) => {
//     return (charsContainer.innerHTML += `
//     <div class= "row">
//     <div class="card col-md-1" style="width: 18rem;">
//   <img src="${character.image}" class="card-img-top" alt="...">
//   <div class="card-body  ">
//   <h3>${character.name}</h3>
//   <span>${character.species}</span>
//   </div>
// </div>
// </div>`);
//   });
// }
//===============

function handlerFilterChange(type, event) {
  return async () => {
    defaultFilters[type] = event.target.value;
    charsContainer.innerHTML = "";
    const characters = await getCharacters(defaultFilters);
    render({ characters });
  };
}

async function handlerLoadMore() {
  defaultFilters.page += 1;
  const characters = await getCharacters(defaultFilters);
  render({ characters });
}

function addListeners() {
  //FILTERS:
  //filter for species
  speciesFilter.addEventListener("change", async (event) => {
    handlerFilterChange("species", event)();

    // defaultFilters.species = event.target.value;
    // charsContainer.innerHTML = "";
    // const characters = await getCharacters(defaultFilters);
    // render({ characters });
  });
  //filter for gender
  genderFilter.addEventListener("change", async (event) => {
    handlerFilterChange("gender", event)();
    // defaultFilters.gender = event.target.value;
    // charsContainer.innerHTML = "";
    // const characters = await getCharacters(defaultFilters);
    // render({ characters });
  });

  //filter for status
  statusFilter.addEventListener("change", async (event) => {
    handlerFilterChange("status", event)();

    // defaultFilters.status = event.target.value;
    // charsContainer.innerHTML = "";
    // const characters = await getCharacters(defaultFilters);
    // render({ characters });
  });
  //search by name
  searchInput.addEventListener("keyup", async (event) => {
    handlerFilterChange("name", event)();

    // defaultFilters.name = event.target.value;
    // charsContainer.innerHTML = "";
    // const characters = await getCharacters(defaultFilters);
    // render({ characters });
  });

  loadMoreButton.addEventListener("click", handlerLoadMore);

  //THIS space IS TO ADD A NEW FILTER:
  // newFilter.addEventListener('click', async (event) => {
  //   handlerFilterChange("filterName", event)();
  // })
}

async function main() {
  const characters = await getCharacters(defaultFilters);
  addListeners();
  handlerLoadMore();
  render({ characters });
}

main();
