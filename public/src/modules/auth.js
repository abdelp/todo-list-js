let firebase = firebase.auth();

const createUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(error);
  });
}