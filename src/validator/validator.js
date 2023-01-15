

exports.isValidString=function(value){
    if(typeof value=="undefined" || value ==null) return false
    if(typeof value=="string" && value.trim().length==0) return false
    return true
};

exports.isValidName = function (value) {
    return /^[a-zA-Z ]+$/.test(value)
  };

  exports.isValidEmail = function (value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/.test(value)
};

 exports.isValidPassword =function(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/.test(value)
};

exports.isValidMobile =  (mobile) =>{
    return /^[0]?[6789]\d{9}$/.test(mobile)
    }