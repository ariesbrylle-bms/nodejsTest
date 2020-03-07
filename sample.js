let user1 = {
    id: 1,
    name: "Aries",
    username: "aries01",
    groups: ["dancing", "programmer"],
    company: {
        id: 1,
        name: "Unionbank"
    }

}


class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.group = [];
    }
}


// pass by reference
function isUpdateInformation(user) {
    user.name = "Aries Brylle Ventura"
}

// pass by value
function isUpdateInformation2(user) {
    let u = new User(user)
    u.id = user.id;
    u.name = "Racquel Feria Ulibas";
    u.username = "racquel01";
    u.groups = user.groups;
    u.company = {};
    u.company.id = user.company.id;
    u.company.name = user.company.name = "Barangay Marcela"

    return u;
}

isUpdateInformation(user1)
console.log(user1)
console.log(isUpdateInformation2(user1))

function isPalindrome(word) {
    let rducers = (acc, cv) => acc + cv;
    return Array.from(word).reverse().reduce(rducers) == word;
}

console.log(`This is ${ isPalindrome("aries") ? 'a' : 'not a'} palindrome`);
console.log(`This is ${ isPalindrome("racecar") ? 'a' : 'not a'} palindrome`);

let x = [10, 4, 56, 34, 53, 53, 45]
console.log(x.slice(0, 4).map(v => v + 10).filter(v => v > 1))

console.log(typeof user1)