
const input = require("../fixtures/input/input")


function classifier(input) {

    // return if input is not an array or array length is less than 1
    if (!Array.isArray(input)) {
        throw Error;
      }

    if (!input.length) {
    return { noOfGroups: 0 };
    }

    let newInput = [...input];

    const prestentYear = 2019;

    //since array.map method still returns an array, i used it to restructure the input  data

    let newmember_arr = newInput.map((member) => {
        const birth_year = new Date(member.dob).getFullYear();
        const current_age = prestentYear-birth_year;

        member.age = current_age;

        return member;
    } )
    // console.log(newmemberAge_arr)

    //since the output object has tobe arranged in ascending other of their ages, i will be sorting by age

    newmember_arr.sort((a,b) => a.age - b.age);

    // console.log(newmember_arr);

    //initializing the ouput template
    let output = {};

    // i will be initializing a reference group 'refGroup

    let refGroup = [newmember_arr[0]]; 

    let parentGroup = [] //at every iteration, this group is update with arrays of object


    //this is a template that restructures the groups formed from the student group
    let groupTemplate = (group) => ({
        members : [...group],
        oldest : group[group.length-1].age,
        sum : group.reduce((a,b) => {return a + b.age},0),
        regNos : group.map(a => {return Number(a.regNo)}).sort((f, l) => f -l),
    });


    //this an iteration that each group has a length > 0 and less than 4, and is made of members whose age differences are less than 6

    for(let i = 1; i < newmember_arr.length; i++) {

        //ref refGroup[0].age

        if(newmember_arr[i].age -refGroup[0].age <= 5 && refGroup.length <= 2) { //if true, a structured group will be appended to 'parentGroup' array

            refGroup.push(newmember_arr[i]);
            
        }
        else {

            // when the if block fails, the 'refGroup' will be reinitialized, and the loop will repeat untill every members of the 'newmember_arr' is iterated through. 

            parentGroup.push(groupTemplate(refGroup));
            refGroup = [];
            refGroup.push(newmember_arr[i])
        }

    }

    if(refGroup.length) {
        // this pushes the last item in the 'refGroup' to the 'parentgroup'
        parentGroup.push(groupTemplate(refGroup))
    }
    
    
    // this block of code iterates through the 'parentGroup' array, and restructure the output object with i-th noOfGroup property and n-th group property 
    parentGroup.forEach((item, index) => {

        output .noOfGroups = parentGroup.length;

        output[`group${index+1}`] = item;

        return output;

    }

    )

    return output
}
// console.log(classifier(input))

// console.log(input)


export default classifier;
