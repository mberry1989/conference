import {readFileSync} from 'fs'

export default async function handler(req, res) {
    // if (req.query.secret !== process.env.NAVBUILDER_SECRET) {
    //   return res
    //     .status(401)
    //     .json({ message: "Invalid secret" });
    // }
    const map = await getPageMap()
    res.status(200).json(map);
  }

function getPageMap(){
    try {
      const data = readFileSync('./nav.json', 'utf8');
      const map = JSON.parse(data);
      return map
    } catch (err) {
      console.error(err);
    }
  }
  