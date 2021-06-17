module.exports = function (options) {
    // Import the mock data json file
    const mockData = require('./MOCK_DATA.json');
    
	// Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductPrice', productPrice);

    // Add the pattern functions and describe the logic inside the function
	function productPrice(msg, respond) {
		if (msg.productId) 
		{
			mockData.forEach(function(item) {
				if (item.product_id == msg.productId)
				{
					var foundProductPrice = item.product_price;
					respond(null, { result: foundProductPrice });
					console.log("#" + item.product_id + " product_price : " + foundProductPrice);
				}
			});
		}
		else
		{
			respond(null, { result: -1 });
		}
	}
}