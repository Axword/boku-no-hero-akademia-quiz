import { useCallback } from 'react';

// Singleton AudioContext to prevent "Too many AudioContexts" error
let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }
  return sharedAudioCtx;
};

export const useSound = () => {
  const playSound = useCallback((type: 'correct' | 'wrong' | 'click' | 'turn' | 'join') => {
    const audioCtx = getAudioContext();
    if (!audioCtx) return;

    // Resume context if suspended (browser autoplay policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    try {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      switch (type) {
        case 'correct':
          // High pitched "ding"
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(523.25, now); // C5
          oscillator.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1); // C6
          gainNode.gain.setValueAtTime(0.3, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          oscillator.start(now);
          oscillator.stop(now + 0.3);
          break;

        case 'wrong':
          // Low pitched "buzz"
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(150, now);
          oscillator.frequency.linearRampToValueAtTime(100, now + 0.3);
          gainNode.gain.setValueAtTime(0.3, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          oscillator.start(now);
          oscillator.stop(now + 0.3);
          break;

        case 'click':
          // Short tick
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(800, now);
          gainNode.gain.setValueAtTime(0.05, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          oscillator.start(now);
          oscillator.stop(now + 0.05);
          break;
          
        case 'turn':
          // Notification sound
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(440, now);
          oscillator.frequency.setValueAtTime(660, now + 0.1);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          oscillator.start(now);
          oscillator.stop(now + 0.4);
          break;
        
        case 'join':
          // Rising slide
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(300, now);
          oscillator.frequency.linearRampToValueAtTime(600, now + 0.2);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.linearRampToValueAtTime(0.01, now + 0.2);
          oscillator.start(now);
          oscillator.stop(now + 0.2);
          break;
      }
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }, []);

  return { playSound };
};
