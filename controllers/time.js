const axios = require('axios');


exports.getEstimatedArrivalTime = async(req, res)=>{
  if(req.query.destination &&req.query.source_id){
    const [userLat, userLon] = req.query.destination.split(',');
  
    //const userLat = req.body.source.latitude || req.query.source_lat; //depending on how the request info will be sent to the server
    //const userLon  = req.body.source.longitude || req.query.source_lon;

    //let driverLat = req.body.dest.latitude;
    //let driverLon = req.body.dest.longitude;
    const sourceID = req.query.source_id;

    let config = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?destinations=' + userLat + '%2C' + userLon + '&origins=place_id:' + sourceID + '&mode=driving&key=AIzaSyDL8wShrGK7XCtbxs-F7B5Q7oYUpEjp_R0',
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