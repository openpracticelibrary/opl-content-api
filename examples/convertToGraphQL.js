const fs = require('fs');

const articles = require('./all_articles.json').variables;
const query = require('./all_articles.json').query;

const articleList = articles.map(article => {
  const { authors: [ author, ...coauthors ] } = article;
  const variableSet = {
    title: article.title,
    subtitle: article.subtitle,
    body: article.body,
    tags: article.area,
    author,
    coauthors,
    image: article.jumbotron,
    requirements: {
      time: article.time,
      people: article.people,
      difficulty: article.difficulty,
      participants: article.participants ? article.participants.join(', ') : "",
    },
    links: [{
      name: "",
      link: ""
    }],
    relatedcontent: [{
      name: "",
      link: ""
    }],
    relatedimages: [{
      name: "",
      image: ""
    }]
  };

  return Promise.resolve(variableSet);
});

Promise.all(articleList).then(list => {
  const queryList = {
    query,
    variables: list
  };

  fs.writeFile('all-articles.json', JSON.stringify(queryList, null, 2), (err) => {
    if (err) throw err;
    console.log('YOU ARE LORD OF THE JAVASCRIPT');
  });
});



