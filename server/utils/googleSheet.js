// Google sheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet');

// File handling package
const fs = require('fs');

// spreadsheet key is the long id in the sheets URL
const RESPONSES_SHEET_ID = '1DZWUZoi20pskP95oNikTEVl2gXO1USHWWsKiV39wTm0';

// Create a new document
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

// Credentials for the service account
const CREDENTIALS = JSON.parse(
  fs.readFileSync('micro-liberty-356812-ceba2dbe7c27.json')
);

const addRow = async (row) => {
  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });

  await doc.loadInfo();

  // Index of the sheet
  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow(row);
};

module.exports = { addRow };
