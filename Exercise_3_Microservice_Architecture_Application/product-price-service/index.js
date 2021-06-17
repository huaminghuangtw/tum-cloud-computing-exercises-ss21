require('seneca')()
  .use('product_price')
  .listen({ port: 9003 });