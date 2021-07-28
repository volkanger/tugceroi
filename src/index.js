//define varibales

let hoa = Number(document.getElementById("hoa").value);
let rent = Number(document.getElementById("rent").value);
let taxYearly = Number(document.getElementById("taxYearly").value);
let taxMonthly = Number(document.getElementById("taxMonthly").value);
let price = Number(document.getElementById("price").value);
let tax;
let result;
let adv;
//Define InputBlur & inputFocus
let inputs = document.querySelectorAll("input");
inputs.forEach(function (input) {
  input.onfocus = inputFocus;
  input.onblur = inputBlur;
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.blur();
      // inputBlur();
    }
  });
});
//input alani focus oldugunda resulti kapatsin button kalsin
function inputFocus() {
  // document.getElementById("demo").style.display = "none";
  document.getElementById("advice").style.display = "none";
  document.querySelector(".btn").style.display = "inline-block";
  // this.select();
}

//inBlur olunca bilgileri alsin yazdirsin hesaplatsin
function inputBlur() {
  readInputs();
  document.getElementById("demo").style.display = "block";
  document.getElementById("advice").style.display = "block";
  this.value = susle(this.value);
  // document.querySelector(".btn").style.display = "none";
  // calculate();
  //writeInputs();
}

//Clean: inputa girilen degeri sadece rakama dondurulecek.
function onlyNumbers(a) {
  a = a.toString().replace(/\D/g, "");
  return a;
}
//suslenecek $ ve /mo gelecek.
function susle(e) {
  onlyNumbers(e);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });
  if (e === price || e === taxYearly) {
    e = formatter.format(e);
  } else if (e === result) {
    e = result.toFixed(2);
  } else {
    e = formatter.format(e) + "/mo"; //$300/mo yazmasi lazim
  }
  return e;
}
//inputa girilen veriyi okuyacak, variable a assign edecek
function readInputs() {
  price = onlyNumbers(document.getElementById("price").value);
  hoa = onlyNumbers(document.getElementById("hoa").value);
  taxMonthly = onlyNumbers(document.getElementById("taxMonthly").value);
  taxYearly = onlyNumbers(document.getElementById("taxYearly").value);
  rent = onlyNumbers(document.getElementById("rent").value);
}
//yazdiracak
function writeInputs() {
  document.getElementById("price").value = susle(price);
  document.getElementById("hoa").value = susle(hoa);
  document.getElementById("taxMonthly").value = susle(taxMonthly);
  document.getElementById("taxYearly").value = susle(taxYearly);
  document.getElementById("rent").value = susle(rent);
  document.getElementById("demo").innerHTML = susle(result) + " years";
  document.getElementById("advice").innerHTML = String(adv);
}
//calculate AND print

function calculate() {
  if (taxYearly !== "") {
    if (taxMonthly !== "") {
      if (taxYearly < taxMonthly * 12) {
        tax = taxYearly;
      } else {
        tax = taxMonthly * 12;
      }
    } else {
      tax = taxYearly;
    }
  } else {
    tax = taxMonthly * 12;
  }
  result = price / (rent * 12 - (tax + hoa * 12));

  if (result < 15) {
    adv = "it is time to invest";
  } else {
    adv = "Not a good choice";
  }
}

document.getElementById("batin").addEventListener("click", function () {
  calculate();
  writeInputs();
});
// document.getElementById("demo").innerHTML = String(result);
