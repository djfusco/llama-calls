import axios from 'axios';

export default async function handler(req, res) {
    const searchFinal = req.query.search || '';    
    try {
        const apiKey = process.env.PIC_KEY;
        const data = {
            "model": "dall-e-3",
            "prompt": searchFinal,
            "n": 1,
            "size": "1024x1024"        
        };

        const response = await axios.post("https://api.openai.com/v1/images/generations ", data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            }
        });

        res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
        console.log(response.data);
        res.json(response.data);
        
      } catch (error) {
        console.error(error);
      }
  }