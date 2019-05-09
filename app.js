const pizzeriasList = document.querySelector("#pizzeria-list");
const form = document.querySelector("#add-pizzeria-form");

function renderPizzeria(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);

  pizzeriasList.appendChild(li);
}

//getting data
database
  .collection("pizzerias")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderPizzeria(doc);
    });
  });

//saving data
form.addEventListener("submit", event => {
  event.preventDefault();
  database.collection("pizzerias").add({
    name: form.name.value,
    city: form.city.value
  });
  form.name.value = "";
  form.city.value = "";
});
