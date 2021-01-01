const axios = require('axios')
const { JSDOM } = require('jsdom')

module.exports = function (trackid){
    const shiprocket = `https://www.shiprocket.co/tracking/${ trackid }`;
    return axios.get(shiprocket)
        .then((res)=>{
            const { document } = new JSDOM(res.data).window
            const ul = document.querySelector("div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div.delievery_info > div > ul")
      
            var jsondata = {}
            jsondata["data"] = []
      
            ul.childNodes.forEach(li => {
      
              var listdata = []
      
              li.childNodes.forEach(inlist => {
                inlist.childNodes.forEach(element => {
                  element = element.textContent.replace(/\t|\n/g,'')
                  if((element.replace(/ /g,''))&&(!element.includes('Activity : '))&&(!element.includes('Location : ')))
                    listdata.push(element.replace(/_/g,' '))
                });
              });
              
              if(listdata.length>3)
                jsondata["data"].push({
                  activity:listdata[0],
                  location:listdata[1],
                  time:`${listdata[2]}, ${listdata[3]}`
                })
      
            });
            return jsondata
        })
        .catch((err)=>{
            return null
        })
}