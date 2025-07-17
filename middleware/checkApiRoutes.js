const checkApiRoutes = (req,res,next) => {
    const path = req.path

    if(
        path.startsWith('/api/v1/expenses') || path.startsWith('/api/v2/expenses') || path.startsWith('/api/v1/login') || path.startsWith('/metrics') || path.startsWith('/promMetrics') || path.startsWith('/swagger.json')
    ){
        next()
    }else {
        return res.status(404).json({error:"Request Not Valid!"})
    }
}

module.exports = checkApiRoutes

