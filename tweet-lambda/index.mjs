import fetch from 'node-fetch';

export const handler = async (event) => {
  console.log('I am starting to tweet your articles...');
  console.log('event ', event);

  const articlesResponse = await fetch('http://65.2.131.53:3000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: [
      {
        tweet:
          "I Don't Understand Cookies! Read about fundamentals of Cookies in #WebDevelopment https://javascript.plainenglish.io/i-dont-understand-cookies-ff8b7d933bb2?sk=a0f0b3a15e3ce8a702752084bf3064ba",
        tags: '#Blog #Article #JavaScript #HTML5 #web #medium',
      },
    ],
  });

  const articles = await articlesResponse.json();
  console.log('articles ', articles);
};
