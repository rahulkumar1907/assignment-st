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
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
}

const isValidObjectId = (objectId) => mongoose.Types.ObjectId.isValid(objectId)

module.exports = { isValidValue,isValidName,isValidEmail,isValidPhone,isValidObjectId,isValidPassword }