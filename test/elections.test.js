const Elections = artifacts.require('./Elections.sol')

contract ('Elections', (accounts) =>{

	before(async () => {
		this.candidates = await Elections.deployed()
	})


	it('deploys successfully', async () => {
    const address = await this.candidates.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

	it('initializing properly', async () => {
		const candidateCount = await this.candidates.candidateCount()
		// console.log(candidateCount)
		assert.equal(candidateCount, 2)
	})

	it('testing voting functionality', async () => {
		// const candidateCount = await this.candidates.candidateCount()
		const address = await web3.eth.getAccounts()
		const result = await this.candidates.vote(1)

		const event =result.logs[0].args
		// console.log(address[0])
		// console.log(event.add)
			assert.equal(event.add, address[0])
			assert.equal(event.vote, true)
		const candidate = await this.candidates.candidates(1)
		assert.equal(candidate.voteCount.toNumber(),1)
		// const votes = this.candidates.voters()
		// // assert.equal(voters[])
		// console.log(candidate)
	})
})