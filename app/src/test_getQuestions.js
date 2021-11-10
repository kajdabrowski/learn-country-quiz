import assert from 'assert';
import { getQuestions } from './utils.js';

//Test correct
describe('getQuestions', () => {
    it('should generate questions with unique country codes', () => {
        let questionObj = getQuestions(5)

        let questionsArr = [];
        let questionCopy = Object.values(questionObj)
        questionsArr = [...questionCopy]
        questionsArr[0][0]
        let correctArr = [];
        for (let q of questionsArr) {
            assert.equal(correctArr.includes(q.correct), false)
            correctArr.push(q.correct)
        }
        console.log(correctArr)       
    });
})

//Test country code duplicates
describe('getQuestions', () => {
    it('should ensure country codes are not duplicates', () => {
        let questionObj = getQuestions(5)

        let questionsArr = [];
        let questionCopy = Object.values(questionObj)
        questionsArr = [...questionCopy]
        questionsArr[0][0]
        let correctArr = [];
        for (let q of questionsArr) {
            assert.equal(correctArr.includes(q.alternatives), false)
            correctArr.push(q.alternatives)
        }
        let countryArr = []
        for(let country of correctArr) {
            countryArr.push(country)
            assert.equal(countryArr.includes(country.alternatives), false)
        }      
        console.log(countryArr);
    })
})