console.log("Welcome")

//Play song
//Initialize var
let SongIndex=0; //the song will initially start from The first one
let masterPlay=document.getElementById('masterplay');
let myProgressbar=document.getElementById('myProgressBar');  
let gif=document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
let audioElement = new Audio('songs/1.mp3');
// audioElement.play();
//Handle play pause
//listen to Events
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
         gif.style.opacity=1;
    }
    else{
        audioElement.pause();
         masterPlay.classList.remove('fa-pause-circle');
         masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
audioElement.addEventListener('timeupdate',()=>{
//Update seekbar
progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressbar.value=progress;
})
myProgressbar.addEventListener('change',()=>{
audioElement.currentTime=myProgressbar.value*audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        let clickedIndex = parseInt(e.target.id);

        if (SongIndex === clickedIndex && !audioElement.paused) {
            // 🔄 Same song is clicked and it's playing → pause it
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        } else {
            // ▶️ New song or replay
            makeAllPlays(); // reset all icons
            SongIndex = clickedIndex;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${SongIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});
let backward=document.getElementById('back');
backward.addEventListener('click',()=>{
    if(SongIndex==0){
        audioElement.currentTime=0;
        audioElement.play();
    }
    else{
    SongIndex=SongIndex-1;
    audioElement.src = `songs/${SongIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    }
})
//Forward button
let forward=document.getElementById('forward');
forward.addEventListener('click',()=>{
    if(SongIndex==songs.length){
        audioElement.currentTime=0;
        audioElement.play();
        SongIndex=0;
    }
    else{
        SongIndex=SongIndex+1;
        audioElement.src=`songs/${SongIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
    }
})