// 1 - misol Inerf-Class
/*
interface Vehicle {
    brand: string,
    model: string,
    year: number,
    start(): void
}

class Car implements Vehicle{
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    start(): void {
    console.log(`${this.brand} ${this.model} (${this.year}) starting engining...`);
    }
}

const car = new Car('Chevrolet', 'Gentra', 2023);
car.start();

*/
// 2 - misol
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["EDITOR"] = 1] = "EDITOR";
    Role[Role["VIEWER"] = 2] = "VIEWER";
})(Role || (Role = {}));
function canEdit(role) {
    return role === Role.ADMIN || role === Role.EDITOR;
}
function canDelete(role) {
    return role === Role.ADMIN;
}
var user1 = Role.ADMIN;
var user2 = Role.EDITOR;
var user3 = Role.VIEWER;
console.log('user1(ADMIN):');
console.log('CanEdit:', canEdit(user1));
console.log('CanDelete:', canDelete(user2));
console.log('CanDelete:', canDelete(user3));
