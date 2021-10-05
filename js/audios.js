const list_container = document.getElementById("list-container")
const audio = document.getElementById("audio");
const play_btn = document.getElementById("play-btn")
const next_btn = document.getElementById("next-btn")
const prev_btn = document.getElementById("prev-btn")
const cover_card_img = document.getElementById("cover-card-img");
const title_card = document.getElementById("title-card");
const vol_up_btn = document.getElementById("vol-up")
const vol_down_btn = document.getElementById("vol-down")
let is_playing = false;
const canciones = [ 
    {
        id:1, 
        title:"Karmadame",
        artist:"Zoe",
        audio:"audio/karmadame.mp3",
        cover:"img/portadas/karmadame.jpg"
    },
    {
        id:2, 
        title:"Canción de cuna para Marte",
        artist:"Zoe",
        audio:"audio/cdcpm.mp3",
        cover:"img/portadas/cdcpm.jpg"
    },
    {
        id:3, 
        title:"Rue vieille du temple",
        artist:"León Larregui - Mon Laferte",
        audio:"audio/dutemple.mp3",
        cover:"img/portadas/rvdt.jpg"
    },
    {
        id:4, 
        title:"Locos",
        artist:"León Larregui",
        audio:"audio/locos.mp3",
        cover:"img/portadas/locos.jpg"
    },
    {
        id:5, 
        title:"Popular",
        artist:"Zoe",
        audio:"audio/popular.mp3",
        cover:"img/portadas/popular.jpg"
    },
]
canciones.forEach((e)=>{
    list_container.insertAdjacentHTML("beforeend",
    `<div class="list-item" id="${e.id}">
          <img class= "cover" src="${e.cover}" alt="${e.title}">
          <div class="music-data">
                <div>${e.title}</div>
                <div>${e.artist}</div>
          </div>
    </div>`
    )
})
const play_card = (obj_audio)=>{
    cover_card_img.src = obj_audio.cover;
}
const play_audio = (id) => {
    const res = canciones.find((e) => e.id == id)
    if (res)
    {
        audio.src = res.audio
        title_card.innerHTML = res.title;
        audio.play();
        play_card(res);
        animation_active();
        is_playing=true;
        play_btn.innerHTML="pause" 
    }
}
const animation_active = () => {
    if(is_playing)
    {
        cover_card_img.style.animationPlayState = "running";
    }
    else{
    cover_card_img.style.animationPlayState = "paused";
    }
}

list_container.addEventListener("click",(e) => {
    if(e.target.matches(".list-item"))
    {
        play_audio(e.target.id);
    }
    else if(e.target.matches(".cover"))
    {
        play_audio(e.target.parentNode.id);
    }
    else if(e.target.matches(".music-data"))
    {
        play_audio(e.target.parentNode.id);
    }
    else if(e.target.matches(".music-data div"))
    {
        play_audio(e.target.parentNode.parentNode.id);
    }

});

vol_up_btn.addEventListener("click", () =>{
    audio.volume = audio.volume + 0.1;
})
vol_down_btn.addEventListener("click", () =>{
    audio.volume = audio.volume - 0.1;
})

play_btn.addEventListener('click',() => {
    if(is_playing)
    {
       audio.pause();
       is_playing=false;
       play_btn.innerHTML="play"
    }
    else{
        audio.play();
        is_playing=true;
        play_btn.innerHTML="pause"
    }
    console.log(is_playing);
    animation_active();
}); 

window.addEventListener("load",()=>{
    const progress = document.getElementById("progreso-barra")
    
    progress.min = 0
    window.setInterval(() => {
    progress.value = audio.currentTime;
    }, 1000);

    progress.addEventListener("change", ()=>{
        audio.currentTime = progress.value;
    })
})
let index = 1;
next_btn.addEventListener("click", ()=> {
    index++;
    play_audio(index)
})
prev_btn.addEventListener("click", () => {
    if(index > 0)
    {
        index--;
        play_audio(index)
    }
});
renderizar_canciones(canciones);

const search_input = document.getElementById("search-input");

search_input.addEventListener("keyup", (event) => {
 let  filtrado = canciones.filter((e) =>
  e.title.toLocaleLowerCase().includes(search_input.value.toString().toLocaleLowerCase()));
     renderizer_canciones(filtrado);
});