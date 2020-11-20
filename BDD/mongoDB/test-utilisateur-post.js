//set a reference to the request module
var request = require("request"),
  //stubs
  postData = {},
  postConfig = {},
  postSuccessHandler = null;

//make the POST request
request.post(
  "http://localhost:8888/inscription",
  {
    json: {
      nom: "Nom test",
      prenom: "Prenom test",
      email: "test@test.com",
      mdp: "test",
    },
  },
  (error, res, body) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`statusCode: ${res.statusCode}`);
    console.log(body);
  }
);
