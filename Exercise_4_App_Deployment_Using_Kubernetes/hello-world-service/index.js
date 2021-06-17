require('seneca')()
  .use('helloWorld')
  .listen({ port: 9001 });