let login = document.getElementById("login-button");
login.addEventListener("click", async () => {
  let email = document.getElementById("email-login").value;
  let password = document.getElementById("password-login").value;
  let obj = {
    email: email,
    password: password,
  };
  let data = await fetch("http://localhost:9100/admin/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let res = await data.json();
  console.log(res);

  if (res.token) {
    localStorage.setItem("employee-token", res.token);
    alert(res.message);
  }
});

let register = document.getElementById("register-button");
register.addEventListener("click", async () => {
  let email = document.getElementById("email-register").value;
  let password1 = document.getElementById("password1").value;
  let password2 = document.getElementById("password2").value;
  if (password1 !== password2) {
    return alert("Please Enter Same Password");
  }
  let obj = {
    email: email,
    password: password1,
  };
  let data = await fetch("http://localhost:9100/admin/signup", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let res = await data.json();
  console.log(res);
  alert(res.message);
});

document.getElementById("login-toggle").addEventListener("click", () => {
  document.getElementById("login").style.display = "block";
  document.getElementById("register-toggle").style.backgroundColor = "white";
  document.getElementById("register-toggle").style.color = "black";
  document.getElementById("register").style.display = "none";
  document.getElementById("login-toggle").style.backgroundColor = "blue";
  document.getElementById("login-toggle").style.color = "white";
});
document.getElementById("register-toggle").addEventListener("click", () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("register-toggle").style.backgroundColor = "blue";
  document.getElementById("register-toggle").style.color = "white";
  document.getElementById("register").style.display = "block";
  document.getElementById("login-toggle").style.backgroundColor = "white";
  document.getElementById("login-toggle").style.color = "black";
});
