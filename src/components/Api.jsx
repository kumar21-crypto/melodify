import axios from "axios"

const BASE_URL = "https://www.jiosaavn.com/api.php?";
const API_STRING = "&_format=json&_marker=0&api_version=4&ctx=web6dot0";
const SEARCH_API_STRING = "&_format=json&_marker=0&api_version=4&ctx=web6dot0&q=";
const BASE_DETAIL_URL = "https://saavn.dev/api/albums?link=";
const BASE_ARTIST_DETAIL_URL = "https://saavn.dev/artists?id=";
const BASE_PLAYLIST_DETAIL_URL = "https://saavn.dev/api/playlists?id=";
const BASE_SEARCH_ALL_URL = "https://saavn.dev/api/search?query=";
const BASE_SONG_DETAIL_URL = "https://saavn.dev/songs?link=";
const ARTIST_SAAVAN_DETAIL_URL = "&type=artist&p=0&n_song=50&n_album=50&sub_type=&category=&sort_order=&includeMetaTags=0&ctx=wap6dot0&api_version=4&_format=json&_marker=0";
const BASE_ALBUM_ID = "&cc=in&albumid=";
const BASE_PLAYLIST_ID = "&cc=in&listid=";
const ARTISTS_TOKEN = "&token=";
const CORS_URL = "https://corsproxy.io/?";
const ALLOW_ORIGIN = "https://cors-anywhere.herokuapp.com/";
const THINGS_CORS = "https://thingproxy.freeboard.io/fetch/";

export const endpoints = {
    'homeData': '__call=webapi.getLaunchData',
    'topSearches': '__call=content.getTopSearches',
    'fromToken': '__call=webapi.get',
    'featuredRadio': '__call=webradio.createFeaturedStation',
    'artistRadio': '__call=webradio.createArtistStation',
    'entityRadio': '__call=webradio.createEntityStation',
    'radioSongs': '__call=webradio.getSong',
    'songDetails': '__call=song.getDetails',
    'playlistDetails': '__call=playlist.getDetails',
    'albumDetails': '__call=content.getAlbumDetails',
    'getResults': '__call=search.getResults',
    'albumResults': '__call=search.getAlbumResults',
    'artistResults': '__call=search.getArtistResults',
    'playlistResults': '__call=search.getPlaylistResults'
}



export const fetchDataFromApi = async (endpoint) => {

    endpoint = endpoints['homeData'];
    const { data } = await axios.get(`${BASE_URL}${endpoint}${API_STRING}`,{
   
    });

    return data;
}

export const fetchAlbumDetailData = async (link) => {
   const { data } = await axios.get(`${BASE_DETAIL_URL}${link}`,{});
    return data;
}



// export const fetchPlaylistData = async (id) => {
//    const { data } = await axios.get(`${BASE_URL}${endpoints['playlistDetails']}${BASE_PLAYLIST_ID}${id}${API_STRING}`,{
//       headers:{
         
//       }
//    });
//     return data;
// }



// export const fetchDetailDataFromApi = async (link) => {

//     const {data} = await axios.get(`${BASE_DETAIL_URL}${link}`);
//     return data;
//  }

//  export const fetchArtistDetailById = async (id) => {

//     const {data} = await axios.get(`${BASE_ARTIST_DETAIL_URL}${id}`);
//     return data;
//  }

 export const fetchPlaylistByID = async (id) => {
    const data = await fetch(`${BASE_PLAYLIST_DETAIL_URL}${id}`);
    return await data.json();
 }

 export const searchByQuery = async (query) => {
    const {data} = await axios.get(`${BASE_SEARCH_ALL_URL}${query}`);
    return data;
 }

//  export const fetchSongDetailDataByLink = async (link) => {
//    const {data} = await axios.get(`${BASE_SONG_DETAIL_URL}${link}`);
//    return data;
//  }

 export const searchByQuerySaavn = async (query) => {
   const {data} = await axios.get(`${BASE_URL}${endpoints['getResults']}${SEARCH_API_STRING}${query}`);
   return data;
}

// export const fetchArtistSaavanDetail = async (token) => {
//    const {data} = await axios.get(`${BASE_URL}${endpoints['fromToken']}${ARTISTS_TOKEN}${token}${ARTIST_SAAVAN_DETAIL_URL}`);
//    return data;
// }