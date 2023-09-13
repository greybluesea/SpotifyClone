"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "../../types_incl_stripe";
import UploadItem from "./UploadItem";

import Slider from "./Slider";

//@ts-ignore
import useSound from "use-sound";
import MediaItem from "./MediaItem";
import { IconType } from "react-icons";

interface CurrentSongInPlayerProps {
  song: Song;
  songUrl: string;
}

const CurrentSongInPlayer = ({ song, songUrl }: CurrentSongInPlayerProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);

  const ControlIcon: IconType = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon: IconType = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const handlePlayNext = () => {
    if (player.songs.length === 0) return;
    if (!player.activeSong) return player.setSong(player.songs[0]);

    const currentIndex = player.songs.findIndex(
      (song) => song.id === player.activeSong?.id
    );

    if (currentIndex === -1) return player.setSong(player.songs[0]);

    const nextSong =
      currentIndex + 1 < player.songs.length
        ? player.songs[currentIndex + 1]
        : player.songs[0];

    /*  const nextSong = player.songs[currentIndex + 1];
    if (!nextSong) return player.setSong(player.songs[0]);
      
    */

    player.setSong(nextSong);
  };

  const handlePlayPrevious = () => {
    if (player.songs.length === 0) return;
    if (!player.activeSong)
      return player.setSong(player.songs[player.songs.length - 1]);

    const currentIndex = player.songs.findIndex(
      (song) => song.id === player.activeSong?.id
    );

    const previousSong =
      currentIndex - 1 >= 0
        ? player.songs[currentIndex - 1]
        : player.songs[player.songs.length - 1];

    /*  const previousSong = player.songs[currentIndex - 1];
    if (!previousSong) return player.setSong(player.songs[player.songs.length - 1]);
     */

    player.setSong(previousSong);
  };

  const [play, { pause, sound: songInPlayer }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      handlePlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    songInPlayer?.play();

    return () => {
      songInPlayer?.unload();
    };
  }, [songInPlayer]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(0.5);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-between h-full max-w-4xl mx-auto">
      <MediaItem song={song} />

      <section
        id="below-sm control"
        className="
            w-[120px]
            flex 
            sm:hidden 
            space-x-4
            justify-end 
            items-center
          "
      >
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              p-1 
              grid
              place-items-center
              rounded-full 
              bg-HIGHLIGHT 
              cursor-pointer
            "
        >
          <ControlIcon
            size={30}
            className={"text-BGCOLOR " + (!isPlaying && "ml-0.5")}
          />
        </div>
        <AiFillStepForward
          onClick={handlePlayNext}
          size={46}
          className="text-NEUTRAL hover-text-highlight"
        />
      </section>

      <section
        id="above-sm control"
        className="
            hidden
            h-full
            sm:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
      >
        <AiFillStepBackward
          onClick={handlePlayPrevious}
          size={30}
          className="text-NEUTRAL hover-text-highlight"
        />
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              p-1 
              grid
              place-items-center
              rounded-full 
              bg-HIGHLIGHT 
              cursor-pointer
            "
        >
          <ControlIcon
            size={30}
            className={"text-BGCOLOR " + (!isPlaying && "ml-0.5")}
          />
        </div>
        <AiFillStepForward
          onClick={handlePlayNext}
          size={30}
          className="text-NEUTRAL hover-text-highlight"
        />
      </section>

      <section className="hidden sm:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="hover-text-highlight"
            size={34}
          />
          <Slider value={volume} handleChange={(value) => setVolume(value)} />
        </div>
      </section>
    </div>
  );
};

export default CurrentSongInPlayer;
