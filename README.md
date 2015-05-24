# Blinadi-express
[Express.js](http://github.com/visionmedia/express) view engine.
Прочитайте перед этим примеры от [сюда](http://github.com/blinadi/blinadiJSON).
## Установка ##

```
npm install blinadi-express
```

## Пример ##
В `app.js`:
```js
var express = require("express");
var app = express();

app.engine('bli', require("blinadi-express"));
app.set('view engine', 'bli');
app.set('views', __dirname + '/views');
app.use("/", function (req,res) {
	res.render("index", {url:req.url});
});

var http = require("http");
var server = http.createServer(app)

server.listen(3000);
```

В `views/index.bli`:
```js
({
	layout:"layout",
	tag:"h1",
	content:["Hello, world"]
})
```
Будет загружен файл `views/layout.bli`, куда будет передан объект содержащий поле `layout` в `options.body`.
`views/layout.bli`:
```js
//async
//do something async!
bli(null, {
 	tag:"html",
 	content:[{
 		imp:"head",
 		title:"Hello"
 			
 	}, {
 		tag:"body",
 		content: options.body
 }]})
```
Если файл начинается с `//async`, то в него передается callback-функция bli, как всегда - первый аргумент ошибка, второй объект.
Вы могли заметить `imp:"head"`. Сборщик импотирует файл `views/head.bli` и передаст в него поле options.heir с объектом, содержавшим `imp:"head"`.
`views/head.bli`:
```js
({
	tag:"head",
	content:[
		{tag:"title", content: options.heir.title},
		{tag:"meta", attrs:{charSet:"utf-8"}}
	]
})
```
##Что передается в .bli файл?##
* options - опции пераданные в res.render, зарезервованы поля `body` и `heir`.
* log - функция console.log. Перед выводом будет выводиться путь файлу в `[]`. 
* require - Обычная node.js require функция.

##Удачи!##