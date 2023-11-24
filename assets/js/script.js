function getObjKeys(obj, value) {
    return Object.keys(obj).filter(key => obj[key] === value);
  }

  function convertTimestampToLocalDateTime(timestamp) {
    // Convert timestamp to milliseconds
    const milliseconds = timestamp * 1000;
  
    // Create a new Date object using the timestamp in milliseconds
    const date = new Date(milliseconds);
  
    // Get local date and time components
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
  
    // Construct the local date time string in the format YYYY-MM-DD HH:MM:SS
    const localDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return localDateTime;
  }
document.addEventListener('DOMContentLoaded', function() {
  const firebaseConfig = {
    apiKey: "AIzaSyDO0uzzxzqLgfenngsAIJbvV5riUilnSn8",
    authDomain: "abcd-21cfe.firebaseapp.com",
    databaseURL: "https://abcd-21cfe-default-rtdb.firebaseio.com",
    projectId: "abcd-21cfe",
    storageBucket: "abcd-21cfe.appspot.com",
    messagingSenderId: "383825682733",
    appId: "1:383825682733:web:e4568a0b63a88bdc6033a4"
  };

  firebase.initializeApp(firebaseConfig);

  var countRef = firebase.database().ref("package");
  count = 4;

  countRef.on('child_added', function(snapshot) {
      value = snapshot.val()
      latitude = value["latitude"];
      longitude = value["longitude"]
      timestamp = value["timestamp"]
      localDateTime = convertTimestampToLocalDateTime(timestamp);
      console.log(localDateTime);
      count += 1;
      const x = `<div class="item" style = "grid-column: 1; grid-row:${count};">
                  <label>${localDateTime}</label>
                </div>
                <div class="ritem" style = "grid-column: 4; grid-row: ${count};">
                  <h4>Incorrect Handling Detected &emsp; <a href= https://maps.google.com/?q=${latitude},${longitude} target="_blank" <i class="zmdi zmdi-google-maps"></i></a> </h4>
                </div>`
      document.getElementById('reception').innerHTML = document.getElementById('reception').innerHTML + x;
  });

});