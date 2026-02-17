## Task
https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view

## How to run the app
launch terminal and enter
```bash
 npm run build
 ```

## Project structure
Inspired by REACT
**api/**
-provide all instructions to deal with API + initial global state (data(books from API), error, loading)
**assets/** 
-contains all images that have been used in the project but the favicon
**public/**
-contains the favicon
**components/**
-provided all components that have been used in the project. They all are re-usable, mostly get props including default and have the local initial state and imported via "index.js". All components form other components/parts of the layout and finally main page (app.js).
**helpers/**
- contains function-renderer - only used for some special cases to give a prompt to the user or render some particular message.
**utils/**
- provide some features (utility functions) like work with local storage, theme-provider and counter of favorite books.
