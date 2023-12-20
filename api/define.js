import axios from 'axios';

export default async function handler(req, res) {
    const search = req.query.search || '';    
    try {
        const searchFinal = 'give me a defintion for this - ' + req.query.search;
        const apiKey = process.env.CHAGPT_KEY;
        const data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": searchFinal}],
            "temperature": 0.7
        };

        const response = await axios.post("https://api.openai.com/v1/chat/completions", data,
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
        console.log(response.data.choices[0].message.content);
        res.json(response.data.choices[0].message.content);
        
      } catch (error) {
        console.error(error);
      }
  }