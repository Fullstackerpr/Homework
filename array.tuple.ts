// 1 - misol

/*
function minArr(nums: number[]) {
    console.log(Math.min(...nums));
}
const nums: number[] = [8, 2, 3, 4, 5];
minArr(nums);
*/


// 2 - misol

/*
function strArr(arr: string[]) {
    const add = arr.join(', ');
    return add;
}

const arr: string[] = ['Hello', 'Welcome', 'Thanks'];
console.log(strArr(arr));
*/


// 3 - misol

/*
const username: string = 'Hucker';
const loginTime: Date = new Date();
const isLoggedIn: boolean = true;

if (isLoggedIn == true) {
    console.log(`${username}: tizimga kirgan. vaqti: ${loginTime}`);
} else {
    console.log(`${username}: tizimga kirmagan`);
}

*/


// 4 - misol

/*
type Phone = {
    brand: string,
    model: string,
    price: number
}

const Phone1: Phone = {
    brand: 'apple',
    model: 'Xr',
    price: 210
}

const Phone2: Phone = {
    brand: 'samsung',
    model: 'S10+',
    price: 160
}

const Phone3: Phone = {
    brand: 'mi',
    model: 'not 11',
    price: 170
}

const arr: Phone[] = [Phone1, Phone2, Phone3];
const price = arr.map(Phone => Phone.price);
const Max = Math.max(...price);
console.log(Max);

*/


// 5 - misol

/*
enum status {
    Active = 'active',
    Inactive = 'inactive'
}

type Student = {
    name: string,
    grade: string,
    isactive: status
}

const student1: Student = {
    name: 'Ali',
    grade: '55',
    isactive: status.Inactive
}

const student2: Student = {
    name: 'Bobur',
    grade: '70',
    isactive: status.Active
}

const student3: Student = {
    name: 'Umar',
    grade: '86',
    isactive: status.Active
}

const arr: Student[] = [student1, student2, student3];
const activeSt = arr.filter(Student => Student.isactive === status.Active);
console.log(activeSt);

*/