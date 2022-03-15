const router = require('express').Router();
const itemService = require('../services/itemService')


router.post('/:id/addBid', (req,res) => {
    const bid = req.body;
    const id = req.params.id
    
    itemService.addBid(id, bid).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.get('/:id/latestBid', (req, res) => {
    const id = req.params.id
    itemService.getById(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    itemService.getById(id).then((result) => {
        res.status(result.status).json(result.data); 
    });
});

router.get('/', (req, res) => {
    itemService.getAll().then((result) => {
        res.status(result.status).json(result.data);   
    });
});

router.post('/', (req, res) => {
    const item = req.body;
    itemService.create(item).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.put('/', (req, res) => {
    const item = req.body;
    const id = item.id;
    itemService.update(item, id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.delete('/', (req, res) => {
    const id = req.body.id;
    itemService.destroy(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

module.exports = router;