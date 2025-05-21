// 1 - misol

/*
abstract class Shape {
    abstract getArea(): number;
}


class Circle extends Shape {
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }
}

const circle = new Circle(5);
console.log("Circle area:", circle.getArea()); 

const rectangle = new Rectangle(4, 6);
console.log("Rectangle area:", rectangle.getArea()); 

*/


// 2 - misol

/*
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

function updateProduct(product: Product, updates: Partial<Pick<Product, 'name' | 'price' >>): Product {
    return {
        ...product,
        ...updates
    }
}


const product: Product = {
    id: 1,
    name: 'Lenovo',
    price: 400,
    description: 'Ideal'
}

const updatedProduct = updateProduct(product, {
    name: 'Acer',
    price: 450
});

console.log(updatedProduct);

*/