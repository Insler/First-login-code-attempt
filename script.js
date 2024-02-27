const darkThemeCss =  
`
background-color: #202324;
color: white;
`

const whiteThemeCss = 
`
color: #202324;
background-color: rgb(230,230,230);
`

function verifyTheme() {
  let theme = localStorage.getItem('theme');

  if (!theme) {
    localStorage.setItem('theme', 0)
  }

  if (theme == 1) {
    document.querySelector('.Sign-up').style = darkThemeCss;
  } else {
    document.querySelector('.Sign-up').style = whiteThemeCss;
  }
}

function changeTheme() {
  let theme = localStorage.getItem('theme');
  if (theme == 0) {
    localStorage.setItem('theme', 1);
  } else {
    localStorage.setItem('theme', 0);
  }
  verifyTheme()
}

function submitLogin() {
  const inputs = document.getElementById("sign-up-form").elements;
  localStorage.setItem('email', inputs["email"].value.toString())
  localStorage.setItem('password', inputs["password"].value.toString())
}

verifyTheme()