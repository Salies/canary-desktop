import React, { useState, useEffect } from 'react';
import {
    Link
  } from "react-router-dom";
import '../styles/MusicList.css'

/*const modes = [
    "artist", //SEPARATED date, crescente, decrescent --- alphabetical, normal, reversed
    "date", //ALL crescent, decrescent
    "alphabetical" //ALL normal, reversed
];*/

const modes = ["Artist", "None"]; // Filter by:

function MusicList({libObject}) {
    const [mode, setMode] = useState("artist");
    const [data, setData] = useState(false);
    const [selectedArtist, setsa] = useState("Ayreon");

    console.log(selectedArtist);

    //maybe TODO: optimze, make so it doesn't reload everytime
    /*eslint-disable */
    useEffect(()=>{
        if(!data.albums){
            console.log("Dados em branco, carregando...");
            libObject.libClass.loadLib().then((res)=>{
                let loadedAlbums = [];
                let albums = {};
                let loadedArtists = [];
        
                res.forEach(function(song, index){
                    if(loadedAlbums.includes(song.albumid)){
                        albums[song.albumid].tracks.push({...song, index});
                        return; 
                    }
        
                    loadedAlbums.push(song.albumid);
                    albums[song.albumid] = {
                        name:"",
                        artist:"",
                        date:""
                    };

                    if(song.artist){
                        albums[song.albumid]["artist"] = song.artist[0]
                    }
                    else{
                        albums[song.albumid]["artist"] = "Undefined Artist"
                    }

                    if(mode == "artist" && !loadedArtists.includes(albums[song.albumid]["artist"])){
                        loadedArtists.push(albums[song.albumid]["artist"]);
                    }

                    if(selectedArtist && albums[song.albumid]["artist"] != selectedArtist){
                        delete albums[song.albumid];
                        loadedAlbums.splice(loadedAlbums.indexOf(song.albumid));
                        return;
                    }
        
                    if(song.album){
                        albums[song.albumid]["name"] = song.album
                    }

                    if(song.date){
                        albums[song.albumid]["date"] = song.date[0]
                    }
        
                    albums[song.albumid]["tracks"] = [];
                    albums[song.albumid]["tracks"].push({...song, index});
                });

                console.log(albums);

                const a = Object.keys(albums).map(key => 
                    <Link key={key} to={{ pathname: `/album/${key}`, state: { data: albums[key]} }}>
                    <div style={{backgroundImage:`url('${process.env.PUBLIC_URL}/cache/covers/${key}.jpg')`}}></div>
                    </Link>
                );

                let l = false;

                if(loadedArtists.length){
                    let lm = loadedArtists.map(artist => <span onClick={()=>{console.log(artist); setsa(artist);}}>{artist}</span>);
                    l = <div className="artist-list">{lm}</div>
                    //{data.artists}
                }

                setData({albums:a, artists:l});
            });
        }
    }, [data, selectedArtist]);
    /*eslint-enable */

    return (
        <div>
            {data.artists}
            <div>
                Filter by:
                <select value={mode} onChange={(e)=> setMode(e.target.value)} name="filter">
                    <option value="artist">Artist</option>
                    <option value="none">None</option>
                </select>

                Sort by (date):
                <select name="date">
                    <option value="valor1">Date (crescent)</option>
                    <option value="valor2">Date (decrescent)</option>
                    <option value="valor3">Name (A-Z)</option>
                    <option value="valor4">Name (Z-A)</option>
                    <option value="valor5">None</option>
                </select>

                Artist - Sort by (A-Z):
                <select name="date">
                    <option value="valor1">A-Z</option>
                    <option value="valor2">Z-A</option>
                    <option value="valor3">None</option>
                </select>
            </div>
            <div className="music-list albumlist">
                {data.albums}
            </div>
        </div>
    );
  }
  
  export default MusicList;