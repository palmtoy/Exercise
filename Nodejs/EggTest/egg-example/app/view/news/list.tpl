<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Egg Example</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          {{ helper.relativeTime(item.time) }} --
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
        </br>
      {% endfor %}
    </ul>
  </body>
</html>
