const axios = require('axios')

module.exports = function (trackid){
    const pickrr = `https://www.pickrr.com/api/tracking-json/?auth_token=acdd0dfe8130469ce7b71a200f108ebb113674&tracking_id=${ trackid }`;
    return axios.get(pickrr)
        .then((res)=>{
            
            var status = res.data.status
            var track_arr = res.data.track_arr
            var jsondata = {}
            jsondata["data"] = []

            track_arr.forEach(track => {
                if(track.status_array){
                    track.status_array.forEach(element => {
                        jsondata["data"].push({
                            activity:element.status_body,
                            location:element.status_location.replace(/_/g,' '),
                            time:element.status_time
                          })
                    });
                }
            });
            jsondata["data"].push({
                activity:status.current_status_body,
                location:status.current_status_location.replace(/_/g,' '),
                time:status.current_status_time
              })
            
            jsondata["data"].reverse()

            return jsondata
        })
        .catch((err)=>{
            console.log(err)
            return null
        })
}