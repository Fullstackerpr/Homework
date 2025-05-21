// 1 - misol

/*
function identity<T>(value: T): T {
    return value;
}

function printValue(value: string | number | object): void {
    console.log(value);
}

class Stack<T> {
    private items: T[] = [];

    AddElem(element: T): void {
        this.items.push(element);
    }

    DeleteElem(): T | undefined {
        return this.items.pop();
    }

    print(): void {
        console.log(this.items);
    }
}

*/

// 2 - misol

/*
class BankAccount {
    readonly accountNumber: string;
    public ownerName: string;
    private balance: number;
    static bankName: string = 'TBC';

    getBalance(){
        console.log(this.balance);
    }
    
    deposit(amount: number){
        this.balance += amount;
    }

    withdraw(amount: number) {
        this.balance -= amount;
    }

    getName() {
        console.log(this.ownerName);
    }

    setName(newName: string): void {
        this.ownerName = newName;
    }
}

const bankaccount = new BankAccount();
console.log(bankaccount.deposit(12));

*/