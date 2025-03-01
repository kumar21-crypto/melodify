# Melodify

Melodify is a music streaming application built with React and Vite. It allows users to browse, search, and play songs, albums, and artists. Users can also like songs, add playlists, and view their profile.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse and search for songs, albums, and artists
- Play, pause, and seek songs
- Like songs and add playlists
- View user profile
- Responsive design

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/melodify.git
cd melodify
```

2. Install dependencies:
```sh
npm install
```

4. Create a .env file in the root directory and add your Firebase configuration:
```sh
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
4.  Start the development server:
```sh
npm run dev
```

## Usage
1. Open your browser and navigate to http://localhost:3000.
2. Browse and search for songs, albums, and artists.
3. Play, pause, and seek songs using the audio player.
4. Like songs and add playlists.
5. View your profile and liked songs.

## Project Structure
```sh
 .gitignore
eslint.config.js
index.html
package.json
public/
  muisc_wave.webm
  vite.svg
README.md
src/
  App.css
  App.jsx
  assets/
    profile.svg
    react.svg
  components/
    Api.jsx
    constants.jsx
    ContextApi.jsx
    Header.jsx
    Layout.jsx
    Maincontainer.jsx
    SearchContext.jsx
  firebase/
    AuthenticationContext.jsx
    firebase.js
    Login.jsx
    Signup.jsx
    UserContext.jsx
  homecategory/
    AllCategory.jsx
  index.css
  lottie/
    music-wave.json
  main.jsx
  pages/
    ...
  parts/
    AlbumDetail.jsx
    AlbumCard.jsx
    ArtistsDetail.jsx
    HomeSelector.jsx
    HomeSlider.jsx
  player/
    AudioContext.jsx
    AudioPlayer.jsx
vite.config.js
```

## Api endpoints
The application uses the following API endpoints:

1. https://www.jiosaavn.com/api.php? - Base URL for JioSaavn API
2. https://saavn.dev/api/albums?link= - Fetch album details
2. https://saavn.dev/artists?id= - Fetch artist details
4. https://saavn.dev/api/playlists?id= - Fetch playlist details
5. https://saavn.dev/api/search?query= - Search for songs, albums, and artists


## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: git checkout -b my-feature-branch.
3. Make your changes and commit them: git commit -m 'Add some feature'.
4. Push to the branch: git push origin my-feature-branch.
5. Submit a pull request.


## Licence
This project is licensed under the MIT License. See the LICENSE file for details

Feel free to customize the `README.md` file as needed for your project.
Feel free to customize the `README.md` file as needed for your project.
