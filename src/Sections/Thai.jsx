import React, { useState, useEffect } from 'react';

const Thai = () => {
  const thaiToEnglish = {
    'ก': { letter: 'g', pronunciation: 'g' }, 'ข': { letter: 'k', pronunciation: 'k' }, 'ฃ': { letter: 'k', pronunciation: 'k' }, 'ค': { letter: 'k', pronunciation: 'k' }, 'ฅ': { letter: 'k', pronunciation: 'k' }, 'ฆ': { letter: 'k', pronunciation: 'k' }, 'ง': { letter: 'ng', pronunciation: 'ng' }, 'จ': { letter: 'ch', pronunciation: 'ch' }, 'ฉ': { letter: 'ch', pronunciation: 'ch' }, 'ช': { letter: 'ch', pronunciation: 'ch' }, 'ซ': { letter: 's', pronunciation: 's' },
    'ฌ': { letter: 'ch', pronunciation: 'ch' }, 'ญ': { letter: 'y', pronunciation: 'y' }, 'ฎ': { letter: 'd', pronunciation: 'd' }, 'ฏ': { letter: 't', pronunciation: 't' }, 'ฐ': { letter: 'th', pronunciation: 'th' }, 'ฑ': { letter: 'th', pronunciation: 'th' }, 'ฒ': { letter: 'th', pronunciation: 'th' }, 'ณ': { letter: 'n', pronunciation: 'n' }, 'ด': { letter: 'd', pronunciation: 'd' }, 'ต': { letter: 't', pronunciation: 't' }, 'ถ': { letter: 'th', pronunciation: 'th' },
    'ท': { letter: 'th', pronunciation: 'th' }, 'ธ': { letter: 'th', pronunciation: 'th' }, 'น': { letter: 'n', pronunciation: 'n' }, 'บ': { letter: 'b', pronunciation: 'b' }, 'ป': { letter: 'p', pronunciation: 'p' }, 'ผ': { letter: 'ph', pronunciation: 'ph' }, 'ฝ': { letter: 'f', pronunciation: 'f' }, 'พ': { letter: 'ph', pronunciation: 'ph' }, 'ฟ': { letter: 'f', pronunciation: 'f' }, 'ภ': { letter: 'ph', pronunciation: 'ph' }, 'ม': { letter: 'm', pronunciation: 'm' },
    'ย': { letter: 'y', pronunciation: 'y' }, 'ร': { letter: 'r', pronunciation: 'r' }, 'ล': { letter: 'l', pronunciation: 'l' }, 'ว': { letter: 'w', pronunciation: 'w' }, 'ศ': { letter: 's', pronunciation: 's' }, 'ษ': { letter: 's', pronunciation: 's' }, 'ส': { letter: 's', pronunciation: 's' }, 'ห': { letter: 'h', pronunciation: 'h' }, 'ฬ': { letter: 'l', pronunciation: 'l' }, 'อ': { letter: 'o', pronunciation: 'os' }, 'ฮ': { letter: 'h', pronunciation: 'h' },'ะ': { letter: 'a', pronunciation: 'a' }, 
    'ั': { letter: 'a', pronunciation: 'a' }, 
    'า': { letter: 'a', pronunciation: 'a' }, 
    'ำ': { letter: 'am', pronunciation: 'am' }, 
    'ิ': { letter: 'i', pronunciation: 'i' }, 
    'ี': { letter: 'i', pronunciation: 'i' }, 
    'ึ': { letter: 'ue', pronunciation: 'ue' }, 
    'ื': { letter: 'ue', pronunciation: 'ue' }, 
    'ุ': { letter: 'u', pronunciation: 'u' }, 
    'ู': { letter: 'u', pronunciation: 'u' }, 
    'เ': { letter: 'e', pronunciation: 'e' }, 
    'แ': { letter: 'ae', pronunciation: 'ae' }, 
    'โ': { letter: 'o', pronunciation: 'o' }, 
    'ใ': { letter: 'ai', pronunciation: 'ai' }, 
    'ไ': { letter: 'ai', pronunciation: 'ai' }, 
    'ฤ': { letter: 'ue', pronunciation: 'ue' }, 
    'ฤๅ': { letter: 'ue', pronunciation: 'ue' }, 
    'ฦ': { letter: 'ue', pronunciation: 'ue' }, 
    'ฦๅ': { letter: 'ue', pronunciation: 'ue' }
  };

  const consonants = Object.keys(thaiToEnglish).filter(letter => !'ะัาำิีึืุูเแโใไฤฤๅฦฦๅ'.includes(letter));
  const vowels = Object.keys(thaiToEnglish).filter(letter => 'ะัาำิีึืุูเแโใไฤฤๅฦฦๅ'.includes(letter));

  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctPronunciation, setCorrectPronunciation] = useState('');
  const [showRandomLetter, setShowRandomLetter] = useState(true);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0, totalQuestions: 0 });
  const [gameMode, setGameMode] = useState('Letter');
  const [showAnswers, setShowAnswers] = useState(false);

  const generateRandomThaiLetter = () => {
    const thaiLetters = gameMode === 'Vowel' ? vowels : consonants;
    return thaiLetters[Math.floor(Math.random() * thaiLetters.length)];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isCorrect = inputValue.trim().toLowerCase() === thaiToEnglish[correctPronunciation].letter.toLowerCase();
    if (isCorrect) {
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
    } else {
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
    }
    setFeedback(isCorrect ? 'Correct!' : 'Not Correct');
    setShowRandomLetter(false);
    if (!isCorrect) {
      setShowCorrectAnswer(true);
    }
    setInputValue('');
    setTimeout(() => {
      setFeedback('');
      setShowRandomLetter(true);
      setShowCorrectAnswer(false);
      setCorrectPronunciation(generateRandomThaiLetter());
      setScore((prevScore) => ({ ...prevScore, totalQuestions: prevScore.totalQuestions + 1 }));
    }, 500);
  };

  const handleGameModeChange = (mode) => {
    setGameMode(mode);
    setShowAnswers(false);
  };

  const handleOptionButtonClick = () => {
    setShowAnswers(!showAnswers);
  };

  useEffect(() => {
    setCorrectPronunciation(generateRandomThaiLetter());
  }, [gameMode]);

  const renderTableRows = () => {
    const letters = gameMode === 'Letter' ? consonants : (gameMode === 'Vowel' ? vowels : Object.keys(thaiToEnglish));
    const tableRows = [];
    let currentIndex = 0;
    while (currentIndex < letters.length) {
      const rowLetters = letters.slice(currentIndex, currentIndex + 10);
      const tableRow = (
        <tr key={currentIndex}>
          {rowLetters.map((letter, index) => (
            <React.Fragment key={index}>
              <td className="border-2 px-4 py-2">{letter}</td>
              <td className="border-2 px-4 py-2">{thaiToEnglish[letter].pronunciation}</td>
            </React.Fragment>
          ))}
        </tr>
      );
      tableRows.push(tableRow);
      currentIndex += 10;
    }
    return tableRows;
  };
  

  return (
    <div className="container mx-auto">
      <div className="grid justify-center h-full">
        <div className="text-4xl text-amber-600 md:text-6xl lg:text-7xl font-bold">
          THAI Letter
        </div>
      </div>
      <div className="mb-10 justify-center grid mt-10 ">
        <div className='bg-white text-lg font-bold p-3 px-40 rounded-2xl'>
          {showRandomLetter && correctPronunciation}
          {feedback && <div className={`text-lg font-bold mt-2 ${feedback === 'Correct!' ? 'text-green-600' : 'text-red-600'}`}>{feedback}</div>}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-400 px-4 py-2 mr-2"
              placeholder="Submit the correct <3"
              disabled={!showRandomLetter}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={!showRandomLetter}>
              Submit
            </button>
          </div>
          {showCorrectAnswer && (
            <div className="text-red-500 mt-2">Correct pronunciation: {thaiToEnglish[correctPronunciation].letter}</div>
          )}
        </div>
      </form>
      <div className='flex justify-center h-full mt-5 font-bold gap-x-12'>
        <div className='text-green-500'>
          Correct: {score.correct}
        </div>
        <div className='text-red-500'>
          Incorrect: {score.incorrect}
        </div>
        <div>
          Total Questions: {score.totalQuestions}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button className={gameMode === 'Letter' ? 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400'} onClick={() => handleGameModeChange('Letter')}>Letter</button>
        <button className={gameMode === 'Vowel' ? 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-4'} onClick={() => handleGameModeChange('Vowel')}>Vowel</button>
      </div>
      <div className="flex justify-center mt-5">
        <button className={showAnswers ? 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400'} onClick={handleOptionButtonClick}>Option</button>
      </div>
      {showAnswers && (
        <div className="mt-5">
          <table className="table-auto mx-auto">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Thai;
