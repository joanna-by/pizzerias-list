const pizzeriasList = document.querySelector("#pizzeria-list");
const form = document.querySelector("#add-pizzeria-form");

//create element and render pizzeria
function renderPizzeria(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  pizzeriasList.appendChild(li);

  //deleting data
  cross.addEventListener("click", event => {
    let id = event.target.parentElement.getAttribute("data-id");
    database
      .collection("pizzerias")
      .doc(id)
      .delete();
  });
}

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

//real-time listener

database
  .collection("pizzerias")
  .orderBy("city")
  .onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type == "added") {
        renderPizzeria(change.doc);
      } else if (change.type == "removed") {
        let li = pizzeriasList.querySelector("[data-id=" + change.doc.id + "]");
        pizzeriasList.removeChild(li);
      }
    });
  });
