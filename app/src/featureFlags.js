

const initFeatures = () => {

    if(!localStorage.getItem("featureFlags")) {
        localStorage.setItem("featureFlags", JSON.stringify([
           
            {name: "ffImprovedScoring", description: "Improved Scoring", active: false},
            {name: "ffImprovedRandomizer", description: "Improved Randomizer", active: false},
            {name: "ffImprovedTies", description: "Improved Ties", active: false}


        ]))
    }


}




export default initFeatures;
