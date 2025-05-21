function Component(constructor: Function) {
    console.log(`Bu ${constructor.name} class`)
}

function LogMethod(target: any, methodName: string, discriptor: PropertyDescriptor) {
    console.log(`Bu ${methodName} method`);
}

function Property(target: any, propertyKey: string) {
    console.log(propertyKey);
}

function Accessor(target: any, AccessorName: string, descriptor: PropertyDescriptor) {
    console.log(AccessorName);
}

function LogParam(target: any, methodName: string, paramIndex: number){
    console.log(methodName, paramIndex);
}

@Component
class Laptop {
    @Property
    brand: string = 'Lenovo';
    @Property
    model: string = 'ideapad';
    @Property
    price: number = 400;
    
    @LogMethod
    buy(@LogParam model: string) {
        return `This ${this.model} buy`
    };

    @Accessor
    get getBrand(){
        return this.brand;
    }
}

const Lenovo = new Laptop();
Lenovo.buy('ideapad');