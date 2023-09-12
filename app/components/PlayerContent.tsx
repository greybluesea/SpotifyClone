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

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.songs.length === 0) {
      return;
    }

    const currentIndex = player.songs.findIndex(
      (song) => song === player.activeSong
    );
    const nextSong = player.songs[currentIndex + 1];

    if (!nextSong) {
      return player.setSong(player.songs[0]);
    }

    player.setSong(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.songs.length === 0) {
      return;
    }

    const currentIndex = player.songs.findIndex(
      (song) => song === player.activeSong
    );
    const previousSong = player.songs[currentIndex - 1];

    if (!previousSong) {
      return player.setSong(player.songs[player.songs.length - 1]);
    }

    player.setSong(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-between h-full max-w-5xl mx-auto">
      <MediaItem song={song} />

      <div
        className="
            flex 
            sm:hidden 
            space-x-5
            w-full 
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
          <Icon size={30} className="text-BGCOLOR" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={46}
          className="text-NEUTRAL hover-text-highlight"
        />
      </div>

      <div
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
          onClick={onPlayPrevious}
          size={30}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
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
          <Icon size={30} className="text-BGCOLOR" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-NEUTRAL hover-text-highlight"
        />
      </div>

      <div className="hidden sm:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
