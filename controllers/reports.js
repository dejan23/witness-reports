const axios = require("axios");
const parsePhoneNumber = require("libphonenumber-js");
const fs = require("fs");

exports.fetchReports = async (req, res) => {
  let { title, phone } = req.query;

  if (!title) return res.status(400).send({ error: "Must provide title" });
  if (!phone) return res.status(400).send({ error: "Must provide phone" });

  // Replace non-digit to ""
  phone = phone.replace(/\D/g, "");

  const phoneNumber = parsePhoneNumber(`+${phone}`);

  if (!phoneNumber)
    return res.status(400).send({ error: "Phone number is not valid" });

  if (!phoneNumber.isValid())
    return res.status(400).send({ error: "Phone number is not valid" });

  const country = phoneNumber.country;

  try {
    const response = await axios.get(
      `https://api.fbi.gov/wanted/v1/list?title=${title}`
    );

    if (!response.data)
      return res
        .status(400)
        .send({ error: "There was a problem fetching the results" });

    if (response.data.items && !response.data.items.length)
      return res.send({ response: "No results found" });

    for (let i = 0; i < response.data.items.length; i++) {
      response.data.items[i] = {
        ...response.data.items[i],
        client_country: country,
        client_phone: phoneNumber.number,
      };
    }

    fs.writeFileSync(
      `./reports/${country}-${title}.json`,
      JSON.stringify(response.data.items)
    );

    return res.send({ response: response.data.items });
  } catch (error) {
    console.log({ error });
    return res
      .status(400)
      .send({ error: "There was a problem fetching the results" });
  }
};
