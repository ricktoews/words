import { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import WordItem from './WordItem';
import WordsInterface from '../utils/words-interface';

const wordObjList = WordsInterface.fullWordList();
//const wordList = wordObjList.map(item => item.word);
const listLength = 10;

function SpotlightList(props) {
	const wordList = WordsInterface.getWordList('spotlight').map(item => item.word).sort();

	const toggleSpotlight = word => {
		props.toggleSpotlight(word);
	}

	return (
	<div className="spotlight-list-container">
	  <div className="word-list-container">
	    <div className="word-list-wrapper">
	      <ul className="word-list">
               { wordList.map((word, ndx) => <WordItem key={ndx} word={word} toggleSpotlight={toggleSpotlight} popupConfirm={wordId => { props.popupConfirm(wordId) }} popupWordForm={wordId => { props.popupWordForm(wordId) }} />)}
	      </ul>
	    </div>
	  </div>

	</div>
	);
}

export default withRouter(SpotlightList);


