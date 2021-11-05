import React from 'react'
import * as R from 'ramda'
import {Link, Route, useLocation} from "wouter"
import { customAlphabet } from 'nanoid'
import './App.css'
import * as utils from './utils'
import countries from './countries'
import winning from '../assets/winning.png'
import dog from '../assets/dog.png'

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { ref, getDatabase, set, update } from "firebase/database"
import { useObject } from 'react-firebase-hooks/database'
import initFeatures from "./featureFlags"


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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

function App() {
	initFeatures();
	return (
		<div className="app">
			<div className="header">THE FLAG GAME</div>
			<div className="middle">
				<Route path="/">
					<StartPage />
				</Route>
				<Route path="/game/:gameId/:playerId">
					{(params) => {
						return <GamePage gameId={params.gameId} playerId={params.playerId} />
					}}
				</Route>
			</div>
			<div className="footer"></div>
		</div>
	);
}


const StartPage = () => {
	const [snapshot, loading, error] = useObject(ref(db, 'nextGame'))
	const [location, setLocation] = useLocation();

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

	return (
		<div className="page">
			<div className="st-flags">
				<div className="f32"><div className={`flag afg`}></div></div>
				<div className="f32"><div className={`flag alb`}></div></div>
				<div className="f32"><div className={`flag dza`}></div></div>
				<div className="f32"><div className={`flag usa`}></div></div>
				<div className="f32"><div className={`flag and`}></div></div>
				<div className="f32"><div className={`flag ago`}></div></div>
				<div className="f32"><div className={`flag atg`}></div></div>
				<div className="f32"><div className={`flag arg`}></div></div>
				<div className="f32"><div className={`flag arm`}></div></div>
				<div className="f32"><div className={`flag abw`}></div></div>
				<div className="f32"><div className={`flag aus`}></div></div>
				<div className="f32"><div className={`flag aut`}></div></div>
				<div className="f32"><div className={`flag aze`}></div></div>
				<div className="f32"><div className={`flag bhs`}></div></div>
				<div className="f32"><div className={`flag bhr`}></div></div>
				<div className="f32"><div className={`flag gbr`}></div></div>
				<div className="f32"><div className={`flag brb`}></div></div>
				<div className="f32"><div className={`flag blr`}></div></div>
				<div className="f32"><div className={`flag blz`}></div></div>

				<div className="f32"><div className={`flag ben`}></div></div>
				<div className="f32"><div className={`flag bmu`}></div></div>
				<div className="f32"><div className={`flag btn`}></div></div>
				<div className="f32"><div className={`flag bol`}></div></div>
				<div className="f32"><div className={`flag bih`}></div></div>
				<div className="f32"><div className={`flag bwa`}></div></div>
				<div className="f32"><div className={`flag bra`}></div></div>
				<div className="f32"><div className={`flag vgb`}></div></div>
				<div className="f32"><div className={`flag brn`}></div></div>
				<div className="f32"><div className={`flag bgr`}></div></div>
				<div className="f32"><div className={`flag bfa`}></div></div>
				<div className="f32"><div className={`flag bdi`}></div></div>
				<div className="f32"><div className={`flag cpv`}></div></div>
				<div className="f32"><div className={`flag khm`}></div></div>
				<div className="f32"><div className={`flag cmr`}></div></div>
				<div className="f32"><div className={`flag can`}></div></div>
				<div className="f32"><div className={`flag cym`}></div></div>
				<div className="f32"><div className={`flag nor`}></div></div>
				<div className="f32"><div className={`flag tcd`}></div></div>

				<div className="f32"><div className={`flag pol`}></div></div>
				<div className="f32"><div className={`flag chl`}></div></div>
				<div className="f32"><div className={`flag chn`}></div></div>
				<div className="f32"><div className={`flag col`}></div></div>
				<div className="f32"><div className={`flag com`}></div></div>
				<div className="f32"><div className={`flag cod`}></div></div>
				<div className="f32"><div className={`flag cog`}></div></div>
				<div className="f32"><div className={`flag cri`}></div></div>
				<div className="f32"><div className={`flag civ`}></div></div>
				<div className="f32"><div className={`flag hrv`}></div></div>
				<div className="f32"><div className={`flag cub`}></div></div>
				<div className="f32"><div className={`flag cuw`}></div></div>
				<div className="f32"><div className={`flag cyp`}></div></div>
				<div className="f32"><div className={`flag cze`}></div></div>
				<div className="f32"><div className={`flag dnk`}></div></div>
				<div className="f32"><div className={`flag dji`}></div></div>
				<div className="f32"><div className={`flag dma`}></div></div>
				<div className="f32"><div className={`flag esp`}></div></div>
				<div className="f32"><div className={`flag ecu`}></div></div>

				<div className="f32"><div className={`flag egy`}></div></div>
				<div className="f32"><div className={`flag slv`}></div></div>
				<div className="f32"><div className={`flag gnq`}></div></div>
				<div className="f32"><div className={`flag eri`}></div></div>
				<div className="f32"><div className={`flag est`}></div></div>
				<div className="f32"><div className={`flag eth`}></div></div>
				<div className="f32"><div className={`flag fro`}></div></div>
				<div className="f32"><div className={`flag fji`}></div></div>
				<div className="f32"><div className={`flag fin`}></div></div>
				<div className="f32"><div className={`flag fra`}></div></div>
				<div className="f32"><div className={`flag pyf`}></div></div>
				<div className="f32"><div className={`flag gab`}></div></div>
				<div className="f32"><div className={`flag gmb`}></div></div>
				<div className="f32"><div className={`flag geo`}></div></div>
				<div className="f32"><div className={`flag deu`}></div></div>
				<div className="f32"><div className={`flag gha`}></div></div>
				<div className="f32"><div className={`flag gib`}></div></div>
				<div className="f32"><div className={`flag grc`}></div></div>
				<div className="f32"><div className={`flag grl`}></div></div>

				<div className="f32"><div className={`flag gum`}></div></div>
				<div className="f32"><div className={`flag gtm`}></div></div>
			</div>
			<div className="button btn-square" onClick={play}>Play</div>
		</div>
	)
}


