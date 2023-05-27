module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect('/authentication/login')
    },

    isNotLogged(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/upload')
    },

//     usuarioBien(req, res, next){
//         if(req.isAuthenticated()){
//             return true
//         }
//         return false
//     }
}