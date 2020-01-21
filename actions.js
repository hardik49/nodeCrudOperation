const fs = require('fs');
let flag = 0;
let fileContent = JSON.parse(fs.readFileSync('data.json'));
const userDetailsList = fileContent.map((elm) => {
  return elm;
});

function message(statusCode, status, msg, data = '') {
  let obj = {
    statusCode: statusCode,
    status: status,
    message: msg,
    data: data
  }
  return JSON.stringify(obj);
}

function addNewUser(userData) {
  fileContent.forEach((element) => {
    if (element.id == userData.id) {
          return message(200, 'OK', 'Your user ID is already exists!');
        } else if (element.email == userData.email) {
          return message(200, 'OK', 'Your email is already exists!');
        } else if (element.mobile == userData.mobile) {
          return message(200, 'OK', 'Your mobile is already exists!');
        }
    
        if (element.id !== userData.id && element.email !== userData.email && element.mobile !== userData.mobile) {
          userDetailsList.push(JSON.parse(userData));
          flag = 1;
        }
    });
  if (flag == 1) {
    fs.writeFile('data.json', JSON.stringify(userDetailsList), function (err) {
      if (err) throw err;
    })
    return message(200, 'OK', 'User successfully being added');
  }
}

function deleteUser(userData) {
  fileContent.forEach((element) => {
    if (element.id == JSON.parse(userData).id) {
      userDetailsList.splice(userDetailsList.indexOf(element, 1));
      flag = 1;
    }
  });
  if (flag == 1) {
    fs.writeFile('data.json', JSON.stringify(userDetailsList), function (err) {
      if (err) throw err;
      return 'User deleted successfully!'
    })
  }
  else {
    return 'User Id does not  exists';
  }
}

function viewUser(userData) {
  let flag = 0;
  let userId;
  fileContent.forEach((element) => {
    if (element.id == JSON.parse(userData).id) {
      userId = element;
      flag = 1;
    }
  });
  
  if (flag) {
    return message(200, 'OK', 'User successfully being added', userId);
  } else {
    console.log('User is no longer exists');
  }
}

function updateUser(userData) {
  
fileContent.forEach((element) => {
  if (element.id == JSON.parse(userData).id) {

    Object.keys(JSON.parse(userData)).forEach((ele) => {
      if (ele == "email") {
        if (JSON.parse(userData).email != "") {
          element.email = JSON.parse(userData).email;
        }
      }
      if (ele == "mobile") {
        if (JSON.parse(userData).mobile != "") {
          element.mobile = JSON.parse(userData).mobile;
        }
      }
    }); 
    flag = 1;
  }
});

  if (flag == 1) {
    fs.writeFile('data.json', JSON.stringify(userDetailsList), function (err) {
      if (err) throw err;
      return 'User Updated successfully!'
    })
  } else {
    console.log('User does not exists');
  }
}

module.exports = {
  addNewUser,
  deleteUser,
  viewUser,
  updateUser
}