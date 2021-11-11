import React, { useState } from 'react'
import * as R from 'ramda'
import { Link, Route, useLocation } from "wouter"
import { customAlphabet } from 'nanoid'
import './App.css'
import * as utils from './utils'
import countries from './countries'
import winning from '../assets/winning.png'
import dog from '../assets/dog.png'
import draw from '../assets/draw.jpg'

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { ref, getDatabase, set, update } from "firebase/database"
import { useObject } from 'react-firebase-hooks/database'
import initFeatures from "./featureFlags"

import initGdpr from "./gdpr"

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvxyz', 5)

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBzcyHqbezZz4SN4YQTnOAbrCcgkSOCaNw",
	authDomain: "learn-country-quiz-f159d.firebaseapp.com",
	databaseURL: "https://learn-country-quiz-f159d-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "learn-country-quiz-f159d",
	storageBucket: "learn-country-quiz-f159d.appspot.com",
	messagingSenderId: "76349734788",
	appId: "1:76349734788:web:ebcbd6f5590e94d853e7d1"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getDatabase(app)

initGdpr()

function App() {
	initFeatures()
	return (
		<div className="app">
			<div className="header">THE FLAG GAME</div>
			<div className="middle">
				<Route path="/">
					{userGdprConsent ? <StartPage /> : <GDPRPage />}
				</Route>
				<Route path="/game/:gameId/:playerId">
					{(params) => {
						return <GamePage gameId={params.gameId} playerId={params.playerId} />
					}}
				</Route>
				<Route path="/setup">
					<SetupPage />
				</Route>

			</div>
			<div className="footer"></div>
		</div>
	)
}

const userGdprConsent = JSON.parse(localStorage.getItem("gdprConsent"))[0]["active"] === true

const GDPRPage = () => {
	const [gdprConsent, setgdprConsent] = useLocalStorage("gdprConsent", [])

	function toggleMarketing() {
		const newgdprConsent = [...gdprConsent]
		gdprConsent[0].active = !gdprConsent[0].active
		setgdprConsent(newgdprConsent)
	}

	function toggleNecessary() {
		const newgdprConsent = [...gdprConsent]
		gdprConsent[1].active = !gdprConsent[1].active
		setgdprConsent(newgdprConsent)
	}

	function toggleStatistics() {
		const newgdprConsent = [...gdprConsent]
		gdprConsent[2].active = !gdprConsent[2].active
		setgdprConsent(newgdprConsent)
	}

	return (
		<div className="gdpr__page">
			<h1>We use cookies and store your information in accordance with GDPR regulations</h1>
			<div className="gdpr__marketing">
				<p>Persistent third-party cookies that help advertisers deliver targeted ads. </p>
				<button onClick={toggleMarketing}>Marketing</button>
				<p>I consent: {JSON.stringify(gdprConsent[0].active)}</p>
			</div>
			<div className="gdpr__necessary">
				<p>Strictly necessary cookies are needed for site functionality.</p>
				<button onClick={toggleNecessary}>Necessary</button>
				<p>I consent: {JSON.stringify(gdprConsent[1].active)}</p>
			</div>
			<div className="gdpr__statistics">
				<p>Information about site visits and user behavior. This information is anonymized.</p>
				<button onClick={toggleStatistics}>Statistics</button>
				<p>I consent: {JSON.stringify(gdprConsent[2].active)}</p>
			</div>
		</div>
	)
}

//TODO
//Använd useLocalStorage funktionen/hooken för att lagra användarens consent. DONE
//Skapa ett gdpr-consent objekt som ser ut som feature flags objektet. DONE
//Hantera användarens consent i GDPRPage komponenten på samma sätt som featureFlags hanteras i SetupPage komponenten. DONE
//!Fixa routing bruuuuurs


