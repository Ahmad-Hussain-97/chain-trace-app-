// // generator end
// // when adding new asset
// // get values
// var asset_name = "";
// var asset_domain = "";
// var balance = 0;
// var producer = get(); // automatically

// // generate QR code from these values
// var qrcode(asset_name + '\n' + asset_domain + '\n');

// // show QR code to user
// ////////////////////////////////////

// // receiver end
// var rawData = scanQR();
// var parsedData = rawData.split('\n');

// alert("Asset name: " + parsedData[0] + "\n" + "Asset Domain: " + parsedData[1] + "Balance: " + parsedData[2]);