const axios = require('axios');


exports.getEstimatedArrivalTime = async(req, res)=>{
  if(req.query.source &&req.query.dest_id){
    const [userLat, userLon] = req.query.source.split(',');
  
    //const userLat = req.body.source.latitude || req.query.source_lat; //depending on how the request info will be sent to the server
    //const userLon  = req.body.source.longitude || req.query.source_lon;

    //let driverLat = req.body.dest.latitude;
    //let driverLon = req.body.dest.longitude;
    const destinationID = req.query.dest_id;

    let config = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + userLat + '%2C' + userLon + '&destinations=place_id:' + destinationID + '&mode=driving&key=AIzaSyDL8wShrGK7XCtbxs-F7B5Q7oYUpEjp_R0',
        headers: {}
    }

    axios.request(config)
.then(function (response) {
  console.log(response.data);
  res.send(response.data);
})
.catch(function (error) {
  console.log(error);
});
  }
}

//module.exports = getEstimatedArrivalTime;