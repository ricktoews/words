import { itemToObj } from '../utils/helpers';
import WordsInterface from '../utils/words-interface';

function WordItem(props) {
	const wordHash = WordsInterface.fullWordList();
	const def = wordHash[props.word];

	const className = WordsInterface.isActiveEntry(props.word) ? 'active' : '';
	
	const toggleActiveHandler = e => {
		props.toggleActive(props.word);
	};

	return (
	<li className={className} onClick={toggleActiveHandler}>{props.word}: {def}</li>
	);
}

export default WordItem;

