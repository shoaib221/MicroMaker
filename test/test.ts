import { number } from "framer-motion";



type DataType<T> = T extends any[] ? "Large" : "Small";
type Test1 = DataType<string[]>; // "Large"

type Test2 = string;

const aha: Test2 = 2;

console.log(aha)