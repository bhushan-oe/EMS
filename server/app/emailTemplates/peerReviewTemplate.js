const peerReviewEmailTemplate = peerName => {
  return `<html><body><h4>Hello ${peerName} </h4><p>Please submit review for your peers.</p>
<h4>Thanks</h4> </body></html>`;
};

module.exports = { peerReviewEmailTemplate };
