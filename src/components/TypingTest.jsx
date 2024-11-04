import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TypingTest = () => {
  const [words] = useState(['hello', 'world', 'typing', 'test', 'practice']);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState([]);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.length === 1) { // Only handle character keys
        const currentWord = words[currentWordIndex];
        const expectedChar = currentWord[letterIndex];
        const isCorrect = e.key === expectedChar;
        
        setTypedCharacters(prev => [...prev, { char: e.key, correct: isCorrect }]);
        
        if (letterIndex + 1 === currentWord.length) {
          if (currentWordIndex + 1 < words.length) {
            setCurrentWordIndex(prev => prev + 1);
            setLetterIndex(0);
            setTypedCharacters([]);
          }
        } else {
          setLetterIndex(prev => prev + 1);
        }
        
        // Update accuracy
        const correctChars = typedCharacters.filter(char => char.correct).length + (isCorrect ? 1 : 0);
        const totalChars = typedCharacters.length + 1;
        setAccuracy((correctChars / totalChars) * 100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [words, currentWordIndex, letterIndex, typedCharacters]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Typing Test</h1>
          <p className="text-gray-400">Accuracy: {accuracy.toFixed(1)}%</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          {words.map((word, wordIdx) => (
            <div
              key={wordIdx}
              className={`inline-block mr-4 ${
                wordIdx === currentWordIndex ? 'bg-gray-700 px-2 rounded' : ''
              }`}
            >
              {word.split('').map((letter, letterIdx) => (
                <motion.span
                  key={letterIdx}
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: 1,
                    color: wordIdx === currentWordIndex
                      ? letterIdx < letterIndex
                        ? typedCharacters[letterIdx]?.correct
                          ? '#4ade80'  // green
                          : '#ef4444'  // red
                        : letterIdx === letterIndex
                        ? '#ffffff'    // white
                        : '#6b7280'    // gray
                      : '#6b7280'
                  }}
                  transition={{ duration: 0.15 }}
                  className="text-2xl"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
          
          <motion.div
            className="inline-block w-0.5 h-6 bg-white"
            animate={{
              opacity: [1, 0],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingTest; 