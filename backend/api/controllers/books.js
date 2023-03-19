const axios = require('axios');
const baseUrl = 'http://localhost:3000';

const getAllBooks = async (req, res, next) => {
  try {
    const response = await axios.get(`${baseUrl}/books`);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data?.error, status: err?.response?.status});
  }
};

const getBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${baseUrl}/books?id=${id}`);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data?.error, status: err?.response?.status});
  }
};

const createBook = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await axios.post(`${baseUrl}/books`, data);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data?.error, status: err?.response?.status});
  }
};

const createBookToId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await axios.post(`${baseUrl}/books?id=${id}`, data);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data?.error, status: err?.response?.status});
  }
};

const updateBooks = async (req, res, next) => {
  try {
    const response = await axios.put(`${baseUrl}/books`);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data?.error, status: err?.response?.status});
  }
};

const updateBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await axios.put(`${baseUrl}/books?id=${id}`, data);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data?.error, status: err?.response?.status});
  }
};

const deleteBooks = async (req, res, next) => {
  try {
    const response = await axios.delete(`${baseUrl}/books`);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data?.error, status: err?.response?.status});
  }
};

const deleteBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await axios.delete(`${baseUrl}/books?id=${id}`);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data?.error, status: err?.response?.status});
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  createBookToId,
  updateBooks,
  updateBookById,
  deleteBooks,
  deleteBookById
};
