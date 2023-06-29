let songIndex = 0;
let audioElement = new Audio('mysongs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "4-Din",filePath: "mysongs/1.mp3", coverPath: "mycovers/4-Din(mc_square).jpg"},
    {songName: "Aam Munde",filePath: "mysongs/2.mp3", coverPath: "mycovers/Aam-Jahe-Munde (Parmish-Verma).jpg"},
    {songName: "Aankh",filePath: "mysongs/3.mp3", coverPath: "mycovers/Aankh.jpg"},
    {songName: "Agar Tum ",filePath: "mysongs/4.mp3", coverPath: "mycovers/Agar_Tum_Saath_Ho.jpg"},
    {songName: "Born To Shine",filePath: "mysongs/5.mp3", coverPath: "mycovers/Born-To-Shine -(Diljit-Dosanjh).jpg"},
    {songName: "Chand",filePath: "mysongs/6.mp3", coverPath: "mycovers/Chand(Masoom-Sharma).jpg"},
    {songName: "HumainTumse",filePath: "mysongs/7.mp3", coverPath: "mycovers/Humein-Tumse_Hua-Hai-Pyar.jpg"},
    {songName: "Humko Humise",filePath: "mysongs/8.mp3", coverPath: "mycovers/Humko-Humise-ChuraLo.jpg"},
    {songName: "Naam Tera",filePath: "mysongs/9.mp3", coverPath: "mycovers/Naam-Tera(Ndee-Kundu).jpg"},
    {songName: "Warriyo Mortals",filePath: "mysongs/10.mp3", coverPath: "mycovers/Warriyo_Mortals.jpg"},
]

songItems.forEach((element, i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//   update the progress bar according to the time
audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

//  update the song where we want
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

//  convert play to pause and pause to play on click another button 
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

//  convert all pause button to play butten 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `mysongs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

//  next song by next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `mysongs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.currentTime = 0;
})

//  previous song by previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `mysongs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.currentTime = 0;
})