import { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Hamburger from './components/Hamburger';
import AddIcon from './components/AddIcon';
import WordForm from './components/WordForm';
import MnemonicForm from './components/MnemonicForm';
import ConfirmDelete from './components/ConfirmDelete';
import ConfirmShare from './components/ConfirmShare';
import ReceiveData from './components/ReceiveData';
import Popup from './components/Popup';
import WordsInterface from './utils/words-interface';

import Spotlight from './components/Spotlight';
import BrowseWords from './components/BrowseWords';
import SpotlightList from './components/SpotlightList';

import './App.scss';

const wordHash = WordsInterface.fullWordList();

function App(props) {
	const [spotlightList, setSpotlightList] = useState(WordsInterface.getSpotlightList());
	const [fullWordList, setFullWordList] = useState(wordHash);
	const [ view, setView ] = useState('rehearse');
	const [ popupState, setPopupState ] = useState(false);
	const [ popupData, setPopupData ] = useState({});
	const [ popupView, setPopupView ] = useState('');
	const [ word, setWord ] = useState('');
	const [ hamburgerClass, setHamburgerClass ] = useState('hamburger-nav');

	const [ addWordState, setAddWordState ] = useState(false);
	const [ wordFormState, setWordFormState ] = useState(false);
	const [ mnemonicFormState, setMnemonicFormState ] = useState(false);
	const [ confirmState, setConfirmState ] = useState(false);
	const [ confirmShareState, setConfirmShareState ] = useState(false);
	const [ confirmReceive, setConfirmReceive ] = useState(false);

	const navToBrowseWords = () => {
		var history = props.history;
console.log('navToBrowseWords', props, history);
		history.push('/browse');
		setHamburgerClass('hamburger-nav');
	}

	const navToSpotlight = () => {
		var history = props.history;
console.log('navToSpotlight', props, history);
		history.push('/spotlight');
		setHamburgerClass('hamburger-nav');
	}

	const navToSpotlightList = () => {
		var history = props.history;
console.log('navToSpotlightList', props, history);
		history.push('/spotlight-list');
		setHamburgerClass('hamburger-nav');
	}

	const handleShare = () => {
		setConfirmShareState(true);
		setHamburgerClass('hamburger-nav');
	}

	const handleReceive = () => {
		setConfirmReceive(true);
		setHamburgerClass('hamburger-nav');
	}

	const hamburgerClick = () => {
		if (hamburgerClass === 'hamburger-nav') {
			setHamburgerClass('hamburger-nav hamburger-on');
		} else {
			setHamburgerClass('hamburger-nav');
		}
	};

	
	const popupConfirm = word => {
		setWord(word);
		setConfirmState(true);
	}

	const popupWordForm = word => {
console.log('popupWordForm', word);
/*
		setPopupView('add-word');
		setPopupState(true);
		setPopupData({ word });
*/
		setWord(word);
		setWordFormState(true);
	}

	const popupMnemonicForm = word => {
console.log('popupMnemonicForm', word);
		setWord(word);
		setMnemonicFormState(true);
	}

	const cancelMnemonicForm = () => {
console.log('cancelMnemonicForm');
//		setWord('');
		setMnemonicFormState(false);
	}

	const cancelWordForm = () => {
		setWordFormState(false);
	}

	const saveWordForm  = () => {
		setWordFormState(false);
	}

	const cancelDelete = () => {
		setConfirmState(false);
	}

	const confirmeDelete = () => {
		setConfirmState(false);
	}

	const cancelShare = () => {
		setConfirmShareState(false);
	}

	const cancelReceive = () => {
		setConfirmReceive(false);
	}

	const toggleSpotlight = word => {
		var newSpotlightList = WordsInterface.toggleSpotlight(word);
		setSpotlightList(Object.keys(newSpotlightList));
	}

	const updateWordList = () => {
		setFullWordList(WordsInterface.fullWordList());
	}

	return (
	<div className="App">
	  <nav className={hamburgerClass}>
	    <ul>
	      <li onClick={navToSpotlight}>Spotlight</li>
	      <li onClick={navToSpotlightList}>Spotlight List</li>
	      <li onClick={navToBrowseWords}>Browse</li>
	      <li onClick={handleShare}>Share</li>
	      <li onClick={handleReceive}>Receive</li>
	    </ul>
	  </nav>

	  <header className="App-header">
	    <div className="header-content">
	      <Hamburger onClick={hamburgerClick} />
	      <div className="header-title">Words To Remember</div>
	      {1||view === 'word-list-container' ? <AddIcon className="btn btn-danger" onClick={() => { popupWordForm(); }} /> : <div /> }
	    </div>
	  </header>
	  { wordFormState ? <WordForm word={word} cancelWordForm={cancelWordForm} saveWordForm={saveWordForm} /> : <div/> }
	  { mnemonicFormState ? <MnemonicForm word={word} cancel={cancelMnemonicForm} /> : <div/> }
	  { confirmState ? <ConfirmDelete word={word} cancelDelete={cancelDelete} confirmeDelete={confirmeDelete} /> : <div/> }
	  { confirmShareState ? <ConfirmShare word={word} cancelShare={cancelShare} /> : <div/> }
	  { confirmReceive ? <ReceiveData cancelReceive={cancelReceive} /> : <div/> }
	  <Switch>
	    <Route exact path={['/', '/spotlight']} render={props => <Spotlight
	        popupMnemonicForm={word => { popupMnemonicForm(word) } }
	        popupWordForm={word => { popupWordForm(word); }}
	        /> } />
	    <Route path="/spotlight-list" render={props => ( <SpotlightList
	        toggleSpotlight={toggleSpotlight}
	        popupWordForm={word => { popupWordForm(word); }}
	        />) } />
	    <Route path="/browse/:start?" render={props => ( <BrowseWords
	        toggleSpotlight={toggleSpotlight}
	        popupWordForm={word => { popupWordForm(word); }}
	        />) } />
	  </Switch>
	</div>
	);
}	

export default withRouter(App);
