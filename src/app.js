App = {
  loading: false,
  contracts: {},
  // form : true,
  // connected: false,

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  loadWeb3: async () => {

    if (window.ethereum) {
      const ethereum = window.ethereum
      window.web3Provider = new Web3(ethereum)
    } else {
      window.alert("Please connect to Metamask.")
    }
  },

  loadAccount: async () => {

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      App.account = accounts[0]
      web3Provider.eth.defaultAccount = App.account
      // console.log(App.account)
    } catch (error) {
      if (error.code === 4001) {
        // User rejected request
        window.alert("User Rejected connection request")
      }
      setError(error)
    }
  },

  loadContract: async () => {
    const elections = await $.getJSON('Elections.json')
    App.contracts.elections = TruffleContract(elections)
    App.contracts.elections.setProvider(web3Provider.currentProvider)
    App.elections = await App.contracts.elections.deployed()
  },

  render: async () => {

    // var electionInstance;
    var loader = $("#loader")
    var content = $("#content")

    loader.show()
    content.hide()

    const candidateCount = await App.elections.candidateCount()
    // console.log(candidateCount.toNumber())

    var candidatesResults = $("#candidatesResults");
    candidatesResults.empty();

    var candidatesSelect = $('#candidatesSelect');
    candidatesSelect.empty();


    $("#accountAddress").html("Your Account is : " + App.account)
    for (var i = 1; i <= candidateCount; ++i) {

      App.elections.candidates(i).then(function(candidate) // Using Promise's then function as App.todoList.tasks(i) is returning a promise object
        {
          const candidateId = candidate[0].toNumber()
          const candidateName = candidate[1]
          const voteCount = candidate[2]

          console.log(candidateName)
          console.log(voteCount.toNumber())

          var candidateTemplate = "<tr><th>" + candidateId + "</th><td>" + candidateName + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate)

          var candidateOption = "<option value='" + candidateId + "' >" + candidateName + "</ option>"
          candidatesSelect.append(candidateOption)

      
        });
    }

    loader.hide()
    content.show()

    App.elections.voters(App.account).then(function(voter){
      if(voter)
        $('form').hide()
    })

    
  },

  castVote: async ()=> {
    try{
      var candidateId = $('#candidatesSelect').val()
    const event =  await App.elections.vote(candidateId)
    // console.log(event)
    // cons
    // window.location.reload()
    // $('form').hide()
    // App.form = false
    await App.render()}
    catch(error)
    {
      if (error.code === 4001) {
        // User rejected request
        window.alert("User Rejected vote transaction from metamask wallet")
      }
      else
        window.alert("already casted vote")
    }
    // window.location.reload()
    
},

// listenForEvents: async function() {
//   App.elections.then(function(instance) {
//     instance.votedEvent({}, {
//       fromBlock: 0,
//       toBlock: 'latest'
//     }).watch(function(error, event) {
//       console.log("event triggered", event)
//       // Reload when a new vote is recorded
//       App.render();
//       await window.location.reload()
//     });
//   });
// }

  // render: async () => {
  //   if (App.loading) {
  //     return
  //   }

  //   // Update app loading state
  //   App.setLoading(true)

  //   // Render Account
  //   $('#account').html(App.account)

  //   // Render Tasks
  //   // await App.renderTasks()

  //   // Update loading state
  //   App.setLoading(false)
  // },

  //   setLoading: (boolean) => {
  //   App.loading = boolean
  //   const loader = $('#loader')
  //   const content = $('#content')
  //   if (boolean) {
  //     loader.show()
  //     content.hide()
  //   } else {
  //     loader.hide()
  //     content.show()
  //   }
  // }

}
 


$(() => {
  $(window).load(() => {
    App.load()
  })
})