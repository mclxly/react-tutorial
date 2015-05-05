
# React Tutorial

This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html).

## 新特性
  * react v0.12.2 / d3.js / Material UI / Bootstrap
  * [react.js CDN](https://cdnjs.com/libraries/react)

### 更新列表
  * [2015-04-21]更新至react v0.13.2，并添加测试代码

### 离线转换

npm install -g react-tools
jsx --watch src/ build/

## To use

There are several simple server implementations included. They all serve static files from `public/` and handle requests to `comments.json` to fetch or add data. Start a server with one of the following:

### Node

```sh
npm install
node server.js
```

### Python

```sh
pip install -r requirements.txt
python server.py
```

### Ruby
```sh
ruby server.rb
```

### PHP
```sh
php server.php
```

### Go
```sh
go run server.go
```

And visit <http://localhost:3000/>. Try opening multiple tabs!
