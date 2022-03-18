const router = require('express').Router();
const itemService = require('../services/itemService')


router.post('/:id/addBid', (req,res) => {
    const bid = req.body;
    const id = req.params.id
    
    itemService.addBid(id, bid).then((result) => {
        res.status(result.status).json(result.data);
    });
});

module.exports = router;