// Setup Page
const SetupPage = () => {
	const [featureFlags, setfeatureFlags] = useLocalStorage("featureFlags", [])

	function toggleScore() {
		const newFeatureFlags = [...featureFlags]
		newFeatureFlags[0].active = !newFeatureFlags[0].active
		setfeatureFlags(newFeatureFlags)
	}

	function toggleRandom() {
		const newFeatureFlags = [...featureFlags]
		newFeatureFlags[1].active = !newFeatureFlags[1].active
		setfeatureFlags(newFeatureFlags)
	}

	function toggleTie() {
		const newFeatureFlags = [...featureFlags]
		newFeatureFlags[2].active = !newFeatureFlags[2].active
		setfeatureFlags(newFeatureFlags)
	}
	function toggleImprovedQuestions() {
		const newFeatureFlags = [...featureFlags]
		newFeatureFlags[3].active = !newFeatureFlags[3].active
		setfeatureFlags(newFeatureFlags)
	}

	return (
		<div className="page">
			<center><h3>Feature Flags Settings
				<br></br>Please take caution when using these experimental features</h3></center>

			<div>
				<center>
					<button onClick={toggleScore} type="button" className="ffbutton">Toggle Improved Scoring</button>
					<p>Status: {JSON.stringify(featureFlags[0].active)}</p>
				</center>
			</div>

			<div>
				<center>
					<button onClick={toggleRandom} type="button" className="ffbutton">Toggle Improved Randomizer</button>
					<p>Status: {JSON.stringify(featureFlags[1].active)}</p>
				</center>
			</div>

			<div>
				<center>
					<button onClick={toggleTie} type="button" className="ffbutton">Toggle Improved Ties</button>
					<p>Status: {JSON.stringify(featureFlags[2].active)}</p>
				</center>
			</div>

			<div>
				<center>
					<button onClick={toggleImprovedQuestions} type="button" className="ffbutton">Toggle Improved Questions</button>
					<p>Status: {JSON.stringify(featureFlags[3].active)}</p>
				</center>
			</div>

			<Link href="/" className="re-home link">Go to App!</Link>
		</div>
	)
}


// Hooks
function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key)

			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue
		}

		catch (error) {
			// If error also return initialValue
			console.log(error)
			return initialValue
		}
	})

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value

			// Save state
			setStoredValue(valueToStore)

			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		}

		catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error)
		}
	}

	return [storedValue, setValue]
}


