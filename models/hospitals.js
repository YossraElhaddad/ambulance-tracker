	
const requestIp = require('request-ip');
const http = require('http');
const ip = require('ip');
const express = require('express');
const unirest = require('unirest');
const axios = require('axios');

exports.hospitalData = async (req, res) => {

    let idAddress = req.header('x-forwarded-for') || req.remoteAddress;
    var options = {
        method: 'GET',
        url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
        params: { ip: idAddress },
        headers: {
            'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
            'x-rapidapi-key': '5e334ee3fbmsh6bd6a8836bbe529p1084f3jsnac9947c9818b'
        }
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data);
        const lat = response.data.latitude;
        const lng = response.data.longitude;

        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+'%2C'+lng+'&rankby=distance&name=hospital&key=AIzaSyDL8wShrGK7XCtbxs-F7B5Q7oYUpEjp_R0',
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            res.send(response.data.results);
          })
          .catch(function (error) {
            console.log(error);
          });
    }).catch(function (error) {
        console.error(error);
    });
};
