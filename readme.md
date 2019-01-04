# Article length generator

# Idea

Get the amount of words on a web page.

# Usage

Perform a **POST** or **GET** request to the site's url, with the URL from the site you would like to know the amount of words of provided as query like this:

```
https://article-length-generator.herokuapp.com?targetUrl=https://www.asite/a-article
```

The server will respond with a JSON object containing the amount of words and the url, like this:

```
{
	"amountOfWords": 2479,
	"url":"https://www.asite/a-article"
}
```
