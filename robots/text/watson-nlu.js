const watsonApiKey = require('../../credentials/watson-nlu.json').apikey

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
 
const nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: watsonApiKey,
    version: '2018-11-16',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

async function robot(sentence){
    const keywords = await fetchWatsonAndReturnKeywords(sentence)

    return keywords
    
    async function fetchWatsonAndReturnKeywords (sentence) {
        return new Promise((resolve, reject) => {
            nlu.analyze({
                text: sentence,
                features: {
                    keywords: {}
                }
            }, (error, response) => {
                if(error) {
                    throw error
                }
                
                const keywords = response.keywords
                    .map(keyword => keyword.text)

                resolve(keywords)
            })
        })
    }
}

module.exports = robot