// root controlers
module.exports.root_get = (req, res) => {
    res.json("Hello world");
};

module.exports.resource_get = (req, res) => {
    console.log(res.locals.user);
    res.json(
        { 
            "MESSAGE": `Oh hi there ${res.locals.user.email}! You're here for my resources? Have it all baby!`,
            "user": res.locals.user.email,
            "password": res.locals.user.password,
            "id": res.locals.user._id
        }
    );
};

module.exports.deadEnd = (req, res) => {
    res.status(404).json({ response: 404 });
}