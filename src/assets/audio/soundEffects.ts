export type SoundType = 'click' | 'win' | 'lose' | 'draw' | 'reset';

let audioContext: AudioContext | null = null;
export let audioEnabled = true;

export const setAudioEnabled = (enabled: boolean) => {
  audioEnabled = enabled;
};

const getAudioContext = () => {
  if (audioContext) {
    return audioContext;
  }

  const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!Context) {
    return null;
  }

  audioContext = new Context();
  return audioContext;
};

export const playSound = (type: SoundType) => {
  if (!audioEnabled) return;
  const context = getAudioContext();

  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.connect(gain);
  gain.connect(context.destination);

  switch (type) {
    case 'click':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.frequency.exponentialRampToValueAtTime(110, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      oscillator.start(now);
      oscillator.stop(now + 0.1);
      break;
    case 'win':
      oscillator.type = 'triangle';
      const notes = [523.25, 659.25, 783.99, 1046.5];
      let noteTime = now;
      notes.forEach((note, i) => {
        oscillator.frequency.setValueAtTime(note, noteTime);
        noteTime += 0.1;
      });
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
      oscillator.start(now);
      oscillator.stop(now + 0.5);
      break;
    case 'lose':
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(220, now);
      oscillator.frequency.exponentialRampToValueAtTime(55, now + 0.4);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
      break;
    case 'draw':
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(330, now);
      oscillator.frequency.setValueAtTime(220, now + 0.2);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
      break;
    case 'reset':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, now);
      oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.2);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;
  }
};
