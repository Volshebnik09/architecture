# Architecture v 1.1.1

Основные команды

``` json
    "dev": "concurrently --kill-others \"serve -d dist\" \"gulp -f gulp/WatchAndBuild.js\"",
    "deploy": "npm run build:production && gh-pages -d build"
```

### Что нового?

| Дата       |                              Обновление                               | 
|------------|:---------------------------------------------------------------------:|
| 4.09.2022  | Добавлен **sourceImg()** - совмещение webp и стандартного изображения |
|            |                   настроен **webpack Optimization**                   | 
|            |                      **css-loader** for webpack                       |
|            |                     **deploy** c помощью команды                      |
| 30.05.2022 |                         настроен **webpack**                          | 
| 16.05.2022 |                        первые **NPM скрипты**                         | 
|            |                             **Js minify**                             | 
|            |                         Добавлен **webpack**                          | 
|            |                       Добавлен **autoprefixer**                       | 
| 15.05.2022 |                        Добавлен **sass-glob**                         | 
|            |                       Добавлены **gulp файлы**                        | 