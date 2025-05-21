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
var BankAccount = /** @class */ (function () {
    function BankAccount() {
    }
    BankAccount.prototype.getBalance = function () {
        console.log(this.balance);
    };
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    BankAccount.prototype.withdraw = function (amount) {
        this.balance -= amount;
    };
    BankAccount.prototype.getName = function () {
        console.log(this.ownerName);
    };
    BankAccount.prototype.setName = function (newName) {
        this.ownerName = newName;
    };
    BankAccount.bankName = 'TBC';
    return BankAccount;
}());
var bankaccount = new BankAccount();
console.log(bankaccount.deposit(12));
console.log(bankaccount.getBalance());
console.log(bankaccount.withdraw(13));
console.log(bankaccount.setName('TBc'));
