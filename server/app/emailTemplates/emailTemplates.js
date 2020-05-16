const thanksNote = `<h4>Thanks & Regards,<br />Object Edge India Services Pvt Ltd.</h4> `

const peerReviewEmailTemplate =(peerName)=>{return `<html><body><h4>Hello ${peerName} 
</h4><p>Please submit review for your peers.</p>
${thanksNote}</body></html>`
}

const newUserTemplate =(username, password, email)=>{
    return `<html><body><h4>Dear ${username}, </h4><p>Welcome to Object Edge. <br />
Please Sign in to your account with below credentials .</p>
<p>Username : ${username}/ ${email} <br /> Password : ${password} </p>
${thanksNote}
</body></html>`
}

const updatePasswordTemplate =(user, link)=>{return `<html><body><h4>Hello ${user}, </h4><p>Your password has been updated.</p>
${thanksNote}</body></html>`
}

module.exports = {peerReviewEmailTemplate,newUserTemplate, updatePasswordTemplate };
