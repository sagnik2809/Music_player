const music= document.querySelector('audio');
        const img=document.querySelector("img");
        const play = document.getElementById('play');
        const artist = document.getElementById('artist');
        const title = document.getElementById('title');
        const prev = document.getElementById('prev');
        const next = document.getElementById('next');

        let progress = document.getElementById('progress');
        let total_duration = document.getElementById('duration');
        let current_time = document.getElementById('current_time');
        let progress_div = document.getElementById('progress_div');
        let remain_time = document.getElementById('remain_time');
        let tot_currentTime;
        let tot_Remain_Time;
        let isAnime = false;
        const songs= [
            {
            name:"song1",
            title:"CHALTE CHALTE",
            artist:"Kishore Kumar",
            image:"img1"
            },
            {
                name:"song2",
                title:"Yeh Chand Sa Roshan Chehra",
                artist:"Mohammad Rafi", 
                image:"img2"
            },
            {
            name:"song3",
            title:"Yeh Dosti",
            artist:"Kishore Kumar & Manna Dey", 
            image:"img3"
            }
        ];
        
       let isPlaying = false;

       /* for PLAY function*/
        const playMusic= () => {
            isPlaying = true;
            music.play();            

            play.classList.remove("fa-play");
            play.classList.add("fa-pause");
            img.classList.add("anime");
            isAnime =true;
            
            
        };

        /* for PAUSE function */

        const pauseMusic=() => {
            isPlaying = false;
            isAnime = true;
            music.pause();            

            play.classList.remove("fa-pause");
            play.classList.add("fa-play");
            img.classList.remove("anime");
        };

        play.addEventListener('click', () =>{
            if(isPlaying)
            {
                pauseMusic();
            }

            else
            {
                playMusic();
            }
        });
        img.addEventListener('click', () =>{
            if(isAnime == true)
            {
            img.classList.remove("anime");
            isAnime = false;
            
            }
            else if(isAnime == false)
            {
                img.classList.add("anime");
                isAnime = true;
            }
            
        });

        

        /* changing the music data */

        const loadSong = (songs) => {
            title.textContent = songs.title;
            artist.textContent = songs.artist;
            music.src= songs.name+".mp4";
            img.src = songs.image+".png";


        };
        songIndex=0;
       

        const nextSong = () => {
            
            songIndex = (songIndex + 1)%songs.length;
            loadSong(songs[songIndex]);
            playMusic();

        };

            const prevSong = () => {
                songIndex = (songIndex - 1 + songs.length)% songs.length;
                loadSong(songs[songIndex]);
                playMusic();
        };

        /* progress js working */
        let isCurrent = true;

        music.addEventListener('timeupdate',(event) => {
                const { currentTime, duration } = event.srcElement;
                
                let progress_time = (currentTime / duration)*100;
                progress.style.width = `${progress_time}%`;

               // music duration update 
               
               let min_duration = Math.floor(duration / 60);
               let sec_duration = Math.floor(duration % 60);

               let tot_duration = `${min_duration}:${sec_duration}`;

               if(duration)
               {
               total_duration.textContent = `${tot_duration}`;
               }

                // current duration update 
               
                let min_currentTime = Math.floor(currentTime / 60);
                let sec_currentTime = Math.floor(currentTime % 60);


                if(sec_currentTime<10)
                {
                    sec_currentTime = `0${sec_currentTime}`;
                }
                 tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
                                      
                    
            // Remaining time update

                remain_time = duration - currentTime;
                let min_Remain_Time = Math.floor((remain_time) / 60);
                let sec_Remain_Time = Math.floor((remain_time) % 60);


                if(sec_Remain_Time<10)
                {
                    sec_Remain_Time = `0${sec_Remain_Time}`;
                }
                 tot_Remain_Time = `-${min_Remain_Time}:${sec_Remain_Time}`;
                 if(currentTime + remain_time == duration)
                 {
                 current_time.textContent = `${tot_currentTime}/${tot_Remain_Time}`;
                 }
                });

         // real time progress on click functionality

         progress_div.addEventListener('click',(event)=>{

            const { duration } = music;
            let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

            music.currentTime = move_progress;
         });
         // next song will be played automatically when current song ends
         music.addEventListener('ended',nextSong);
        

        next.addEventListener('click',nextSong);
        prev.addEventListener('click',prevSong);

        
        
       