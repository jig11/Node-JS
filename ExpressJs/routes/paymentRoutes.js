const express = require("express");
const Payments = require("../schemas/paymentSchema");
const router = express.Router();
const pinologger = require('../middleware/pinoMiddleware');

router.get("/", async (req, res) => {
try {
const payments = await Payments.find({});
res.status(200).send(payments);
} catch (err) {
pinologger.error('Error fetching payments:', err);
res.status(500).send({ error: 'Failed to fetch payments' });
}
});

router.get('/:id', async (req, res) => {
try {
const payment = await Payments.findById(req.params.id);
if (!payment) {
return res.status(404).send({ error: 'Payments not found' });
}
res.status(200).send(payment);
} catch (err) {
pinologger.error('Error fetching payment:', err);
res.status(500).send({ error: 'Failed to fetch payment' });
}
});

router.put("/:id", async (req, res) => {
try {
  const updatePayment = await Payments.findByIdAndUpdate(req.params.id, {amount:req.body.amount,description:req.body.description},{new:true});
  res.send({ message: 'Payments updated successfully', payment: updatePayment });
} catch (err) {
  res.status(500).send({ error: err.message });
}
});

router.delete("/:id", async (req, res) => {
try 
{
  const payment = await Payments.findById(req.params.id);
  if (!payment) {
  return res.status(404).send({ error: 'Payments not found' });
  }
  const deletePayment = await Payments.findByIdAndDelete(req.params.id);
  res.send({ message: 'Payment deleted successfully' });
  } catch (err) {
  res.status(500).send({ error: err.message });
  }
});

router.post('/',(req,res)=>{

  let newPayment = new Payments({
description : req.body.description,
amount : req.body.amount
})

newPayment.save().then((result) => {
res.send(result);
}).catch((err) => {
pinologger.error('Error fetching payment:', err);
res.status(500).send({ error: 'Failed to create payment' });
});

});

module.exports = router;
