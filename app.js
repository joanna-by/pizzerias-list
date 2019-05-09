const pizzeriasList = document.querySelector("#pizzeria-list");

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

database
  .collection("pizzerias")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderPizzeria(doc);
    });
  });
