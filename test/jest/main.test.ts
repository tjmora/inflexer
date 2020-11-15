import TestWord from "../TestWord"
import fetch from "node-fetch"

function fetchData (callback: (data: [string, string, string][]) => void) {
    fetch("https://tjmora.github.io/inflexp/spec-examples.json")
        .then(res => res.json())
        .then((jsonData) => {
            callback(jsonData)
        })
}

test('the data is peanut butter', done => {
    function callback(data: [string, string, string][]) {
        let catcher = ["", "", ""]
        try {
            data.forEach((item) => {
                catcher = item
                let word = new TestWord(item[0])
                let word2 = word.inflect(item[1])
                expect(word2.toString()).toBe(item[2])
             })
            done();
        } catch (error) {
            console.log("Error on: " + catcher)
            done(error);
        }
    }
  
    fetchData(callback);
});
