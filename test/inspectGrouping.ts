import * as pattern from "../src/patterns"
import fetch from "node-fetch"

fetch("https://tjmora.github.io/inflexp/spec-examples.json")
   .then(res => res.json())
   .then((data) => {
      (data as [string, string, string][]).forEach((item) => {
         let groups = item[1].match(pattern.inflexp)!.groups!
         console.log(item[1])
         console.log(groups)
      })
   })


   

