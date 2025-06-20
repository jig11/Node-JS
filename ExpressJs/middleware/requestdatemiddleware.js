
function requestDateMiddleware(req,res,next)
{
    const parsedUrl = req.originalUrl.replace('/','');
    // if(parsedUrl == "middleware")
    {
        req.myurl = parsedUrl;
        req.requestDate = Date.now();
        req.name = "jignesh shah";
        res.value = "MY RESPONSE";
        // console.log(`middleware page ${req.requestDate} ${req.name} ${res.value}`)
        res.value = "MY RESPONSE1";
    }
    next();
}

module.exports = requestDateMiddleware; 