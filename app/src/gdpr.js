const initGdpr = () => {
    if (!localStorage.getItem("gdprConsent")) {
        localStorage.setItem("gdprConsent", JSON.stringify([
            { name: "ccMarketing", description: "Persistent third-party cookies that help advertisers deliver targeted ads.", active: false },
            { name: "ccNecessary", description: "Strictly necessary cookies are needed for site functionality", active: false },
            { name: "ccStatistics", description: "Information about site visits and user behavior. This information is anonymized.", active: false }
        ]))
    }
}

export default initGdpr;