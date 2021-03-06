import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import WordItem from './WordItem';
import WordsInterface from '../utils/words-interface';

function Random(props) {
	const [randomWords, setRandomWords] = useState([]);
	const [refresh, setRefresh] = useState(true);
	const [updatePageToggle, setUpdatePageToggle] = useState(true);

	useEffect(() => {
		if (refresh) {
			setRefresh(false);
			setRandomWords(WordsInterface.getRandomPool());
		}
	});

	const handleNewRandom = word => {
		console.log('Refresh random list.');
		setRefresh(true);
	}

	const toggleSpotlight = word => {
		props.toggleSpotlight(word);
		setUpdatePageToggle(!updatePageToggle);
	}

	return (
	<div className="browse-container">
	  <div className="browse">
		<div>Random Selection</div>
	    <div className="browse-filter-buttons">
	      <button className={'badge badge-spotlight-filter'} onClick={handleNewRandom}><i className="glyphicon glyphicon-repeat"></i></button>
	    </div>
	  </div>

	  <div className="word-list-container">
	    <div className="word-list-wrapper">
	      <ul className="word-list">
	        {randomWords.map((wordObj, ndx) => {
			let word = wordObj.word;
	                return <WordItem key={ndx} 
	                                 word={word} 
	                                 toggleSpotlight={toggleSpotlight} 
	                                 />
	        })}
	      </ul>
	    </div>
	  </div>

	</div>
	);
}

export default withRouter(Random);
