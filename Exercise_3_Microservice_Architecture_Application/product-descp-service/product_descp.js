module.exports = function (options) {
    // Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    // Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductURL', productURL);
    this.add('role:product,cmd:getProductName', productName);

    // Add the pattern functions and describe the logic inside the function
	function productURL(msg, respond) {
		if (msg.productId) 
		{
			mockData.forEach(function(item) {
				if (item.product_id == msg.productId)
				{
					var foundProductURL = item.product_url;
					respond(null, { result: foundProductURL });
					console.log("#" + item.product_id + " product_url : " + foundProductURL);
				}
			});
		}
		else
		{
			respond(null, { result: -1 });
		}
	}

	function productName(msg, respond) {
		if (msg.productId) 
		{
			mockData.forEach(function(item) {
				if (item.product_id == msg.productId)
				{
					var foundProductName = item.product_name;
					respond(null, { result: foundProductName });
					console.log("#" + item.product_id + " product_name : " + foundProductName);
				}
			});
		}
		else
		{
			respond(null, { result: -1 });
		}
	}
}