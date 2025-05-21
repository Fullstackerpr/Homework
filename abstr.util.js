// 1 - misol
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function updateProduct(product, updates) {
    return __assign(__assign({}, product), updates);
}
var product = {
    id: 1,
    name: 'Lenovo',
    price: 400,
    description: 'Ideal'
};
var updatedProduct = updateProduct(product, {
    name: 'Acer',
    price: 450
});
console.log(updatedProduct);
