let firestore = firebase.firestore();

collRef.add({
  title,
  author,
  noPages,
  read
})
.then(() => {
  console.log("Document successfully written!");
})
.catch(error => {
  console.error("Error writing document: ", error);
});