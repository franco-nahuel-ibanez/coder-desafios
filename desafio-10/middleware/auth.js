function auth(req, res, next) {
    if (req.session.user && req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/login')
}

module.exports = auth
   