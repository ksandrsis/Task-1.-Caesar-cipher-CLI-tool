# Task-1.-Caesar-cipher-CLI-tool

## How to start
1. ```git clone https://github.com/ksandrsis/Task-1.-Caesar-cipher-CLI-tool.git```
1. ```Task-1.-Caesar-cipher-CLI-tool```
1. ``` cd caesar-cipher-cli```
1. ``` npm i```
1. ``` npm run build```
1. Done!

## Now you can run the app
### Arguments
1. __-s, --shift:__ a shift : Number: any
1. __-i, --input:__ an input file : String: (encode/decode)
1. __-o, --output:__ an output file : String
1. __-a, --action:__ an action encode/decode : String

_Remember! Action (encode/decode) and the shift are required._

### Usage example:

```$ node build/ -a encode -s 7 -i "./input.txt" -o "./output.txt"```

```$ node build/ --action encode --shift 7 --input plain.txt --output encoded.txt```

```$ node build/ --action decode --shift 7 --input decoded.txt --output plain.txt```
