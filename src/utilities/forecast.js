const request = require("request");

const forecast=(latitude,longtitude,callback)=>{
    const apiKey="aaeecdc75155f2a8938e83861d99840b& "
    const url="http://api.weatherstack.com/current?access_key="+apiKey+"query="+latitude+","+longtitude

    request({url,json:true},(error,{body})=>{
        if (error){
            callback("Unable to connect the web service.",undefined)
        } else if (body.error){
            callback("Unable location. Try different location.")
        } else {
            callback(undefined,{
                currentTemp:body.current.temperature,
                rainChance:body.current.precip
            })
        }
    })

}

module.exports=forecast