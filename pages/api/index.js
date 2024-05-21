import dbConnect from "@/lib/mongoose";
import Place from "@/models/Place";

export default async function handler(req, res) {
  await dbConnect();

  const places = await Place.find({});
  res.status(200).json(places);
}
