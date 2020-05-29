export const getPosition = ({userid, username, team}) => {
    return new Promise((resolve, reject) => {
        const geo_success = (position) => {
            //console.log("geo_success")
            resolve({
                userid: userid,
                username: username,
                equipo: team,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }
        const geo_error = (error) => {
            //console.error("geo_error: "+error.message)
            resolve({error: error})
        }
        navigator.geolocation.getCurrentPosition(geo_success, geo_error, {timeout:5000})
    })
}