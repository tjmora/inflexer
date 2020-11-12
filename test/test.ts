import * as pattern from "../src/patterns"
import {spec_examples} from "./spec_examples"

console.log("test")

spec_examples.forEach((item) => {
   let groups = item[1].match(pattern.inflexp)!.groups!
   console.log(item[1])
   console.log(groups)
})