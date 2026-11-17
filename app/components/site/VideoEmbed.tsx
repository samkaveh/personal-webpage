"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "../../lib/asset";

type Props = {
  videoId: string;
  title: string;
  label?: string;
  poster?: string;
};

export default function VideoEmbed({
  videoId,
  title,
  label = "Watch the talk",
  poster = "/art/talk-poster.svg",
}: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-ratio">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="video-poster"
          onClick={() => setPlaying(true)}
          aria-label={`${label} — ${title}`}
        >
          <Image
            src={asset(poster)}
            alt=""
            width={1280}
            height={720}
            role="presentation"
            className="video-poster-art"
          />
          <span className="video-poster-veil" aria-hidden="true" />
          <span className="video-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" focusable="false">
              <path d="M9.6 7.4 17 12l-7.4 4.6Z" fill="currentColor" />
            </svg>
          </span>
          <span className="video-poster-label">{label}</span>
        </button>
      )}
    </div>
  );
}
