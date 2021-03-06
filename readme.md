<h1 align=center><img src="static/Icon.png" width=50/> Pixiv Deck</h1>


> :two_hearts: :two_hearts: pixiv client for Desktop like TweetDeck :two_hearts: :two_hearts:


## Screenshot

### Main

<img src="media/main.png"/>

### Scroll

<img src="media/scroll.gif"/>

### Move

<img src="media/move.gif"/>

### Lightbox

<img src="media/lightbox.gif"/>

### Add Column

<img src="media/add.gif"/>

## Download

### MacOS
[Download](https://github.com/akameco/PixivDeck/releases), unzip and `PixivDeck.app` to the `~/Applications` directory.


### Windows
[Download](https://github.com/akameco/PixivDeck/releases) and unzip to some location.


### Linux
[Download](https://github.com/akameco/PixivDeck/releases) and unzip to some location.


## Dev
Built with [Electron](http://electron.atom.io/).

Only MacOS.

Run this two commands simultaneously in different console tabs.

```
$ npm run watch
$ npm start
```

### Commands

- Install flowtype: `brew install flow`
- Init: `$ npm install`
- Run: `$ npm start`
- Build renderer process: `$ npm run watch`

## Build

Build renderer process and main process.

```
$ npm run build
```

## Package
Package for your OS.

```
$ npm run pack:macos
$ npm run pack:windows
$ npm run pack:linux
```

Package all(MacOS).

```
$ brew install wine
$ npm run pack
```

remove release directory && Package all && zip all.

```
$ npm run release
```


## Related

[pixiv-app-api](https://github.com/akameco/pixiv-app-api) - Promise base pixiv API client <br>
[pixiv-img](https://github.com/akameco/pixiv-img) - Download pixiv image. <br>
[pixiv-dl](https://github.com/akameco/pixiv-dl) - CLI base pixiv image downloader. <br>
[pixiv.js](https://github.com/akameco/pixiv) - pixiv public api client(deprecated) <br>

## License

MIT © [akameco](http://akameco.github.io)
