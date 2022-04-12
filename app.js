document.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        document.querySelector("button").click();
    }
});

function test() {
  const name = document.getElementById("last_name").value;
  const firstname = document.getElementById("first_name").value;
  const email = document.getElementById("email").value;
  let numbers = document.getElementById("numbers").value.split(" ");
  numbers = changeStringToInteger(numbers);

  if (checkForm(name, firstname, email, numbers)) {
    document.querySelector(".result").innerHTML = "";
    let loto = tirage();
    let resultLoto = document.createElement("p");
    resultLoto.textContent = `Les numéros tirés sont ${loto.join("-")}`;
    document.querySelector(".result").appendChild(resultLoto);
    const intersection = loto.filter((value) => numbers.includes(value));

    document.querySelector(".score").innerHTML = "";
    let commonNumbers = document.createElement("p");
    if (intersection.length == 6) {commonNumbers.textContent = "Victoire Félicitation!!!!"}
    if (intersection.length == 0) {commonNumbers.textContent = "Perdu"}
    if (intersection.length > 0 && intersection.length < 6) {commonNumbers.textContent = `${intersection.length} nombres trouvés`}
    
    document.querySelector(".score").appendChild(commonNumbers);
  }
}

// obtenir 6 nombres aléatoires différents entre 1 et 50
const tirage = () => {
  let gridNumbers = [];
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 50) + 1;
    gridNumbers.includes(random) ? i-- : gridNumbers.push(random);
  }
  return gridNumbers;
};

// fonction qui change les chaine de caractères en nombres
const changeStringToInteger = (numbers) => {
  let intNumbers = [];
  for (let i = 0, len = numbers.length; i < len; i++) {
    intNumbers.push(parseInt(numbers[i]));
  }
  return intNumbers;
};

// fonction qui vérifie nom prénom email et les 6 numéros avec les regex
const checkForm = (name, firstName, email, numbers) => {
  let regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

  numbers = [...new Set(numbers)]; // Supprime les doublons du tableau

  for (let i = 0; i < 6; i++) {
    if (numbers[i] < 1 || numbers[i] > 50) {
      alert("Veuillez saisir des nombres entre 1 et 50");
      return false;
    }
  }

  if (
    name.length < 2 ||
    firstName.length < 2 ||
    !regex.test(email) ||
    numbers.length !== 6
  ) {
    alert("Veuillez remplir correctement tous les champs");
    return false;
  }
  return true;
};
