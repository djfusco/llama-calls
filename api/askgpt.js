import axios from 'axios';

export default async function handler(req, res) {
    const search = req.query.search || '';
    const rosterInfo = "inside api axios";
    console.log(rosterInfo);

    try {
        const response = await axios.get("https://api.github.com/users/mapbox");
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);

        res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

        //res.json(rosterInfo);
        res.json(response.data);

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