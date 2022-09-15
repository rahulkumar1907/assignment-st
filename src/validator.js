const isValidValue = (value) => {
    if (typeof value === "undefined" || value === null)
        return false;
    if (typeof value === "string" && value.trim().length === 0)
        return false;
    return true;
};

const isValidName = function(value){
    return /^[A-z]*$|^[A-z]+\s[A-z]*$/.test(value)
};

const isValidEmail = (email)=>{
    return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))
}

const isValidPhone = (phone)=>{
    return (/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone))
}

const isValidPassword = (password)=>{
    return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))
}
const isValidFiles = (files) => {
    if (files && files.length > 0) return true
  }
  
 
const isValidObjectId = (objectId) => mongoose.Types.ObjectId.isValid(objectId)

module.exports = { isValidValue,isValidName,isValidEmail,isValidPhone,isValidObjectId,isValidPassword,isValidFiles }