"use client";

import { useState, useEffect } from "react";
import { Modal, Frame, Button } from "@react95/core";
import "@react95/core/themes/win95.css";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const newSequence = [...sequence, key].slice(-KONAMI_CODE.length);
      setSequence(newSequence);

      if (
        newSequence.length === KONAMI_CODE.length &&
        newSequence.every((k, i) => k === KONAMI_CODE[i].toLowerCase())
      ) {
        setIsOpen(true);
        setSequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence]);

  if (!isOpen) return null;

  return (
    <Modal
      width="400"
      height="300"
      icon="info"
      title="You found the secret!"
      closeModal={() => setIsOpen(false)}
      buttons={[
        {
          value: "OK",
          onClick: () => setIsOpen(false),
        },
      ]}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <Frame bg="white" boxShadow="in" className="p-4 h-full overflow-auto">
        <div className="flex flex-col gap-4 text-black font-win">
          <p className="text-lg font-bold">🎉 Congratulations! 🎉</p>
          <p>
            You've unlocked the secret easter egg by entering the legendary
            Konami Code!
          </p>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Fun Facts:</p>
            <ul className="list-disc list-inside text-sm">
              <li>This website was built with Next.js & Convex</li>
              <li>I'm 16 and from Canberra, Australia 🇦🇺</li>
              <li>I love retro tech aesthetics (as you can tell!)</li>
              <li>The Konami Code was first used in 1986</li>
            </ul>
          </div>
          <p className="text-sm">
            Thanks for exploring my website! Feel free to check out the{" "}
            <a
              href="https://github.com/ingoau/website"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              source code
            </a>
            .
          </p>
        </div>
      </Frame>
    </Modal>
  );
}
