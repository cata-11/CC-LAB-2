const axios = require('axios');
const baseUrl = 'http://localhost:3001';

const search = async (req, res, next) => {
  try {
    const query = req.query.q;
    const response = await axios.get(`${baseUrl}/search?q=${query}`);
    res.json({ data: response.data });
  } catch (err) {
    next({message: err?.response?.data, status: err?.response?.status});
  }
};

module.exports = {
  search
};
