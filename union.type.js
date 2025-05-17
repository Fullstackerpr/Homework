// 1 - misol
/*
function toNum(value: string | number) {
    if (typeof value === 'string') {
        return Number(value);
    } else {
        return value;
    }
}

// const num = '123'
const num = 321
console.log(toNum(num));

*/
// 2 - misol
/*
function BoolorStr(value: boolean | string) {
    if (typeof value === "boolean") {
        return value;
    } else {
        return value.length;
    }
}

const str = 'Welcome';
// const bol = false;
console.log(BoolorStr(str));
*/
// 3 - misol
/*
function Puberty(value: number): boolean {
    if(value >= 18) {
        return true
    } else {
        return false
    }
}

const age = 18
console.log(Puberty(age));
*/
// 4 - misol
/*
function isName(name: string | null | undefined) {
    if (name === undefined) {
        return undefined
    } else if (name === null) {
        return null
    } else {
        return "Mehmon"
    }
}

const ism = 'Ali';
console.log(isName(ism));

*/
// 5 - misol
/*
function Log(): void {
    console.log('Xush kelibsiz!');
}

Log();
*/
// 6 - misol
function errors() {
    throw new Error('Xatolik yuz berdi');
}
errors();
