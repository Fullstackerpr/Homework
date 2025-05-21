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

/*
enum Role {
    ADMIN,
    EDITOR,
    VIEWER
}

function canEdit(role: Role): boolean{
    return role === Role.ADMIN || role === Role.EDITOR;
}

function canDelete(role: Role): boolean {
    return role === Role.ADMIN;
}

const user1 = Role.ADMIN;
const user2 = Role.EDITOR;
const user3 = Role.VIEWER;

console.log('user1(ADMIN):')
console.log('CanEdit:', canEdit(user1));
console.log('CanDelete:', canDelete(user2));
console.log('CanDelete:', canDelete(user3));

*/