// Start Page
const StartPage = () => {
	const [snapshot, loading, error] = useObject(ref(db, 'nextGame'))
	const [location, setLocation] = useLocation()

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const nextGame = snapshot.val()

	const play = async () => {
		if (R.isNil(nextGame)) {
			const updates = {}
			const gameId = nanoid()
			updates['/nextGame'] = gameId
			await update(ref(db), updates)
			setLocation(`/game/${gameId}/1`)
		}

		else {
			const game = utils.createGame()
			console.log(1, game)
			const updates = {}
			updates['/nextGame'] = null
			updates[`/games/${nextGame}`] = game
			await update(ref(db), updates)
			setLocation(`/game/${nextGame}/2`)

			await utils.sleep(3000)
			const updates2 = {}
			updates2[`/games/${nextGame}/status`] = 'playing'
			await update(ref(db), updates2)
		}
	}

	if (JSON.parse(localStorage.getItem("featureFlags"))[1]["active"] === true) {
		const country = {}
		for (const property in countries) {
			country[countries[property]] = property.toLowerCase()
		}

		const flags = []
		for (let loop = 0; loop <= 77; loop++) {
			let RNG = Math.floor(Math.random() * 200)
			flags.push(Object.values(country)[RNG])
		}

		return (
			<div className="page">
				<div className="st-flags">
					<div className="f32"><div className={`flag ` + flags[0]}></div></div>
					<div className="f32"><div className={`flag ` + flags[1]}></div></div>
					<div className="f32"><div className={`flag ` + flags[2]}></div></div>
					<div className="f32"><div className={`flag ` + flags[3]}></div></div>
					<div className="f32"><div className={`flag ` + flags[4]}></div></div>
					<div className="f32"><div className={`flag ` + flags[5]}></div></div>
					<div className="f32"><div className={`flag ` + flags[6]}></div></div>
					<div className="f32"><div className={`flag ` + flags[7]}></div></div>
					<div className="f32"><div className={`flag ` + flags[8]}></div></div>
					<div className="f32"><div className={`flag ` + flags[9]}></div></div>
					<div className="f32"><div className={`flag ` + flags[10]}></div></div>
					<div className="f32"><div className={`flag ` + flags[11]}></div></div>
					<div className="f32"><div className={`flag ` + flags[12]}></div></div>
					<div className="f32"><div className={`flag ` + flags[13]}></div></div>
					<div className="f32"><div className={`flag ` + flags[14]}></div></div>
					<div className="f32"><div className={`flag ` + flags[15]}></div></div>
					<div className="f32"><div className={`flag ` + flags[16]}></div></div>
					<div className="f32"><div className={`flag ` + flags[17]}></div></div>
					<div className="f32"><div className={`flag ` + flags[18]}></div></div>
					<div className="f32"><div className={`flag ` + flags[19]}></div></div>
					<div className="f32"><div className={`flag ` + flags[20]}></div></div>
					<div className="f32"><div className={`flag ` + flags[21]}></div></div>
					<div className="f32"><div className={`flag ` + flags[22]}></div></div>
					<div className="f32"><div className={`flag ` + flags[23]}></div></div>
					<div className="f32"><div className={`flag ` + flags[24]}></div></div>
					<div className="f32"><div className={`flag ` + flags[25]}></div></div>
					<div className="f32"><div className={`flag ` + flags[26]}></div></div>
					<div className="f32"><div className={`flag ` + flags[27]}></div></div>
					<div className="f32"><div className={`flag ` + flags[28]}></div></div>
					<div className="f32"><div className={`flag ` + flags[29]}></div></div>
					<div className="f32"><div className={`flag ` + flags[30]}></div></div>
					<div className="f32"><div className={`flag ` + flags[31]}></div></div>
					<div className="f32"><div className={`flag ` + flags[32]}></div></div>
					<div className="f32"><div className={`flag ` + flags[33]}></div></div>
					<div className="f32"><div className={`flag ` + flags[34]}></div></div>
					<div className="f32"><div className={`flag ` + flags[35]}></div></div>
					<div className="f32"><div className={`flag ` + flags[36]}></div></div>
					<div className="f32"><div className={`flag ` + flags[37]}></div></div>
					<div className="f32"><div className={`flag ` + flags[38]}></div></div>
					<div className="f32"><div className={`flag ` + flags[39]}></div></div>
					<div className="f32"><div className={`flag ` + flags[40]}></div></div>
					<div className="f32"><div className={`flag ` + flags[41]}></div></div>
					<div className="f32"><div className={`flag ` + flags[42]}></div></div>
					<div className="f32"><div className={`flag ` + flags[43]}></div></div>
					<div className="f32"><div className={`flag ` + flags[44]}></div></div>
					<div className="f32"><div className={`flag ` + flags[45]}></div></div>
					<div className="f32"><div className={`flag ` + flags[46]}></div></div>
					<div className="f32"><div className={`flag ` + flags[47]}></div></div>
					<div className="f32"><div className={`flag ` + flags[48]}></div></div>
					<div className="f32"><div className={`flag ` + flags[49]}></div></div>
					<div className="f32"><div className={`flag ` + flags[50]}></div></div>
					<div className="f32"><div className={`flag ` + flags[51]}></div></div>
					<div className="f32"><div className={`flag ` + flags[52]}></div></div>
					<div className="f32"><div className={`flag ` + flags[53]}></div></div>
					<div className="f32"><div className={`flag ` + flags[54]}></div></div>
					<div className="f32"><div className={`flag ` + flags[55]}></div></div>
					<div className="f32"><div className={`flag ` + flags[56]}></div></div>
					<div className="f32"><div className={`flag ` + flags[57]}></div></div>
					<div className="f32"><div className={`flag ` + flags[58]}></div></div>
					<div className="f32"><div className={`flag ` + flags[59]}></div></div>
					<div className="f32"><div className={`flag ` + flags[60]}></div></div>
					<div className="f32"><div className={`flag ` + flags[61]}></div></div>
					<div className="f32"><div className={`flag ` + flags[62]}></div></div>
					<div className="f32"><div className={`flag ` + flags[63]}></div></div>
					<div className="f32"><div className={`flag ` + flags[64]}></div></div>
					<div className="f32"><div className={`flag ` + flags[65]}></div></div>
					<div className="f32"><div className={`flag ` + flags[66]}></div></div>
					<div className="f32"><div className={`flag ` + flags[67]}></div></div>
					<div className="f32"><div className={`flag ` + flags[68]}></div></div>
					<div className="f32"><div className={`flag ` + flags[69]}></div></div>
					<div className="f32"><div className={`flag ` + flags[70]}></div></div>
					<div className="f32"><div className={`flag ` + flags[71]}></div></div>
					<div className="f32"><div className={`flag ` + flags[72]}></div></div>
					<div className="f32"><div className={`flag ` + flags[73]}></div></div>
					<div className="f32"><div className={`flag ` + flags[74]}></div></div>
					<div className="f32"><div className={`flag ` + flags[75]}></div></div>
					<div className="f32"><div className={`flag ` + flags[76]}></div></div>
					<div className="f32"><div className={`flag ` + flags[77]}></div></div>
				</div>
				<div className="button btn-square" onClick={play}>Play</div>
			</div>
		)
	}

	else {
		return (
			<div className="page">
				<div className="st-flags">
					<div className="f32"><div className={`flag aze`}></div></div>
					<div className="f32"><div className={`flag bih`}></div></div>
					<div className="f32"><div className={`flag brb`}></div></div>
					<div className="f32"><div className={`flag swe`}></div></div>
					<div className="f32"><div className={`flag bgd`}></div></div>
					<div className="f32"><div className={`flag bel`}></div></div>
					<div className="f32"><div className={`flag bfa`}></div></div>
					<div className="f32"><div className={`flag bgr`}></div></div>
					<div className="f32"><div className={`flag bhr`}></div></div>
					<div className="f32"><div className={`flag bdi`}></div></div>
					<div className="f32"><div className={`flag ben`}></div></div>
					<div className="f32"><div className={`flag bmu`}></div></div>
					<div className="f32"><div className={`flag brn`}></div></div>
					<div className="f32"><div className={`flag bol`}></div></div>
					<div className="f32"><div className={`flag bra`}></div></div>
					<div className="f32"><div className={`flag bhs`}></div></div>
					<div className="f32"><div className={`flag btn`}></div></div>
					<div className="f32"><div className={`flag fra`}></div></div>
					<div className="f32"><div className={`flag bwa`}></div></div>
				</div>
				<div className="button btn-square" onClick={play}>Play</div>
			</div>
		)
	}
}

