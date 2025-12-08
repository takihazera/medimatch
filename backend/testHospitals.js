const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:5000/api/hospitals', {
      name: "City Hospital",
      address: "Dhaka",
      rating: 4.2,
      tests: [{ testName: "CBC", price: 500 }]
    });
    console.log(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

test();
