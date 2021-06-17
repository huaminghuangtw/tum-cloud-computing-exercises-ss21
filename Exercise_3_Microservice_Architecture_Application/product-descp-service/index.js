require('seneca')()
  .use('product_descp')
  .listen({ port: 9002 });