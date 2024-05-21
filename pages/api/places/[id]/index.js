import dbConnect from "@/lib/mongoose";
import Place from "@/models/Place";

//import { places } from "../../../../lib/db.js";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }
      res.status(200).json(place);
    } catch (error) {
      res.status(400).json({ error: "Invalid place ID" });
    }
  } else if (req.method === "PATCH") {
    try {
      const place = await Place.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }
      res.status(200).json(place);
    } catch (error) {
      res.status(400).json({ error: "Failed to update place" });
    }
  } else if (req.method === "DELETE") {
    try {
      const place = await Place.findByIdAndDelete(id);
      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }
      res.status(200).json({ message: "Place deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete place" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
