import Grievance from "../models/Grievance.js";

export const create = async (req, res) => {
  const data = await Grievance.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(data);
};

export const getAll = async (req, res) => {
  const data = await Grievance.find({ userId: req.user.id });
  res.json(data);
};

export const getOne = async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
};

export const update = async (req, res) => {
  const data = await Grievance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

export const remove = async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

export const search = async (req, res) => {
  const data = await Grievance.find({
    title: { $regex: req.query.title, $options: "i" }
  });
  res.json(data);
};