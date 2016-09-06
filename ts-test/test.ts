function test(str: string): void {
    console.log(str);

    // boolean
    let isDone: boolean = false;

    // number
    let decLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;
    let octalLiteral: number = 0o744;

    // string
    let name: string = 'bob';
    let age: number = 37;
    let sentence: string = `Hello, my name is ${name}.\nI'll be ${age + 1} years old next month.`;
    console.log(sentence);

    // list
    let list: number[] = [1, 2, 3];

    // tuple
    let x: [string, number];
    x = ['hello', 1];
    // x = [1, 'hello']; error

    console.log(x[0].substr(1));

    x[3] = 'world';

    // console.log(x[5].toString());

    // enum
    enum Color { Red = 1, Green = 2, Blue = 4 }
    let colorName: string = Color[2]
    console.log(colorName);

    let notSure: any = 4;
    // console.log(notSure.toFixed());

    let someValue: any = 'this is a string';
    // let strLength: number = (<string>someValue).length;
    let strLength: number = (someValue as string).length;
    console.log(strLength);

    try {
        throw 'oh no!';
    } catch (error) {
        console.log(error);
    }
    // a++;
    // let a: number;

    for (let i = 0; i < 10; i++) {
        setTimeout(function () { console.log(i); }, 100 * i)
    }

    const numLivesForCat = 9;
    const kitty = {
        name: "Aurora",
        numLives: numLivesForCat
    }

    // kitty = {
    //     name: "Danielle"
    // }

    kitty.name = "Danielle";

    console.log(kitty);

    let input = [1, 2];
    let [first, second] = input;
    console.log(first);
    console.log(second);
    [first, second] = [second, first]
    console.log(first);
    console.log(second);

    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    }

    let {a, b} = o;

    ({a, b} = {a: 'baz', b: 101})
    
}

test('Hello, TypeScript!');

function sumMatrix(matrix: number[][]) {
    let sum: number = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];

        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}

console.log(sumMatrix([[1, 2, 3], [5, 6, 7]]));

function theCityThatAlwaysSleeps() {
    let getCity: any;

    if (true) {
        let city = "Seattle";
        getCity = function () {
            return city;
        }
    }

    return getCity;
}

function keepWholeObject(wholeObject: {a: string, b?: number}): void {
    let {a, b = 1001} = wholeObject;
}

function f({a, b = 0} = {a: "", b: 0}): void {
    console.log(a, b)
}
f();
