import dbConnect from "@/lib/mongoose";
import Place from "@/models/Place";

//import { places } from "../../../lib/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const places = await Place.find({});
      res.status(200).json(places);
    } catch (error) {
      res.status(400).json({ error: "Failed to fetch places" });
    }
  } else if (req.method === "POST") {
    try {
      const place = new Place(req.body);
      await place.save();
      res.status(201).json(place);
    } catch (error) {
      res.status(400).json({ error: "Failed to add place" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
