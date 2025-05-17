// 1 - misol

/*
function fib(x: number) {
    if (x <= 1) {
        return x;
    }
    return fib(x -1) + fib(x - 2);
}

const num = 10;
console.log(fib(num));

*/

// 2 - misol

type Product = {
    id: number,
    name: string,
    price: number,
    inStock: boolean
}

const product1: Product = {
    id: 1,
    name: 'Lenovo',
    price: 400,
    inStock: true
}
const product2: Product = {
    id: 2,
    name: 'Acer',
    price: 100,
    inStock: true
}
const product3: Product = {
    id: 3,
    name: '',
    price: 100,
    inStock: false
}

const arr: Product[] = [product1, product2, product3];
const filteredProducts = arr.filter(product => product.price >= 100);
console.log(filteredProducts);