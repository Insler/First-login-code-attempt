var file = 'authorized.json';
const idLength = 5;

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function verifyLogin(local) {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  try {
    const response = await fetch(local);
    const json = await response.json();

    if (json[email] && json[email]["password"] === password) {
      createToken();
      const tokenVerified = await verifyTokenElegibility();
      if (tokenVerified) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

function createToken(status) {
  let token = localStorage.getItem('token');
  if (!token || status === 1) {
    token = makeId(idLength) + "-" + new Date().getTime();
    localStorage.setItem('token', token);
  }
}

async function verifyTokenElegibility() {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(file);
    const json = await response.json();

    if (json[email] && json[email]['token'] === token) {
      const dateState = await verifyTokenDate();
      if (dateState === true) {
        createToken(1);
        run(file);
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function verifyTokenDate() {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(file);
    const json = await response.json();
  
    if (json[email] && json[email]['token'] === token) {
      if (parseInt(new Date().getTime()) - parseInt(token.split('-')[1]) >= (60*1000)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

function run(local) {
  verifyLogin(local)
    .then((loggedIn) => {
      if (!loggedIn) {
        window.location.href = "http://127.0.0.1:5500/index.html";
      }
  });
}

run(file);