const GamePage = ({gameId, playerId}) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))
	const [location, setLocation] = useLocation();

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
			{!game && <div className="link" style={{marginTop: '10rem'}} onClick={cancel}>Cancel</div>}
		</div>
	)
}

const QuestionPage = ({gameId, playerId}) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const game = snapshot.val()

	const youKey = `player${playerId}`
	const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`

	const question = game.questions[`${game.currentQuestion}`]

	if (!question) return 'Loading...'

	const answer = async (countryCode) => {
		if (question.fastest) return

		const updates = {}
		updates[`/games/${gameId}/questions/${game.currentQuestion}/fastest`] = {player: playerId, answer: countryCode}
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
							{}
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

const QuickResults = ({you, opponent}) => {
	return (
		<div className="quick-results">
			YOU {you} : OPPONENT {opponent}
		</div>
	)
}

const ResultsPage = ({gameId, playerId}) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const game = snapshot.val()

	const youKey = `player${playerId}`
	const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`

	const youWon = (game.score[youKey] >= game.score[opponentKey])

	return (
		<div className="page">
			{youWon && <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />}
			{!youWon && <Lost you={game.score[youKey]} opponent={game.score[opponentKey]} />}
			<Link href="/" className="re-home link">Home</Link>
		</div>
	)
}

const Won = ({you, opponent}) => {
	return (
		<div className="results">
			<img src={winning} style={{width: '80%'}} />
			<div className="re-text">Congratulations!!</div>
			<QuickResults you={you} opponent={opponent} />
		</div>
	)
}

const Lost = ({you, opponent}) => {
	return (
		<div className="results">
			<img src={dog} style={{width: '80%'}} />
			<div className="re-text">Better luck next time...</div>
			<QuickResults you={you} opponent={opponent} />
		</div>
	)
}

export default App;