// Game Page
const GamePage = ({ gameId, playerId }) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))
	const [location, setLocation] = useLocation()

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const game = snapshot.val()

	const cancel = async () => {
		const updates = {}
		updates['/nextGame'] = null
		await update(ref(db), updates)
		setLocation(`/`)
	}

	if (game && game.status === 'playing') return <QuestionPage gameId={gameId} playerId={playerId} />
	if (game && game.status === 'finished') return <ResultsPage gameId={gameId} playerId={playerId} />

	return (
		<div className="page">
			<div className="fw6 fs9 tac">
				{!game && 'Waiting for opponent...'}
				{game && game.status === 'starting' && 'Starting game... Get READY!'}
			</div>
			{!game && <div className="link" style={{ marginTop: '10rem' }} onClick={cancel}>Cancel</div>}
		</div>
	)
}

// Question Page
const QuestionPage = ({ gameId, playerId }) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const game = snapshot.val()

	const youKey = `player${playerId}`
	const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`
	console.log(game)
	const question = game.questions[`${game.currentQuestion}`]

	if (!question) return 'Loading...'

	const answer = async (countryCode) => {
		if (question.fastest) return

		const updates = {}
		updates[`/games/${gameId}/questions/${game.currentQuestion}/fastest`] = { player: playerId, answer: countryCode }
		if (JSON.parse(localStorage.getItem("featureFlags"))[0]["active"] === true) {
			if (countryCode == question.correct) {
				updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] + 1
			}

			else {
				updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] - 1
			}
		}

		else {
			if (countryCode == question.correct) {
				updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] + 1
			}
		}

		await update(ref(db), updates)

		if (game.currentQuestion < Object.values(game.questions).length) {
			await utils.sleep(3000)
			const updates2 = {}
			updates2[`/games/${gameId}/currentQuestion`] = parseInt(game.currentQuestion) + 1
			await update(ref(db), updates2)
		}

		else {
			await utils.sleep(3000)
			const updates2 = {}
			updates2[`/games/${gameId}/status`] = 'finished'
			await update(ref(db), updates2)
		}
	}

	return (
		<div className="page">
			<div className="f32"><div className={`flag ${question.correct}`}></div></div>
			<div className="alternatives">
				{Object.entries(question.alternatives).map(([k, countryCode]) => {
					let correct = null
					let youOrOpponent = false
					if (question.fastest && question.fastest.answer == countryCode) {
						correct = question.fastest.answer === question.correct
						if (question.fastest.player === playerId && JSON.parse(localStorage.getItem("featureFlags"))[0]["active"] === true) {
							youOrOpponent = `YOU ${correct ? ' +1' : '-1'}`
						}
						else {
							youOrOpponent = `OPPONENT ${correct ? ' +1' : ''}`
						}
					}
					return (
						<div className={`button alt ${correct && 'alt-green'} ${correct === false && 'alt-red'}`}
							key={countryCode} title={countryCode} onClick={() => answer(countryCode)}>
							{countries[countryCode.toUpperCase()]}
							{ }
							{youOrOpponent && <div className="alt-label">{youOrOpponent}</div>}
						</div>)
				})}
			</div>
			{question.fastest && <div className="fs7 fw5 m9">Get ready for the next question...</div>}
			{question.fastest &&
				<QuickResults you={game.score[youKey]} opponent={game.score[opponentKey]} />
			}
		</div>
	)
}

// QuickResults
const QuickResults = ({ you, opponent }) => {
	return (
		<div className="quick-results">
			YOU {you} : OPPONENT {opponent}
		</div>
	)
}

// Results Page
const ResultsPage = ({ gameId, playerId }) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const game = snapshot.val()

	const youKey = `player${playerId}`
	const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`

	// Added win state.
	const youWon = (game.score[youKey] > game.score[opponentKey])

	// Added tie state.
	const itsATie = (game.score[youKey] == game.score[opponentKey])

	// Added lose state.
	const youLost = (game.score[youKey] < game.score[opponentKey])

	if (JSON.parse(localStorage.getItem("featureFlags"))[2]["active"] === true) {
		return (
			<div className="page">
				{youWon && <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />}
				{youLost && <Lost you={game.score[youKey]} opponent={game.score[opponentKey]} />}
				{itsATie && !youWon && <Tie you={game.score[youKey]} opponent={game.score[opponentKey]} />}
				<Link href="/" className="re-home link">Home</Link>
			</div>
		)
	}

	else {
		return (
			<div className="page">
				{youWon && <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />}
				{youLost && <Lost you={game.score[youKey]} opponent={game.score[opponentKey]} />}
				{itsATie && !youWon && <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />}
				<Link href="/" className="re-home link">Home</Link>
			</div>
		)
	}
}

// Win screen.
const Won = ({ you, opponent }) => {
	return (
		<div className="results">
			<img src={winning} style={{ width: '80%' }} />
			<div className="re-text">Congratulations!!</div>
			<QuickResults you={you} opponent={opponent} />
		</div>
	)
}

// Loss screen.
const Lost = ({ you, opponent }) => {
	return (
		<div className="results">
			<img src={dog} style={{ width: '80%' }} />
			<div className="re-text">Better luck next time..</div>
			<QuickResults you={you} opponent={opponent} />
		</div>
	)
}

// Added tie screen.
const Tie = ({ you, opponent }) => {
	return (
		<div className="results">
			<img src={draw} style={{ width: '80%' }} />
			<div className="re-text">It's a draw!</div>
			<QuickResults you={you} opponent={opponent} />
		</div>
	)
}

export default App