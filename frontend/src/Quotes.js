import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const Quotes = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSpeaking, setSpeaking] = useState(false);
  useEffect(() => {
    randomQuote();
  }, []);
  const randomQuote = () => {
    setLoading(true);
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((result) => {
        setQuote(result.content);
        setAuthor(result.author);
        setLoading(false);
      });
  };
  const handleSpeech = () => {
    if (!isLoading) {
      const utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);
      speechSynthesis.speak(utterance);
      const speakingInterval = setInterval(() => {
        setSpeaking(speechSynthesis.speaking);
      }, 10);
      utterance.onend = () => {
        clearInterval(speakingInterval);
        setSpeaking(false);
      };
    }
  };
  const handleCopy = () => {
    toast.success('Copied to Clipboard');
    navigator.clipboard.writeText(quote);
  };
  const handleTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?url=${quote}`;
    window.open(tweetUrl, '_blank');
  };
  return (
    <div className='quote_body'>
      <div className='quote_wrapper'>
        <header>Quote of the Day</header>
        <div className='quote_content'>
          <div className='quote-area'>
            <i className='fas fa-quote-left'></i>
            <p className='quote'>{quote}</p>
            <i className='fas fa-quote-right'></i>
          </div>
          <div className='author'>
            <span>__</span>
            <span className='name'>{author}</span>
          </div>
        </div>
        <div className='buttons'>
          <div className='functions'>
            <ul>
              <li
                className={`speech ${isSpeaking ? 'active' : ''}`}
                onClick={handleSpeech}>
                <i className='fas fa-volume-up'></i>
              </li>
              <li
                className='copy'
                onClick={handleCopy}>
                <i className='fas fa-copy'></i>
              </li>
              <li
                className='twitter'
                onClick={handleTwitter}>
                <i className='fab fa-twitter'></i>
              </li>
            </ul>
            <button
              className='quoteBtn'
              disabled={isLoading}
              onClick={randomQuote}>
              {isLoading ? 'Loading Quote...' : 'New Quote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
