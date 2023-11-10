import UserModel from "../models/User";

 const generateUniqueAccountNumber = async () => {
    let isUnique = false 
    let accountnumber = ''
    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 90000000) + 1000000; // Generates a random number between 1000000 and 9999999
        return randomNumber.toString();
      };
    while(!isUnique){
    const randomPart = generateRandomNumber()
    accountnumber = `43${randomPart}`
    

    const existingUser = await UserModel.findOne({accountnumber})
    if(!existingUser){
        isUnique= true
    }
}
return accountnumber
}

export default generateUniqueAccountNumber