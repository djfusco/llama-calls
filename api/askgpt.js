import axios from 'axios';

export default async function handler(req, res) {
    const search = req.query.search || '';
    const rosterInfo = "inside api axios";
    console.log(rosterInfo);

    try {

        const searchFinal = 'complete this sentence -  chocolate cake' + req.query.search;
        const apiKey = process.env.CHAGPT_KEY;
        const data = {

            "model": "gpt-3.5-turbo",
//            "messages": [{"role": "user", "content": "Say this is a test!"}],
            "messages": [{"role": "user", "content": searchFinal}],
            "temperature": 0.7
        };

        //const response = await axios.get("https://api.github.com/users/mapbox");
        
        const response = await axios.post("https://api.openai.com/v1/chat/completions", data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            }
        });

        //console.log(response.data);
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response.headers);
        //console.log(response.config);

        res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

        //res.json(rosterInfo);
        //res.json(response.data);
        console.log(response.data.choices[0].message.content);
        res.json(response.data.choices[0].message.content);


      } catch (error) {
        // Handle error
        console.error(error);
      }

    //res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
    //res.setHeader("Access-Control-Allow-Credentials", "true");
    //res.setHeader("Access-Control-Allow-Origin", "*");
    //res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    //res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    //res.json(rosterInfo);
  }