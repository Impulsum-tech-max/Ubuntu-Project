class Person{
    constructor(name){
        this._name=name;
    }

    get name(){
        return this._name;
    }

    set name(newName){
        if(newName.trim()==="" || newName.trim().length<3){
            return;
        }else{
            this._name=newName;
        }
    }
}

class Student extends Person{
    constructor(name, course){
        super(name);
        this.course=course;
    }

    introduce(){
        return `My name is ${this.name}, and I am studying ${this.course}.`
    }
}

const student=new Student("Impulsum", "Computer Science");


console.log(student.introduce());

student.name="";
console.log(student.introduce());

student.name="Gideon";
console.log(student.introduce());

console.log(student instanceof Student);
console.log(student instanceof Person);