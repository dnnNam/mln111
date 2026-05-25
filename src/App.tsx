import { useState, useEffect, useRef } from "react";
import story from "./data/story";
import "./App.css";
import funnySound from "./audio/0525(2).mp4"
import type { Story } from "./types/story";
import { motion, AnimatePresence } from "framer-motion";
const typedStory = story as Story;

function App() {
  const [currentScene, setCurrentScene] = useState<string>("start");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  const scene = typedStory[currentScene];

  // Khi đổi scene: dừng audio cũ, load audio mới, auto-play
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  audio.pause();
   audio.currentTime = 0;
  setIsPlaying(false);

  if (scene.audio) {
    audio.src = scene.audio;
    audio.volume = volume;
    audio.load();
  } else {
    audio.src = "";
  }
}, [currentScene]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !scene.audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  const handleChoice = async (index: number, next: string) => {
  if (selectedChoice !== null) return;

  const bgAudio = audioRef.current;
    const clickAudio = clickAudioRef.current;
  
  // DỪNG audio page
  if (bgAudio) {
    bgAudio.pause();
    bgAudio.currentTime = 0;
    setIsPlaying(false);
  }

  // PHÁT voice choice
  if (clickAudio) {
    clickAudio.src = funnySound;
    clickAudio.currentTime = 0;

    try {
      await clickAudio.play();
    } catch (err) {
      console.log(err);
    }
  }

  setSelectedChoice(index);

  setTimeout(() => {
    setCurrentScene(next);
    setSelectedChoice(null);
  }, 300);
};

  const sceneKeys = Object.keys(typedStory);
  const sceneIndex = sceneKeys.indexOf(currentScene);
  const progressPct = Math.round(((sceneIndex + 1) / sceneKeys.length) * 100);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-[Be_Vietnam_Pro,sans-serif]">

      {/* Hidden audio element */}
      <audio ref={audioRef} loop />
      <audio ref={clickAudioRef} />

      {/* Full-screen background */}
      {scene.background ? (
       <AnimatePresence mode="wait">
  {scene.background ? (
    <motion.img
      key={scene.background}
      src={scene.background}
      className="absolute inset-0 w-full h-full object-cover object-bottom"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    />
  ) : (
    <motion.div
      key="bg"
      className="absolute inset-0 bg-[#0a0c14]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
      ) : (
        <div className="absolute inset-0 bg-[#0a0c14]" />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_130%_130%_at_50%_50%,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

      {/* Gradient tối phía trái — nền cho dialog */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_left,transparent_55%,rgba(0,0,0,0.5)_72%,rgba(0,0,0,0.8)_100%)]" />

      {/* Top HUD fade */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent)]" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.018)_3px,rgba(0,0,0,0.018)_4px)]" />

      {/* ── Top HUD ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-20">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#e05252] animate-blink" />
          <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#e05252]">
            Livestream
          </span>
        </div>
        <span className="text-xs text-white/50 tracking-wide">👁 20.000 đang xem</span>
      </div>

      {/* ── Left-side dialog column ── */}
      <div className="absolute top-0 left-0 bottom-0 z-20 w-[420px] flex flex-col justify-center px-6 py-16">
        <div className="flex flex-col gap-3">

          {/* Title + Audio controls row */}
          <div className="mb-1 flex items-start justify-between gap-3">
            <div>
              <h1 className="font-[Playfair_Display,Georgia,serif] text-4xl font-black text-white leading-tight [text-shadow:0_2px_24px_rgba(0,0,0,1)]">
                Một Đêm Viral
              </h1>
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/35 mt-1.5 [text-shadow:0_1px_8px_rgba(0,0,0,1)]">
                Câu chuyện kinh doanh · Tập 1
              </p>
            </div>

            {/* Audio player */}
            {scene.audio && (
              <div className="flex flex-col items-center gap-2 mt-1 shrink-0">
                {/* Play / Pause button */}
                <button
                  onClick={togglePlay}
                  className={[
                    "size-10 rounded-full border flex items-center justify-center",
                    "transition-all duration-200 backdrop-blur-md",
                    isPlaying
                      ? "bg-white/15 border-white/30 text-white hover:bg-white/22"
                      : "bg-white/8 border-white/15 text-white/70 hover:bg-white/15 hover:text-white",
                  ].join(" ")}
                  title={isPlaying ? "Tạm dừng" : "Phát nhạc"}
                >
                  {isPlaying ? (
                    /* Pause icon */
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <rect x="2" y="1" width="4" height="12" rx="1" />
                      <rect x="8" y="1" width="4" height="12" rx="1" />
                    </svg>
                  ) : (
                    /* Play icon */
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M3 1.5L12 7L3 12.5V1.5Z" />
                    </svg>
                  )}
                </button>

                {/* Volume slider */}
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-10 accent-white/60 cursor-pointer"
                  style={{ writingMode: "vertical-lr", direction: "rtl", height: 52 }}
                  title="Âm lượng"
                />

                {/* Volume icon */}
                <span className="text-[10px] text-white/25">
                  {volume === 0 ? "🔇" : volume < 0.4 ? "🔈" : "🔊"}
                </span>
              </div>
            )}
          </div>

          {/* Glass dialog panel */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[rgba(5,7,14,0.80)] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]">

            {/* Scene text */}
            <div className="px-6 pt-5 pb-4 border-b border-white/[0.07]">
                        <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[15px] leading-[1.85] text-white/70 whitespace-pre-line">
              {scene.text}
            </p>
          </motion.div>
            </div>

            {/* Choices */}
           <div className="px-5 py-4 flex flex-col gap-2">
  {(scene?.choices?.length ?? 0) > 0 ? (
    scene?.choices?.map((choice, index) => (
      <motion.button
        key={index}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => handleChoice(index, choice.next)}
        disabled={selectedChoice !== null}
        className={[
          "text-left w-full rounded-xl px-5 py-3.5 flex items-center gap-4",
          "border text-[14px] font-medium leading-snug",
          "transition-all duration-200 disabled:cursor-default",

          selectedChoice === index
            ? "bg-white/18 border-white/35 text-white translate-x-2"
            : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10",
        ].join(" ")}
      >
        {/* số thứ tự */}
        <span className="text-[11px] font-bold tracking-[0.1em] text-white/25 w-5 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* text */}
        <span className="flex-1">{choice.text}</span>

        {/* icon */}
        <span
          className={[
            "text-sm shrink-0 transition-all duration-200",
            selectedChoice === index
              ? "text-white/70"
              : "text-white/20",
          ].join(" ")}
        >
          {selectedChoice === index ? "✓" : "→"}
        </span>
      </motion.button>
    ))
  ) : (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setCurrentScene("start")}
      className="w-full rounded-xl px-5 py-3.5 border border-white/20 bg-white/8 text-white/80 text-[14px] font-medium text-center hover:bg-white/15 hover:text-white transition-all duration-200"
    >
      🔄 Chơi lại từ đầu
    </motion.button>
  )}
</div>

            {/* Footer with progress bar */}
            <div className="flex items-center justify-between px-6 py-2.5 border-t border-white/[0.06] bg-black/20">
              <div className="flex items-center gap-2 text-[11px] text-white/25 tracking-[0.06em]">
                <span>Cảnh {sceneIndex + 1}</span>
                <div className="w-20 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/40 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span>{sceneKeys.length}</span>
              </div>
              <span className="text-[11px] text-white/20">
                {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;