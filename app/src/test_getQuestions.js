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
        let alternativesArr = [];
        for (let q of questionsArr) {
            // assert.equal(alternativesArr.includes(q.alternatives), false)
            alternativesArr.push(q.alternatives)
        }
        for(let country of alternativesArr) {
            let countryValues = Object.values(country);
            let checkedValues = checkIfDuplicateExists(countryValues)
            assert.equal(checkedValues, false)
        }      
        
    })
})

function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length
}