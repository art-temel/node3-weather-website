const request = require("request")

const geocode=(address,callback)=>{
    const addressEncode=encodeURI(address)
    const apiKey="pk.eyJ1IjoiYXJ0LXRlbWVsIiwiYSI6ImNrOTluNDgxbTAwMnEzZW1nYXNsdzB6aG0ifQ.UoKtX4V0H4495F_-DZRbYw"
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+addressEncode+".json?limit=1&access_token="+apiKey
    request({url, json:true},(error,{body})=>{
        if (error){
            callback("Unable to connect geocode server.",undefined)
        } else if (body.features.length===0) {
            callback("Unable to find location. Try another location.",undefined)
        } else {
            callback(undefined,{
                location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longtitude:body.features[0].center[0]
            })
        }


    })
}

module.exports=geocode