import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:8001/workshops/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        title: 'When you get lost in API testing',
        desc: "The toughest part is probably to figure out which type of tests to write and how to test some specific logic in your app - but don't give up! Paula will present a few tips she learned along the way that will hopefully make your life easier. In this talk, you will hear about different test types and when to use them, real examples based on PHPUnit and Postman, followed by some tools for checking the test quality",
        price: 350,
        date: '2020-01-26T13:51:50.417-07:00',
        category: 'backend',
        userId: 1,
        imageUrl: 'https://pbs.twimg.com/media/EREoip3XsAEPDRp.jpg',
      }),
    );
  }),
  rest.get('http://localhost:8001/categories', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(['marketing', 'backend', 'frontend', 'design']),
    );
  }),
  rest.get('http://localhost:8001/workshops', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: 'When you get lost in API testing',
          desc: "The toughest part is probably to figure out which type of tests to write and how to test some specific logic in your app - but don't give up! Paula will present a few tips she learned along the way that will hopefully make your life easier. In this talk, you will hear about different test types and when to use them, real examples based on PHPUnit and Postman, followed by some tools for checking the test quality",
          price: 350,
          date: '2020-01-26T13:51:50.417-07:00',
          category: 'backend',
          userId: 1,
          imageUrl: 'https://pbs.twimg.com/media/EREoip3XsAEPDRp.jpg',
        },
      ]),
    );
  }),
];
