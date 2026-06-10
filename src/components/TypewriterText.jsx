import React, { useState, useEffect } from 'react';

export default function TypewriterText({
  words = [],
  speed = 80,
  delay = 2000,
  eraseSpeed = 40,
  loop = true,
  className = '',
  cursor = true,
  startImmediately = true
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(startImmediately);

  const wordList = Array.isArray(words) ? words : [words];

  useEffect(() => {
    if (!isStarted) return;
    if (wordList.length === 0) return;

    let timer;
    const currentFullWord = wordList[currentWordIndex] || '';

    if (!isDeleting) {
      // Typing phase
      if (currentText !== currentFullWord) {
        timer = setTimeout(() => {
          setCurrentText(currentFullWord.slice(0, currentText.length + 1));
        }, speed);
      } else {
        // Full word typed, wait before erasing (only if looping/multiple words)
        if (loop || currentWordIndex < wordList.length - 1) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, delay);
        }
      }
    } else {
      // Deleting phase
      if (currentText !== '') {
        timer = setTimeout(() => {
          setCurrentText(currentFullWord.slice(0, currentText.length - 1));
        }, eraseSpeed);
      } else {
        // Finished deleting, go to next word
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => {
          if (prevIndex === wordList.length - 1) {
            return loop ? 0 : prevIndex;
          }
          return prevIndex + 1;
        });
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, wordList, speed, delay, eraseSpeed, loop, isStarted]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      {cursor && (
        <span className="ml-0.5 inline-block w-[2px] h-[1em] bg-current animate-pulse opacity-70" style={{ animationDuration: '0.8s' }}></span>
      )}
    </span>
  );
}
